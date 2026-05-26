# Senior Living Direct — Brand Assets

A reference for colors, fonts, and logo usage. For any design work — web, print, social, decks — start here.

---

## Logo

**Primary:** SLD-Logo-Trans.png (transparent PNG)

The logo wordmark reads "Senior**Living**Direct" with:
- "Senior" in red
- "Living" in navy blue
- "Direct" in red
- Black underline accents under "Senior" and "Direct"

### Logo usage rules
- Always allow generous clear space around the logo (at minimum, a margin equal to the height of the "S" in "Senior")
- On dark backgrounds, use a white-knockout version (apply `filter: brightness(0) invert(1)` in CSS or generate a white SVG/PNG)
- Minimum recommended size: 28px tall on web, 0.5" tall in print
- Never recolor, stretch, rotate, or add effects
- Never place on busy photography without a contrast plate behind it

---

## Color Palette

### Primary
| Name | Hex | Use |
|---|---|---|
| Navy | `#1f3d78` | Primary brand color, body text accents, buttons |
| Navy Deep | `#162c57` | Headlines, dark panels, footer |
| Navy Soft | `#2a4f94` | Secondary navy, hover states |

### Accent
| Name | Hex | Use |
|---|---|---|
| Red | `#c8262f` | Accent, CTAs, emphasis, eyebrow text |
| Red Deep | `#a61e26` | Hover states for red elements |

### Neutrals
| Name | Hex | Use |
|---|---|---|
| Cream | `#faf6ef` | Page backgrounds (warm, off-white) |
| Cream Warm | `#f3ece0` | Alternating section backgrounds |
| Ink | `#1a1f2e` | Body text |
| Ink Soft | `#3d4556` | Secondary body text |
| Muted | `#6b7280` | Captions, fine print |
| Rule | `#e4dccd` | Dividers, borders |
| White | `#ffffff` | Cards, contrast surfaces |

### Palette principles
- **Navy-forward** — navy is the dominant color
- **Red is for accents and emphasis** — never as a dominant background
- **Warm cream backgrounds** instead of stark white — gives the brand its warmth
- Avoid pure black; use Ink for text

---

## Typography

### Web fonts (current site)

**Headings: Montserrat** (Google Fonts, weights 400/500/600/700/800)
- Used as a substitute for the geometric sans in the logo
- Letter-spacing slightly tightened (-0.01em on headings, -0.02em on hero)

**Body: Source Serif 4** (Google Fonts, weights 400/500/600 + italic)
- Warm, readable, balances Montserrat's geometry
- Provides the "warm + professional" pairing

### Why this pairing
The logo wordmark feels geometric and modern. Pairing it with a serif body face adds warmth and reading comfort that pure sans-serif on a B2B site can't match. It also signals editorial care — appropriate for an agency that writes for a living.

### Print
For print materials, the existing portfolio pieces show flexibility:
- Display scripts for emotional headlines (e.g., "Donuts with Grandparents," "Dalí, Daily.")
- Clean sans-serif for body and informational copy
- Italic serif for pull quotes and tagline accents

Match the style to the audience and the moment. There isn't one rigid print font system.

### Type rules
- Headlines: Montserrat 700, tight letter-spacing
- Body: Source Serif 4 400/500, line-height 1.65
- Eyebrow labels (above headlines): Montserrat 600, ALL CAPS, 0.16em letter-spacing, red color
- Buttons: Montserrat 600, slightly looser tracking
- Avoid using Source Serif italics in display contexts — use it for emphasis in body only

---

## Visual Design Principles

### Layout
- Generous white (cream) space — never feel cramped
- Asymmetric two-column layouts for variety
- Numbered sections (01, 02, 03) for processes
- Section breaks indicated with horizontal rules + small red eyebrow text

### Imagery
- Real photography of residents, staff, communities — never stock unless absolutely necessary
- When stock is unavoidable, prefer warm, candid moments over posed/corporate
- Avoid "happy senior" cliché stock (gray-haired models laughing at a salad)
- Architecture and interior shots are welcome; portrait of the place

### Decoration
- Red 3px top border accents on cards (animate in on hover)
- Red 3-4px left border on pull quotes and feature list items
- Subtle radial gradients on dark navy panels for depth
- Grid patterns sparingly, as texture in dark hero areas

### Motion
- Subtle scroll reveals (24px translate, 0.7s ease)
- Hover states lift cards slightly (-4px translate) with shadow
- Underline grows from left on nav links (0.25s ease)
- Always respect `prefers-reduced-motion`

---

## CSS Variables (current site)

All design tokens live at the top of `styles.css` for easy global edits:

```css
:root {
  --navy: #1f3d78;
  --navy-deep: #162c57;
  --navy-soft: #2a4f94;
  --red: #c8262f;
  --red-deep: #a61e26;
  --cream: #faf6ef;
  --cream-warm: #f3ece0;
  --ink: #1a1f2e;
  --ink-soft: #3d4556;
  --muted: #6b7280;
  --rule: #e4dccd;
  --white: #ffffff;

  --sans: 'Montserrat', system-ui, sans-serif;
  --serif: 'Source Serif 4', Georgia, serif;
}
```

Change a single value here and the whole site updates.

---

## Open items
- Confirm whether Montserrat is acceptable or if there's an actual logo font that should be used
- Source any official brand guidelines document if one exists
- Confirm Pantone equivalents for navy and red if needed for print
