# LaTeX for Gmail

This userscript adds a "TeX" button to the action bar at the top of an open email on Gmail. When clicked, this causes LaTeX code to toggle between compiled and plain text states.

Everything that is on the [KaTeX Support Table](https://katex.org/docs/support_table) is supported by this userscript. That includes all standard equation elements, matrices, arrays, and lots more.

> [!IMPORTANT]
> * This does not change the content of emails in any way. Email recipients will also need to run this userscript to compile on their end.<br>
> * The compiling is performed entirely locally - the content of emails is not transmitted to any server by this userscript.

> [!WARNING]
> * This does not currently support Gmail split views.<br>
> * Anything typed in draft mode while TeX compiling is turned on WILL DISAPPEAR! You can toggle compile, but only type when it is off!


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

$~~~~$:accessibility: Ctrl+Alt+L also works as a shortcut to toggle TeX compiling.

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
  * Fix data loss in draft when toggling off compile (at the very least, disable the ability to type while compile is active)
    * If the disable route is taken, add a banner that appears in the draft window when compile is on, explaining that compile needs to be turned off to continue typing.
* :gem: Features:
  * Create an email signature template that helps bring attention to L4G
  * Remove current button control of, and create dedicated buttons to toggle TeX compile for:
    * Reply draft
    * Compose draft
  * Make it possible to right-click the TeX buttons to customize their shortcuts.
    * Could this be saved to a config.json in the browser's local storage such that it wouldn't be lost with userscript updates, and would be resilient to deleting browser cookies?
  * Support for Gmail vertical split and horizontal split modes.
  * Add [TikZJax](https://github.com/kisonecat/tikzjax) support.
    * Completely unrelated to KaTeX, but should be compatible.
    * TikZ uses `\begin{tikzpicture}` delimiters.
  * Change equation numeration to maintain a count throughout emails in a chain, keeping track even when minimized.
  * Add descriptive comments to the userscript to accomodate code reviews and user edits.
* :thought_balloon: Pipe Dreams:
  * These will most likely not be pursued, barring a contributor volunteering to put forth the massive effort involved.
    * Support for other popular email services (e.g. Outlook, Yahoo Mail, ProtonMail, AOL Mail, etc.).
      * Request for Outlook at first priority
      * This project would then be renamed "LaTeX for Email".
    * Incorporate [LaTeX.js](https://latex.js.org/).
      * This was briefly toyed with, but only partial support with lots of issues was achieved.
        * It seems the ideal would be to still use KaTeX for math environments, and TikZJax for TikZ envionrments, but LaTeX.js would be useful for general document formatting.
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
