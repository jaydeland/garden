import React, { useEffect } from "react";

/**
 * PlantingLayout — Full-width map layout for Placement tab
 *
 * Features:
 * - Centered map at 80% width
 * - Detail panel renders as centered popup modal when selectedZone is set
 * - Fixed overlay dims the entire viewport
 * - Click outside or × button to close
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

      {/* Fixed overlay that covers entire viewport - highest z-index */}
      {hasDetailPanel && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(26, 18, 8, 0.7)",
            backdropFilter: "blur(4px)",
            zIndex: 9998,
          }}
          onClick={() => onZoneSelect(null)}
        />
      )}

      {/* Centered popup modal - above overlay */}
      {hasDetailPanel && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 9999,
            width: "90%",
            maxWidth: "520px",
            maxHeight: "85vh",
            overflowY: "auto",
            background: "linear-gradient(135deg, #F9EDD0 0%, #EDD9AF 100%)",
            border: "2px solid #C9960A",
            borderRadius: "6px",
            boxShadow: "0 12px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,150,10,0.3)",
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
