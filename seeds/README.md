# Seed Documentation

57 varieties documented for the Lady Gardendown's Flower Papers garden at Highway 3, Simcoe, Ontario (Zone 6b).

## Structure

Each seed has a markdown file with:
- **Frontmatter**: Structured data (spacing, height, bloom period, source, etc.)
- **Regency Character**: Lady Gardendown's witty assessment
- **Social Media Angle**: Content strategy notes
- **Growing Notes**: Start/direct sow times, bloom period, height
- **Planting Details**: Spacing, row placement, and cultivation notes

## Suppliers

| Order | Supplier | Order ID | Varieties |
|-------|----------|----------|-----------|
| 1 | Original | WEB-024012 | 16 |
| 2 | Moonglow Gardens | R709518406 | 12 |
| 3 | Stems Flower Farm | #29659 | 9 |
| 4 | Ontario Seed Co. | OSC-2026 | 20 |

## Garden Zones

1. **Foliage & Filler Strip** (16' deep) - Front of property
2. **Cut Flower Beds B** (15' deep) - Zinnias
3. **Cut Flower Beds A** (15' deep) - Mixed annuals
4. **Poppy Meadow** (14' deep) - Poppies and textural elements
5. **Kitchen Garden** (28' deep) - Tomatoes, herbs, edibles

## Regeneration

To regenerate these files from the source data:

```bash
node generate-seed-docs.cjs
```

This extracts data from `src/SeedPlan.jsx` and updates all 57 seed files.
