// ==UserScript==
// @name            LaTeX for Gmail
// @version         5.6.0
// @description     Adds a button to Gmail which toggles LaTeX rendering using traditional LaTeX and TeXTheWorld delimiters
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

let LATEX_TOGGLE_STATE = true;

const selectors = {
    topBar: 'div#\\:4',
    moveButton: 'div#\\:4 div[title="Move to"]',
    messageList: '#\\:1 div[role=list]',
    messageBody: '#\\:1 [role=list] > [role=listitem] [data-message-id] > div > div > div[id^=":"][jslog]',
    draftBody: 'div[aria-label="Message Body"]',
    sendButton: 'div[role=button][aria-label^=Send]',
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
        return katex.renderToString(div.textContent, {throwOnError: false, displayMode: display})
    })

    return html;
}

function refreshLatex(){
    const messages = document.querySelectorAll( [selectors.messageBody, selectors.draftBody].join(',') );
    messages.forEach(message => {
        if (LATEX_TOGGLE_STATE === message.rendered) return;

        if (LATEX_TOGGLE_STATE && !message.rendered) {
            message.oldHTML = message.innerHTML;
            message.innerHTML = renderLatex(message.innerHTML);
            message.rendered = true;
        } else {
            message.oldHTML && (message.innerHTML = message.oldHTML);
            message.rendered = false;
        }
    });
}

function toggleLatex() {
    LATEX_TOGGLE_STATE = !LATEX_TOGGLE_STATE;
    refreshLatex();

    const sendButton = document.querySelector(selectors.sendButton);
    sendButton && sendButton.addEventListener('click', beforeSend, true);
}

function beforeSend(e) {
    // make sure we are sending the plain text not HTML;
    const draft = e.currentTarget.closest('table').parentElement.closest('table').querySelector(selectors.draftBody);
    draft && draft.rendered && (draft.innerHTML = draft.oldHTML);
}


function observeMessages() {
    const messageList = document.querySelector(selectors.messageList);
    if (!messageList) return;

    const messages = messageList.querySelectorAll('div[role=listitem]');
    const observer = new MutationObserver(refreshLatex);
    messages.forEach( msg => observer.observe(msg, {attributes: true, attributeFilter: ["aria-expanded"]}) );
}

function addButton() {
    const moveBtn = document.querySelector(selectors.moveButton);
    if (!moveBtn) return;

    const latexButton = GM_addElement(moveBtn.parentElement, 'div', {
        id: 'LatexButton',
        role: 'button',
        'data-tooltip': 'Toggle LaTeX',
        style: 'cursor: pointer; margin: 0 16px 0 12px; color: var(--gm3-sys-color-on-surface);'
    });

    const logoDiv = GM_addElement(latexButton, 'div', {
        class: 'asa',
        style: 'width: 20px; height: 20px; display: inline-flex; align-items: end',
    });

    logoDiv.innerHTML = katex.renderToString('\\footnotesize \\TeX', {throwOnError: false});

    latexButton.addEventListener('click', toggleLatex);
    latexButton.addEventListener('mouseover', () => latexButton.classList.add('T-I-JW'));
    latexButton.addEventListener('mouseout', () => latexButton.classList.remove('T-I-JW'));
}

function waitForElement(queryString, interval=100, maxTries=100) {
    let count = 0;
    return new Promise((resolve, reject) => {
        let findInterval = setInterval(() => {
            let waitElement = document.querySelector(queryString);
            if(waitElement) {
                clearInterval(findInterval);
                resolve(waitElement);
            } else if(count > maxTries) {
                clearInterval(findInterval);
                reject(`Couldn't find waitElement: ${queryString}.`);
            } else {
                count += 1;
            }
        }, interval);
    });
}


function addShortcuts() {
    const keyHandler = (e) => {
        if (e.shiftKey && e.code === 'KeyL') {
            toggleLatex()
        } else if (e.shiftKey && e.code === 'Slash') {
            waitForElement('body > div.wa:not(.aou) > div[role=alert]', 5).then(d => {
                const xpath = '//tr[th/text()="Formatting"]/following-sibling::tr';
                const row = document.evaluate(xpath, d, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                const html = '<td class="wg Dn"><span class="wh">Shift</span> <span class="wb">+</span> <span class="wh">L</span> :</td><td class="we Dn">Toggle LaTeX</td>';
                row.innerHTML = html;
            });
        }
    }

    window.addEventListener('keypress', keyHandler);
}

function main() {
    if (window.trustedTypes && window.trustedTypes.createPolicy && !window.trustedTypes.defaultPolicy) {
        window.trustedTypes.createPolicy('default', {
            createHTML: string => string
        });
    }

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
    `);

    addShortcuts();

    waitForElement(selectors.topBar).then(topbar => {
        GM_registerMenuCommand('Toggle LaTeX', toggleLatex);
        const observer = new MutationObserver( () => {
            addButton();
            refreshLatex();
            observeMessages();
        });
        observer.observe(topbar, {attributes: false, childList: true, subtree: false});
    });
}

main();

// Legal:
// This userscript, LaTeX for Gmail, is an independent project and is not affiliated with, endorsed, sponsored, or supported by Google LLC, Alphabet Inc., or any of their subsidiaries. The aforementioned entities are not responsible for any issues, damages, or consequences arising from the use of this userscript.
// By using this userscript, you acknowledge that you are doing so at your own risk and agree to hold Google LLC, Alphabet Inc., and their respective affiliates harmless from any claims, losses, or damages arising from your use of this userscript.
// Google LLC reserves the right to request that the distribution of this userscript be ceased, or that the userscript be altered, if it violates Google's terms of service, policies, or guidelines, or if it causes harm to Google's reputation, user experience, or data privacy.
// The MIT license under which this userscript is distributed can be viewed [here](https://github.com/LoganJFisher/LaTeX-for-Gmail/blob/main/LICENSE).
