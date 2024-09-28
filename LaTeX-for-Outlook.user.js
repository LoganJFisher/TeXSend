// ==UserScript==
// @name        LaTeX for Outlook
// @namespace   Violentmonkey Scripts
// @match       https://outlook.live.com/mail/*
// @grant       GM_registerMenuCommand
// @grant       GM_addElement
// @require     https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js
// @version     0.0.3
// @author      -
// @description -
// ==/UserScript==

/* globals katex */

GM_addElement('link', {
  rel: "stylesheet",
  src: "https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.css"
});

GM_registerMenuCommand('Render Latex', () => {
  let messageTextElements = document.querySelectorAll("div[dir='ltr'] div");
  messageTextElements.forEach(messageText => {
    messageText.innerHTML = messageText.innerHTML.replace(/\[;(.+?);\]/g, (match, p1) => {
      return katex.renderToString(p1, { throwOnError: false, output: "mathml", displayMode: false });
    });
    messageText.innerHTML = messageText.innerHTML.replace(/\[\(;(.+?);\)\]/g, (match, p1) => {
      return katex.renderToString(p1, { throwOnError: false, output: "mathml", displayMode: true });
    });
    messageText.innerHTML = messageText.innerHTML.replace(/\\\((.+?)\\\)/g, (match, p1) => {
      return katex.renderToString(p1, { throwOnError: false, output: "mathml", displayMode: false });
    });
    messageText.innerHTML = messageText.innerHTML.replace(/\\\[(.+?)\\\]/g, (match, p1) => {
      return katex.renderToString(p1, { throwOnError: false, output: "mathml", displayMode: true });
    });
    //messageText.innerHTML = messageText.innerHTML.replace(/\\begin\{displaymath}(.+?)\\end\{displaymath}/g, (match, p1) => {
      //return katex.renderToString(p1, { throwOnError: false, output: "mathml", displayMode: true });
    //});
    //messageText.innerHTML = messageText.innerHTML.replace(/\\begin\{equation}(.+?)\\end\{equation}/g, (match, p1) => {
      //return katex.renderToString(p1, { throwOnError: false, output: "mathml", displayMode: true });
    //});
    //messageText.innerHTML = messageText.innerHTML.replace(/\\begin\{math}(.+?)\\end\{math}/g, (match, p1) => {
      //return katex.renderToString(p1, { throwOnError: false, output: "mathml", displayMode: false });
    //});
  });
});

// This userscript is currently extremely limited and should not be considered ready for general use.
// It allows for compiling of math inside [;...;] [(;...;)] \(...\) and \[...\] delimiters.
// It must be triggered via the browser extension's menu, and that exclusively turns it "on" - it is not a toggle.
