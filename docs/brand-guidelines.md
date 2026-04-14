# Shraddha — Brand Guidelines

## Brand Essence

Shraddha means "faith" and "devotion" — a deep, trusting surrender to something greater. The brand embodies the feeling of sitting in a temple at dusk: quiet, warm, safe, infinite. Not cold or clinical. Not loud or commercial. A space for seekers.

**Tagline:** Your Spiritual Journey

**Feeling:** Calm depth. Warm dark. Sacred stillness.

---

## Color Palette

### Primary Background
- `#0D0B1A` — Deep Void (main background)
  A near-black with a subtle indigo warmth. Not pure black — pure black feels digital and cold. This has depth, like the night sky before dawn.

### Surface Colors
- `#1A1730` — Temple Floor (card backgrounds, elevated surfaces)
- `#252140` — Altar Stone (hover states, secondary surfaces)
- `#2E2A4A` — Dusk Cloud (active/pressed states, borders)

### Accent Colors
- `#D4A574` — Saffron Gold (primary accent — CTAs, links, active states)
  The color of turmeric, marigold garlands, and the flame of a diya. Warm, sacred, inviting.
- `#C77B3F` — Deep Saffron (hover state of primary accent)
- `#8B6F47` — Aged Gold (muted accent, secondary text highlights)

### Text Colors
- `#F5F0E8` — Ivory Light (primary text — headings, body)
  Not pure white. Warm like lamplight on a white wall.
- `#B8B0A0` — Warm Stone (secondary text — descriptions, metadata)
- `#7A7468` — Moon Dust (tertiary text — timestamps, subtle labels)

### Semantic Colors
- `#7C6FDC` — Third Eye (purple — meditation, spirituality tags)
- `#5BA8A0` — Sage Leaf (teal — healing, wellness tags)
- `#DC6F6F` — Sacred Fire (red-orange — devotion, strength tags)
- `#6F9FDC` — Celestial (blue — wisdom, knowledge tags)
- `#B87FDC` — Lotus (pink-purple — love, gratitude tags)

### Gradients (for category cards)
- Bhajans: `from-[#DC6F6F] to-[#8B3A3A]` — Sacred Fire
- Gita: `from-[#D4A574] to-[#8B6F47]` — Saffron Gold
- Meditation: `from-[#7C6FDC] to-[#4A3A8B]` — Third Eye
- Jyotish: `from-[#6F9FDC] to-[#3A5A8B]` — Celestial
- Guru Wisdom: `from-[#5BA8A0] to-[#3A6B66]` — Sage Leaf

---

## Typography

### Font Stack
- **Primary:** Inter (clean, modern, highly readable on dark backgrounds)
- **Fallback:** system-ui, -apple-system, sans-serif

### Scale
- Page title: 24px / bold / Ivory Light
- Section heading: 16px / semibold / Ivory Light
- Card title: 14px / medium / Ivory Light
- Body text: 14px / regular / Warm Stone
- Caption/meta: 12px / regular / Moon Dust
- Label/badge: 11px / semibold / uppercase tracking-wide

### Line Heights
- Headings: 1.2
- Body: 1.5
- Tight (cards): 1.3

---

## Spacing

- Page padding: 16px (mobile), 24px (tablet+)
- Section gap: 32px
- Card gap: 12px
- Rail gap: 12px
- Inner card padding: 12px

---

## Component Patterns

### Thumbnail Cards (1:1 ratio)
- Square thumbnails with rounded corners (8px)
- Duration badge: bottom-right, `bg-black/70`, small text
- Title: 2-line clamp below thumbnail
- Channel + views: single line below title, meta color
- No embedded players in listings — thumbnails only

### Carousel (Top Widget)
- Full-width, edge-to-edge on mobile
- 1:1 aspect ratio slides
- Dot indicators or subtle progress bar
- Auto-advance (6s) with pause on interaction
- Overlay text: title + short description on gradient overlay

### Horizontal Rails
- `overflow-x: auto` with `scroll-snap-type: x mandatory`
- 1:1 square thumbnail cards
- Hide scrollbar (`scrollbar-width: none`)
- Snap to card edges
- Multiple rails: each with a section title + "See all →" link

### Watch Page
- No top navbar — immersive
- Edge-to-edge player on mobile (16:9, top-aligned)
- YouTube iframe player (native embed for reliability)
- Below player: title, channel, share button, reflection prompt, next steps
- Share button shares Shraddha page URL, not YouTube

### Bottom Navigation
- Fixed bottom, dark surface
- 5 icons: Home, Search, Journeys, Help, Gita
- Active state: Saffron Gold icon + label
- Inactive: Moon Dust

---

## Copy Voice

- **Language:** English only for all platform copy
- **Tone:** Warm, respectful, never preachy. Like a wise friend, not a guru.
- **Greeting:** Time-aware — "Good morning" / "Good afternoon" / "Good evening" (no Hindi)
- **CTAs:** "Watch now" / "Start journey" / "Find help" / "Continue →"
- **Descriptions:** Concise, evocative, not clinical. "When your mind won't stop" not "Anxiety management techniques"

---

## Iconography

- Emoji-based for now (🕉️ 🙏 🧘 ⭐ 💬 🌊 🕊️ 🌙 🎯 🔥 🌑)
- Future: custom line-art icons in Saffron Gold

---

## Animation & Motion

- Transitions: 200ms ease-out (hover, tap)
- Page transitions: subtle fade (150ms)
- Carousel: smooth slide (400ms ease-in-out)
- No bounce, no jank, no aggressive animations
- Spiritual = stillness. Motion should feel like flowing water, not jumping.

---

## What This Is NOT

- Not a YouTube clone
- Not a wellness app with clinical language
- Not a bright, white, "startup" aesthetic
- Not a traditional Hindu website with ornate borders
- Not a content feed — it's a journey companion

## What This IS

- A warm, dark temple at dusk
- A trusted guide for your spiritual path
- Calm depth, sacred stillness, saffron warmth
- Modern and respectful of tradition simultaneously
