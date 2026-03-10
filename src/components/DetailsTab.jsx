import { useMemo } from "react";
import { SEED_SPACING, SEED_TIMING } from "../seedData.js";

// 30-foot row width
const ROW_WIDTH_CM = 30 * 30.48; // 914.4 cm
const ROW_WIDTH_FT = 30;

// Per-plant season yield estimates
const YIELD_LOOKUP = {
  "Zinnia Lilliput Rose": { qty: 40, unit: "stems", note: "pinch for branching" },
  "Zinnia Zinderella Lilac": { qty: 35, unit: "stems", note: "scabiosa form" },
  "Zinnia Molotov Mix": { qty: 35, unit: "stems", note: "cactus-type" },
  "Zinnia Peaches + Cream": { qty: 35, unit: "stems", note: "soft doubles" },
  "Zinnia Queeny Lime Orange": { qty: 30, unit: "stems", note: "tall Queeny series" },
  "Zinnia Queeny Lime Blotch": { qty: 30, unit: "stems", note: "tall Queeny series" },
  "Zinnia Queeny Lemon Peach": { qty: 30, unit: "stems", note: "tall Queeny series" },
  "Red Breadseed Poppy": { qty: 20, unit: "stems + pods", note: "1 flush + dried pods Sep" },
  "Poppy Hens & Chicks": { qty: 18, unit: "stems + pods", note: "crown pods highly prized" },
  "Shirley Poppy Pastel Doubles": { qty: 18, unit: "stems", note: "harvest as bud for vase" },
  "Snapdragon Rocket Hybrids": { qty: 20, unit: "stems", note: "tall 100cm spikes" },
  "Snapdragon Panorama Mixed": { qty: 18, unit: "stems", note: "75cm mid-height" },
  "Cornflower Classic Romantic": { qty: 25, unit: "stems", note: "stake to prevent sprawl" },
  "Cornflower Blue Diadem": { qty: 25, unit: "stems", note: "true blue" },
  "Nigella Miss Jekyll": { qty: 25, unit: "stems + pods", note: "alien pods bonus harvest" },
  "Nigella Persian Jewels": { qty: 25, unit: "stems + pods", note: "colour mix" },
  "Nigella Cramer's Plum": { qty: 22, unit: "stems + pods", note: "60cm moody plum" },
  "Love in a Mist Cramer's Plum Loco": { qty: 22, unit: "stems + pods", note: "succession harvest" },
  "Pansy Chianti Shades F1": { qty: 45, unit: "blooms", note: "spring edging season" },
  "Pansy Inspire True Blue": { qty: 45, unit: "blooms", note: "early spring season" },
  "Pansy Super Swiss Giants": { qty: 40, unit: "blooms", note: "large-faced" },
  "African Marigold Glow Up Gold": { qty: 25, unit: "stems", note: "90cm pom-poms" },
  "French Marigold Petite Yellow": { qty: 60, unit: "blooms", note: "compact edging" },
  "Callistephus Classic Salmon Rose": { qty: 18, unit: "stems", note: "late-season Aug–Oct" },
  "Caramel Rudbeckia": { qty: 35, unit: "stems", note: "long Jul–Oct harvest" },
  "Kiwi Blue Honeywort": { qty: 25, unit: "stems", note: "unusual blue bells" },
  "Blue Glitter Sea Holly": { qty: 8, unit: "stems", note: "metallic blue, fresh + dried" },
  "Statice Art Shades Mixed": { qty: 18, unit: "stems", note: "harvest 80% open for drying" },
  "Strawflower Mixed Colours": { qty: 18, unit: "stems", note: "harvest for drying" },
  "Pyretheum Painted Daisy": { qty: 25, unit: "stems", note: "Jun–Aug" },
  "Bells of Ireland": { qty: 12, unit: "stems", note: "architectural filler" },
  "Edelweiss": { qty: 12, unit: "blooms", note: "alpine, compact" },
  "Ozark Sundrop": { qty: 22, unit: "blooms", note: "opens evening–morning" },
  "Lupin Pink Fairy": { qty: 4, unit: "spikes", note: "Year 2 only" },
  "Lupins Russells Red": { qty: 4, unit: "spikes", note: "Year 2 only" },
  "Bupleurum Green Gold": { qty: 25, unit: "stems", note: "essential filler" },
  "Cress Attraxa": { qty: 18, unit: "stems", note: "textural seed heads" },
  "Orach Ruby Gold": { qty: null, unit: "foliage", note: "season-long foliage harvest" },
  "Utrecht Blue Millet & Wheat": { qty: 12, unit: "stems", note: "harvest blue-grey for dried" },
  "Sedum Spirit": { qty: 12, unit: "clusters", note: "Aug–Oct, perennial" },
  "Lavender": { qty: 10, unit: "stems", note: "Year 2 full flowering" },
  "Brussels Sprouts Flower Sprout": { qty: 0.75, unit: "lb", note: "harvest Oct after frost" },
  "Wulff Dill": { qty: null, unit: "harvests", note: "succession cut weekly" },
  "Brown Sugar Tomato": { qty: 10, unit: "lbs", note: "indeterminate, tall cage" },
  "Moonglow Jewel Tomato F2": { qty: 7, unit: "lbs", note: "F2 — size varies" },
  "White Tomesol Tomato": { qty: 10, unit: "lbs", note: "tall indeterminate" },
  "Blueberry Dessert Tomato": { qty: 8, unit: "lbs", note: "blue-black cherries" },
  "Wolverine Tomato": { qty: 8, unit: "lbs", note: "semi-indeterminate striped" },
  "Gunmetal Gray Dwarf Tomato": { qty: 5, unit: "lbs", note: "compact dwarf" },
  "Candyland Tomato": { qty: 4, unit: "lbs", note: "cascading cherry clusters" },
  "Superbunny Microdwarf Tomato": { qty: 1, unit: "lb", note: "micro 20cm plant" },
  "Ground Cherry": { qty: 1.5, unit: "cups", note: "harvest from ground daily" },
  "Sweet Basil": { qty: null, unit: "harvests", note: "cut weekly Jun–frost" },
  "Spicy Globe Basil": { qty: null, unit: "harvests", note: "ornamental dome, cut as needed" },
  "Blue Spice Bush Basil": { qty: null, unit: "harvests", note: "vanilla-anise, cut as needed" },
  "Rosemary": { qty: null, unit: "harvests", note: "foliage from May, bring in Oct" },
  "Kew Garden Collection": { qty: null, unit: "varies", note: "follow per-variety instructions" },
};

