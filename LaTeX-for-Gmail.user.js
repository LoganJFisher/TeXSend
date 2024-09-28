// ==UserScript==
// @name            LaTeX for Gmail
// @version         6.1.0
// @description     Adds a button to Gmail which toggles LaTeX compiling
// @author          Logan J. Fisher & GTK & MistralMireille
// @license         MIT
// @namespace       https://github.com/LoganJFisher/LaTeX-for-Gmail/
// @downloadURL     https://raw.githubusercontent.com/LoganJFisher/LaTeX-for-Gmail/refs/heads/main/LaTeX-for-Gmail.user.js
// @updateURL       https://raw.githubusercontent.com/LoganJFisher/LaTeX-for-Gmail/refs/heads/main/LaTeX-for-Gmail.user.js
// @supportURL      https://github.com/LoganJFisher/LaTeX-for-Gmail/issues
// @match           https://mail.google.com/mail/*
// @noframes
// @grant           GM_registerMenuCommand
// @grant           GM_addElement
// @grant           GM_addStyle
// @require         https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js
// @require         https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/contrib/mhchem.min.js
// @require         https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/contrib/copy-tex.min.js
// ==/UserScript==

/* globals katex */

const selectors = {
    topBar: 'div#\\:4',
    moveButton: 'div#\\:4 div[title="Move to"], div[aria-label="Move to"]',
    messageList: '#\\:1 div[role=list]',
    messageBody: '#\\:1 [role=list] > [role=listitem] [data-message-id] > div > div > div[id^=":"][jslog]',
    draftsContainer: 'body > div.dw > div > div > div > div:first-child',
    draftRegion: 'div[role=region]',
    draftBody: 'div[aria-label="Message Body"]',
    sendButton: 'div[role=button][aria-label^=Send]',
    lockerButton: 'td:has(> div > div[command=locker])',
    splitHalf: 'div[jsname=h50Ewe] > div > div > div > div',
    shortcutMenu: 'body > div.wa:not(.aou) > div[role=alert]',
}

const DELIMITERS = [
    {left: '[(;' , right: ';)]' , display: true, includeDelimiter: false},
    {left: '\\[' , right: '\\]' , display: true, includeDelimiter: false},
    {left: '[;' , right: ';]' , display: false, includeDelimiter: false},
    {left: '\\(' , right: '\\)' , display: false, includeDelimiter: false},
    {left: '\\begin{displaymath}' , right: '\\end{displaymath}' , display: true, includeDelimiter: false},
    {left: '\\begin{math}' , right: '\\end{math}', display: false, includeDelimiter: false},

    {left: '\\begin{align}' , right: '\\end{align}', display: true, includeDelimiter: true},
    {left: '\\begin{align*}' , right: '\\end{align*}', display: true, includeDelimiter: true},
    {left: '\\begin{aligned}' , right: '\\end{aligned}', display: true, includeDelimiter: true},
    {left: '\\begin{alignat}' , right: '\\end{alignat}', display: true, includeDelimiter: true},
    {left: '\\begin{alignat*}' , right: '\\end{alignat*}', display: true, includeDelimiter: true},
    {left: '\\begin{alignedat}' , right: '\\end{alignedat}', display: true, includeDelimiter: true},
    {left: '\\begin{array}' , right: '\\end{array}', display: true, includeDelimiter: true},
    {left: '\\begin{bmatrix}' , right: '\\end{bmatrix}', display: true, includeDelimiter: true},
    {left: '\\begin{bmatrix*}' , right: '\\end{bmatrix*}', display: true, includeDelimiter: true},
    {left: '\\begin{Bmatrix}' , right: '\\end{Bmatrix}', display: true, includeDelimiter: true},
    {left: '\\begin{Bmatrix*}' , right: '\\end{Bmatrix*}', display: true, includeDelimiter: true},
    {left: '\\begin{cases}' , right: '\\end{cases}', display: true, includeDelimiter: true},
    {left: '\\begin{CD}' , right: '\\end{CD}', display: true, includeDelimiter: true},
    {left: '\\begin{darray}' , right: '\\end{darray}', display: true, includeDelimiter: true},
    {left: '\\begin{drcases}' , right: '\\end{drcases}', display: true, includeDelimiter: true},
    {left: '\\begin{equation}' , right: '\\end{equation}', display: true, includeDelimiter: true},
    {left: '\\begin{equation*}' , right: '\\end{equation*}', display: true, includeDelimiter: true},
    {left: '\\begin{gather}' , right: '\\end{gather}', display: true, includeDelimiter: true},
    {left: '\\begin{gathered}' , right: '\\end{gathered}', display: true, includeDelimiter: true},
    {left: '\\begin{matrix}' , right: '\\end{matrix}', display: true, includeDelimiter: true},
    {left: '\\begin{matrix*}' , right: '\\end{matrix*}', display: true, includeDelimiter: true},
    {left: '\\begin{pmatrix}' , right: '\\end{pmatrix}', display: true, includeDelimiter: true},
    {left: '\\begin{pmatrix*}' , right: '\\end{pmatrix*}', display: true, includeDelimiter: true},
    {left: '\\begin{rcases}' , right: '\\end{rcases}', display: true, includeDelimiter: true},
    {left: '\\begin{smallmatrix}' , right: '\\end{smallmatrix}', display: false, includeDelimiter: true}, //Take note that display is false on this one
    {left: '\\begin{split}' , right: '\\end{split}', display: true, includeDelimiter: true},
    {left: '\\begin{subarray}' , right: '\\end{subarray}', display: true, includeDelimiter: true},
    {left: '\\begin{Vmatrix}' , right: '\\end{Vmatrix}', display: true, includeDelimiter: true},
    {left: '\\begin{Vmatrix*}' , right: '\\end{Vmatrix*}', display: true, includeDelimiter: true},
    {left: '\\begin{vmatrix}' , right: '\\end{vmatrix}', display: true, includeDelimiter: true},
    {left: '\\begin{vmatrix*}' , right: '\\end{vmatrix*}', display: true, includeDelimiter: true},
]

