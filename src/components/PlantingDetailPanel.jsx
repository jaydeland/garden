import { SEED_SPACING, getSeedTimingWithDefaults } from "../seedData.js";
import { weekToDate, getSowingWindow, getHarvestWindow } from "../seedTiming.js";

// ─── helpers ───────────────────────────────────────────────────────────────

// Parse the first sowing month from a placement detail string
function getSowMonth(detail) {
  if (/direct sow.*?early\s+ap/i.test(detail)) return "Early Apr";
  if (/direct sow.*?apr/i.test(detail))        return "Apr";
  if (/direct sow.*?may/i.test(detail))        return "May";
  if (/start indoors.*?feb/i.test(detail))     return "Feb";
  if (/start indoors.*?mar/i.test(detail))     return "Mar";
  if (/start indoors.*?apr/i.test(detail))     return "Apr";
  const m = detail.match(/\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b/i);
  return m ? m[1] : null;
}

// Extract a harvest snippet from a placement detail string
function getHarvestNote(detail) {
  const m = detail.match(/harvest[^;.—\n]{5,80}/i);
  return m ? m[0].trim() : null;
}

// Get primary sowing method label
function getMethod(detail) {
  if (/direct sow/i.test(detail))               return "Direct sow";
  if (/surface[- ]sow|surface sow/i.test(detail)) return "Surface sow";
  if (/broadcast/i.test(detail))                return "Broadcast";
  if (/start indoors/i.test(detail))            return "Start indoors";
  return "Sow";
}

// Convert a week number to a short label e.g. "Wk 10 · Early Mar"
function weekLabel(w) {
  if (!w) return null;
  return `Wk ${w} · ${weekToDate(w)}`;
}

// ─── TODO ──────────────────────────────────────────────────────────────────
// getCurrentActions — returns an array of urgent/upcoming actions for this zone.
//
// Each action: { urgency: "now"|"soon"|"upcoming", plant: string, action: string }
// "now"      = within ±1 week of currentWeek  (do this immediately)
// "soon"     = within +4 weeks                (prep/watch)
// "upcoming" = within +8 weeks                (on the horizon)
//
// Trade-offs to consider:
//   - Should "now" fire for direct sow seeds when soil is still frozen? (Zone 6b
//     typically has frost until late April; poppies want cold soil, others don't.)
//   - Should you surface perennial seeds that were already started (e.g., Lavender
//     indoorStartWeek=8 when currentWeek=10) as "missed" or quietly skip them?
//   - Tomatoes are started Week 14 indoors — worth flagging in Week 10 as "soon"?
//
// Fill in the function body (5–10 lines) to return a filtered, sorted action list.
// Use: getSeedTimingWithDefaults(seedName) → { startMethod, indoorStartWeek,
//       directSowWeek, transplantWeek, harvestStartWeek, harvestEndWeek }
// and: weekToDate(weekNum) → "Early March" style labels

function getCurrentActions(zone, currentWeek) {
  const actions = [];

  // TODO: Implement this function.
  // Example skeleton — replace with your logic:
  //
  // zone.rows.forEach(row => {
  //   row.seeds.forEach(seedName => {
  //     const timing = getSeedTimingWithDefaults(seedName);
  //     if (!timing) return;
  //     const startWeek = timing.startMethod === "direct"
  //       ? timing.directSowWeek
  //       : timing.indoorStartWeek;
  //     if (!startWeek) return;
  //     const weeksAway = startWeek - currentWeek;
  //     // determine urgency based on weeksAway, push to actions
  //   });
  // });
  //
  // return actions.sort(...);

  return actions;
}

// ─── Sowing + Harvest mini-timeline bar ────────────────────────────────────
// Week 1 = Jan 1; Week 52 = late Dec
// We show Feb (wk 6) → Oct (wk 42) — the active garden season
const SEASON_WEEKS = { start: 6, end: 42 }; // Feb → Oct frost

