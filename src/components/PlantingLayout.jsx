import React, { useState, useEffect, useRef } from "react";

/**
 * PlantingLayout — Full-width map layout for Placement tab
 *
 * Features:
 * - Centered map at 80% width
 * - Detail panel renders as popup positioned near click location
 * - Fixed overlay dims the entire viewport
 * - Click outside or × button to close
 * - Regency aesthetic: parchment gradient, Cormorant Garamond fonts, gold accents
 */
function PlantingLayout({
  selectedZone,
  onZoneSelect,
  children,
  detailPanel,
  clickPosition,
  className = "",
}) {
  const hasDetailPanel = selectedZone && detailPanel;
  const modalRef = useRef(null);
  const [isPositioned, setIsPositioned] = useState(false);

  // Calculate and set modal position
  useEffect(() => {
    if (!hasDetailPanel || !clickPosition || !modalRef.current) {
      setIsPositioned(false);
      return;
    }

    const modal = modalRef.current;
    const modalRect = modal.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Default position: to the right of click
    let left = clickPosition.x + 20;
    let top = clickPosition.y - 50; // Offset up slightly

    // If modal would go off right edge, position to left of click
    if (left + modalRect.width > viewportWidth - 20) {
      left = clickPosition.x - modalRect.width - 20;
    }

    // If modal would go off left edge, align to left edge
    if (left < 20) {
      left = 20;
    }

    // If modal would go off bottom, move it up
    if (top + modalRect.height > viewportHeight - 20) {
      top = viewportHeight - modalRect.height - 20;
    }

    // If modal would go off top, move it down
    if (top < 20) {
      top = 20;
    }

    modal.style.left = `${left}px`;
    modal.style.top = `${top}px`;
    setIsPositioned(true);
  }, [hasDetailPanel, clickPosition]);

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

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (hasDetailPanel) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [hasDetailPanel]);

  return (
    <div
      className={className}
      style={{
        animation: "fadeUp 0.5s ease both",
        position: "relative",
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

      {/* Fixed overlay that covers entire viewport */}
      {hasDetailPanel && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(26, 18, 8, 0.6)",
            backdropFilter: "blur(4px)",
            zIndex: 100,
          }}
          onClick={() => onZoneSelect(null)}
        />
      )}

      {/* Modal positioned near click location */}
      {hasDetailPanel && (
        <div
          ref={modalRef}
          style={{
            position: "fixed",
            zIndex: 101,
            maxWidth: "480px",
            width: "90%",
            maxHeight: "80vh",
            overflowY: "auto",
            background: "linear-gradient(135deg, #F9EDD0 0%, #EDD9AF 100%)",
            border: "2px solid #C9960A",
            borderRadius: "6px",
            boxShadow: "0 12px 48px rgba(0,0,0,0.4), 0 0 0 1px rgba(201,150,10,0.3)",
            opacity: isPositioned ? 1 : 0,
            transition: "opacity 0.2s ease",
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
              zIndex: 102,
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
