import React, { useEffect, useRef } from "react";

/**
 * PlantingLayout — Full-width map with inline zone detail accordion
 *
 * Features:
 * - Map takes full width at all times
 * - Clicking a zone expands an inline detail panel below the map
 * - Detail panel slides in with a smooth animation, spanning full width
 * - Click × button or Escape to close
 * - Regency aesthetic: parchment gradient, Cormorant Garamond fonts, gold accents
 */
function PlantingLayout({
  selectedZone,
  onZoneSelect,
  children,
  detailPanel,
  className = "",
}) {
  const hasDetailPanel = selectedZone && detailPanel;
  const detailRef = useRef(null);

  // Handle escape key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && hasDetailPanel) {
        onZoneSelect(null);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [hasDetailPanel, onZoneSelect]);

  // Scroll detail panel into view when it opens
  useEffect(() => {
    if (hasDetailPanel && detailRef.current) {
      detailRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [hasDetailPanel, selectedZone]);

  return (
    <div className={className} style={{ animation: "fadeUp 0.5s ease both" }}>
      {/* Lane label above map */}
      <div
        style={{
          textAlign: "center",
          fontFamily: "'Cormorant SC', serif",
          fontSize: "14px",
          letterSpacing: "3px",
          color: "#8B6A18",
          marginBottom: "6px",
        }}
      >
        Lane
      </div>

      {/* Full-width SVG map */}
      {children}

      {/* Orientation label below map */}
      <div
        style={{
          textAlign: "center",
          fontFamily: "'Cormorant SC', serif",
          fontSize: "14px",
          letterSpacing: "3px",
          color: "#8B6A18",
          marginTop: "6px",
        }}
      >
        Farm fields to the South & East →
      </div>

      {/* Inline zone detail — expands below map when a zone is selected */}
      {hasDetailPanel && (
        <div
          ref={detailRef}
          style={{
            marginTop: "16px",
            background: "linear-gradient(160deg, #F9EDD0 0%, #EDD9AF 100%)",
            border: "2px solid #C9960A",
            borderRadius: "4px",
            boxShadow: "0 4px 24px rgba(0,0,0,0.18), 0 0 0 1px rgba(201,150,10,0.15)",
            animation: "fadeUp 0.25s ease both",
            position: "relative",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={() => onZoneSelect(null)}
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
              zIndex: 10,
              transition: "all 0.2s ease",
              boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,250,235,1)";
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,250,235,0.95)";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            ×
          </button>

          <div style={{ padding: "24px" }}>{detailPanel}</div>
        </div>
      )}
    </div>
  );
}

export default PlantingLayout;
