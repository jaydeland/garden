import { SEED_SPACING } from "../seedData.js";

// Extract spacing from placement detail text
function extractSpacing(detail) {
  const spacingMatch = detail.match(/(?:space|spacing|thin to)\s*(?:[-–to]?\s*)?(\d+)\s*cm/i);
  return spacingMatch ? parseInt(spacingMatch[1], 10) : null;
}

// Get sowing method from detail text
function getMethod(detail) {
  if (/direct sow/i.test(detail)) return "Direct sow";
  if (/surface|light to germinate/i.test(detail)) return "Surface sow";
  if (/start indoors|transplant|cold-stratify/i.test(detail)) return "Start indoors";
  return "Sow";
}

// Get timing week or month from detail text
function getTiming(detail) {
  const weekMatch = detail.match(/Week\s*(\d+)/i);
  if (weekMatch) return `Week ${weekMatch[1]}`;

  const monthMatch = detail.match(/\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b/i);
  if (monthMatch) return monthMatch[1];

  if (/early\s+apr/i.test(detail)) return "Early Apr";
  if (/late\s+may/i.test(detail)) return "Late May";
  if (/last frost/i.test(detail)) return "After last frost";
  if (/cold soil/i.test(detail)) return "Cold soil";

  return null;
}

// Build sowing timeline data
function buildTimeline() {
  const months = ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"];
  const currentMonth = new Date().toLocaleString("default", { month: "short" });
  const currentIndex = months.indexOf(currentMonth);

  return { months, currentIndex };
}

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
      background: "rgba(255,255,255,0.9)",
      border: "1px solid rgba(196,168,130,0.4)",
      borderRadius: "3px",
      padding: "20px",
      fontFamily: "'Cormorant Garamond', 'Georgia', serif",
      boxShadow: "0 4px 20px rgba(26,18,8,0.08)",
    }}>
      {/* Zone Header */}
      <div style={{
        borderBottom: "2px solid #1A1208",
        paddingBottom: "12px",
        marginBottom: "16px",
      }}>
        <h3 style={{
          fontFamily: "'Cormorant SC', serif",
          fontSize: "20px",
          fontWeight: 600,
          letterSpacing: "2px",
          margin: "0 0 8px",
          color: "#1A1208",
        }}>
          {zone.label}
        </h3>
        <div style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: "13px",
          letterSpacing: "1px",
          color: "#8B6A18",
          marginBottom: "8px",
        }}>
          {zoneWidth}' × {zoneDepth}' = {sqFt} sq ft · {varietyCount} varieties
        </div>
        <p style={{
          fontSize: "15px",
          fontStyle: "italic",
          color: "#6B5020",
          lineHeight: 1.6,
          margin: 0,
        }}>
          {zone.note}
        </p>
      </div>

      {/* Placement Cards by Row */}
      <div style={{ marginBottom: "20px" }}>
        {zone.rows.map((row, rowIdx) => {
          const entries = (() => {
            const regex = /([A-Z][a-zA-Z\s&'+-]+(?:,\s*[A-Z][a-zA-Z\s&'+-]+)*)\s*(?:\(all\s+)?(\d+(?:[–-]\d+)?\s*cm)\)?:\s*([^:]+?(?=,\s*[A-Z]|\n|$))/gs;
            const matches = [];
            let m;
            while ((m = regex.exec(row.placement)) !== null) {
              const plantNamesStr = m[1].trim();
              const detail = (m[3] || '').trim();
              const plantNames = plantNamesStr.split(',').map(n => n.trim()).filter(n => n);
              plantNames.forEach(name => {
                matches.push({ name, detail, height: m[2] });
              });
            }
            return matches;
          })();

          if (entries.length === 0) return null;

          return (
            <div key={rowIdx} style={{ marginBottom: "16px" }}>
              <div style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "12px",
                letterSpacing: "1px",
                textTransform: "uppercase",
                color: "#8B6A18",
                marginBottom: "8px",
                borderBottom: "1px solid rgba(196,168,130,0.25)",
                paddingBottom: "4px",
              }}>
                {row.label}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {entries.map((entry, ei) => {
                  const seedData = placementData?.find(p => p.plant === entry.name);
                  const spacing = SEED_SPACING[entry.name]?.spacing || extractSpacing(entry.detail);
                  const method = getMethod(entry.detail);
                  const timing = getTiming(entry.detail);

                  const isSelected = selectedSeed === entry.name;

                  return (
                    <button
                      key={ei}
                      onClick={() => onSeedClick(entry.name)}
                      style={{
                        textAlign: "left",
                        padding: "12px",
                        background: isSelected
                          ? "linear-gradient(145deg, #1E3A6E, #152D57)"
                          : "rgba(248,243,235,0.7)",
                        border: isSelected ? "1px solid #1E3A6E" : "1px solid rgba(196,168,130,0.3)",
                        borderRadius: "2px",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        width: "100%",
                      }}
                      onMouseEnter={e => {
                        if (!isSelected) {
                          e.currentTarget.style.background = "rgba(196,168,130,0.2)";
                        }
                      }}
                      onMouseLeave={e => {
                        if (!isSelected) {
                          e.currentTarget.style.background = "rgba(248,243,235,0.7)";
                        }
                      }}
                    >
                      <div style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "16px",
                        fontWeight: 600,
                        color: isSelected ? "#F5EDD0" : "#1A1208",
                        marginBottom: "4px",
                      }}>
                        {entry.name}
                      </div>
                      <div style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: "12px",
                        letterSpacing: "0.5px",
                        color: isSelected ? "rgba(245,237,208,0.9)" : "#6B5020",
                        marginBottom: "4px",
                      }}>
                        {[method, timing, spacing ? `${spacing}cm` : null].filter(Boolean).join(" · ") || "Sowing details"}
                      </div>
                      {entry.detail && (
                        <div style={{
                          fontSize: "13px",
                          fontStyle: "italic",
                          color: isSelected ? "rgba(245,237,208,0.85)" : "#7A5C1E",
                          lineHeight: 1.5,
                        }}>
                          {entry.detail.length > 120 ? entry.detail.slice(0, 120) + "…" : entry.detail}
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

      {/* Sowing Timeline Bar */}
      <div style={{
        borderTop: "2px solid #1A1208",
        paddingTop: "16px",
        marginTop: "20px",
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
