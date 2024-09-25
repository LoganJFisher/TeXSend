## This userscript adds a "TeX" button to the action bar at the top of an open email on Gmail. When clicked, this causes LaTeX code to toggle between compiled and plain text states.

Almost everything that is on the [KaTeX Support Table](https://katex.org/docs/support_table) is supported by this userscript. That includes all standard equation elements, matrices, arrays, and lots more.
The only exceptions require `trust` to be enabled (planned) or `strict` to be disabled (planned).

> [!IMPORTANT]
> * This does not change the content of emails in any way. Email recipients will also need to run this userscript to compile on their end.<br>
> * The compiling is performed entirely locally - the content of emails is not transmitted to any server by this userscript.

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

:bulb: Use `\displaystyle` inside inline delimiters to compile as display mode with line breaks. <br>
$~~~~~~$ Example: `\(\displaystyle E=mc^{2}\)`
 
![Example of LaTeX for Gmail in action](https://i.imgur.com/zEIsQeL.png)
</details>

 
 ---
<details>
<summary>:gear: Development:</summary>

**If you would like to contribute, these fixes & additions are the current priorities (but suggestions are welcome):**
* :bug: Bugs:
  * None known at this time! :smile:
* :gem: Features:
  * Support for email drafting.
  * Support for Gmail vertical split and horizontal split modes.
  * Enable [trust option](https://katex.org/docs/options) to allow use of `\href`, `\includegraphics`, and `\url`.
  * Disable [strict option](https://katex.org/docs/options) to allow more flexible LaTeX and use of `\htmlClass`, `\htmlData`, `\htmlId`, and `\htmlStyle` (all also require enabling trust option).
  * Add [TikZJax]([https://tikzjax.com/](https://github.com/kisonecat/tikzjax)) support.
  * Change equation numeration to maintain a count throughout emails in a chain, keeping track even when minimized.
  * Add descriptive comments to the userscript to accomodate code reviews and user edits.
* :thought_balloon: Pipe Dreams:
  * These will most likely not be pursued, barring a contributor deciding to take the initiative on their own:
    * Support for other popular email services (e.g. Outlook, Yahoo Mail, ProtonMail, AOL Mail, etc.).
      * This project would then be renamed "LaTeX for Email".
    * Incorporate [LaTeX.js](https://latex.js.org/).
      * This was briefly toyed with, but only partial support with lots of issues was achieved.
        * It seems the ideal would be to still use KaTeX for math environments due to superior handling there, but LaTeX.js for general document formatting.
</details>

---
<details>
<summary>:balance_scale: Legal</summary>
This userscript, LaTeX for Gmail, is an independent project and is not affiliated with, endorsed, sponsored, or supported by Google LLC, Alphabet Inc., or any of their subsidiaries. The aforementioned entities are not responsible for any issues, damages, or consequences arising from the use of this userscript. By using this userscript, you acknowledge that you are doing so at your own risk and agree to hold Google LLC, Alphabet Inc., and their respective affiliates harmless from any claims, losses, or damages arising from your use of this userscript.

Google LLC reserves the right to request that the distribution of this userscript be ceased, or that the userscript or this Github repository be altered, if it violates Google's terms of service, policies, or guidelines, or if it causes harm to Google's reputation, user experience, or data privacy.

The MIT license under which this userscript is distributed can be viewed [here](https://github.com/LoganJFisher/LaTeX-for-Gmail/blob/main/LICENSE).
</details>

---
Special thanks to the [KaTeX organization](https://katex.org/) - without which, this would not be possible.
