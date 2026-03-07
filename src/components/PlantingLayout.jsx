import React, { useEffect } from "react";

/**
 * PlantingLayout — Wide two-column layout for the Placement tab.
 *
 * Breaks out of the app's max-width container to occupy 90vw, giving the
 * planting plan document the full spread it deserves. Map (left, 56%) and
 * the zone detail panel (right, 44%) share a unified document border so
 * they read as one coherent plan rather than two separate widgets.
 */
function PlantingLayout({
  selectedZone,
  onZoneSelect,
  children,
  detailPanel,
  className = "",
}) {
  // Escape key closes the panel
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && selectedZone) onZoneSelect(null);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectedZone, onZoneSelect]);

  return (
    <div
      className={className}
      style={{
        // Break out of the app's max-width: 1200px container to 90vw
        width: "90vw",
        marginLeft: "calc(50% - 45vw)",
        display: "flex",
        gap: "0",
        alignItems: "flex-start",
        animation: "fadeUp 0.5s ease both",
        border: "1px solid rgba(180,140,60,0.28)",
        borderRadius: "3px",
        overflow: "hidden",
        boxShadow: "0 4px 24px rgba(59,47,32,0.08)",
      }}
    >
      {/* ── Left column: map ── */}
      <div
        style={{
          flex: "0 0 56%",
          minWidth: 0,
          borderRight: "1px solid rgba(180,140,60,0.25)",
          background: "rgba(255,252,243,0.5)",
        }}
      >
        {/* Map header */}
        <div
          style={{
            padding: "10px 16px",
            borderBottom: "1px solid rgba(180,140,60,0.18)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              fontFamily: "'Cormorant SC', serif",
              fontSize: "13px",
              letterSpacing: "3px",
              color: "#8B6A18",
            }}
          >
            ← Lane
          </div>
          <div
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "11px",
              letterSpacing: "2px",
              color: "#B5A68E",
              textTransform: "uppercase",
            }}
          >
            Garden Plan · 30′ × 100′
          </div>
          <div
            style={{
              fontFamily: "'Cormorant SC', serif",
              fontSize: "13px",
              letterSpacing: "3px",
              color: "#8B6A18",
            }}
          >
            Farm fields →
          </div>
        </div>

        {/* Map content */}
        <div style={{ padding: "12px" }}>
          {children}
        </div>
      </div>

      {/* ── Right column: sticky detail panel ── */}
      <div
        style={{
          flex: "1 1 0",
          minWidth: "320px",
          position: "sticky",
          top: "0",
          maxHeight: "100vh",
          overflowY: "auto",
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(180,140,60,0.3) transparent",
          background: "rgba(255,250,238,0.6)",
        }}
      >
        {selectedZone && detailPanel ? (
          <div style={{ position: "relative" }}>
            {/* Close button */}
            <button
              onClick={() => onZoneSelect(null)}
              aria-label="Close zone detail"
              style={{
                position: "absolute",
                top: "12px",
                right: "12px",
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                border: "1px solid rgba(180,140,60,0.5)",
                background: "rgba(255,250,235,0.95)",
                color: "#8B6A18",
                fontSize: "18px",
                lineHeight: "1",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1,
                transition: "all 0.2s ease",
                boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#FFF5D6";
                e.currentTarget.style.transform = "scale(1.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,250,235,0.95)";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              ×
            </button>

            {detailPanel}
          </div>
        ) : (
          /* Empty state */
          <div
            style={{
              padding: "60px 28px",
              textAlign: "center",
              color: "#B5A68E",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "300px",
            }}
          >
            <div style={{ fontSize: "36px", marginBottom: "16px", opacity: 0.4 }}>❦</div>
            <div
              style={{
                fontSize: "17px",
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontStyle: "italic",
                lineHeight: 1.8,
                maxWidth: "260px",
              }}
            >
              Select a zone on the plan to reveal its full planting schedule.
            </div>
            <div
              style={{
                marginTop: "20px",
                fontSize: "12px",
                fontFamily: "'Outfit', sans-serif",
                letterSpacing: "1.5px",
                color: "#C4A882",
                textTransform: "uppercase",
              }}
            >
              Press{" "}
              <kbd
                style={{
                  fontFamily: "monospace",
                  background: "rgba(196,168,130,0.15)",
                  padding: "1px 6px",
                  borderRadius: "2px",
                  border: "1px solid rgba(196,168,130,0.3)",
                  textTransform: "none",
                }}
              >
                Esc
              </kbd>{" "}
              to deselect
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PlantingLayout;
