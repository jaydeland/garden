import { useState, useMemo } from "react";

/**
 * WeekTimeline — Horizontal week scrubber for timing-based filtering.
 *
 * @param {Object} props
 * @param {number|null} props.selectedWeek - Currently selected week number
 * @param {Function} props.onWeekSelect - (week: number) => void
 * @param {number} props.currentWeek - Today's week number (for highlighting)
 */
export default function WeekTimeline({ selectedWeek, onWeekSelect, currentWeek }) {
  const [hoveredWeek, setHoveredWeek] = useState(null);

  // Week range: 14-42 (April through October)
  const weeks = useMemo(() => {
    const weekData = [];

    for (let week = 14; week <= 42; week++) {
      let month = "";
      let monthLabel = "";
      let periodType = "sowing"; // default

      // Determine month and display label
      if (week >= 14 && week < 18) {
        month = "April";
        monthLabel = "Apr";
        periodType = "sowing";
      } else if (week >= 18 && week < 22) {
        month = "May";
        monthLabel = "May";
        periodType = "sowing";
      } else if (week >= 22 && week < 26) {
        month = "May";
        monthLabel = "May";
        periodType = "transplant";
      } else if (week >= 26 && week < 30) {
        month = "June";
        monthLabel = "Jun";
        periodType = "transplant";
      } else if (week >= 30 && week < 34) {
        month = "July";
        monthLabel = "Jul";
        periodType = "bloom";
      } else if (week >= 34 && week < 38) {
        month = "August";
        monthLabel = "Aug";
        periodType = "harvest";
      } else if (week >= 38 && week < 42) {
        month = "September";
        monthLabel = "Sep";
        periodType = "harvest";
      } else if (week >= 42) {
        month = "October";
        monthLabel = "Oct";
        periodType = "harvest";
      }

      // Determine week description
      const weekInMonth = ((week - 14) % 4) + 1;
      const weekDescriptions = ["Early", "Mid", "Late", "Very Late"];
      const weekDesc = weekDescriptions[weekInMonth - 1] || "Mid";

      // Color coding based on period type
      let bgColor, borderColor, textColor;

      if (periodType === "sowing") {
        // Green tones for sowing weeks
        bgColor = "rgba(107,142,35,0.2)";
        borderColor = "#6B8E23";
        textColor = "#3D5219";
      } else if (periodType === "transplant") {
        // Gold tones for transplant weeks
        bgColor = "rgba(201,150,10,0.2)";
        borderColor = "#C9960A";
        textColor = "#7A5C1E";
      } else {
        // Amber tones for harvest/bloom weeks
        bgColor = "rgba(218,165,32,0.2)";
        borderColor = "#DAA520";
        textColor = "#8B6A18";
      }

      weekData.push({
        week,
        month,
        monthLabel,
        weekDesc,
        bgColor,
        borderColor,
        textColor,
        periodType,
      });
    }

    return weekData;
  }, []);

  // Group weeks by month for labeling
  const monthGroups = useMemo(() => {
    const groups = {};
    weeks.forEach((w) => {
      if (!groups[w.monthLabel]) {
        groups[w.monthLabel] = [];
      }
      groups[w.monthLabel].push(w);
    });
    return groups;
  }, [weeks]);

  // Tooltip content
  const getTooltip = (weekData) => {
    const weekNames = {
      1: "Early",
      2: "Mid",
      3: "Late",
      4: "Very Late",
    };
    const weekInMonth = ((weekData.week - 14) % 4) + 1;
    return `Week ${weekData.week} — ${weekNames[weekInMonth]} ${weekData.month}`;
  };

  return (
    <div
      style={{
        background: "rgba(255,250,235,0.85)",
        border: "1px solid rgba(180,140,60,0.3)",
        borderRadius: "3px",
        padding: "14px 18px",
        marginBottom: "16px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        <div
          style={{
            fontSize: "11px",
            fontFamily: "'Outfit', sans-serif",
            color: "#8B6A18",
            letterSpacing: "1px",
            textTransform: "uppercase",
          }}
        >
          Garden Calendar — Weeks 14 to 42
        </div>

        {/* Legend */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            fontSize: "10px",
            fontFamily: "'Outfit', sans-serif",
            color: "#6B5020",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <span
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "2px",
                background: "rgba(107,142,35,0.3)",
                border: "1px solid #6B8E23",
              }}
            />
            Sowing
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <span
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "2px",
                background: "rgba(201,150,10,0.3)",
                border: "1px solid #C9960A",
              }}
            />
            Transplant
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <span
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "2px",
                background: "rgba(218,165,32,0.3)",
                border: "1px solid #DAA520",
              }}
            />
            Harvest
          </div>
        </div>
      </div>

      {/* Month labels row */}
      <div
        style={{
          display: "flex",
          marginBottom: "6px",
          paddingLeft: "2px",
        }}
      >
        {Object.entries(monthGroups).map(([monthLabel, weekList], idx, arr) => {
          const width = (weekList.length / weeks.length) * 100;
          return (
            <div
              key={monthLabel}
              style={{
                width: `${width}%`,
                fontSize: "11px",
                fontFamily: "'Cormorant SC', serif",
                color: "#8B6A18",
                letterSpacing: "2px",
                textTransform: "uppercase",
                borderLeft: idx > 0 ? "1px solid rgba(196,168,130,0.3)" : "none",
                paddingLeft: "6px",
              }}
            >
              {monthLabel}
            </div>
          );
        })}
      </div>

      {/* Week scrubber */}
      <div
        style={{
          display: "flex",
          gap: "2px",
          overflowX: "auto",
          paddingBottom: "8px",
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(196,168,130,0.5) rgba(255,255,255,0.3)",
        }}
        onMouseLeave={() => setHoveredWeek(null)}
      >
        {weeks.map((w) => {
          const isSelected = selectedWeek === w.week;
          const isCurrentWeek = currentWeek === w.week;
          const isHovered = hoveredWeek === w.week;

          return (
            <button
              key={w.week}
              onClick={() => onWeekSelect(w.week)}
              onMouseEnter={() => setHoveredWeek(w.week)}
              style={{
                flexShrink: 0,
                width: "32px",
                height: "44px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                background: isSelected
                  ? "linear-gradient(145deg, #1E3A6E, #152D57)"
                  : w.bgColor,
                border: isSelected
                  ? "1px solid #1E3A6E"
                  : `1px solid ${w.borderColor}`,
                borderRadius: "3px",
                cursor: "pointer",
                transition: "all 0.15s ease",
                transform: isHovered || isSelected ? "translateY(-2px)" : "none",
                boxShadow: isSelected
                  ? "0 2px 8px rgba(30,58,110,0.3)"
                  : isHovered
                  ? "0 2px 6px rgba(59,47,32,0.15)"
                  : "none",
                position: "relative",
              }}
              title={getTooltip(w)}
            >
              {/* Week number */}
              <span
                style={{
                  fontSize: "11px",
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 600,
                  color: isSelected ? "#F5EDD0" : w.textColor,
                  lineHeight: 1,
                }}
              >
                {w.week}
              </span>

              {/* Current week indicator */}
              {isCurrentWeek && (
                <span
                  style={{
                    position: "absolute",
                    bottom: "-4px",
                    width: "4px",
                    height: "4px",
                    borderRadius: "50%",
                    background: "#C9960A",
                    border: "1px solid #F5EDD0",
                  }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Current week line indicator */}
      {currentWeek >= 14 && currentWeek <= 42 && (
        <div
          style={{
            marginTop: "8px",
            fontSize: "11px",
            fontFamily: "'Outfit', sans-serif",
            color: "#8B6A18",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <span
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#C9960A",
              border: "1px solid #F5EDD0",
            }}
          />
          Current: Week {currentWeek} —{" "}
          {weeks.find((w) => w.week === currentWeek)?.month || ""}
        </div>
      )}

      {/* Tooltip */}
      {hoveredWeek && (
        <div
          style={{
            marginTop: "8px",
            fontSize: "12px",
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            color: "#7A5C1E",
            background: "rgba(248,243,235,0.7)",
            padding: "6px 10px",
            borderRadius: "2px",
            display: "inline-block",
          }}
        >
          {getTooltip(weeks.find((w) => w.week === hoveredWeek))}
        </div>
      )}

      {/* Selection info */}
      {selectedWeek && (
        <div
          style={{
            marginTop: "8px",
            fontSize: "12px",
            fontFamily: "'Cormorant Garamond', serif",
            color: "#1E3A6E",
            fontWeight: 600,
          }}
        >
          Filtering by Week {selectedWeek} — Click again to clear
        </div>
      )}
    </div>
  );
}
