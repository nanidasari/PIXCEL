# Pixcel Studio — Setup Guide

This is a complete, self-contained website plus a real content-management
system (CMS), with no monthly software cost. Here's what's inside and how
to get it live.

## What's in the folder

```
pixcel-studio/
├── index.html            → the whole page (structure only — no text is hardcoded here)
├── css/style.css          → all design/colours/fonts
├── js/script.js           → pulls content from content.json and builds the page
├── content/content.json   → every piece of editable text: services, portfolio, testimonials, contact info
├── admin/                 → the CMS control panel (Decap CMS)
│   ├── index.html
│   └── config.yml
└── images/                 → put your logo, portfolio photos, etc. here
```

**The key idea:** nothing about your actual words or images lives inside the
HTML/CSS. It all lives in `content/content.json`. The page reads that file
and builds itself. That means:
- You (or anyone on your team) can update the whole site by editing one file, or
- You can use the visual admin panel at `/admin` — no code at all.

---

## Part 1 — Preview it right now

You don't need to deploy anything to look at it.

1. Open the `pixcel-studio` folder.
2. Because the page loads `content.json` via `fetch()`, most browsers block
   that when you just double-click `index.html` (a `file://` restriction).
   Run a tiny local server instead:
   - **If you have Python:** open a terminal in the folder and run
     `python3 -m http.server 8000`, then visit `http://localhost:8000`.
   - **If you have Node:** run `npx serve`, then open the URL it prints.
3. You should see the full site with real placeholder content already in place.

---

## Part 2 — Put it on the internet (free option: Netlify)

Netlify is the easiest path here because the CMS (Decap CMS) plugs directly
into Netlify's free Identity + Git Gateway login system — no server to run.

1. **Create a GitHub repository** and push this whole `pixcel-studio` folder
   to it (e.g. repo name `pixcel-studio`).
   - If you're not familiar with git: GitHub's website lets you drag-and-drop
     the folder to create the first commit — you don't need the command line.
2. **Sign up at [netlify.com](https://www.netlify.com)** (free tier is enough).
3. Click **"Add a new site" → "Import an existing project"** and connect it
   to the GitHub repo you just created.
4. Build settings: leave the build command **empty** and set the publish
   directory to `/` (this is a static site, nothing needs compiling).
5. Click **Deploy**. In a minute or two you'll have a live URL like
   `pixcel-studio-xyz.netlify.app`.
6. **Custom domain:** in Netlify, go to *Domain settings → Add a custom
   domain* and follow the DNS instructions to point your own domain
   (e.g. `pixcelstudio.com`) at it.

---

## Part 3 — Turn on the CMS so you can edit visually

This is what makes the site "fully customizable" without touching code.

1. In your Netlify site dashboard, go to **Site configuration → Identity**
   and click **Enable Identity**.
2. Under Identity settings, set **Registration** to *Invite only* (so
   strangers can't create themselves an account).
3. Scroll to **Services → Git Gateway** and click **Enable Git Gateway**.
   This lets the CMS commit content changes back to your GitHub repo on
   your behalf.
4. Go to the **Identity** tab of your Netlify dashboard and click
   **Invite users** — invite yourself and anyone on your team who should
   be able to edit the site. You'll get an email to set a password.
5. Visit `https://yoursite.netlify.app/admin` — you'll see a login screen.
   Log in with the account you just invited.
6. You're in. You'll see editable sections for **Site Settings**, which
   covers hero text, services, portfolio pieces, testimonials, and contact
   details — matching the `config.yml` in the `admin/` folder.
7. Every time someone clicks **Publish** in the CMS, it commits the change
   straight to `content/content.json` in your GitHub repo, and Netlify
   automatically rebuilds and republishes the live site within moments.

**No Netlify?** `admin/config.yml` has a commented-out alternative backend
(`github`) if you'd rather have editors log in with a GitHub account
directly instead of Netlify Identity — just fill in your repo name where
marked in that file.

---

## Part 4 — Editing content without the CMS

If you're comfortable editing text in a code editor, you never need the
admin panel at all — just open `content/content.json` and change the
values. The structure is:

- `site` — studio name, hero headline/subheading, email, phone, location, social links
- `stats` — the four numbers in the strip under the hero
- `services` — your three service blocks (title, description, swatch colour, bullet list)
- `works` — portfolio tiles (client name, category, description, tile size: `small`/`medium`/`large`)
- `testimonials` — client quotes, name, role

Save the file, refresh the page (or push to GitHub if it's deployed), and
the site updates instantly — the layout, grid, and styling all adjust
automatically.

---

## Part 5 — Adding real photography

Right now the portfolio and hero use colour and typography rather than
photos, since no images were supplied. To add real work samples or a logo:

1. Drop image files into the `images/` folder (or upload them through the
   CMS media picker at `/admin`, which saves to the same folder).
2. In `index.html` or `js/script.js`, add an `<img>`/background-image
   reference where you'd like it — for example, inside `.work-card` in
   `script.js`, or as a logo next to `.nav-mark` in `index.html`.
3. If you'd like, tell me which images go where and I can wire them in
   directly.

---

## Part 6 — Customizing the design

Everything visual is controlled from the top of `css/style.css`:

```css
:root{
  --ink: #14141c;      /* main dark colour */
  --paper: #f6f4ef;     /* background colour */
  --coral: #ff4b5c;     /* accent 1 */
  --cobalt: #2f4cff;    /* accent 2 */
  --sunbeam: #ffc94a;   /* accent 3 */
  --font-display: 'Sora', sans-serif;  /* headings */
  --font-body: 'Inter', sans-serif;    /* body text */
}
```

Change any of these values and the whole site's colour and type system
updates consistently — nothing else in the CSS needs to change.

---

## Notes & limitations

- This is a static site (no database, no server code), which keeps it fast
  and free to host — the "database" is effectively `content.json`, version
  controlled in your GitHub repo.
- If you outgrow this setup (e.g. you want a blog, e-commerce, or
  multi-language content), the same content-driven structure can be
  migrated to a headless CMS like Sanity or Contentful — the JSON shape
  above would carry over directly.
- Contact form: the Contact section currently links to a `mailto:` address.
  If you'd like an actual on-page form that emails you (via a free service
  like Formspree or Netlify Forms), let me know and I'll wire it in.
