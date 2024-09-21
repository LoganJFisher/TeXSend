This userscript adds a "TeX" button to the action bar at the top of an open email on https://mail.google.com. When clicked, this causes TeX code within a list of accepted delimiters to toggle between rendered and plaintext states.
Standard equation elements & matrices are supported.

This requires the use of browser script manager. I recommend Violentmonkey.
* [Chrome](https://chromewebstore.google.com/detail/violentmonkey/jinjaccalgkegednnccohejagnlnfdag)
* [Firefox](https://addons.mozilla.org/en-US/firefox/addon/violentmonkey/)
* [Edge](https://microsoftedge.microsoft.com/addons/detail/violentmonkey/eeagobfjdenkkddmbclomhiblgggliao)

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

**Planned features:**
* \begin{displaymath} and \begin{equation} display delimiters
* Tables
* Packages
* TikZ

---

I would like to extend thanks to the [KaTeX organization](https://katex.org/) - without which, this would not be possible.
