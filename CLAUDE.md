# Green Oaisys website — working notes

## Arabic voice (MANDATORY)
All Arabic for this project — website (`js/main.js` → `I18N.ar`), WhatsApp, email, social, ads —
must follow **`BRAND_VOICE_AR.md`**: clean "white" Arabic (اللهجة البيضاء), casual, warm, native
Saudi-startup tone. Write Arabic **first and native**, never as a translation. Re-read the guide and
triple-check every word before shipping any new Arabic string.

## Deploy
Static site on GitHub Pages, repo `muhammadashworth-pixel/green-oaisys-website`, domain
greenoaisys.com. Edit files locally, upload changed files to GitHub (root / `css` / `js`), then
GitHub Actions auto-deploys (~1 min). Bump the `?v=` query on `style.css` / `main.js` across all
HTML pages when their content changes, so browsers fetch fresh assets.
