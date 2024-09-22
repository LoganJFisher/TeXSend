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
* Click [this link](https://github.com/LoganJFisher/LaTeX-for-Gmail/blob/main/LaTeX-for-Gmail.user.js).
* Click "Raw" in the upper-right corner of the code window. This will open a new tab.
* On the new tab, click "Install" (on the left for Violentmonkey).
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

**If you would like to contribute, I'm currently hoping to make these additions & fixes:**
* Highlighting bug - [With this userscript running, users can click/drag to highlight text in an email to copy, but the highlight disappears upon release.]
* Packages - [Introducing LaTeX packages that allow for special formatting and characters beyond what is already available.]
 * TikZ - [A specific package meant for drawing diagrams - probably more challenging to implement than most]
---

I would like to extend thanks to the [KaTeX organization](https://katex.org/) - without which, this would not be possible.
