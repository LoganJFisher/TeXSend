// ==UserScript==
// @name            LaTeX for Gmail
// @version         4.4.1
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

const selectors = {
    topBar: 'div#\\:4',
    moveButton: 'div#\\:4 div[title="Move to"]',
    messageList: '#\\:1 div[role=list]',
    messageBody: '#\\:1 [role=list] > [role=listitem][aria-expanded=true] [data-message-id] > div > div > div[id^=":"][jslog]',
}

const DELIMITERS = [
    {left: '[(;' , right: ';)]' , display: true, includeDelimiter: false},
    {left: '\\[' , right: '\\]' , display: true, includeDelimiter: false},
    {left: '\\begin{displaymath}' , right: '\\end{displaymath}' , display: true, includeDelimiter: false},
    {left: '\\begin{equation}' , right: '\\end{equation}', display: true, includeDelimiter: true},

    {left: '[;' , right: ';]' , display: false, includeDelimiter: false},
    {left: '\\(' , right: '\\)' , display: false, includeDelimiter: false},
    {left: '\\begin{math}' , right: '\\end{math}', display: false, includeDelimiter: false},
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
    html = html.replace(/<wbr>|&nbsp;/gs, ''); // fixes parsing of long expressions (GMAIL inserts <wbr> tags for some reason) & removes white spaces after delimiters
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
    const messages = document.querySelectorAll(selectors.messageBody);
    messages.forEach(message => {
        message.oldHTML = message.oldHTML || message.innerHTML;
        message.cachedLatex = message.cachedLatex || renderLatex(message.innerHTML);

        message.innerHTML = LATEX_TOGGLE_STATE ? message.cachedLatex : message.oldHTML;
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
    const messageList = document.querySelector(selectors.messageList);
    if (!messageList) return;

    const messages = messageList.querySelectorAll('div[role=listitem]');
    const observer = new MutationObserver(refreshLatex);
    messages.forEach( msg => observer.observe(msg, {attributes: true, attributeFilter: ["aria-expanded"]}) );
}

function addButton() {
    const moveBtn = document.querySelector(selectors.moveButton);
    if (!moveBtn) return;

    GM_addElement(moveBtn.parentElement, 'div', {
        id: 'LatexButton',
        role: 'button',
        style: 'cursor: pointer; margin: 0 12px 0 12px; color: var(--gm3-sys-color-on-surface);',
        'aria-label': 'Toggle LaTeX',
        'data-tooltip': 'Toggle LaTeX',
        textContent: 'TeX'
    });

    const latexButton = document.querySelector('#LatexButton');
    latexButton.addEventListener('click', toggleLatex);
    //latexButton.innerHTML = katex.renderToString('\\footnotesize \\TeX', {throwOnError: false});
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