const REGEX = buildRegex(DELIMITERS);

function buildRegex(delims) {
    const escape = string => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const expressions = delims.map( d => {
        const display = d.display ? '(?<d>)' : '';
        const exp = d.includeDelimiter ? `(?<tex>${escape(d.left)}.+?${escape(d.right)})${display}` : `${escape(d.left)}(?<tex>.+?)${escape(d.right)}${display}`;
        return exp;
    })

    return new RegExp(expressions.join('|'), 'gs');
}

function renderLatex(html) {
    html = html.replace(/<wbr>/gs, '').replace(/&nbsp;/gs, ' '); // fixes parsing of long expressions (GMAIL inserts <wbr> tags for some reason) & removes white spaces after delimiters
    const div = document.createElement('div');

    html = html.replace(REGEX, function() {
        const groups = arguments[arguments.length - 1];
        const display = groups.d !== undefined;
        div.innerHTML = groups.tex;
        return katex.renderToString(div.textContent, {throwOnError: false, displayMode: display, trust: true, strict: false})
    })

    return html;
}

function updateLatex(messageList, state) {
    messageList.forEach(message => {
        if (state === message.rendered) return;

        if (state && !message.rendered) {
            message.oldHTML = message.innerHTML;
            message.innerHTML = renderLatex(message.innerHTML);
            message.rendered = true;
        } else {
            message.oldHTML && (message.innerHTML = message.oldHTML);
            message.rendered = false;
        }
    });
}

// ===================================================================================================
// MESSAGES
// ===================================================================================================

let MESSAGES_TOGGLE = true;

function addMessageToggleButton() {
    const moveBtn = document.querySelector(selectors.moveButton);
    if (!moveBtn || moveBtn.parentElement.processed) return;

    const parent = moveBtn.parentElement;
    const latexButton = GM_addElement(parent, 'div', {
        id: 'latex_toggle_message_button',
        role: 'button',
        'data-tooltip': 'Toggle LaTeX',
    });

    const logoDiv = GM_addElement(latexButton, 'div', {
        class: 'asa',
        style: 'width: 20px; height: 20px; display: inline-flex; align-items: end',
    });

    logoDiv.innerHTML = katex.renderToString('\\footnotesize \\TeX', {throwOnError: false});

    latexButton.addEventListener('click', toggleMessages);
    latexButton.addEventListener('mouseover', () => latexButton.classList.add('T-I-JW'));
    latexButton.addEventListener('mouseout', () => latexButton.classList.remove('T-I-JW'));
    parent.processed = true;
}


