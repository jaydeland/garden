// Generate seed documentation files from SeedPlan.jsx data
// Run with: node generate-seed-docs.cjs

const fs = require('fs');
const path = require('path');

// Read the SeedPlan.jsx file
const seedPlanContent = fs.readFileSync('./src/SeedPlan.jsx', 'utf8');

// Extract SEEDS array using regex
const seedsMatch = seedPlanContent.match(/const SEEDS = \[(.*?)\];/s);
if (!seedsMatch) {
  console.error('Could not find SEEDS array');
  process.exit(1);
}

// Parse individual seed objects
const seedObjects = [];
const seedRegex = /\{\s*name:\s*"([^"]+)",\s*cat:\s*"([^"]+)",\s*source:\s*"([^"]+)",\s*color:\s*"([^"]+)",\s*startIndoors:\s*"([^"]+)",\s*directSow:\s*"([^"]+)",\s*bloom:\s*"([^"]+)",\s*height:\s*"([^"]+)",\s*use:\s*"([^"]+)",\s*socialAngle:\s*"([^"]+)",\s*regency:\s*"([^"]+)",\s*emoji:\s*"([^"]+)"\s*\}/g;

let match;
while ((match = seedRegex.exec(seedsMatch[1])) !== null) {
  seedObjects.push({
    name: match[1],
    cat: match[2],
    source: match[3],
    color: match[4],
    startIndoors: match[5],
    directSow: match[6],
    bloom: match[7],
    height: match[8],
    use: match[9],
    socialAngle: match[10],
    regency: match[11],
    emoji: match[12],
  });
}

// Build placement data using the actual SEED names to match against
const placementData = {};

// Find all placement strings
const placementRegex = /placement:\s*"((?:[^"\\]|\\.)*)"/g;
let placementMatch;

while ((placementMatch = placementRegex.exec(seedPlanContent)) !== null) {
  let decoded = placementMatch[1]
    .replace(/\\"/g, '"')
    .replace(/\\u2013/g, '–')
    .replace(/\\u2014/g, '—')
    .replace(/\\u2019/g, "'")
    .replace(/\\n/g, '\n');

  // Parse pattern: "Plant A (Xcm), Plant B (Ycm), Plant C (Zcm): shared details"
  // Split by looking for plant+height patterns
  const plantPattern = /([A-Z][a-zA-Z\s&'+-]+)\s*\((\d+cm)\)/g;
  const plants = [];
  let plantMatch;

  while ((plantMatch = plantPattern.exec(decoded)) !== null) {
    plants.push({
      name: plantMatch[1].trim(),
      height: plantMatch[2],
      index: plantMatch.index,
    });
  }

  // For each plant found, extract the detail text after the colon
  plants.forEach((plant, idx) => {
    // Find the colon after this plant's height
    const afterPlant = decoded.substring(plant.index + plant.name.length + plant.height.length + 2);
    const colonIdx = afterPlant.indexOf(':');

    if (colonIdx === -1) return;

    // Get detail text - from colon to end of sentence or next plant pattern
    let detail = afterPlant.substring(colonIdx + 1).trim();

    // If there's another plant, cut off before it
    const nextPlant = plants[idx + 1];
    if (nextPlant) {
      const nextIdx = decoded.indexOf(nextPlant.name, plant.index + 1);
      if (nextIdx > 0) {
        const plantEnd = decoded.indexOf(':', plant.index);
        if (plantEnd > 0 && plantEnd < nextIdx) {
          // This plant shares details with others - the detail spans from this colon to next plant
          detail = decoded.substring(plant.index + plant.name.length + plant.height.length + 2, nextIdx);
          detail = detail.substring(detail.indexOf(':') + 1).trim();
        }
      }
    }

    // Extract spacing - try multiple patterns
    let spacing = null;
    const spacingPatterns = [
      /space\s+([\d–-]+)\s*cm/i,
      /spacing\s+([\d–-]+)\s*cm/i,
      /thin\s+to\s+([\d–-]+)\s*cm/i,
      /(\d+)\s*cm\s+spacing/i,
      /(\d+)\s*cm\s+apart/i,
    ];

    for (const pattern of spacingPatterns) {
      const m = detail.match(pattern);
      if (m) {
        spacing = m[1].replace(/[–-]/g, '-') + 'cm';
        break;
      }
    }

    // Extract rows
    const rowMatch = detail.match(/(\d+)\s*rows?/i);
    const rows = rowMatch ? rowMatch[1] : null;

    // Match against known seeds
    seedObjects.forEach(seed => {
      if (seed.name === plant.name) {
        placementData[seed.name] = { spacing, rows, detail };
      }
    });
  });
}

// Create seeds directory
const seedsDir = './seeds';
if (!fs.existsSync(seedsDir)) {
  fs.mkdirSync(seedsDir, { recursive: true });
}

// Generate markdown file for each seed
seedObjects.forEach(seed => {
  const fileName = seed.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') + '.md';

  const placement = placementData[seed.name] || {};

  const content = `---
name: ${seed.name}
category: ${seed.cat}
source: ${seed.source}
color: ${seed.color}
emoji: ${seed.emoji}

# Growing Info
start_indoors: ${seed.startIndoors}
direct_sow: ${seed.directSow}
bloom: ${seed.bloom}
height: ${seed.height}

# Planting
spacing: ${placement.spacing || 'TBD'}
rows: ${placement.rows || 'TBD'}

# Use
primary_use: ${seed.use}
---

# ${seed.emoji} ${seed.name}

**Category:** ${seed.cat}
**Source:** ${seed.source}

## Regency Character

${seed.regency}

## Social Media Angle

${seed.socialAngle}

## Growing Notes

- **Start Indoors:** ${seed.startIndoors}
- **Direct Sow:** ${seed.directSow}
- **Bloom Period:** ${seed.bloom}
- **Height:** ${seed.height}
- **Primary Use:** ${seed.use}

## Planting Details

${placement.detail || '*Details to be added from placement notes.*'}
`;

  const filePath = path.join(seedsDir, fileName);
  fs.writeFileSync(filePath, content);
  console.log(`Created: ${fileName}`);
});

console.log(`\nGenerated ${seedObjects.length} seed documentation files in ${seedsDir}/`);
console.log(`\nPlacement data extracted for ${Object.keys(placementData).length} varieties:`);
Object.entries(placementData).forEach(([name, data]) => {
  console.log(`  - ${name}: ${data.spacing || '—'} spacing, ${data.rows || '—'} rows`);
});
