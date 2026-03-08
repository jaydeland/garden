import { SEED_SPACING, SEED_TIMING } from "../seedData.js";
import { weekToDate, getHarvestWindow } from "../seedTiming.js";

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

export default function PlantingDetailPanel({ zone, placementData, onSeedClick, selectedSeed }) {
  if (!zone) return null;

  const { months, currentIndex } = buildTimeline();
  const zoneDepth = zone.depth || 0;
  const zoneWidth = 30; // feet
  const sqFt = zoneDepth * zoneWidth;
  const allSeeds = zone.rows.flatMap(r => r.seeds || []);
  const varietyCount = allSeeds.length;

  return (
    <div style={{
      fontFamily: "'Cormorant Garamond', 'Georgia', serif",
      display: "grid",
      gridTemplateColumns: "1fr 320px",
      gridTemplateRows: "auto 1fr",
      gap: "0 32px",
    }}>
      {/* Zone Header — spans both columns */}
      <div style={{
        gridColumn: "1 / -1",
        borderBottom: "2px solid #1A1208",
        paddingBottom: "14px",
        marginBottom: "18px",
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
          paddingRight: "36px", // space for × button
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

      {/* Left column: Planting Plan by Row */}
      <div style={{ marginBottom: "20px" }}>
        {zone.rows.map((row, rowIdx) => {
          const seeds = row.seeds || [];
          if (seeds.length === 0) return null;

          return (
            <div key={rowIdx} style={{ marginBottom: "20px" }}>
              <div style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "11px",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                color: "#8B6A18",
                marginBottom: "10px",
                borderBottom: "1px solid rgba(196,168,130,0.25)",
                paddingBottom: "4px",
              }}>
                {row.label}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
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
                            fontSize: "11px",
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
                          fontSize: "11px",
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
                          fontSize: "11px",
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
            </div>
          );
        })}
      </div>

      {/* Right column: Sowing Timeline */}
      <div style={{
        borderLeft: "1px solid rgba(196,168,130,0.4)",
        paddingLeft: "24px",
        alignSelf: "start",
      }}>
        <div style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: "11px",
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
                  fontSize: "10px",
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