function SeasonBar({ timing, accent }) {
  if (!timing) return null;

  const { start: seasonStart, end: seasonEnd } = SEASON_WEEKS;
  const span = seasonEnd - seasonStart;

  const toPercent = (w) => Math.max(0, Math.min(100, ((w - seasonStart) / span) * 100));

  // Sow window
  const sowStart = timing.startMethod === "direct" ? timing.directSowWeek : timing.indoorStartWeek;
  const sowEnd   = timing.transplantWeek || (sowStart ? sowStart + 3 : null);

  // Harvest window
  const hStart = timing.harvestStartWeek;
  const hEnd   = timing.harvestEndWeek;

  const currentWeek = Math.ceil((new Date("2026-03-07") - new Date(new Date("2026-03-07").getFullYear(), 0, 1)) / (7 * 24 * 60 * 60 * 1000));

  return (
    <div style={{ marginTop: "10px" }}>
      {/* Track */}
      <div style={{ position: "relative", height: "10px", background: "rgba(196,168,130,0.15)", borderRadius: "4px", margin: "0 0 4px" }}>
        {/* Sow bar */}
        {sowStart && sowEnd && (
          <div style={{
            position: "absolute",
            left: `${toPercent(sowStart)}%`,
            width: `${toPercent(sowEnd) - toPercent(sowStart)}%`,
            height: "100%",
            background: "linear-gradient(90deg, #C9960A, #8B6A18)",
            borderRadius: "4px",
            opacity: 0.85,
          }} />
        )}
        {/* Harvest bar */}
        {hStart && hEnd && (
          <div style={{
            position: "absolute",
            left: `${toPercent(hStart)}%`,
            width: `${toPercent(hEnd) - toPercent(hStart)}%`,
            height: "100%",
            background: accent || "linear-gradient(90deg, #2D7A3A, #1A5228)",
            borderRadius: "4px",
            opacity: 0.7,
          }} />
        )}
        {/* Today marker */}
        <div style={{
          position: "absolute",
          left: `${toPercent(currentWeek)}%`,
          top: "-3px",
          bottom: "-3px",
          width: "2px",
          background: "#1E3A6E",
          borderRadius: "1px",
        }} />
      </div>
      {/* Month labels */}
      <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "'Outfit', sans-serif", fontSize: "9px", color: "#A89474", letterSpacing: "0.5px" }}>
        {["Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct"].map(m => <span key={m}>{m}</span>)}
      </div>
      {/* Legend */}
      <div style={{ display: "flex", gap: "12px", marginTop: "4px", fontFamily: "'Outfit', sans-serif", fontSize: "10px", color: "#8B6A18" }}>
        <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <span style={{ display: "inline-block", width: "10px", height: "6px", background: "linear-gradient(90deg,#C9960A,#8B6A18)", borderRadius: "2px" }} /> Sow
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <span style={{ display: "inline-block", width: "10px", height: "6px", background: accent || "linear-gradient(90deg,#2D7A3A,#1A5228)", borderRadius: "2px", opacity: 0.7 }} /> Harvest
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <span style={{ display: "inline-block", width: "2px", height: "10px", background: "#1E3A6E", borderRadius: "1px" }} /> Today
        </span>
      </div>
    </div>
  );
}

// ─── Main component ─────────────────────────────────────────────────────────

