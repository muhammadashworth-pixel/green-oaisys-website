# Publishing greenoaisys.com — Netlify + Cloudflare

## Before you deploy (one-time)
- [x] Images saved locally in assets/ and relinked — site is fully self-contained.
- [x] Booking: Calendly popup wired on all booking CTAs (calendly.com/greenoaisys/30min).

## 1. Put the site on Netlify (5 min)
1. Go to **netlify.com** → sign up (free).
2. Go to **app.netlify.com/drop**.
3. Drag the whole **GO Website** folder onto the page.
4. Site is instantly live at `something-random.netlify.app` — click around and check it.
5. (Optional) Site configuration → Change site name → `greenoaisys` so the URL reads `greenoaisys.netlify.app`.

## 2. Connect your domain (5 min)
1. In Netlify: **Domain management → Add a domain** → enter `greenoaisys.com` → also add `www.greenoaisys.com`.
2. In **Cloudflare** → your domain → **DNS → Records**, add:

   | Type  | Name | Target / Value              | Proxy status |
   |-------|------|-----------------------------|--------------|
   | A     | @    | `75.2.60.5`                 | **DNS only** (grey cloud) |
   | CNAME | www  | `greenoaisys.netlify.app`   | **DNS only** (grey cloud) |

   ⚠️ Set both to **DNS only** (click the orange cloud so it turns grey). If left proxied, Netlify can't issue the SSL certificate and you may get redirect loops.
3. Delete any old A/CNAME records on `@` or `www` that point elsewhere.

## 3. Finish in Netlify (2 min)
1. Domain management → wait for "Awaiting DNS" to turn green (usually minutes, up to an hour).
2. **HTTPS → Verify DNS → Provision certificate** (automatic Let's Encrypt).
3. Set **www.greenoaisys.com as the primary domain** (Netlify redirects the bare domain to it).

## Updating the site later
Ask Claude to make the edits → drag the updated **GO Website** folder onto **app.netlify.com/drop → Deploys** page again. Old version is instantly replaced (and kept in history for rollback).
