## This userscript adds a "TeX" button to the action bar at the top of an open email on https://mail.google.com. When clicked, this causes TeX code within a list of accepted delimiters to toggle between rendered and plaintext states.

Standard equation elements, matrices, and arrays are all fully supported.

It should be noted that the render is only on your end. The recipient of an email will also need to be running this userscript in order to render on their end.

---
### Installation Guide:

This requires the use of browser script manager. I recommend Violentmonkey, but other options should also be compatible.
* [Chrome](https://chromewebstore.google.com/detail/violentmonkey/jinjaccalgkegednnccohejagnlnfdag)
* [Firefox](https://addons.mozilla.org/en-US/firefox/addon/violentmonkey/)
* [Edge](https://microsoftedge.microsoft.com/addons/detail/violentmonkey/eeagobfjdenkkddmbclomhiblgggliao)
* This userscript should also be compatible with all other browsers, including Safari, Opera, Explorer, etc.

Once you have a browser script manager extension installed on your browser:
* Click the puzzle-piece icon in the top right of your browser to see the list of your installed browser extensions.
* Find the one for the browser extension you installed, and click it - from here the instructions will vary by your choice of extension, but I will instruct based on the choice of Violentmonkey. It should be similar for all other choices too.
* A small window will appear - click on the "+" icon in it. This will open a new tab in your browser.
* New return to this Github repository and click the "LaTeX-for-Gmail" object betweeen "LICENSE" and "README.md".
* This will bring you to a page that shows the userscript's code. Copy the code.
* Return to the tab opened by your browser extension, highlight all of the text already there, and paste from your clipboard over it.
* Click "save" in the top right.
* Congratulations - you have successfully installed this userscript. Refresh any open Gmail tabs to use it.

---
### Use Guide:

**Accepted delimiters include:**
* Inline mode:
  * [; ... ;]
  * $ ... $
  * \( ... \)
  * \begin{math} ... \end{math}
* Display mode:
  * [(; ... ;)]
  * $$ ... $$ 
  * \[ ... \]
  * \begin{displaymath} ... \end{displaymath}
  * \begin{equation} ... \end{equation}
 
 ---

**If you would like to contribute, I'm currently hoping to add these features:**
* Improve compatibility with long math arguments
* Packages
* TikZ
---

I would like to extend thanks to the [KaTeX organization](https://katex.org/) - without which, this would not be possible.
