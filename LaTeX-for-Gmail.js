// ==UserScript==
// @name        LaTeX for Gmail
// @namespace   Violentmonkey Scripts
// @match       https://mail.google.com/mail/*
// @grant       GM_registerMenuCommand
// @grant       GM_addElement
// @require     https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js
// @version     4.1.8 //First number for major changes, second for minor functionality improvements, third for bug fixes.
// @author      Logan J. Fisher & GTK & MistralMireille
// @description Adds a button to Gmail which toggles LaTeX rendering using traditional LaTeX and TeXTheWorld delimiters
// @downloadURL https://raw.githubusercontent.com/LoganJFisher/LaTeX-for-Gmail/refs/heads/main/LaTeX-for-Gmail.js
// @updateURL https://raw.githubusercontent.com/LoganJFisher/LaTeX-for-Gmail/refs/heads/main/LaTeX-for-Gmail.js
// @noframes
// ==/UserScript==

/* globals katex */

let LATEX_TOGGLE_STATE = true;

const DISPLAY_DELIMS = ['[(; ... ;)]', '$$ ... $$', '\\[ ... \\]', '\\begin{equation} ... \\end{equation}', '\\begin{displaymath} ... \\end{displaymath}'];
const INLINE_DELIMS = ['[; ... ;]', '$ ... $', '\\( ... \\)', '\\begin{math} ... \\end{math}'];

const DISPLAY_REGEX = buildRegex(DISPLAY_DELIMS);
const INLINE_REGEX = buildRegex(INLINE_DELIMS);

function buildRegex(delims) {
    const escape = string => string.replace(/[${}()[\]\\]/g, '\\$&');
    const start = delims.map( d => escape(d.split('...')[0].trim()) );
    const end = delims.map( d => escape(d.split('...')[1].trim()) );

    return new RegExp(`(${start.join('|')})(.+?)(${end.join('|')})`, 'gs');
}


function renderLatex(html) {
    const katexReplaceList = [
        [DISPLAY_REGEX, true],
        [INLINE_REGEX, false],
    ];

    html = html.replaceAll('<wbr>', ''); // fixes parsing of long expressions (GMAIL inserts <wbr> tags for some reason)
    const div = document.createElement('div');
    katexReplaceList.forEach( ([regex, display]) => {
        html = html.replace(regex, (m, p1, p2) => {
            div.innerHTML = p2;
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


waitForElement("div#\\:3").then(messagesDiv => {
    GM_registerMenuCommand('Toggle LaTeX', toggleLatex);
    messagesDiv.addEventListener('click', refreshLatex);
});

waitForElement("div#\\:4").then(topbar => {
    const observer = new MutationObserver( () => { refreshLatex(); addButton() });
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