function weekToLabel(week) {
  if (week == null) return null;
  if (week <= 8)  return "late Feb";
  if (week <= 10) return "mid-Mar";
  if (week <= 12) return "late Mar";
  if (week <= 14) return "early Apr";
  if (week <= 16) return "mid-Apr";
  if (week <= 18) return "late Apr";
  if (week <= 19) return "early May";
  if (week <= 20) return "mid-May";
  if (week <= 21) return "late May";
  if (week <= 23) return "early Jun";
  if (week <= 25) return "mid-Jun";
  if (week <= 27) return "early Jul";
  if (week <= 28) return "mid-Jul";
  if (week <= 30) return "late Jul";
  if (week <= 31) return "early Aug";
  if (week <= 33) return "mid-Aug";
  if (week <= 36) return "early Sep";
  if (week <= 38) return "mid-Sep";
  if (week <= 40) return "early Oct";
  if (week <= 42) return "mid-Oct";
  return "late Oct";
}

// Compute per-seed measurements for a row
function computeRowData(row, seedMap) {
  const n = row.seeds.length;
  const blockWidthCm = ROW_WIDTH_CM / n;
  const blockWidthFt = ROW_WIDTH_FT / n;

  return row.seeds.map((name) => {
    const seed = seedMap[name] || {};
    const spacingEntry = SEED_SPACING[name];
    const spacing = spacingEntry?.spacing ?? null;
    const timing = SEED_TIMING[name] || {};
    const yieldInfo = YIELD_LOOKUP[name] || { qty: null, unit: "—", note: "" };

    let plantCount = null;
    if (spacing != null && spacing > 0) {
      plantCount = Math.floor(blockWidthCm / spacing);
    }

    const totalYield =
      plantCount != null && yieldInfo.qty != null
        ? Math.round(plantCount * yieldInfo.qty)
        : null;

    return {
      name,
      seed,
      spacing,
      blockWidthCm: Math.round(blockWidthCm),
      blockWidthFt: blockWidthFt.toFixed(1),
      plantCount,
      timing,
      yieldInfo,
      totalYield,
    };
  });
}

// ─── Row Visualization Bar ────────────────────────────────────────────────────

