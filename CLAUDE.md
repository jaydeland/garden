# Lady Gardendown's Flower Papers

A single-page React app (Vite) documenting a 57-variety seed plan for a 30'×100' garden at Highway 3, Simcoe, Ontario (Zone 6b). The garden sits behind the house; the 30' width faces Highway 3.

## Stack

- React 18, Vite 7, single file component: `src/SeedPlan.jsx`
- No CSS files used for app styles — everything is inline `style={{}}` props
- Google Fonts loaded via `<link>` in the component: Cormorant Garamond, Cormorant SC, Outfit

## Theme: Lady Gardendown's Flower Papers

Inspired by **Lady Whistledown's Society Papers** from Bridgerton. The entire app is narrated in a knowing Regency voice — witty, opinionated, and arch. The persona is **Lady Gardendown**, an anonymous chronicler of the Norfolk County garden.

### The Bridgerton Palette

Three pillars:
1. **Sapphire blue** `#1E3A6E` / `#152D57` — the Bridgerton family's signature. Used for ALL active/selected states (tabs, cards, expanded months, category filters).
2. **Warm gold on parchment** `#C9960A` / `#8B6A18` — the Queen's decrees, broadsheet ink. Used for flourishes, section labels, decorative rules, accents.
3. **Deep burgundy** `#6B1E35` — reserved for dramatic contrast if needed (not yet in use).

### Background
Golden parchment gradient: `linear-gradient(178deg, #F9EDD0 0%, #EDD9AF 25%, #E2C88A 60%, #D4B574 100%)`

### Text
- Primary body: `#1A1208` (near-black ink)
- Secondary / caption: `#6B5020` (dark antique gold-brown)
- Muted labels: `#8B6A18` (antique gold)
- Italic quotes: `#7A5C1E`

### Active / Selected States
All interactive selected states use sapphire:
- Background: `linear-gradient(145deg, #1E3A6E, #152D57)`
- Text on sapphire: `#F5EDD0` (warm cream)
- Border: `1px solid #1E3A6E`

### Decorative Elements
- Flourish: `❦ ✿ ❦` in `#C9960A`
- Corner ornaments: `❧` in `#C9960A`
- Section dividers: double-rule (2px + 1px) in `#1A1208`
- Gold accent borders: `rgba(180,140,60,0.25)`
- Lady Gardendown portrait: circular medallion with `3px solid #C9960A` border + double glow ring

### Typography
- Headings / titles: `Cormorant SC` (small caps serif)
- Body / quotes: `Cormorant Garamond` (elegant serif, italic for quotes)
- Labels / UI chrome: `Outfit` (clean sans-serif at small sizes, letter-spaced)

### Voice Guidelines
- All copy uses Regency-era social vocabulary: "Society," "the Season," "the ton," "Dear Reader"
- Seed descriptions use `regency` field — witty character assessments as if each plant is a debutante
- The Gazette tab is Lady Gardendown's content strategy, written as society dispatches
- "Dear Reader" always opens the Gazette section

## Data Structure

### `SEEDS` array (57 entries)
Each seed: `{ name, cat, source, color, startIndoors, directSow, bloom, height, use, socialAngle, regency, emoji }`

Sources: `"Order 1"`, `"Moonglow"`, `"Stems"`, `"OSC"`
Categories: `"Cut Flowers"`, `"Foliage & Filler"`, `"Kitchen Garden"`

### `ZONES` array (8 zones)
Each zone: `{ id, label, depth, yStart, fill, stroke, note, rows[] }`
Each row: `{ label, placement, seeds[] }` — seeds are names matching SEEDS entries.

Helper: `getAllSeeds(zone)` flattens all rows to a seed name array.

### SVG Map
- viewBox: `0 0 320 1020`
- Each foot = 10 SVG units
- Zone rects: `x=25`, `width=282`
- Left ruler gutter: `x=0–22` with foot marks every 10'
- Orientation: top = house side, bottom = back of garden (Highway 3 runs along the 30' width)

## Garden Layout (top = house, bottom = back)
| Zone | Depth | yStart |
|------|-------|--------|
| Foliage & Filler Strip | 16' | 0 |
| Path | 4' | 16 |
| Cut Flower Beds B (Zinnias) | 15' | 20 |
| Cut Flower Beds A (Mixed) | 15' | 35 |
| Path | 4' | 50 |
| Poppy Meadow | 14' | 54 |
| Path | 4' | 68 |
| Kitchen Garden | 28' | 72 |

## Orders
| Order | Supplier | ID | Varieties | Cost |
|-------|----------|----|-----------|------|
| 1 | Original | WEB-024012 | 16 | — |
| 2 | Moonglow Gardens | R709518406 | 12 | — |
| 3 | Stems Flower Farm | #29659 | 9 | — |
| 4 | Ontario Seed Co. | OSC-2026 | 20 | ~$57 |
| **Total** | | | **57** | **~C$171** |
