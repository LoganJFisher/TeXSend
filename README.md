## This userscript adds a "TeX" button to the action bar at the top of an open email on https://mail.google.com. When clicked, this causes TeX code within a list of accepted delimiters to toggle between rendered and plaintext states.

Standard equation elements, matrices, and arrays are all supported. All must be inside of the below-listed "accepted delimiters" to function.

It should be noted that this does not change the actual content of the email in any way. As such, the render is only on your end. The recipient of an email will also need to be running this userscript in order to render on their end. Also, there is currently only support for emails that have actually been sent or received - not simply drafted.

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

All LaTeX code must be placed inside of math delimiters. This also applies to matrices and arrays.

**Accepted math delimiters include:**
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
  * When $ is escaped by a \ to avoid creating a math environment, the \ should disappear.
    * e.g. "\\$100 and \\$200" doesn't render (nor should it), but the \ in front of each $ should disappear.
  * Mismatched matrix delimiters
    * e.g. \begin{pmatrix} ... \end{bmatrix} does not work. This is probably actually a KaTeX bug.
* Features:
  * Support for email drafting
  * Packages - Introducing LaTeX packages that allow for special formatting and characters beyond what is already available.
    * TikZ
      * A specific package meant for drawing diagrams - probably rather challenging to implement
  * Replace KaTeX with [LaTeX.js](https://latex.js.org/)
    * This has been toyed with, but only partial support inferior to what KaTeX is able to provide was achieved.
    * If full support is possible, it would be a major upgrade to the functionality offered by this userscript.
---

Special thanks to the [KaTeX organization](https://katex.org/) - without which, this would not be possible.
