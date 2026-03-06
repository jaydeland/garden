// Seed timing utilities for Zone 6b (Norfolk County, Ontario)
// Reference: Last frost ~May 15 (week 20), First frost ~Oct 15 (week 42)

// Week number to human-readable date string
// Week 1 = Jan 1-7, Week 14 = early April, Week 20 = mid-May, etc.
export function weekToDate(weekNum) {
  if (weekNum <= 4) return "Early January";
  if (weekNum <= 8) return "Late February";
  if (weekNum <= 12) return "Early March";
  if (weekNum <= 14) return "Late March";
  if (weekNum <= 16) return "Mid-April";
  if (weekNum <= 18) return "Late April";
  if (weekNum <= 20) return "Early May";
  if (weekNum <= 22) return "Mid-May";
  if (weekNum <= 24) return "Late May";
  if (weekNum <= 26) return "Early June";
  if (weekNum <= 30) return "Early July";
  if (weekNum <= 34) return "Early August";
  if (weekNum <= 38) return "Early September";
  if (weekNum <= 42) return "Early October";
  if (weekNum <= 46) return "Early November";
  return "Late November";
}

// Convert a date (YYYY-MM-DD) to week number
// Week 1 starts Jan 1
export function dateToWeek(date) {
  const d = new Date(date);
  const startOfYear = new Date(d.getFullYear(), 0, 1);
  const diff = d - startOfYear;
  const oneWeek = 7 * 24 * 60 * 60 * 1000;
  return Math.ceil((diff + 1) / oneWeek);
}

// Get sowing window for a seed
// Returns { method, startWeek, endWeek, depth }
export function getSowingWindow(seed) {
  const result = {
    method: seed.startMethod || "direct",
    startWeek: seed.directSowWeek || seed.indoorStartWeek || 14,
    endWeek: null,
    depth: seed.sowDepth || "surface"
  };

  // Calculate end week based on method
  if (seed.startMethod === "indoors") {
    result.endWeek = (seed.indoorStartWeek || 14) + 4; // 4-week indoor window
  } else if (seed.startMethod === "direct") {
    result.endWeek = (seed.directSowWeek || 14) + 4; // 4-week direct sow window
  } else if (seed.startMethod === "both") {
    result.endWeek = Math.max(
      seed.indoorStartWeek || 0,
      seed.directSowWeek || 0
    ) + 4;
  }

  return result;
}

// Get harvest window for a seed
// Returns { startWeek, endWeek, label }
export function getHarvestWindow(seed) {
  return {
    startWeek: seed.harvestStartWeek || 27, // Default: early July
    endWeek: seed.harvestEndWeek || 42,     // Default: mid-October (first frost)
    label: `${weekToDate(seed.harvestStartWeek || 27)} - ${weekToDate(seed.harvestEndWeek || 42)}`
  };
}

// Get human-readable timing label for a seed
export function getTimingLabel(seed) {
  const parts = [];

  if (seed.startMethod === "indoors" || seed.startMethod === "both") {
    parts.push(`Start indoors ${weekToDate(seed.indoorStartWeek || 14)}`);
  }

  if (seed.startMethod === "direct" || seed.startMethod === "both") {
    const directWeek = seed.directSowWeek || seed.indoorStartWeek || 14;
    parts.push(`Direct sow ${weekToDate(directWeek)}`);
  }

  if (seed.transplantWeek) {
    parts.push(`Transplant ${weekToDate(seed.transplantWeek)}`);
  }

  if (seed.harvestStartWeek) {
    const harvest = getHarvestWindow(seed);
    parts.push(`Harvest ${harvest.label}`);
  }

  return parts.join("; ");
}

// Get depth instruction
export function getSowingDepth(seed) {
  const depth = seed.sowDepth || "surface";
  if (depth === "surface") {
    return "Surface sow (do not cover - needs light)";
  }
  return `Sow at ${depth} depth`;
}

// Check if seed is cool-season (can direct sow early)
export function isCoolSeason(seed) {
  return (seed.directSowWeek || 99) <= 16; // Early-mid April or earlier
}

// Check if seed is warm-season (needs warm soil)
export function isWarmSeason(seed) {
  return (seed.directSowWeek || 0) >= 21; // Late May or later
}

// Get weeks to harvest from sowing
export function getDaysToHarvest(seed) {
  if (seed.harvestStartWeek && seed.directSowWeek) {
    return (seed.harvestStartWeek - seed.directSowWeek) * 7;
  }
  if (seed.harvestStartWeek && seed.indoorStartWeek) {
    return (seed.harvestStartWeek - seed.indoorStartWeek) * 7;
  }
  return null;
}

// Timing presets for common patterns (Zone 6b)
export const TIMING_PRESETS = {
  // Early spring direct sow (poppies, cornflowers)
  EARLY_DIRECT: {
    directSowWeek: 14,      // Early April
    harvestStartWeek: 24,   // Mid-June
    harvestEndWeek: 28,     // Mid-July
    sowDepth: "surface"
  },

  // Warm season transplant (tomatoes, zinnias, basil)
  WARM_TRANSPLANT: {
    indoorStartWeek: 14,    // Early April
    transplantWeek: 21,     // Late May (after last frost)
    harvestStartWeek: 27,   // Early July
    harvestEndWeek: 42,     // Mid-October (first frost)
    sowDepth: "0.5cm"
  },

  // Perennial (lavender, lupins)
  PERENNIAL_START: {
    indoorStartWeek: 10,    // Early March
    transplantWeek: 20,     // Mid-May
    harvestStartWeek: 24,   // Year 2 bloom
    sowDepth: "surface"
  },

  // Herb continuous (basil, dill)
  HERB_SUCCESSSION: {
    indoorStartWeek: 15,    // Mid-April
    directSowWeek: 21,      // Late May
    harvestStartWeek: 25,   // Late June
    harvestEndWeek: 42,     // First frost
    sowDepth: "0.5cm"
  }
};
