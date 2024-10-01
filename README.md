<h1>
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://i.imgur.com/5WwIWIB.png">
    <img alt="TeXMail" width=130 src="https://i.imgur.com/aOHzZF4.png">
  </picture>
</h1>

<!---------------------------------------------------------------------------------------------------------------------------------------------------------------------------->
<!-----------------------------------------------------------------------------------HEADER----------------------------------------------------------------------------------->
<!---------------------------------------------------------------------------------------------------------------------------------------------------------------------------->
These userscripts adds "TeX" buttons to the action bars of open emails and drafts in your preferred email service (currently only Gmail). When clicked, this causes LaTeX code to toggle between compiled and text states.

Everything that is on the [KaTeX Support Table](https://katex.org/docs/support_table) is supported by this userscript. That includes all standard equation elements, matrices, arrays, and lots more.

> [!IMPORTANT]
> * This does not change the content of emails in any way. Email recipients will also need to run this userscript to compile on their end.<br>
> * The compiling is performed entirely locally - the content of emails is not transmitted to any server by this userscript.

<!---------------------------------------------------------------------------------------------------------------------------------------------------------------------------->
<!-----------------------------------------------------------------------------INSTALLATION GUIDE----------------------------------------------------------------------------->
<!---------------------------------------------------------------------------------------------------------------------------------------------------------------------------->
---
<details>
<summary>:wrench: Installation Guide:</summary>

This requires the use of a browser script manager. Violentmonkey is recommended, but other options should also be compatible.
* [Chrome](https://chromewebstore.google.com/detail/violentmonkey/jinjaccalgkegednnccohejagnlnfdag)
* [Firefox](https://addons.mozilla.org/en-US/firefox/addon/violentmonkey/)
* [Edge](https://microsoftedge.microsoft.com/addons/detail/violentmonkey/eeagobfjdenkkddmbclomhiblgggliao)
* [Opera](https://github.com/OpenUserJs/OpenUserJS.org/wiki/Violentmonkey-for-Opera)
* [Safari](https://apps.apple.com/us/app/meddlemonkey/id1539631953?mt=12)

Once you have a browser script manager extension installed on your browser, click the following link for your email service:
* [Gmail](https://github.com/LoganJFisher/LaTeX-for-Gmail/raw/refs/heads/main/LaTeX-for-Gmail.user.js)

Lastly,
* On the new tab, click "Install" (on the left for Violentmonkey)
* Refresh any open tabs for your email service
</details>

<!---------------------------------------------------------------------------------------------------------------------------------------------------------------------------->
<!---------------------------------------------------------------------------------USE GUIDE---------------------------------------------------------------------------------->
<!---------------------------------------------------------------------------------------------------------------------------------------------------------------------------->
---
<details>
<summary>:writing_hand: Use Guide:</summary>

LaTeX code is compiled automatically upon opening an email or expanding an email in a chain. To toggle it off (or back on), click the $\TeX$ button on the action bar at the top of the email. <br>
$~~~~$:accessibility: `Ctrl+Alt+L` shortcut to toggle compiling in an email chain.

LaTeX code is not compiled automatically in drafts, but can be toggled on by clicking the $\TeX$ button in the action bar at the bottom of the draft. Editing is disabled while compile is on. <br>
$~~~~$:accessibility: `Ctrl+Alt+K` shortcut to toggle compiling in an active draft.

[KaTeX-supported environments](https://katex.org/docs/support_table) (i.e. anything on their list which is surrounded with braces `{}`) (e.g. `\begin{bmatrix}` and `\begin{array}`) can be used at any place in an email. In addition to these, a set of additional delimiters have been added to allow you to create inline and display math environments with ease.

$~~~~$**Additional supported math environment delimiters beyond KaTeX:**
* Inline mode:
  * `[; ... ;]`
  * `\( ... \)`
  * `\begin{math} ... \end{math}`
* Display mode:
  * `[(; ... ;)]`
  * `\[ ... \]`
  * `\begin{displaymath} ... \end{displaymath}`

:bulb: Use `\displaystyle` inside inline delimiters to compile as display mode with line breaks. <br>
$~~~~~~$ Example: `\(\displaystyle E=mc^{2}\)`

Inside of a supported environment, you can use any of the many other functions provided by KaTeX (e.g. `\alpha` and `\brack`).
 
![Example of TeXMail in action (in Gmail)](https://i.imgur.com/zEIsQeL.png)
</details>

<!---------------------------------------------------------------------------------------------------------------------------------------------------------------------------->
<!---------------------------------------------------------------------------------DEVELOPMENT-------------------------------------------------------------------------------->
<!---------------------------------------------------------------------------------------------------------------------------------------------------------------------------->
 ---
<details>
<summary>:gear: Development:</summary>

**If you would like to contribute, these fixes & additions are the current priorities (but suggestions are welcome):**
* :bug: Bugs:
  * No known bugs at this time! :smile:
* :gem: Features:
  * Support for other popular email services (Outlook -> Thunderbird [w/ this add-on](https://addons.thunderbird.net/en-US/thunderbird/addon/userchromejs-2/) -> Protonmail -> Yahoo Mail -> AOL Mail).
    * Outlook as first priority.
    * Each email service would be an independent userscript, not all in one.
  * Add [TikZJax](https://github.com/kisonecat/tikzjax) support.
    * [npmjs](https://www.npmjs.com/package/tikzjax/v/1.0.2?activeTab=code) - src folder currently missing tikzjax.js
    * TikZ uses `\begin{tikzpicture}` delimiters.
* :knot: Stretch Goals:
  * Add [LaTeX.js](https://latex.js.org/) support.
    * This was briefly toyed with, but only partial support with lots of issues was achieved.
      * It seems the ideal would be to still use KaTeX for math environments, and TikZJax for TikZ envionrments, but LaTeX.js would be useful for general formatting.
</details>

---
Special thanks to the [KaTeX organization](https://katex.org/) - without which, this would not be possible.