function observeMessages() {
    const messageList = document.querySelector(selectors.messageList);
    if (!messageList) return;

    const itemObserver = new MutationObserver( () => {
        refreshMessages();
        processDrafts(messageList);
    });

    function _observe() {
        const messages = messageList.querySelectorAll('div[role=listitem]');
        messages.forEach( msg => itemObserver.observe(msg, {attributes: true, attributeFilter: ["aria-expanded", "class"]}) );
    }

    const listObserver = new MutationObserver(_observe);
    listObserver.observe(messageList, {childList: true});

    _observe();
}

function refreshMessages() {
    const list = document.querySelectorAll(selectors.messageBody);
    updateLatex(list, MESSAGES_TOGGLE);
}

function toggleMessages() {
    MESSAGES_TOGGLE = !MESSAGES_TOGGLE;
    refreshMessages();
}

// ===================================================================================================
// DRAFTS
// ===================================================================================================

function processDrafts(container) {
    const drafts = container.querySelectorAll(selectors.draftRegion);
    drafts.forEach( draft => {
        if (draft.processed) return;
        addDraftToggleButton(draft);
        addBanner(draft);
        attachSendListener(draft);
        draft.processed = true;
    })
}

function toggleDraft(draft) {
    const draftBody = draft.querySelector(selectors.draftBody);
    updateLatex([draftBody], !draftBody.rendered)
    draftBody.setAttribute('contenteditable', !draftBody.rendered);
    draft.bannerDiv.style.visibility = draftBody.rendered ? 'visible': 'hidden';
    draft.bannerDiv.style.marginBottom = draftBody.rendered ? '0px': '-30px';
}

function addDraftToggleButton(draft) {
    const buttonContainer = draft.querySelector(selectors.lockerButton);
    if (!buttonContainer) return;
    const button = GM_addElement(buttonContainer, 'div', {
        id: 'latex_toggle_draft_button',
        class: 'J-Z-I',
        role: 'button',
        'data-tooltip': 'Toggle LaTeX',
    });

    button.innerHTML = katex.renderToString('\\footnotesize \\TeX', {throwOnError: false});

    button.addEventListener('click', () => toggleDraft(draft));
    draft.addEventListener('keydown', draftShortcutHandler);
}

function addBanner(draft) {
    const parent = draft.querySelector('td:has(> form)');
    const bannerDiv = GM_addElement(document.body, 'div', {
        textContent: 'Disable LaTeX to edit draft',
        id: 'latex_draft_banner',
    });

    parent.insertBefore(bannerDiv, parent.children[parent.children.length - 1]);
    draft.bannerDiv = bannerDiv;
}

function attachSendListener(draft) {
    const draftBody = draft.querySelector(selectors.draftBody);
    const sendButton = draft.querySelector(selectors.sendButton);

    sendButton.addEventListener('click', () => updateLatex([draftBody], false), true);
}

function draftShortcutHandler(event) {
    if (event.ctrlKey && event.altKey && event.keyCode === 75) { //L
        toggleDraft(event.currentTarget);
    }

    if (!event.currentTarget.closest('div[role=dialog]')) return; // apply below shortcut to compose draft only (already exists for replies)

    if (event.ctrlKey && event.altKey && event.keyCode === 76) { // K
        toggleMessages();
    }
}

// ===================================================================================================
// UTILS
// ===================================================================================================

function waitForElement(queryString, interval=100, maxTries=100) {
    let count = 0;
    function findElement(resolve, reject) {
        count += 1;
        let waitElement = document.querySelector(queryString);
        if(waitElement) {
            resolve(waitElement);
        } else if(count > maxTries) {
            reject(`Couldn't find waitElement: ${queryString}.`);
        } else {
            setTimeout(() => findElement(resolve, reject), interval);
        }
    }

    return new Promise(findElement);
}


