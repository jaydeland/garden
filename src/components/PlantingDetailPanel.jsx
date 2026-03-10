import { useState, useEffect, useRef, useMemo } from "react";
import { SEED_SPACING, SEED_TIMING } from "../seedData.js";
import { weekToDate, getHarvestWindow } from "../seedTiming.js";

// Convert hex colour + alpha to rgba string
function hexToRgba(hex, alpha) {
  if (!hex || hex.length < 7) return `rgba(0,0,0,${alpha})`;
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

// Extract a seed's height and detail text from the full placement string by name
function extractFromPlacement(seedName, placement) {
  if (!placement) return { height: null, detail: null };
  const escaped = seedName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  // Match: SeedName (height): description — stop at next entry (". Capital") or end
  const r = new RegExp(`${escaped}\\s*\\(([^)]+)\\):\\s*(.+?)(?=\\.\\s+[A-Z]|$)`, "is");
  const m = placement.match(r);
  if (!m) return { height: null, detail: null };
  return { height: m[1].trim(), detail: m[2].trim() };
}

// Extract spacing from placement detail text
function extractSpacing(detail) {
  if (!detail) return null;
  const spacingMatch = detail.match(/(?:space|spacing|thin to)\s*(?:[-–to]?\s*)?(\d+)\s*cm/i);
  return spacingMatch ? parseInt(spacingMatch[1], 10) : null;
}

// Build structured sowing steps from SEED_TIMING data
function buildSowingSteps(timing) {
  if (!timing) return [];
  const steps = [];

  if (timing.startMethod === "indoors" || timing.startMethod === "both") {
    steps.push({
      label: `Start indoors — ${weekToDate(timing.indoorStartWeek)}`,
      type: "indoor",
    });
  }

  if ((timing.startMethod === "direct" || timing.startMethod === "both") && timing.directSowWeek) {
    const depthNote = timing.sowDepth === "surface"
      ? " (surface, needs light)"
      : timing.sowDepth ? ` at ${timing.sowDepth}` : "";
    steps.push({
      label: `Direct sow — ${weekToDate(timing.directSowWeek)}${depthNote}`,
      type: "direct",
    });
  }

  if (timing.transplantWeek) {
    steps.push({
      label: `Transplant outdoors — ${weekToDate(timing.transplantWeek)}`,
      type: "transplant",
    });
  }

  if (timing.harvestStartWeek) {
    const harvest = getHarvestWindow(timing);
    steps.push({
      label: `Harvest — ${harvest.label}`,
      type: "harvest",
    });
  }

  return steps;
}

// Build sowing timeline data
function buildTimeline() {
  const months = ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"];
  const currentMonth = new Date().toLocaleString("default", { month: "short" });
  const currentIndex = months.indexOf(currentMonth);
  return { months, currentIndex };
}

const STEP_COLORS = {
  indoor: { dot: "#1E3A6E", text: "#1E3A6E" },
  direct: { dot: "#5A8B3A", text: "#3A6B22" },
  transplant: { dot: "#C9960A", text: "#8B6A18" },
  harvest: { dot: "#8B2020", text: "#6B1818" },
};

export default function PlantingDetailPanel({ zone, placementData, onSeedClick, selectedSeed, seedMeta }) {
  if (!zone) return null;

  const [expandedRowIdx, setExpandedRowIdx] = useState(null);
  const rowRefs = useRef([]);

  // Build name → color map from SEEDS array
  const seedColorMap = useMemo(() => {
    const map = new Map();
    (seedMeta || []).forEach(s => map.set(s.name, s.color));
    return map;
  }, [seedMeta]);

  // Auto-expand the row containing the selected seed
  useEffect(() => {
    if (!selectedSeed || !zone) return;
    const idx = zone.rows.findIndex(r => r.seeds?.includes(selectedSeed));
    if (idx !== -1) {
      setExpandedRowIdx(idx);
      rowRefs.current[idx]?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [selectedSeed, zone]);

  const { months, currentIndex } = buildTimeline();
  const zoneDepth = zone.depth || 0;
  const zoneWidth = 30; // feet
  const sqFt = zoneDepth * zoneWidth;
  const allSeeds = zone.rows.flatMap(r => r.seeds || []);
  const varietyCount = allSeeds.length;

  // Approximate depth per row (evenly divided)
  const rowDepthEst = zone.rows.length > 0
    ? Math.round(zoneDepth / zone.rows.length)
    : 0;

  return (
    <div style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}>

      {/* ── Zone Header ── */}
      <div style={{
        borderBottom: "2px solid #1A1208",
        paddingBottom: "14px",
        marginBottom: "20px",
        display: "flex",
        alignItems: "baseline",
        gap: "20px",
        flexWrap: "wrap",
      }}>
        <h3 style={{
          fontFamily: "'Cormorant SC', serif",
          fontSize: "21px",
          fontWeight: 600,
          letterSpacing: "2px",
          margin: 0,
          color: "#1A1208",
          paddingRight: "36px",
        }}>
          {zone.label}
        </h3>
        <div style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: "12px",
          letterSpacing: "1px",
          color: "#8B6A18",
        }}>
          {zoneWidth}′ × {zoneDepth}′ &nbsp;·&nbsp; {sqFt} sq ft &nbsp;·&nbsp; {varietyCount} {varietyCount === 1 ? "variety" : "varieties"}
        </div>
        <p style={{
          fontSize: "15px",
          fontStyle: "italic",
          color: "#6B5020",
          lineHeight: 1.6,
          margin: 0,
          flexBasis: "100%",
        }}>
          {zone.note}
        </p>
      </div>

      {/* ── Row Bars (ruler gutter + accordion) ── */}
      <div style={{ display: "flex", gap: "0", marginBottom: "4px" }}>

        {/* Left ruler gutter */}
        <div style={{
          width: "32px",
          flexShrink: 0,
          position: "relative",
          marginRight: "10px",
        }}>
          {/* Vertical spine */}
          <div style={{
            position: "absolute",
            right: "0",
            top: "0",
            bottom: "0",
            width: "1px",
            background: "rgba(139,106,24,0.3)",
          }} />

          {/* Tick marks + depth labels per row */}
          {zone.rows.map((row, idx) => {
            const seeds = row.seeds || [];
            if (seeds.length === 0) return null;
            return (
              <div
                key={idx}
                style={{
                  // Each row section gets equal visual weight; use percentage
                  height: `${100 / zone.rows.filter(r => (r.seeds || []).length > 0).length}%`,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-end",
                  paddingRight: "6px",
                  position: "relative",
                }}
              >
                {/* Tick mark */}
                <div style={{
                  position: "absolute",
                  right: "0",
                  top: "0",
                  width: "6px",
                  height: "1px",
                  background: "rgba(139,106,24,0.4)",
                }} />
                {/* Depth label */}
                {rowDepthEst > 0 && (
                  <span style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "12px",
                    letterSpacing: "0.3px",
                    color: "#8B6A18",
                    opacity: 0.7,
                    whiteSpace: "nowrap",
                  }}>
                    ~{rowDepthEst}′
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Row bars column */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "6px" }}>
          {zone.rows.map((row, rowIdx) => {
            const seeds = row.seeds || [];
            if (seeds.length === 0) return null;
            const isExpanded = expandedRowIdx === rowIdx;

            return (
              <div
                key={rowIdx}
                ref={el => rowRefs.current[rowIdx] = el}
              >
                {/* ── Row Bar Button ── */}
                <button
                  onClick={() => setExpandedRowIdx(isExpanded ? null : rowIdx)}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    padding: "10px 12px",
                    background: isExpanded
                      ? "linear-gradient(145deg, #1E3A6E, #152D57)"
                      : hexToRgba(zone.fill, 0.35),
                    border: `1px solid ${zone.stroke || "#C9960A"}`,
                    borderRadius: isExpanded ? "3px 3px 0 0" : "3px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={e => {
                    if (!isExpanded) e.currentTarget.style.background = hexToRgba(zone.fill, 0.55);
                  }}
                  onMouseLeave={e => {
                    if (!isExpanded) e.currentTarget.style.background = hexToRgba(zone.fill, 0.35);
                  }}
                >
                  {/* Row label */}
                  <span style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "12px",
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    color: isExpanded ? "#F5EDD0" : "#6B5020",
                    fontWeight: 500,
                    flex: 1,
                  }}>
                    {row.label}
                  </span>

                  {/* Seed colour chips */}
                  <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
                    {seeds.map((seedName, ci) => {
                      const color = seedColorMap.get(seedName) || "#8B6A18";
                      const isHighlighted = selectedSeed === seedName;
                      return (
                        <div
                          key={ci}
                          title={seedName}
                          style={{
                            width: isHighlighted ? "14px" : "10px",
                            height: isHighlighted ? "14px" : "10px",
                            borderRadius: "50%",
                            background: color,
                            flexShrink: 0,
                            boxShadow: isHighlighted
                              ? `0 0 0 2px ${isExpanded ? "#F5EDD0" : "#F9EDD0"}`
                              : "none",
                            transition: "all 0.15s ease",
                          }}
                        />
                      );
                    })}
                  </div>

                  {/* Varieties count */}
                  <span style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "12px",
                    color: isExpanded ? "rgba(245,237,208,0.65)" : "#8B6A18",
                    whiteSpace: "nowrap",
                    letterSpacing: "0.3px",
                  }}>
                    {seeds.length} {seeds.length === 1 ? "variety" : "varieties"}
                  </span>

                  {/* Chevron */}
                  <span style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "14px",
                    color: isExpanded ? "#C9960A" : "#8B6A18",
                    transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.2s ease",
                    lineHeight: 1,
                  }}>
                    ▾
                  </span>
                </button>

                {/* ── Accordion Body ── */}
                {isExpanded && (
                  <div style={{
                    background: "rgba(249,237,208,0.5)",
                    border: `1px solid ${zone.stroke || "#C9960A"}`,
                    borderTop: "none",
                    borderRadius: "0 0 3px 3px",
                    padding: "12px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}>
                    {seeds.map((seedName, ei) => {
                      const { height, detail } = extractFromPlacement(seedName, row.placement);
                      const timing = SEED_TIMING[seedName];
                      const spacing = SEED_SPACING[seedName]?.spacing || extractSpacing(detail);
                      const sowingSteps = buildSowingSteps(timing);
                      const hasTiming = sowingSteps.length > 0;
                      const isSelected = selectedSeed === seedName;

                      return (
                        <button
                          key={ei}
                          onClick={() => onSeedClick(seedName)}
                          style={{
                            textAlign: "left",
                            padding: "14px",
                            background: isSelected
                              ? "linear-gradient(145deg, #1E3A6E, #152D57)"
                              : "rgba(248,243,235,0.8)",
                            border: isSelected ? "1px solid #1E3A6E" : "1px solid rgba(196,168,130,0.35)",
                            borderRadius: "3px",
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                            width: "100%",
                          }}
                          onMouseEnter={e => {
                            if (!isSelected) e.currentTarget.style.background = "rgba(196,168,130,0.2)";
                          }}
                          onMouseLeave={e => {
                            if (!isSelected) e.currentTarget.style.background = "rgba(248,243,235,0.8)";
                          }}
                        >
                          {/* Plant name + height */}
                          <div style={{
                            fontFamily: "'Cormorant SC', serif",
                            fontSize: "16px",
                            fontWeight: 600,
                            color: isSelected ? "#F5EDD0" : "#1A1208",
                            marginBottom: hasTiming || spacing ? "10px" : 0,
                            display: "flex",
                            alignItems: "baseline",
                            gap: "8px",
                          }}>
                            {seedName}
                            {height && (
                              <span style={{
                                fontFamily: "'Outfit', sans-serif",
                                fontSize: "12px",
                                letterSpacing: "0.5px",
                                color: isSelected ? "rgba(245,237,208,0.55)" : "#8B6A18",
                                fontWeight: 400,
                              }}>
                                {height}
                              </span>
                            )}
                          </div>

                          {/* Structured sowing + harvest steps */}
                          {hasTiming && (
                            <div style={{ marginBottom: spacing ? "8px" : 0 }}>
                              {sowingSteps.map((step, si) => {
                                const colors = STEP_COLORS[step.type] || STEP_COLORS.indoor;
                                return (
                                  <div key={si} style={{
                                    fontFamily: "'Outfit', sans-serif",
                                    fontSize: "12px",
                                    letterSpacing: "0.3px",
                                    color: isSelected ? "rgba(245,237,208,0.9)" : colors.text,
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "7px",
                                    marginBottom: si < sowingSteps.length - 1 ? "3px" : 0,
                                    lineHeight: 1.4,
                                  }}>
                                    <span style={{
                                      width: "6px",
                                      height: "6px",
                                      borderRadius: "50%",
                                      background: isSelected ? "rgba(245,237,208,0.6)" : colors.dot,
                                      flexShrink: 0,
                                    }} />
                                    {step.label}
                                  </div>
                                );
                              })}
                            </div>
                          )}

                          {/* Spacing */}
                          {spacing && (
                            <div style={{
                              fontFamily: "'Outfit', sans-serif",
                              fontSize: "12px",
                              letterSpacing: "0.5px",
                              color: isSelected ? "rgba(245,237,208,0.6)" : "#8B6A18",
                              marginBottom: detail || timing?.notes ? "8px" : 0,
                            }}>
                              Space {spacing}cm apart
                            </div>
                          )}

                          {/* Placement detail text */}
                          {detail && (
                            <div style={{
                              fontSize: "13px",
                              fontStyle: "italic",
                              color: isSelected ? "rgba(245,237,208,0.8)" : "#7A5C1E",
                              lineHeight: 1.55,
                              borderTop: "1px solid",
                              borderColor: isSelected ? "rgba(245,237,208,0.12)" : "rgba(196,168,130,0.25)",
                              paddingTop: "8px",
                            }}>
                              {detail}
                            </div>
                          )}

                          {/* Cultivation notes from SEED_TIMING */}
                          {timing?.notes && (
                            <div style={{
                              fontFamily: "'Outfit', sans-serif",
                              fontSize: "12px",
                              color: isSelected ? "rgba(245,237,208,0.65)" : "#8B6A18",
                              marginTop: "6px",
                              fontStyle: "italic",
                            }}>
                              ✦ {timing.notes}
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Sowing Timeline (full width, bottom) ── */}
      <div style={{
        marginTop: "28px",
        paddingTop: "18px",
        borderTop: "2px solid rgba(26,18,8,0.12)",
      }}>
        <div style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: "12px",
          letterSpacing: "1px",
          textTransform: "uppercase",
          color: "#8B6A18",
          marginBottom: "10px",
        }}>
          Sowing Timeline
        </div>
        <div style={{
          display: "flex",
          alignItems: "flex-end",
          gap: "4px",
          paddingBottom: "8px",
        }}>
          {months.map((month, idx) => {
            const isCurrent = idx === currentIndex;
            const isSowingMonth = ["Feb", "Mar", "Apr", "May"].includes(month);

            return (
              <div
                key={month}
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <div style={{
                  width: "100%",
                  height: isSowingMonth ? "24px" : "8px",
                  background: isSowingMonth
                    ? isCurrent
                      ? "linear-gradient(145deg, #1E3A6E, #152D57)"
                      : "linear-gradient(145deg, #C9960A, #8B6A18)"
                    : "rgba(196,168,130,0.2)",
                  borderRadius: "2px",
                  transition: "all 0.3s ease",
                  position: "relative",
                }}>
                  {isCurrent && (
                    <div style={{
                      position: "absolute",
                      top: "-4px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "0",
                      height: "0",
                      borderLeft: "5px solid transparent",
                      borderRight: "5px solid transparent",
                      borderBottom: "6px solid #1E3A6E",
                    }} />
                  )}
                </div>
                <span style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "12px",
                  letterSpacing: "0.5px",
                  color: isCurrent ? "#1E3A6E" : "#8B6A18",
                  fontWeight: isCurrent ? 600 : 400,
                }}>
                  {month}
                </span>
              </div>
            );
          })}
        </div>
        {currentIndex >= 0 && (
          <div style={{
            fontSize: "12px",
            fontStyle: "italic",
            color: "#7A5C1E",
            textAlign: "center",
            marginTop: "8px",
          }}>
            We are in {months[currentIndex]} — {currentIndex < 2 ? "The first whispers of the Season" : currentIndex < 5 ? "Society begins to stir" : "The grand debut"}
          </div>
        )}
      </div>
    </div>
  );
}
