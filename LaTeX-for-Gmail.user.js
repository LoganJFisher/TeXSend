// ==UserScript==
// @name            LaTeX for Gmail
// @version         4.3.6
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
// @require         https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js
// ==/UserScript==

/* globals katex */

let LATEX_TOGGLE_STATE = true;

const DISPLAY_DELIMS = ['[(; ... ;)]', '$$ ... $$', '\\[ ... \\]', '\\begin{equation} ... \\end{equation}', '\\begin{displaymath} ... \\end{displaymath}'];
const INLINE_DELIMS = ['[; ... ;]', '$ ... $', '\\( ... \\)', '\\begin{math} ... \\end{math}'];

const DISPLAY_REGEX = buildRegex(DISPLAY_DELIMS);
const INLINE_REGEX = buildRegex(INLINE_DELIMS);

function buildRegex(delims) {
    const escape = string => string.replace(/[${}()[\]\\]/g, '\\$&');
    const exp = delims.map( d => {
        const [start, end] = d.split('...');
        return String.raw`(?<!\\)${escape(start.trim())}(?<tex>.+?)(?<!\\)${escape(end.trim())}`;
    })

    return new RegExp(exp.join('|'), 'gs');
}


function renderLatex(html) {
    const katexReplaceList = [
        [DISPLAY_REGEX, true],
        [INLINE_REGEX, false],
    ];

    html = html.replace(/<wbr>|&nbsp;/gs, ''); // fixes parsing of long expressions (GMAIL inserts <wbr> tags for some reason) & removes white spaces after delimiters
    const div = document.createElement('div');
    katexReplaceList.forEach( ([regex, display]) => {
        html = html.replace(regex, function() {
            div.innerHTML = arguments[arguments.length - 1].tex;
            return katex.renderToString(div.textContent, {throwOnError: false, output: "mathml", displayMode: display})
        });
    });

    return html;
}

function refreshLatex(){
    const messages = document.querySelectorAll("#\\:1 [role=list] > [role=listitem][aria-expanded=true]");
    messages.forEach(message => {
        let subportion = message.querySelector("[data-message-id] > div > div > div[id^=':'][jslog]");
        message = subportion || message;
        message.oldHTML = message.oldHTML || message.innerHTML;

        message.innerHTML = LATEX_TOGGLE_STATE ? renderLatex(message.innerHTML) : message.oldHTML;
    });
}

function toggleLatex() {
    LATEX_TOGGLE_STATE = !LATEX_TOGGLE_STATE;
    refreshLatex();
}

function waitForElement(queryString) {
    let count = 0;
    return new Promise((resolve, reject) => {
        let findInterval = setInterval(() => {
            let waitElement = document.querySelector(queryString);
            if(waitElement) {
                clearInterval(findInterval);
                resolve(waitElement);
            } else if(count > 100) {
                clearInterval(findInterval);
                reject(`Couldn't find waitElement: ${queryString}.`);
            } else {
                count += 1;
            }
        }, 100);
    });
}


function observeMessages() {
    const messageList = document.querySelector("#\\:1 div[role=list]");
    if (!messageList) return;

    const messages = messageList.querySelectorAll('div[role=listitem]');
    const observer = new MutationObserver(refreshLatex);
    messages.forEach( msg => observer.observe(msg, {attributes: true, attributeFilter: ["aria-expanded"]}) );
}


waitForElement("div#\\:4").then(topbar => {
    GM_registerMenuCommand('Toggle LaTeX', toggleLatex);
    const observer = new MutationObserver( () => {
        refreshLatex();
        addButton();
        observeMessages();
    });
    observer.observe(topbar, {attributes: false, childList: true, subtree: false});
});


function addButton() {
    const moveBtn = document.querySelector('div#\\:4 div[title="Move to"]');
    if (!moveBtn) return;

    GM_addElement(moveBtn.parentElement, 'div', {
        id: 'LatexButton',
        role: 'button',
        style: 'cursor: pointer; margin: 0 12px 0 12px; color: var(--gm3-sys-color-on-surface)',
        'aria-label': 'Toggle LaTeX',
        'data-tooltip': 'Toggle LaTeX',
        textContent: 'TeX'
    });

    const latexButton = document.querySelector('#LatexButton');
    latexButton.addEventListener('click', toggleLatex);
}

if (window.trustedTypes && window.trustedTypes.createPolicy && !window.trustedTypes.defaultPolicy) {
    window.trustedTypes.createPolicy('default', {
        createHTML: string => string
    });
}

GM_addElement('link', {
    rel: "stylesheet",
    src: "https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.css"
});
