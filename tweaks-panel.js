# ATÁ Website — Production Build

This folder is the **deployable build**. Drop it (or zip it) into Netlify / Vercel / any static host.

## What's in here

- `index.html` — main page (no JSX, no Babel runtime — fast load)
- `styles.css` — all styles
- `assets/` — images (logo, hero, product shots, heritage photo)
- `tweaks-panel.js`, `src/*.js` — pre-transpiled React app
- `_redirects` — Netlify SPA fallback

## Deploy to Netlify

1. Zip this `dist/` folder OR push it to GitHub and connect the repo.
2. **Build command:** _(leave blank)_
3. **Publish directory:** `dist` (or `/` if you only uploaded the contents).
4. Done — Netlify serves `index.html` immediately.

## Editing content after deploy

Two ways:

- **In-browser CMS** — click the red ✎ EDIT button (bottom-right), password `ata-admin`. Edits save in your browser; export as JSON when you're happy.
- **Permanent edits** — open `index.html`, find `window.__ATA_DEFAULTS`, edit values directly, redeploy.

## Changing the CMS password

Open `src/store.js`, search for `ata-admin`, change the string. Redeploy.

## Connecting real payments

The current checkout is a **mock** — it captures the order and shows a success message but does not charge a card. To go live:

- **Paystack** (Nigeria, Ghana): create an account, get a public key, replace the `submit` handler in `src/cart.js` with Paystack's inline JS.
- **Stripe** (everywhere else): use Stripe Checkout — server endpoint required.