function addShortcuts() {
    const xpath = '//tr[th/text()="Formatting"]/following-sibling::tr';
    const msg_ShortcutHTML = '<tr><td class="wg Dn"><span class="wh">Ctrl</span> <span class="wb">+</span> <span class="wh">Alt</span> <span class="wb">+</span> <span class="wh">L</span> :</td><td class="we Dn">Toggle LaTeX (inbox)</td></tr>';
    const draft_ShortcutHTML = '<tr><td class="wg Dn"><span class="wh">Ctrl</span> <span class="wb">+</span> <span class="wh">Alt</span> <span class="wb">+</span> <span class="wh">K</span> :</td><td class="we Dn">Toggle LaTeX (draft)</td></tr>';

    document.addEventListener('keydown', (event) => {
        if (event.ctrlKey && event.altKey && event.keyCode === 76) { //'L'
            toggleMessages();
        } else if (event.shiftKey && event.keyCode === 191) { //'?'
            waitForElement(selectors.shortcutMenu, 5).then(d => {
                const row = document.evaluate(xpath, d, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                row.outerHTML = msg_ShortcutHTML + draft_ShortcutHTML;
            });
        }
    });
}

function addStyles() {
    GM_addElement('link', {
        rel: "stylesheet",
        href: "https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.css"
    });

    GM_addStyle(`
        .katex-display {
            max-width: 99%;
        }

        #\\:1 [role=list] > [role=listitem] {
            counter-reset: katexEqnNo;
        }

        #latex_toggle_message_button {
            cursor: pointer;
            margin: 0 16px 0 12px;
            color: var(--gm3-sys-color-on-surface);
        }

        #latex_toggle_draft_button {
            user-select: none;
            width: 20px;
            height: 20px;
            margin: 4px 16px 4px -4px;
            color: var(--gm3-sys-color-on-surface);
        }

        #latex_toggle_draft_button > .katex .base {
            display: flex;
        }

        #latex_draft_banner {
            visibility: hidden;
            background-color: rgb(255, 85, 85);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 5px 50px;
            position: sticky;
            bottom: 0;
            margin-bottom: -30px;
        }
    `);
}

// ===================================================================================================
// MAIN
// ===================================================================================================

function init() {
    const config = {attributes: false, childList: true};
    const observer = new MutationObserver( () => {
        addMessageToggleButton();
        refreshMessages();
        observeMessages();
        observeSplitView();
    });

    let splitViewFound = false;
    function observeSplitView() {
        if (splitViewFound) return;
        waitForElement(selectors.splitHalf).then( splitHalf => {
            observer.observe(splitHalf, config);
            splitViewFound = true;
        });
    }

    waitForElement(selectors.topBar).then( topbar => observer.observe(topbar, config));
    observeSplitView();

    waitForElement(selectors.draftsContainer).then(draftsContainer => {
        const observer = new MutationObserver( () => {
            processDrafts(draftsContainer);
        });
        observer.observe(draftsContainer, {childList: true});
    });
}

function main() {
    if (window.trustedTypes && window.trustedTypes.createPolicy && !window.trustedTypes.defaultPolicy) {
        window.trustedTypes.createPolicy('default', {
            createHTML: string => string
        });
    }

    addStyles();
    addShortcuts();
    GM_registerMenuCommand('Toggle LaTeX', toggleMessages);
    init();
}

main();

// Legal:
// This userscript, LaTeX for Gmail, is an independent project and is not affiliated with, endorsed, sponsored, or supported by Google LLC, Alphabet Inc., or any of their subsidiaries. The aforementioned entities are not responsible for any issues, damages, or consequences arising from the use of this userscript.
// By using this userscript, you acknowledge that you are doing so at your own risk and agree to hold Google LLC, Alphabet Inc., and their respective affiliates harmless from any claims, losses, or damages arising from your use of this userscript.
// Google LLC reserves the right to request that the distribution of this userscript be ceased, or that the userscript be altered, if it violates Google's terms of service, policies, or guidelines, or if it causes harm to Google's reputation, user experience, or data privacy.
// The MIT license under which this userscript is distributed can be viewed [here](https://github.com/LoganJFisher/LaTeX-for-Gmail/blob/main/LICENSE).
