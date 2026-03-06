import React, { useEffect, useState, useRef } from "react";

/**
 * PlantingLayout — Full-width map layout for Placement tab
 *
 * Features:
 * - Centered map at 80% width
 * - Detail panel renders as centered popup modal when selectedZone is set
 * - Dimmed background overlay behind modal
 * - Modal centers at current scroll position and closes on scroll
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
  const [scrollY, setScrollY] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
  const modalRef = useRef(null);
  const initialScrollY = useRef(0);

  // Track scroll position and viewport height
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);

      // Close modal if user scrolls more than 100px from initial position
      if (hasDetailPanel && Math.abs(currentScrollY - initialScrollY.current) > 100) {
        onZoneSelect(null);
      }
    };

    const handleResize = () => {
      setViewportHeight(window.innerHeight);
    };

    // Store initial scroll position when modal opens
    if (hasDetailPanel) {
      initialScrollY.current = window.scrollY;
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [hasDetailPanel, onZoneSelect]);

  // Calculate modal position - centered at current scroll view
  const modalTop = scrollY + viewportHeight / 2;

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

      {/* Full page dim overlay */}
      {hasDetailPanel && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            minHeight: "100vh",
            backgroundColor: "rgba(26, 18, 8, 0.5)",
            backdropFilter: "blur(3px)",
            zIndex: 100,
          }}
          onClick={() => onZoneSelect(null)}
        />
      )}

      {/* Modal centered at current scroll position */}
      {hasDetailPanel && (
        <div
          ref={modalRef}
          style={{
            position: "absolute",
            top: modalTop,
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 101,
            width: "90%",
            maxWidth: "520px",
            maxHeight: "70vh",
            overflowY: "auto",
            background: "rgba(255,255,255,0.95)",
            borderRadius: "4px",
            boxShadow: "0 8px 40px rgba(0,0,0,0.3)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={() => onZoneSelect(null)}
            style={{
              position: "fixed",
              top: "20px",
              right: "20px",
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              border: "1px solid rgba(180,140,60,0.4)",
              background: "rgba(255,250,235,0.98)",
              color: "#8B6A18",
              fontSize: "22px",
              lineHeight: "1",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 102,
              transition: "all 0.2s ease",
              boxShadow: "0 2px 12px rgba(0,0,0,0.2)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,250,235,1)";
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,250,235,0.98)";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            ×
          </button>

          {detailPanel}
        </div>
      )}
    </div>
  );
}

export default PlantingLayout;
