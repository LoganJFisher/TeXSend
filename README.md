## This userscript adds a "TeX" button to the action bar at the top of an open email on https://mail.google.com. When clicked, this causes TeX code within a list of accepted delimiters to toggle between rendered and plaintext states.

Standard equation elements, matrices, and arrays are all supported. All must be inside of the below-listed "accepted delimiters" to function.

It should be noted that this does not change the actual content of the email in any way. As such, the render is only on your end. The recipient of an email will also need to be running this userscript in order to render on their end.

---
### Installation Guide:

This requires the use of browser script manager. Violentmonkey is recommended, but other options should also be compatible.
* [Chrome](https://chromewebstore.google.com/detail/violentmonkey/jinjaccalgkegednnccohejagnlnfdag)
* [Firefox](https://addons.mozilla.org/en-US/firefox/addon/violentmonkey/)
* [Edge](https://microsoftedge.microsoft.com/addons/detail/violentmonkey/eeagobfjdenkkddmbclomhiblgggliao)
* [Opera](https://github.com/OpenUserJs/OpenUserJS.org/wiki/Violentmonkey-for-Opera)
* [Safari](https://apps.apple.com/us/app/meddlemonkey/id1539631953?mt=12) (MeddleMonkey is a fork of Violentmonkey)

Once you have a browser script manager extension installed on your browser:
* Click [this link](https://github.com/LoganJFisher/LaTeX-for-Gmail/blob/main/LaTeX-for-Gmail.user.js).
* Click "Raw" in the upper-right corner of the code window. This will open a new tab.
* On the new tab, click "Install" (on the left for Violentmonkey).
* Congratulations - you have successfully installed this userscript. Refresh any open Gmail tabs to use it.

---
### Use Guide:

This userscript currently only works when Gmail is in "no split" mode (default).

This userscript currently only works for emails that have been sent or received, not simply drafted.

All LaTeX code must be placed inside of math delimiters. This also applies to matrices and arrays.

**Accepted math delimiters include:**
* Inline mode:
  * [; ... ;] --- TeXTheWorld delimiter
  * \\( ... \\)
  * \begin{math} ... \end{math}
* Display mode:
  * [(; ... ;)] --- TeXTheWorld delimite
  * \\[ ... \\]
  * \begin{displaymath} ... \end{displaymath}
  * \begin{equation} ... \end{equation}
 
 Note: $ and $$ delimiters were previously accepted, but were removed due to presenting various issues. They're considered poor practice in using LaTeX anyway.
 
 ![Example of LaTeX for Gmail in action](https://i.imgur.com/OWW4g6k.png)
 
 ---

**If you would like to contribute, these fixes & additions are the current priorities (but suggestions are welcome):**
* Bugs:
  * \begin{equation} doesn't produce equation numeration
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
