## This userscript adds a "TeX" button to the action bar at the top of an open email on Gmail. When clicked, this causes LaTeX code to toggle between compiled and plain text states.

Almost everything that is on the [KaTeX Support Table](https://katex.org/docs/support_table) is supported by this userscript. That includes all standard equation elements, matrices, arrays, and lots more.
The only exceptions require `trust` to be enabled (planned) or `strict` to be disabled (planned).

> [!IMPORTANT]
> This does not change the actual content of the email in any way. As such, the compiled LaTeX is only on your end. The recipient of an email will also need to be running this userscript in order to compile on their end.

> [!WARNING]
> This does not currently support email drafts or split views.


---
<details>
<summary>:wrench: Installation Guide:</summary>

This requires the use of a browser script manager. Violentmonkey is recommended, but other options should also be compatible.
* [Chrome](https://chromewebstore.google.com/detail/violentmonkey/jinjaccalgkegednnccohejagnlnfdag)
* [Firefox](https://addons.mozilla.org/en-US/firefox/addon/violentmonkey/)
* [Edge](https://microsoftedge.microsoft.com/addons/detail/violentmonkey/eeagobfjdenkkddmbclomhiblgggliao)
* [Opera](https://github.com/OpenUserJs/OpenUserJS.org/wiki/Violentmonkey-for-Opera)
* [Safari](https://apps.apple.com/us/app/meddlemonkey/id1539631953?mt=12)

Once you have a browser script manager extension installed on your browser:
* Click [this link](https://github.com/LoganJFisher/LaTeX-for-Gmail/raw/refs/heads/main/LaTeX-for-Gmail.user.js)
* On the new tab, click "Install" (on the left for Violentmonkey)
* Refresh any open Gmail tabs
</details>


---
<details>
<summary>:writing_hand: Use Guide:</summary>

LaTeX code is compiled automatically upon opening an email or expanding an email in a chain. To toggle it off (or back on), click the $\TeX$ button on the action bar at the top of the email.

$~~~~$:accessibility: Shift+L also works as a shortcut to toggle TeX compiling.

[KaTeX-supported environments](https://katex.org/docs/support_table) (i.e. anything on their list which starts with `\begin`) (e.g. `\begin{bmatrix}` and `\begin{array}`) can be called at any place in an email. In addition to these, a set of additional delimiters have been added to allow you to create inline and display math environments with ease.

$~~~~$**Accepted math environment delimiters include:**
* Inline mode:
  * `[; ... ;]` <!-- This is from "TeXTheWorld" and "Mathjax for Reddit" -->
  * `\( ... \)`
  * `\begin{math} ... \end{math}`
* Display mode:
  * `[(; ... ;)]` <!-- This is from "TeXTheWorld" and "Mathjax for Reddit" -->
  * `\[ ... \]`
  * `\begin{displaymath} ... \end{displaymath}`
  * `\begin{equation} ... \end{equation}` — *Numerated*

:bulb: Use `\displaystyle` inside inline delimiters to compile as display mode with line breaks. Example: `\(\displaystyle E=mc^{2}\)`
 
![Example of LaTeX for Gmail in action](https://i.imgur.com/zEIsQeL.png)
</details>

 
 ---
<details>
<summary>:gear: Development:</summary>

**If you would like to contribute, these fixes & additions are the current priorities (but suggestions are welcome):**
* :bug: Bugs:
  * None known at this time! :smile:
* :gem: Features:
  * Support for email drafting
  * Support for Gmail vertical split and horizontal split modes
  * Add descriptive comments to the userscript to accomodate code reviews and user edits
  * Enable [trust option](https://katex.org/docs/options) to allow use of `\href`, `\includegraphics`, and `\url`
  * Disable [strict option](https://katex.org/docs/options) to allow more flexible LaTeX and use of `\htmlClass`, `\htmlData`, `\htmlId`, and `\htmlStyle` (all also require enabling trust option)
  * Add "Shift+L" to Gmail's "Shift+?" shortcuts list
  * Incorporate [LaTeX.js](https://latex.js.org/)
    * This has been toyed with, but only partial support with lots of issues was achieved.
      * It seems the ideal would be to still use KaTeX for math environments due to superior handling there, but LaTeX.js for everything else.
    * Packages - Introducing LaTeX packages that allow for special formatting and characters beyond what is already available.
      * Particularly, TikZ would be pretty neat
</details>


---
Special thanks to the [KaTeX organization](https://katex.org/) - without which, this would not be possible.
