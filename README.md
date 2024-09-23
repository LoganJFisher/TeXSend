## This userscript adds a "TeX" button to the action bar at the top of an open email on https://mail.google.com. When clicked, this causes TeX code within a list of accepted delimiters to toggle between rendered and plaintext states.

Standard equation elements, matrices, and arrays are all supported. All must be inside of the below-listed "accepted delimiters" to function.

It should be noted that this does not change the actual content of the email in any way. As such, the render is only on your end. The recipient of an email will also need to be running this userscript in order to render on their end.

---
### Installation Guide:

This requires the use of browser script manager. Violentmonkey is recommended, but other options should also be compatible.
* [Chrome](https://chromewebstore.google.com/detail/violentmonkey/jinjaccalgkegednnccohejagnlnfdag)
* [Firefox](https://addons.mozilla.org/en-US/firefox/addon/violentmonkey/)
* [Edge](https://microsoftedge.microsoft.com/addons/detail/violentmonkey/eeagobfjdenkkddmbclomhiblgggliao)
* This userscript should also be compatible with all other browsers, including Safari, Opera, etc.

Once you have a browser script manager extension installed on your browser:
* Click [this link](https://github.com/LoganJFisher/LaTeX-for-Gmail/blob/main/LaTeX-for-Gmail.user.js).
* Click "Raw" in the upper-right corner of the code window. This will open a new tab.
* On the new tab, click "Install" (on the left for Violentmonkey).
* Congratulations - you have successfully installed this userscript. Refresh any open Gmail tabs to use it.

---
### Use Guide:

All LaTeX code must be placed inside of delimiters. See example below.

**Accepted delimiters include:**
* Inline mode:
  * [; ... ;]
  * $ ... $
  * \\( ... \\)
  * \begin{math} ... \end{math}
* Display mode:
  * [(; ... ;)]
  * $$ ... $$ 
  * \\[ ... \\]
  * \begin{displaymath} ... \end{displaymath}
  * \begin{equation} ... \end{equation}
 
 ![Example of LaTeX for Gmail in action](https://i.imgur.com/DSrchz7.png)
 
 ---

**If you would like to contribute, these fixes & additions are the current priorities (but suggestions are welcome):**
* Bugs:
  * $ needs to be escaped by backslash inside of math environments
    * e.g. \\[\\$100\\] currently renders as "100\100" (for some reason) instead of as "$100"
  * Mismatched matrix delimiters
    * e.g. \begin{pmatrix} ... \end{bmatrix} does not work. This is probably actually a KaTeX bug.
* Features:
  * Packages - Introducing LaTeX packages that allow for special formatting and characters beyond what is already available.
    * TikZ
      * A specific package meant for drawing diagrams - probably rather challenging to implement
---

Special thanks to the [KaTeX organization](https://katex.org/) - without which, this would not be possible.