function RowVisualization({ row, seedMap }) {
  const data = computeRowData(row, seedMap);

  return (
    <div style={{ marginBottom: "16px" }}>
      <div
        style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: "10px",
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "#8B6A18",
          marginBottom: "6px",
        }}
      >
        {row.label}
        <span
          style={{
            fontWeight: 400,
            marginLeft: "8px",
            color: "#6B5020",
            letterSpacing: "0",
            textTransform: "none",
          }}
        >
          — {ROW_WIDTH_FT}′ wide · {row.seeds.length} variet{row.seeds.length === 1 ? "y" : "ies"}
        </span>
      </div>

      {/* Color bar */}
      <div
        style={{
          display: "flex",
          height: "80px",
          borderRadius: "4px",
          overflow: "hidden",
          border: "1px solid rgba(180,140,60,0.35)",
        }}
      >
        {data.map((d, i) => {
          const hex = d.seed.color || "#999999";
          const isScatter = d.spacing == null;
          const bg = isScatter
            ? `repeating-linear-gradient(45deg, ${hex}55 0px, ${hex}55 6px, ${hex}22 6px, ${hex}22 12px)`
            : `${hex}55`;

          return (
            <div
              key={i}
              style={{
                flex: 1,
                background: bg,
                borderRight: i < data.length - 1 ? `1px solid ${hex}88` : "none",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "4px 2px",
                minWidth: 0,
                textAlign: "center",
              }}
            >
              <span style={{ fontSize: "16px", lineHeight: 1 }}>{d.seed.emoji || "🌱"}</span>
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "9.5px",
                  color: "#1A1208",
                  fontWeight: 600,
                  lineHeight: 1.2,
                  marginTop: "3px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  maxWidth: "100%",
                }}
              >
                {d.name.split(" ").slice(0, 2).join(" ")}
              </span>
              {d.plantCount != null ? (
                <span
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "18px",
                    fontWeight: 700,
                    color: "#1E3A6E",
                    lineHeight: 1,
                    marginTop: "2px",
                  }}
                >
                  {d.plantCount}
                </span>
              ) : (
                <span
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "9px",
                    color: "#6B5020",
                    fontStyle: "italic",
                    marginTop: "2px",
                  }}
                >
                  scatter
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Measurement + yield strip below the bar */}
      <div style={{ display: "flex" }}>
        {data.map((d, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              padding: "4px 2px",
              minWidth: 0,
              textAlign: "center",
              borderRight: i < data.length - 1 ? "1px solid rgba(180,140,60,0.2)" : "none",
            }}
          >
            <div
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "9px",
                color: "#6B5020",
                letterSpacing: "0.05em",
                lineHeight: 1.4,
              }}
            >
              {d.blockWidthFt}′ · {d.blockWidthCm}cm
              {d.spacing != null && (
                <span style={{ display: "block", color: "#8B6A18" }}>
                  @{d.spacing}cm sp.
                </span>
              )}
            </div>
            {d.totalYield != null ? (
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "10px",
                  color: "#1A1208",
                  fontWeight: 700,
                  marginTop: "2px",
                }}
              >
                ~{d.totalYield} {d.yieldInfo.unit}
              </div>
            ) : d.yieldInfo.note ? (
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "9px",
                  color: "#7A5C1E",
                  fontStyle: "italic",
                  marginTop: "2px",
                }}
              >
                {d.yieldInfo.note}
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Sowing & Harvest Summary ─────────────────────────────────────────────────

function SowingHarvestSummary({ zone, seedMap }) {
  const allSeedNames = zone.rows.flatMap((r) => r.seeds);
  const unique = [...new Set(allSeedNames)];

  if (unique.length === 0) return null;

  return (
    <div style={{ marginTop: "20px" }}>
      <div
        style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: "10px",
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "#8B6A18",
          borderBottom: "1px solid rgba(180,140,60,0.35)",
          paddingBottom: "6px",
          marginBottom: "12px",
        }}
      >
        Sowing & Harvest Schedule
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "10px",
        }}
      >
        {unique.map((name) => {
          const seed = seedMap[name] || {};
          const t = SEED_TIMING[name] || {};
          const hex = seed.color || "#999999";

          const indoorLabel = weekToLabel(t.indoorStartWeek);
          const transplantLabel = weekToLabel(t.transplantWeek);
          const directLabel = weekToLabel(t.directSowWeek);
          const harvestStart = weekToLabel(t.harvestStartWeek);
          const harvestEnd = weekToLabel(t.harvestEndWeek);

          const badge = (label, color) => (
            <span
              style={{
                display: "inline-block",
                background: color,
                color: "#fff",
                fontFamily: "'Outfit', sans-serif",
                fontSize: "8px",
                fontWeight: 700,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                borderRadius: "2px",
                padding: "1px 4px",
                marginRight: "3px",
                marginBottom: "3px",
              }}
            >
              {label}
            </span>
          );

          return (
            <div
              key={name}
              style={{
                background: `${hex}18`,
                border: `1px solid ${hex}55`,
                borderRadius: "5px",
                padding: "8px 10px",
              }}
            >
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "#1A1208",
                  marginBottom: "5px",
                  lineHeight: 1.2,
                }}
              >
                {seed.emoji || "🌱"} {name}
              </div>

              <div style={{ lineHeight: 1.6 }}>
                {indoorLabel && badge(`Indoors ${indoorLabel}`, "#1E3A6E")}
                {transplantLabel && badge(`Transplant ${transplantLabel}`, "#2E6B4E")}
                {directLabel && badge(`Direct ${directLabel}`, "#7B4F00")}
                {harvestStart && (
                  <span
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: "9px",
                      color: "#6B5020",
                      display: "block",
                      marginTop: "2px",
                    }}
                  >
                    ✂ Harvest: {harvestStart}
                    {harvestEnd && harvestEnd !== harvestStart ? ` – ${harvestEnd}` : ""}
                  </span>
                )}
                {t.notes && (
                  <span
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontSize: "9.5px",
                      color: "#7A5C1E",
                      fontStyle: "italic",
                      display: "block",
                      marginTop: "2px",
                    }}
                  >
                    {t.notes}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Zone Detail Card ─────────────────────────────────────────────────────────

