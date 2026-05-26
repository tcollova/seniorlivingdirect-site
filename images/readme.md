# Senior Living Direct — Website

A six-page static marketing website. Clean HTML, a single shared stylesheet, and a small script file. No build step, no dependencies, no framework. Drop it on any host.

## Files

```
/
├── index.html          Home
├── about.html          About
├── services.html       Services
├── ai.html             AI Systems
├── portfolio.html      Portfolio
├── contact.html        Contact (with form)
├── styles.css          Shared stylesheet
├── script.js           Mobile nav + scroll reveals
└── images/             Logo + portfolio pieces
```

## Running locally

Just open any `.html` file in a browser. For nav links to work between pages, you can either open them from the same folder, or run a simple local server:

```
cd sld-site
python3 -m http.server 8000
# visit http://localhost:8000
```

## Setting up the contact form

The contact form is ready for Formspree (free for up to 50 submissions/month, no credit card).

1. Go to [formspree.io](https://formspree.io) and sign up with the email you want submissions sent to (probably tcollova@seniorlivingdirect.com)
2. Create a new form — Formspree will give you a form ID like `xrgwabcd`
3. In `contact.html`, find this line:
   ```html
   <form class="form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
4. Replace `YOUR_FORM_ID` with your actual form ID
5. Submit the form once yourself to confirm Formspree

That's it. All submissions will land in the email inbox you signed up with.

If you'd rather use a different form service (Netlify Forms, Basin, etc.), just swap out the `action` URL — the field names are standard.

## Deploying

Any static host works. The easiest free options:

- **Netlify** — drag the whole folder onto [app.netlify.com/drop](https://app.netlify.com/drop). Done.
- **Vercel** — `vercel` in the terminal, or drag-and-drop via the web UI
- **GitHub Pages** — push to a repo, enable Pages
- **Your current Wix host** — Wix makes bringing in pure HTML harder; I'd suggest one of the above unless you specifically want to stay on Wix.

## Customization

### Colors

All colors live at the top of `styles.css` as CSS variables:

```css
:root {
  --navy: #1f3d78;
  --navy-deep: #162c57;
  --red: #c8262f;
  --red-deep: #a61e26;
  --cream: #faf6ef;
  --cream-warm: #f3ece0;
  ...
}
```

Change them in one place and the whole site updates.

### Fonts

Currently Montserrat (headings) + Source Serif 4 (body), loaded from Google Fonts. To swap, change the `@import` line and the `--sans` / `--serif` variables at the top of `styles.css`.

### Content

All copy is in the `.html` files. They're hand-written in plain HTML, no templating, so you can edit them directly in any text editor.

### Swapping portfolio images

Replace files in the `images/` folder, or update the `<img src="...">` paths in `portfolio.html` and `index.html`.

## Notes

- Fully mobile responsive (breakpoints at 960px and 720px)
- Accessible: proper heading hierarchy, alt text, focus styles, aria-current on nav, `prefers-reduced-motion` respected
- Scroll-reveal animations degrade gracefully if IntersectionObserver is unavailable
- No tracking, no analytics wired in yet — if you want Google Analytics or similar, add the snippet before `</head>` in each HTML file
