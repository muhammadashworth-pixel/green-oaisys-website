# Green Oaisys — Setup & Go-Live Guide

Everything you need to make the new pieces live. Each section is independent.

---

## 1. Auto-deploy with GitHub Pages (replaces Netlify)

The repo is already git-initialized with a deploy workflow (`.github/workflows/deploy.yml`).
Every push to `main` will rebuild and publish automatically — free, no Netlify credits needed.

**One-time connect (run on your Mac):**
1. Create a new **empty** repo on github.com (e.g. `green-oaisys-website`). Don't add a README.
2. Open **Terminal** and paste this block (replace the remote URL with your new repo's URL).
   The `rm -rf .git` re-initializes git cleanly — it also clears a stray lock file created
   during editing, so the commit won't fail:
   ```bash
   cd "/Users/muhammadashworth/Downloads/Green Oaisys/GO Website"
   rm -rf .git
   git init -b main
   git add -A
   git commit -m "Green Oaisys website"
   git remote add origin https://github.com/<your-username>/<repo>.git
   git push -u origin main
   ```
   (Prefer clicks? **GitHub Desktop** → Add Local Repository → this folder → Publish. Same result.)
3. On GitHub: **Settings → Pages → Build and deployment → Source = GitHub Actions.**
4. Wait ~1 minute. The Actions tab shows the deploy; your site goes live.

From then on, every change is: `git add -A && git commit -m "update" && git push` (or click Push in GitHub Desktop) → live in ~1 minute.

**Custom domain (greenoaisys.com):**
- A `CNAME` file is included (points Pages at greenoaisys.com).
- In your DNS, point the domain at GitHub Pages (replace the current Netlify records):
  - `A` records for the apex `@` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
  - `CNAME` for `www` → `<your-username>.github.io`
- In Settings → Pages, set the custom domain to `greenoaisys.com` and enable **Enforce HTTPS**.

From then on: edit files → `git commit` → `git push` → live in ~1 minute.

---

## 2. WhatsApp button (floating + contact page)

Open `js/main.js`, top of the file, and set your number (country code, digits only):

```js
const WHATSAPP_NUMBER = '9665XXXXXXXX';   // <-- your WhatsApp business number
```

That's it — the floating button and every "Chat on WhatsApp" link update automatically,
in both Arabic and English.

---

## 3. Contact form + newsletter (Google Forms — free, unlimited)

Both forms post silently to Google Forms; responses land in a Google Sheet you own.

**For each form (contact, newsletter):**
1. Create a Google Form with fields matching the site:
   - Contact: Name, Business name, Email, WhatsApp, Message
   - Newsletter: Name, Email, WhatsApp
2. Click **Send → link (🔗) → copy**, or open the live form and **View source** to find the field IDs.
   Easiest way to get IDs: right-click the form → *Get pre-filled link*, fill dummy values, submit,
   and copy the resulting URL — each `entry.XXXXXXX=value` is a field ID.
3. In `js/main.js`, fill in the `GFORM` block near the top:
   ```js
   const GFORM = {
     contact: {
       action: 'https://docs.google.com/forms/d/e/FORM_ID/formResponse',
       fields: { name:'entry.111', business:'entry.222', email:'entry.333', wa:'entry.444', message:'entry.555' }
     },
     newsletter: {
       action: 'https://docs.google.com/forms/d/e/FORM_ID/formResponse',
       fields: { name:'entry.111', email:'entry.222', wa:'entry.333' }
     }
   };
   ```
Until `action` is filled, forms still show a success message but don't record (safe to launch without).
Turn on email alerts in the linked Google Sheet (Tools → Notification settings) to get pinged per lead.

---

## 4. The Business X-Ray booking (Calendly)

The "Apply for your free Business X-Ray" button opens your existing Calendly (`greenoaisys/30min`).
To make it an application funnel and capture WhatsApp, add **custom questions** to that event:
- Business name (required)
- WhatsApp number (required)
- Monthly revenue (dropdown)
- Your single biggest bottleneck (short answer)

Then set the Calendly **confirmation page / email** to send your short prep questionnaire
(a second Google Form link works well) so you come to call #1 prepared.

Reminder of the flow you approved:
1. Apply (Calendly) → 2. Free call #1: diagnose + fit → 3. Free call #2: deliver the full X-Ray report + 30-day plan → 4. Optional paid Implementation Sprint.

---

## Quick reference — what changed
- New single free offer (**Business X-Ray**) replaces the Health Check + 500 SAR Snapshot.
- New **Contact page** (`contact.html`) + floating WhatsApp button on every page.
- New **Newsletter** signup section on the home page.
- **GitHub Pages** auto-deploy (Netlify no longer required).
- All copy is bilingual (English + Arabic).
