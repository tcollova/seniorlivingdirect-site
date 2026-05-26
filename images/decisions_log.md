# Senior Living Direct — Decisions Log

A running record of design, copy, and structural decisions made on the website and other deliverables. Useful for future conversations so we don't re-litigate things that have already been decided, or accidentally undo something on purpose.

Newest entries at the top. Each entry: date, what changed, and the reasoning.

---

## May 2026 — Privacy Policy added

**What:** New `privacy.html` page added to the site, linked from the footer of all seven pages.

**Why this version:** Plain English, no legalese, no CCPA/GDPR section. Voice matches the rest of the site ("we don't drip-campaign you," "we don't do anything weird with submissions").

**Things to update if reality changes:**
- Form processor is named as Formspree. If we wire the form to something else, that section needs updating.
- Google Analytics is described as planned-but-not-active. When GA actually goes in, the section needs to flip to present tense.
- The "we don't sell to lead aggregators" line mirrors the Lead Generation card on the home page. If SLD ever does buy or sell prospect lists for a specific campaign, both spots need softening.

---

## May 2026 — Lead Generation added to "What We Do" cards on home page

**What:** Added a fifth card to the home page's "What We Do" section, right after Custom AI Systems. Headline: "Lead Generation."

**Copy:** "When census is low, every lead matters and every dollar matters more. We build campaigns that bring qualified prospects straight to your team — no third-party aggregator skimming thousands off the top, no leads sold to the community down the road."

**Why:** Tony specifically wanted census language and the dig at lead aggregators. The two-pronged dig (skimming fees + leads sold to competitors) is intentional — those are the two real pain points operators have with services like A Place for Mom.

---

## May 2026 — Hero photo on right panel of home page

**What:** The right side of the home hero (the panel with the 25+ stat and the listening quote) now uses `images/hero-woman.png` as a background image.

**How it's set up:**
- The photo is on the `.hero-visual` div only — not the entire hero section
- A vertical navy gradient overlays it: heavier at top and bottom, lighter in the middle, so her face shows through clearly
- The `.hero-visual-inner` is set to a flex column with `justify-content: space-between` and `min-height: 28rem`, which pins the 25+ stat to the top and the quote to the bottom

**What was tried and rejected:**
- Putting the photo as the full hero section background (covering the entire left+right area). Looked wrong — text on the left got cluttered, and the stat panel on the right lost its identity.
- Leaving the quote and stat stacked together at the top of the panel. Felt cramped against her face. Pinning the quote to the bottom gave the layout breathing room.

**If the photo placement needs adjustment:** the `background-position` is currently `center top`. Try `center center` if she's too low, or adjust `min-height` if the panel feels too tall.

---

## May 2026 — Hero headline broken to two lines

**What:** Home page H1 is now "Strategic. Creative." on line one, "Human-led." on line two (in red).

**How:** A `<br>` tag forces the break, plus `white-space: nowrap` on the "Human-led." span keeps it from re-wrapping at certain breakpoints.

**Why:** "Human-led." was breaking awkwardly in the middle on its own line at some screen widths. Forcing the break to happen in a controlled spot reads cleaner.

---

## May 2026 — Header logo swapped

**What:** Header logo updated from `images/logo.png` to `images/SLDLogoonWhite.jpg`.

**Footer logo and favicon NOT changed.** Those still reference `images/logo.png`. Footer is dark, so a white-knockout logo would also work there if we ever want to swap — leaving it alone for now.

---

## May 2026 — Contact page eyebrow strikethrough fix

**What:** The four eyebrow labels in the contact info column (Email, Phone, Offices, What Happens Next) were appearing with a red line struck through the first few letters.

**Why it was happening:** The `.eyebrow` class in styles.css uses a `::before` pseudo-element to draw a small horizontal red rule before the text. Those four labels had `padding-left: 0` to align them flush with the rest of the column, which pulled the text underneath that rule and created the strikethrough effect.

**Fix:** Added a small scoped `<style>` block in the head of `contact.html` that hides the pseudo-element specifically inside `.contact-info`. Doesn't affect eyebrows anywhere else on the site.

```css
.contact-info .eyebrow::before { display: none; }
```

**Alternative if we want the rule back:** would need to add `padding-left` back to those labels, which would break the flush alignment with the email link, phone link, etc. underneath.

---

## How to use this log

When making future changes:
- Read this file first to understand what's already been decided and why
- If a decision is being reversed, add a new entry explaining why (don't just delete the old one)
- Keep entries short and concrete — the reasoning matters more than the play-by-play

When this file gets long, consider splitting by area (`DECISIONS_LOG_WEB.md`, `DECISIONS_LOG_BRAND.md`, etc.).