export default function PlantingDetailPanel({ zone, placementData, onSeedClick, selectedSeed }) {
  if (!zone) return null;

  const currentWeek = Math.ceil(
    (new Date("2026-03-07") - new Date(new Date("2026-03-07").getFullYear(), 0, 1)) / (7 * 24 * 60 * 60 * 1000)
  );

  const allSeeds    = zone.rows.flatMap(r => r.seeds || []);
  const sqFt        = zone.depth * 30;
  const urgentActions = getCurrentActions(zone, currentWeek);

  return (
    <div style={{
      background: "linear-gradient(160deg, #FAEFD8 0%, #F0E0B8 100%)",
      border: "2px solid rgba(196,168,130,0.5)",
      borderRadius: "4px",
      fontFamily: "'Cormorant Garamond', Georgia, serif",
    }}>

      {/* ── Zone header ── */}
      <div style={{
        padding: "20px 20px 14px",
        borderBottom: "1px solid rgba(196,168,130,0.35)",
      }}>
        <h3 style={{
          fontFamily: "'Cormorant SC', serif",
          fontSize: "20px",
          fontWeight: 600,
          letterSpacing: "2px",
          color: "#1A1208",
          margin: "0 0 6px",
          paddingRight: "32px", // clear the close button
        }}>
          {zone.label}
        </h3>
        <div style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: "12px",
          letterSpacing: "1px",
          color: "#8B6A18",
          marginBottom: "8px",
        }}>
          30′ × {zone.depth}′ = {sqFt} sq ft · {allSeeds.length} varieties
        </div>
        <p style={{ fontSize: "15px", fontStyle: "italic", color: "#6B5020", lineHeight: 1.6, margin: 0 }}>
          {zone.note}
        </p>
      </div>

      {/* ── What to do now (populated once the TODO is implemented) ── */}
      {urgentActions.length > 0 && (
        <div style={{
          padding: "14px 20px",
          borderBottom: "1px solid rgba(196,168,130,0.3)",
          background: "rgba(30,58,110,0.06)",
        }}>
          <div style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "11px",
            letterSpacing: "2px",
            textTransform: "uppercase",
            color: "#1E3A6E",
            marginBottom: "8px",
          }}>
            ◈ This Week's Tasks
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {urgentActions.map((a, i) => (
              <div key={i} style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "8px",
                padding: "8px 10px",
                background: a.urgency === "now"
                  ? "linear-gradient(145deg, #1E3A6E, #152D57)"
                  : "rgba(255,255,255,0.55)",
                border: a.urgency === "now" ? "1px solid #1E3A6E" : "1px solid rgba(196,168,130,0.3)",
                borderRadius: "2px",
              }}>
                <span style={{ fontSize: "14px", flexShrink: 0 }}>
                  {a.urgency === "now" ? "🌱" : a.urgency === "soon" ? "📅" : "🔭"}
                </span>
                <div>
                  <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "12px", fontWeight: 700, color: a.urgency === "now" ? "#F5EDD0" : "#1A1208" }}>
                    {a.plant}
                  </div>
                  <div style={{ fontSize: "13px", color: a.urgency === "now" ? "rgba(245,237,208,0.85)" : "#6B5020" }}>
                    {a.action}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Rows + per-plant cards ── */}
      <div style={{ padding: "16px 20px" }}>
        {zone.rows.map((row, rowIdx) => {
          // Parse placement text into per-plant entries
          const regex = /([A-Z][a-zA-Z\s&'+-]+(?:,\s*[A-Z][a-zA-Z\s&'+-]+)*)\s*(?:\(all\s+)?(\d+(?:[–-]\d+)?\s*cm)\)?:\s*([^:]+?(?=,\s*[A-Z]|\n|$))/gs;
          const entries = [];
          let m;
          while ((m = regex.exec(row.placement)) !== null) {
            const names = m[1].trim().split(",").map(n => n.trim()).filter(Boolean);
            names.forEach(name => entries.push({ name, height: m[2], detail: (m[3] || "").trim() }));
          }

          if (entries.length === 0) return null;

          return (
            <div key={rowIdx} style={{ marginBottom: rowIdx < zone.rows.length - 1 ? "20px" : 0 }}>
              {/* Row label */}
              <div style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "11px",
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: "#8B6A18",
                borderBottom: "1px solid rgba(196,168,130,0.3)",
                paddingBottom: "5px",
                marginBottom: "10px",
              }}>
                {row.label}
              </div>

              {/* Plant cards */}
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {entries.map((entry, ei) => {
                  const timing  = getSeedTimingWithDefaults(entry.name);
                  const spacing = SEED_SPACING[entry.name]?.spacing;
                  const method  = getMethod(entry.detail);
                  const sowMon  = getSowMonth(entry.detail);
                  const harvest = getHarvestNote(entry.detail);
                  const isSelected = selectedSeed === entry.name;

                  // Build the summary pill row
                  const pills = [
                    method,
                    sowMon,
                    spacing ? `${spacing} cm apart` : null,
                    timing?.harvestStartWeek ? `Harvest ${weekToDate(timing.harvestStartWeek)}` : null,
                  ].filter(Boolean);

                  return (
                    <button
                      key={ei}
                      onClick={() => onSeedClick(isSelected ? null : entry.name)}
                      style={{
                        textAlign: "left",
                        padding: "0",
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        width: "100%",
                        borderRadius: "2px",
                        transition: "transform 0.15s ease",
                      }}
                      onMouseEnter={e => { e.currentTarget.style.transform = "translateX(2px)"; }}
                      onMouseLeave={e => { e.currentTarget.style.transform = "translateX(0)"; }}
                    >
                      <div style={{
                        padding: "12px",
                        background: isSelected
                          ? "linear-gradient(145deg, #1E3A6E, #152D57)"
                          : "rgba(255,255,255,0.6)",
                        border: isSelected
                          ? "1px solid #1E3A6E"
                          : "1px solid rgba(196,168,130,0.3)",
                        borderRadius: "2px",
                      }}>

                        {/* Plant name + height */}
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "6px" }}>
                          <div style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: "16px",
                            fontWeight: 600,
                            color: isSelected ? "#F5EDD0" : "#1A1208",
                          }}>
                            {entry.name}
                          </div>
                          <div style={{
                            fontFamily: "'Outfit', sans-serif",
                            fontSize: "11px",
                            color: isSelected ? "rgba(245,237,208,0.65)" : "#A89474",
                            letterSpacing: "0.5px",
                            flexShrink: 0,
                            marginLeft: "8px",
                          }}>
                            {entry.height}
                          </div>
                        </div>

                        {/* Pill summary row */}
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginBottom: "8px" }}>
                          {pills.map((p, pi) => (
                            <span key={pi} style={{
                              fontFamily: "'Outfit', sans-serif",
                              fontSize: "10px",
                              letterSpacing: "0.5px",
                              padding: "2px 6px",
                              background: isSelected
                                ? "rgba(255,255,255,0.15)"
                                : pi === 0 ? "rgba(30,58,110,0.08)" : "rgba(201,150,10,0.1)",
                              border: isSelected
                                ? "1px solid rgba(255,255,255,0.2)"
                                : pi === 0 ? "1px solid rgba(30,58,110,0.2)" : "1px solid rgba(201,150,10,0.2)",
                              borderRadius: "20px",
                              color: isSelected ? "rgba(245,237,208,0.9)" : pi === 0 ? "#1E3A6E" : "#8B6A18",
                            }}>
                              {p}
                            </span>
                          ))}
                        </div>

                        {/* Placement detail (truncated unless selected) */}
                        <div style={{
                          fontSize: "13px",
                          fontStyle: "italic",
                          color: isSelected ? "rgba(245,237,208,0.8)" : "#7A5C1E",
                          lineHeight: 1.6,
                          marginBottom: harvest ? "8px" : 0,
                        }}>
                          {isSelected ? entry.detail : (entry.detail.length > 130 ? entry.detail.slice(0, 130) + "…" : entry.detail)}
                        </div>

                        {/* Harvest callout — highlighted separately */}
                        {harvest && (
                          <div style={{
                            padding: "6px 9px",
                            background: isSelected
                              ? "rgba(45,122,58,0.3)"
                              : "rgba(45,122,58,0.08)",
                            border: isSelected
                              ? "1px solid rgba(45,122,58,0.5)"
                              : "1px solid rgba(45,122,58,0.2)",
                            borderRadius: "2px",
                            fontFamily: "'Outfit', sans-serif",
                            fontSize: "11px",
                            color: isSelected ? "rgba(245,237,208,0.9)" : "#2D7A3A",
                            letterSpacing: "0.3px",
                          }}>
                            ✂ {harvest}
                          </div>
                        )}

                        {/* Season bar — only for selected plant */}
                        {isSelected && timing && (
                          <SeasonBar timing={timing} accent={`linear-gradient(90deg, ${SEED_SPACING[entry.name] ? "#2D7A3A" : "#5B8A3A"}, #1A5228)`} />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Zone-level season overview ── */}
      {(() => {
        // Find the earliest sow and latest harvest across all seeds in the zone
        const timings = allSeeds.map(n => getSeedTimingWithDefaults(n)).filter(Boolean);
        if (timings.length === 0) return null;
        const earliestSow = Math.min(...timings.map(t => t.indoorStartWeek || t.directSowWeek || 99).filter(w => w < 99));
        const latestHarvest = Math.max(...timings.map(t => t.harvestEndWeek || 0));
        if (!isFinite(earliestSow) || !latestHarvest) return null;

        return (
          <div style={{
            padding: "14px 20px 18px",
            borderTop: "1px solid rgba(196,168,130,0.35)",
          }}>
            <div style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "11px",
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: "#8B6A18",
              marginBottom: "10px",
            }}>
              Zone Season — {weekToDate(earliestSow)} through {weekToDate(latestHarvest)}
            </div>
            {/* Stack a bar per seed for a mini gantt feel */}
            {allSeeds.slice(0, 8).map(seedName => {
              const t = getSeedTimingWithDefaults(seedName);
              if (!t) return null;
              const { start: ss, end: se } = SEASON_WEEKS;
              const span = se - ss;
              const toP = w => Math.max(0, Math.min(100, ((w - ss) / span) * 100));
              const sowW = t.startMethod === "direct" ? t.directSowWeek : t.indoorStartWeek;
              const sowE = t.transplantWeek || (sowW ? sowW + 3 : null);
              const isThisSeed = selectedSeed === seedName;

              return (
                <div key={seedName} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                  <div style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "10px",
                    color: isThisSeed ? "#1E3A6E" : "#8B6A18",
                    fontWeight: isThisSeed ? 700 : 400,
                    width: "140px",
                    flexShrink: 0,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}>
                    {seedName}
                  </div>
                  <div style={{ flex: 1, position: "relative", height: "6px", background: "rgba(196,168,130,0.15)", borderRadius: "3px" }}>
                    {sowW && sowE && (
                      <div style={{
                        position: "absolute",
                        left: `${toP(sowW)}%`,
                        width: `${Math.max(2, toP(sowE) - toP(sowW))}%`,
                        height: "100%",
                        background: "#C9960A",
                        borderRadius: "3px",
                        opacity: 0.8,
                      }} />
                    )}
                    {t.harvestStartWeek && t.harvestEndWeek && (
                      <div style={{
                        position: "absolute",
                        left: `${toP(t.harvestStartWeek)}%`,
                        width: `${Math.max(2, toP(t.harvestEndWeek) - toP(t.harvestStartWeek))}%`,
                        height: "100%",
                        background: "#2D7A3A",
                        borderRadius: "3px",
                        opacity: 0.65,
                      }} />
                    )}
                  </div>
                </div>
              );
            })}
            {allSeeds.length > 8 && (
              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "10px", color: "#A89474", marginTop: "4px", fontStyle: "italic" }}>
                + {allSeeds.length - 8} more — click each plant card above to see its timeline.
              </div>
            )}
          </div>
        );
      })()}
    </div>
  );
}