function ZoneDetailCard({ zone, seedMap }) {
  if (zone.rows.length === 0) return null; // skip path zones

  return (
    <div
      style={{
        background: "rgba(249,237,208,0.6)",
        border: `2px solid ${zone.stroke || "rgba(180,140,60,0.35)"}`,
        borderRadius: "8px",
        padding: "20px 22px",
        marginBottom: "24px",
        pageBreakInside: "avoid",
      }}
    >
      {/* Zone header */}
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: "10px",
          marginBottom: "4px",
        }}
      >
        <span
          style={{
            fontFamily: "'Cormorant SC', 'Cormorant Garamond', Georgia, serif",
            fontSize: "18px",
            fontWeight: 700,
            color: "#1A1208",
          }}
        >
          {zone.label}
        </span>
        <span
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "11px",
            color: "#8B6A18",
            letterSpacing: "0.06em",
          }}
        >
          {zone.depth}′ deep · 30′ wide
        </span>
      </div>

      {zone.note && (
        <p
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "12px",
            fontStyle: "italic",
            color: "#7A5C1E",
            margin: "0 0 14px",
          }}
        >
          {zone.note}
        </p>
      )}

      <div
        style={{
          borderTop: "1px solid rgba(180,140,60,0.35)",
          paddingTop: "14px",
          marginTop: zone.note ? "0" : "12px",
        }}
      >
        {zone.rows.map((row, i) => (
          <RowVisualization key={i} row={row} seedMap={seedMap} />
        ))}
      </div>

      <SowingHarvestSummary zone={zone} seedMap={seedMap} />
    </div>
  );
}

// ─── Main DetailsTab Component ────────────────────────────────────────────────

export default function DetailsTab({ zones, seeds }) {
  const seedMap = useMemo(() => {
    const map = {};
    seeds.forEach((s) => {
      map[s.name] = s;
    });
    return map;
  }, [seeds]);

  return (
    <div style={{ padding: "0 0 40px" }}>
      {/* Print styles */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; }
          * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
      `}</style>

      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "12px",
          marginBottom: "28px",
        }}
      >
        <div>
          <p
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "15px",
              fontStyle: "italic",
              color: "#7A5C1E",
              margin: "0 0 4px",
            }}
          >
            "Dear Reader, the measurements herein are Lady Gardendown's finest intelligence —
            plant counts, block widths, and the full harvest ledger of the 2026 Season."
          </p>
          <p
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "10px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#8B6A18",
              margin: 0,
            }}
          >
            Each block = equal share of 30′ row · plant counts at recommended spacing · ▨ = scatter sow
          </p>
        </div>

        <button
          className="no-print"
          onClick={() => window.print()}
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "12px",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            background: "linear-gradient(145deg, #1E3A6E, #152D57)",
            color: "#F5EDD0",
            border: "none",
            borderRadius: "5px",
            padding: "10px 18px",
            cursor: "pointer",
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}
        >
          ✦ Print Schematic
        </button>
      </div>

      {/* Zone cards */}
      {zones.map((zone) => (
        <ZoneDetailCard key={zone.id} zone={zone} seedMap={seedMap} />
      ))}
    </div>
  );
}
