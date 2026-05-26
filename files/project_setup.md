# How to Set Up the Senior Living Direct Project

This guide explains how to organize project files in Claude so future conversations have all the context they need without you having to re-explain anything.

---

## What goes in the Project

### Project instructions (the system prompt)
This is the most important field. Put the absolute essentials here — Claude sees this on every message in the project.

**Recommended project instructions:**

> You are working on marketing, web, and creative projects for **Senior Living Direct**, a 25-year-old advertising agency that exclusively serves senior living communities (independent living, assisted living, memory care, skilled nursing, rehab, home health, hospice). They serve clients across the US and Canada from offices in Camas, WA and Dallas, TX.
>
> Always read `PROJECT_BRIEF.md` and `VOICE_GUIDE.md` before producing copy or design recommendations. Match the voice from those files: plainspoken, specific, warm without sentimentality, occasionally dry. Avoid AI buzzwords and em-dash overuse.
>
> Their key differentiator is custom AI systems built per client, led by senior living experts — never frame AI as the star, always frame human expertise as the star with AI as the multiplier.
>
> Brand contact: tcollova@seniorlivingdirect.com, 214-783-5779, SeniorLivingDirect.com.
>
> When relevant, reference the deployed v1 website in `CURRENT_SITE/` and brand colors/fonts in `BRAND_ASSETS.md`.

Keep it concise. The files do the heavy lifting.

---

### Project files (knowledge)

Upload these files into the project:

```
1. PROJECT_BRIEF.md           — master reference (read first)
2. VOICE_GUIDE.md             — tone, vocabulary, examples
3. BRAND_ASSETS.md            — colors, fonts, logo, design tokens
4. PORTFOLIO_REFERENCE.md     — catalog of existing work
5. PROJECT_SETUP.md           — this file
6. Senior_Living_Direct_Capabilities.pdf  — original capabilities doc
7. SLD-Logo-Trans.png         — logo file
8. (optional) Portfolio image files for visual reference
9. (optional) sld-site.zip    — the deployed v1 website
```

---

## Best practices

### Update the brief when things change
The `PROJECT_BRIEF.md` is your living document. When you confirm a stat, change a positioning statement, or learn what works — edit the file. Outdated context is worse than no context.

### One job per file
Each markdown file has a focused purpose. Resist the urge to combine them. When Claude searches project files for context, focused files retrieve more accurately than one giant document.

### Keep file names descriptive
`VOICE_GUIDE.md` is better than `notes.md` or `doc1.md`. Claude scans filenames when deciding what to read first.

### Use the voice guide as a check
After Claude drafts copy, ask: *"Does this match VOICE_GUIDE.md?"* It's a useful self-correction step.

### Reference files explicitly when needed
If you want Claude to lean on a specific file, say so: *"Following the AI positioning rules in PROJECT_BRIEF.md, write…"*

---

## When to start a new conversation vs. continue

### Start a new conversation when
- You're switching to a different deliverable (campaign brief → website tweak → social post)
- The previous conversation got long (30+ exchanges) and Claude might be losing earlier context
- You want a fresh perspective on the same problem

### Continue the same conversation when
- You're iterating on the same artifact (editing copy, refining a layout)
- You want Claude to remember what you tried and rejected
- The problem requires building on prior decisions

The project files persist across all conversations, so you never lose the foundational context.

---

## Suggested file types for future additions

As work progresses, you may want to add:

- `CAMPAIGN_BRIEFS/` — completed campaign documentation for reference
- `CLIENT_PROFILES/` — short profiles of recurring clients (Country Place, Cornerstone, Legacy at Willow Bend, Countryside)
- `MESSAGING_FRAMEWORKS/` — "House of Messages" docs for specific clients
- `ANALYTICS/` — performance data from past campaigns (anonymized if needed)
- `COMPETITORS/` — notes on competing agencies or competing senior living brands you track

For each: keep them short, focused, and update them.

---

## File maintenance tips

### Markdown formatting
The files are written in standard markdown. You can edit them in:
- Any plain text editor (TextEdit, Notepad)
- VS Code, Sublime, or any code editor
- Obsidian, Notion, Bear (export to .md)
- Even directly in GitHub or GitLab if you store them there

### Version control (optional but smart)
If you're comfortable with Git, store these files in a private repo. You'll get history, the ability to revert, and easy collaboration if multiple people edit them.

### When to re-upload to the project
If you make significant edits, re-upload the file to the project. Claude reads the current version of project files, so updates take effect on the next message.

---

## Quick test

After setting up the project, start a new conversation and ask:

> "Quick check — what do you know about my voice and brand from the project files?"

Claude should be able to summarize the key positioning, voice rules, and brand details without you having to explain anything. If something's missing or wrong, that tells you what to add to the brief.
