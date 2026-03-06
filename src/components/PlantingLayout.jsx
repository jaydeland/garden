import React, { useState, useEffect } from "react";

/**
 * PlantingLayout — Full-width map layout for Placement tab
 *
 * Features:
 * - Centered map at 80% width
 * - Detail panel renders as popup positioned at top of selected zone
 * - No dimming overlay - popup floats above content
 * - Click × button or Escape to close
 * - Regency aesthetic: parchment gradient, Cormorant Garamond fonts, gold accents
 */
function PlantingLayout({
  selectedZone,
  onZoneSelect,
  children,
  detailPanel,
  zonePosition,
  className = "",
}) {
  const hasDetailPanel = selectedZone && detailPanel;
  const [popupPos, setPopupPos] = useState({ top: 100, left: '50%' });

  // Calculate popup position based on row's center position
  useEffect(() => {
    if (!zonePosition) return;

    const popupWidth = 400;
    const popupHeight = 300; // Estimated popup height

    // Position popup centered on the row (row center is at zonePosition.y)
    let left = zonePosition.x - popupWidth / 2;
    // Center vertically on the row: popup middle aligns with row center
    let top = zonePosition.y - popupHeight / 2;

    // Keep within viewport bounds
    if (left < 20) left = 20;
    if (left + popupWidth > window.innerWidth - 20) {
      left = window.innerWidth - popupWidth - 20;
    }
    if (top < 20) top = 20; // Keep at least 20px from top
    if (top + popupHeight > window.innerHeight - 20) {
      top = window.innerHeight - popupHeight - 20; // Keep within bottom bounds
    }

    setPopupPos({ top, left });
  }, [zonePosition, selectedZone]);

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

  return (
    <div
      className={className}
      style={{
        animation: "fadeUp 0.5s ease both",
      }}
    >
      {/* Map at 80% width, centered */}
      <div
        style={{
          width: "80%",
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
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

        {/* Children (SVG map) */}
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
      </div>

      {/* Floating popup panel positioned at top of selected zone */}
      {hasDetailPanel && (
        <div
          style={{
            position: "fixed",
            top: popupPos.top,
            left: popupPos.left,
            zIndex: 9999,
            width: "400px",
            maxWidth: "calc(100vw - 40px)",
            maxHeight: "60vh",
            overflowY: "auto",
            background: "linear-gradient(135deg, #F9EDD0 0%, #EDD9AF 100%)",
            border: "2px solid #C9960A",
            borderRadius: "6px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.3), 0 0 0 1px rgba(201,150,10,0.3)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={() => onZoneSelect(null)}
            style={{
              position: "absolute",
              top: "8px",
              right: "8px",
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
              zIndex: 10000,
              transition: "all 0.2s ease",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
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

          <div style={{ padding: "20px" }}>{detailPanel}</div>
        </div>
      )}
    </div>
  );
}

export default PlantingLayout;
