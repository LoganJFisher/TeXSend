## This userscript adds a "TeX" button to the action bar at the top of an open email on https://mail.google.com. When clicked, this causes TeX code to toggle between compiled and plaintext states.

Everything that is on the [KaTeX Support Table](https://katex.org/docs/support_table) is supported by this userscript. That includes all standard equation elements, matrices, arrays, and lots more.

It should be noted that this does not change the actual content of the email in any way. As such, the render is only on your end. The recipient of an email will also need to be running this userscript in order to compile on their end.

---
### Installation Guide:

This requires the use of a browser script manager. Violentmonkey is recommended, but other options should also be compatible.
* [Chrome](https://chromewebstore.google.com/detail/violentmonkey/jinjaccalgkegednnccohejagnlnfdag)
* [Firefox](https://addons.mozilla.org/en-US/firefox/addon/violentmonkey/)
* [Edge](https://microsoftedge.microsoft.com/addons/detail/violentmonkey/eeagobfjdenkkddmbclomhiblgggliao)
* [Opera](https://github.com/OpenUserJs/OpenUserJS.org/wiki/Violentmonkey-for-Opera)
* [Safari](https://apps.apple.com/us/app/meddlemonkey/id1539631953?mt=12)

Once you have a browser script manager extension installed on your browser:
* Click [this link](https://github.com/LoganJFisher/LaTeX-for-Gmail/blob/main/LaTeX-for-Gmail.user.js).
* Click "Raw" in the upper-right corner of the code window. This will open a new tab.
* On the new tab, click "Install" (on the left for Violentmonkey).
* Congratulations - you have successfully installed this userscript. Refresh any open Gmail tabs to use it.

---
### Use Guide:

This userscript currently only works when Gmail is in "no split" mode (default).

This userscript currently only works for emails that have been sent or received, not simply drafted.

[KaTeX-supported environments](https://katex.org/docs/support_table) (i.e. anything that starts "\begin") (e.g. \begin{bmatrix} and \begin{array}) can be called at any place in an email. In addition to these, a set of additional delimiters have been added to allow you to create inline and display math environments with ease.

**Accepted math environment delimiters include:**
* Inline mode:
  * [; ... ;]
  * \\( ... \\)
  * \begin{math} ... \end{math}
* Display mode:
  * [(; ... ;)]
  * \\[ ... \\]
  * \begin{displaymath} ... \end{displaymath}
  * \begin{equation} ... \end{equation} ||| *Numerated*
 
 ![Example of LaTeX for Gmail in action](https://i.imgur.com/L1xCUIL.png)
 
 ---

**If you would like to contribute, these fixes & additions are the current priorities (but suggestions are welcome):**
* Bugs:
  * Equation numeration carries between emails in a chain, but excludes minimized emails
  * We can make the button the actual TeX logo, but it appears a bit lower than it should
  * Button has no mouse hover shadow
* Features:
  * Support for email drafting
  * Support for Gmail vertical split and horizontal split modes
  * Incorporate [LaTeX.js](https://latex.js.org/)
    * This has been toyed with, but only partial support with lots of issues was achieved.
      * It seems the ideal would be to still use KaTeX for math environments due to superior handling there, but LaTeX.js for everything else.
    * Packages - Introducing LaTeX packages that allow for special formatting and characters beyond what is already available.
      * Particularly, TikZ would be pretty neat
---

Special thanks to the [KaTeX organization](https://katex.org/) - without which, this would not be possible.
