# Green Oaisys Website

Static prototype — no build step, no dependencies. Open `index.html` in any browser.

## Files
- `index.html` — single-page site (hero, problem, what we do, method, offers, Health Check quiz, founders, CTA)
- `css/style.css` — all styles; palette + fonts defined as CSS variables at the top
- `js/main.js` — EN/Arabic toggle (full RTL) + Health Check quiz logic; all copy for both languages lives in the `I18N` dictionary here
- `assets/green-oaisys-wordmark.svg` — primary logo, true vector paths (no font dependency); reusable on decks/cards/social
- `assets/green-oaisys-wordmark@2x.png` — PNG version, transparent background
- `assets/oaisys-mark.svg` — standalone "Oaisys" mark
- `assets/favicon.svg` — favicon (gradient O-ring with lavender flower, ink tile)
- `assets/go-icon.svg` — GO icon mark: ink G + green→lime ring O with lavender flower core (transparent)
- `assets/go-icon-tile.svg` — GO avatar/app tile version (512px, ink rounded square)

## Brand tokens
Ink `#0A2A1C` · Green `#1FC16B` · Green dark `#107044` · Violet `#6C4BF4` · Violet dark `#5230C9` · Lavender `#EDE8FF` · Lavender soft `#C9B8FF` · Lime `#B7E219` (spice only) · Sand `#F7F4EC` · Cream `#FDFCF8`
Type: Poppins (EN) / IBM Plex Sans Arabic (AR), loaded from Google Fonts. Logo: Poppins Bold — "Green O" in ink, "ai" green→lime gradient (#1FC16B → #8CC412), "sys" in Bold Italic solid violet (#6C4BF4). Site UI: green/lime carry most accents (kickers, method, quiz); purple owns the brand/value section, offer tiers, and hero highlight.

## Positioning (v2)
Audience: Saudi SME owners, 3–30 staff, service businesses. Hero leads with owner dependency ("your business shouldn't need you every hour"). Core differentiator: **a brand is a business with systems** — systems create expansion capacity and intrinsic value. WhatsApp chaos is one symptom among nine, not the headline.

## Deploying
Drop the folder on Netlify, Vercel, GitHub Pages, or any static host as-is.

## Before production
- Replace the mailto CTA with a real booking link (Calendly/Cal.com) or WhatsApp Business link
- Add the Majeed case study when ready (placeholder slot in the Founders section)
- Consider hooking the Health Check result to a lead-capture form
