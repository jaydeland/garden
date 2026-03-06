import { useMemo } from "react";

/**
 * SeedGroupLegend — Filter pills for grouping seeds by planting method/timing.
 *
 * @param {Object} props
 * @param {Object|null} props.activeFilter - { type: 'method'|'week'|'harvest', value: string }
 * @param {Function} props.onFilterClick - (filter: object | null) => void
 * @param {Array} props.placementData - All placement data for counts
 */
export default function SeedGroupLegend({ activeFilter, onFilterClick, placementData }) {
  // Calculate counts from placement data
  const counts = useMemo(() => {
    const result = {
      startIndoors: 0,
      directSow: 0,
      transplantWeeks: {},
      harvestPeriods: { early: 0, mid: 0, late: 0 },
    };

    const seedsByName = new Map();

    placementData.forEach((p) => {
      if (!seedsByName.has(p.plant)) {
        seedsByName.set(p.plant, p);
      }
    });

    // Import SEEDS data to check timing
    seedsByName.forEach((p, plantName) => {
      // We need to get seed data from the main SEEDS array
      // This will be passed via a prop or we check against known patterns
      const seedData = p.seedData || null;

      if (seedData) {
        if (seedData.startIndoors && seedData.startIndoors !== "—") {
          result.startIndoors++;
        }
        if (seedData.directSow && seedData.directSow !== "—") {
          result.directSow++;
        }

        // Categorize harvest by bloom timing
        const bloom = seedData.bloom || "";
        if (bloom.includes("Jun") || bloom.includes("Jul") || bloom.includes("early")) {
          result.harvestPeriods.early++;
        } else if (bloom.includes("Aug") || bloom.includes("Sep")) {
          result.harvestPeriods.mid++;
        } else if (bloom.includes("Oct") || bloom.includes("frost")) {
          result.harvestPeriods.late++;
        }
      }
    });

    // For now, use placementData directly and derive from detail text
    const uniquePlants = new Map();
    placementData.forEach((p) => {
      if (!uniquePlants.has(p.plant)) {
        uniquePlants.set(p.plant, p);
      }
    });

    // Reset and recalculate using detail text patterns
    result.startIndoors = 0;
    result.directSow = 0;

    uniquePlants.forEach((p) => {
      const detail = p.detail || "";
      const plant = p.plant || "";

      // Check for direct sow indicators
      const isDirectSow =
        detail.includes("direct sow") ||
        detail.includes("Direct sow") ||
        detail.includes("broadcast") ||
        detail.includes("scatter");

      // Check for transplant/start indoors indicators
      const isStartIndoors =
        detail.includes("start indoors") ||
        detail.includes("transplant") ||
        detail.includes("Start indoors") ||
        detail.includes("Transplant") ||
        detail.includes("under grow lights") ||
        detail.includes("beneath grow lights");

      if (isDirectSow) {
        result.directSow++;
      }
      if (isStartIndoors) {
        result.startIndoors++;
      }
    });

    return result;
  }, [placementData]);

  const total = counts.startIndoors + counts.directSow;

  // Filter options with Regency-styled labels
  const filters = [
    {
      id: "start-indoors",
      label: `Start Indoors (${counts.startIndoors})`,
      filter: { type: "method", value: "startIndoors" },
      description: "Varieties requiring an early start beneath glass",
    },
    {
      id: "direct-sow",
      label: `Direct Sow (${counts.directSow})`,
      filter: { type: "method", value: "directSow" },
      description: "Varieties sown directly into the garden bed",
    },
  ];

  return (
    <div
      style={{
        background: "rgba(255,250,235,0.8)",
        border: "1px solid rgba(180,140,60,0.3)",
        borderRadius: "3px",
        padding: "14px 18px",
        marginBottom: "16px",
      }}
    >
      <div
        style={{
          fontSize: "11px",
          fontFamily: "'Outfit', sans-serif",
          color: "#8B6A18",
          letterSpacing: "1px",
          textTransform: "uppercase",
          marginBottom: "10px",
        }}
      >
        Filter by Planting Method
      </div>

      <div
        style={{
          display: "flex",
          gap: "8px",
          flexWrap: "wrap",
        }}
      >
        {filters.map((f) => {
          const isActive =
            activeFilter?.type === f.filter.type &&
            activeFilter?.value === f.filter.value;

          return (
            <button
              key={f.id}
              onClick={() => onFilterClick(isActive ? null : f.filter)}
              style={{
                padding: "8px 14px",
                fontSize: "13px",
                fontFamily: "'Outfit', sans-serif",
                letterSpacing: "0.5px",
                color: isActive ? "#F5EDD0" : "#1A1208",
                background: isActive
                  ? "linear-gradient(145deg, #1E3A6E, #152D57)"
                  : "rgba(255,255,255,0.7)",
                border: isActive
                  ? "1px solid #1E3A6E"
                  : "1px solid rgba(196,168,130,0.4)",
                borderRadius: "20px",
                cursor: "pointer",
                transition: "all 0.2s ease",
                boxShadow: isActive
                  ? "0 2px 8px rgba(30,58,110,0.3)"
                  : "0 1px 3px rgba(59,47,32,0.1)",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = "rgba(255,255,255,0.9)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = "rgba(255,255,255,0.7)";
                }
              }}
              title={f.description}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      {/* Helper text */}
      <div
        style={{
          marginTop: "10px",
          fontSize: "12px",
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: "italic",
          color: "#7A5C1E",
        }}
      >
        {activeFilter
          ? `Filtering: ${filters.find((f) => f.filter.type === activeFilter.type && f.filter.value === activeFilter.value)?.description || ""}`
          : "Select a method to filter the placement map"}
      </div>
    </div>
  );
}
