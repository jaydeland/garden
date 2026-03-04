import { useState } from "react";

const SEEDS = [
  // === ORDER 1: Original (WEB-024012) ===
  { name: "Nigella Miss Jekyll", cat: "Cut Flowers", source: "Order 1", color: "#7BA7C9", startIndoors: "Apr", directSow: "May", bloom: "Jul–Sep", height: "45cm", use: "Cut flower, filler", socialAngle: "Ethereal blue blooms + alien seed pods — content goldmine", regency: "A bloom of quiet refinement, much admired by those of discerning taste.", emoji: "💎" },
  { name: "Nigella Persian Jewels", cat: "Cut Flowers", source: "Order 1", color: "#9B6B9E", startIndoors: "Apr", directSow: "May", bloom: "Jul–Sep", height: "40cm", use: "Cut flower, mixed", socialAngle: "Rainbow mix — reel comparing each colour as they open", regency: "A dazzling assembly of colours, as varied as the guests at a country ball.", emoji: "🌈" },
  { name: "Nigella Cramer's Plum", cat: "Cut Flowers", source: "Order 1", color: "#8B4570", startIndoors: "Apr", directSow: "May", bloom: "Jul–Sep", height: "60cm", use: "Cut flower, premium", socialAngle: "Deep moody plum tones — autumn arrangement star", regency: "Dark, brooding, and utterly magnetic. The Duke of the cutting garden.", emoji: "🍇" },
  { name: "Zinnia Zinderella Lilac", cat: "Cut Flowers", source: "Order 1", color: "#C8A2C8", startIndoors: "Apr", directSow: "late May", bloom: "Jul–frost", height: "60cm", use: "Scabiosa-type cut", socialAngle: "Unusual bloom form — 'Is this even a zinnia?' hook", regency: "She arrived at the garden party and nobody could identify her. Deliciously scandalous.", emoji: "✨" },
  { name: "Zinnia Queeny Lime Orange", cat: "Cut Flowers", source: "Order 1", color: "#D4A855", startIndoors: "Apr", directSow: "late May", bloom: "Jul–frost", height: "75cm", use: "Cut flower, statement", socialAngle: "Lime-to-orange gradient = stunning flat lay", regency: "A most audacious ombré that draws whispers at Almack's — and along Hwy 3.", emoji: "🍊" },
  { name: "Zinnia Molotov Mix", cat: "Cut Flowers", source: "Order 1", color: "#E25822", startIndoors: "Apr", directSow: "late May", bloom: "Jul–frost", height: "70cm", use: "Cactus-type cut", socialAngle: "Spiky petals + fiery name = bold branding content", regency: "A scandal in every petal. Cactus-spined and unapologetically fierce.", emoji: "🔥" },
  { name: "Zinnia Peaches + Cream", cat: "Cut Flowers", source: "Order 1", color: "#FFDAB9", startIndoors: "Apr", directSow: "late May", bloom: "Jul–frost", height: "60cm", use: "Cut flower, pastel", socialAngle: "Soft palette = wedding/bouquet content", regency: "A gentle beauty requiring no introduction. The bride's favourite, and rightly so.", emoji: "🍑" },
  { name: "African Marigold Glow Up Gold", cat: "Cut Flowers", source: "Order 1", color: "#DAA520", startIndoors: "Mar–Apr", directSow: "late May", bloom: "Jul–frost", height: "90cm", use: "Cut flower, bold", socialAngle: "Giant pom-pom heads = scale comparison content", regency: "Towering above the assembly at three feet tall. Impossible to ignore.", emoji: "☀️" },
  { name: "Pansy Chianti Shades F1", cat: "Cut Flowers", source: "Order 1", color: "#722F37", startIndoors: "Feb–Mar", directSow: "—", bloom: "May–Jul", height: "20cm", use: "Edging, containers", socialAngle: "First spring colour — 'garden is waking up'", regency: "First to appear at the Season's opening. Small in stature, enormous in presence.", emoji: "🍷" },
  { name: "Cornflower Classic Romantic", cat: "Cut Flowers", source: "Order 1", color: "#B76BA3", startIndoors: "Apr", directSow: "May", bloom: "Jun–Aug", height: "80cm", use: "Cottage cut flower", socialAngle: "Cottage garden aesthetic — trending on garden TikTok", regency: "The very picture of a country romance. Penelope Featherington energy.", emoji: "🌸" },
  { name: "Cornflower Blue Diadem", cat: "Cut Flowers", source: "Order 1", color: "#4169E1", startIndoors: "Apr", directSow: "May", bloom: "Jun–Aug", height: "70cm", use: "Classic cut flower", socialAngle: "True blue = rare in flowers, call it out", regency: "A loyal companion of steadfast blue. One wishes all suitors were so true.", emoji: "💙" },
  { name: "Lupin Pink Fairy", cat: "Cut Flowers", source: "Order 1", color: "#FFB6C1", startIndoors: "Mar", directSow: "May", bloom: "Jun–Jul (Y2)", height: "50cm", use: "Perennial border", socialAngle: "Year 2 payoff — patience narrative", regency: "She shall not bloom this Season. But next year? A triumph.", emoji: "🧚" },
  { name: "Callistephus Classic Salmon Rose", cat: "Cut Flowers", source: "Order 1", color: "#FA8072", startIndoors: "Apr", directSow: "May", bloom: "Aug–Oct", height: "60cm", use: "Late-season aster", socialAngle: "'Still blooming in October' content", regency: "While others retire, she makes her entrance. Fashionably, devastatingly late.", emoji: "🌺" },
  { name: "Kew Garden Collection", cat: "Cut Flowers", source: "Order 1", color: "#2E8B57", startIndoors: "varies", directSow: "varies", bloom: "varies", height: "varies", use: "Premium collection", socialAngle: "Unboxing Kew collab = prestige + curiosity", regency: "A collection bearing the Royal imprimatur. Even in Simcoe, we observe standards.", emoji: "🏛️" },

  // === ORDER 2: Moonglow Gardens (R709518406) ===
  { name: "Caramel Rudbeckia", cat: "Cut Flowers", source: "Moonglow", color: "#C68E4E", startIndoors: "Mar–Apr", directSow: "May", bloom: "Jul–Oct", height: "60cm", use: "Cut flower, warm tones", socialAngle: "Caramel tones = autumn flat lay perfection", regency: "A newcomer of uncommon warmth. She draws the eye without raising her voice.", emoji: "🧡" },
  { name: "Kiwi Blue Honeywort", cat: "Cut Flowers", source: "Moonglow", color: "#5B7EA1", startIndoors: "Mar", directSow: "Apr", bloom: "Jun–frost", height: "60cm", use: "Unusual cut, pollinator", socialAngle: "Totally unique blue-purple bells — 'what IS this?' engagement bait", regency: "An exotic curiosity from the Continent. The bees are positively besotted.", emoji: "🫐" },
  { name: "Blue Glitter Sea Holly", cat: "Cut Flowers", source: "Moonglow", color: "#4682B4", startIndoors: "Feb–Mar", directSow: "Apr", bloom: "Jul–Sep", height: "70cm", use: "Dried flower, textural", socialAngle: "Metallic blue = stunning in dried arrangements year-round", regency: "Spined, steely, and magnificently architectural. She does not ask to be held gently.", emoji: "🌊" },
  { name: "Red Breadseed Poppy", cat: "Cut Flowers", source: "Moonglow", color: "#CC3333", startIndoors: "—", directSow: "early Apr", bloom: "Jun–Jul", height: "90cm", use: "Cut flower, seed heads", socialAngle: "750 seeds = poppy field content, massive visual impact", regency: "Seven hundred and fifty souls, sown with reckless abandon. A field of scarlet ambition.", emoji: "❤️" },

  // === ORDER 3: Stems Flower Farm (29659) ===
  { name: "Poppy Hens & Chicks", cat: "Cut Flowers", source: "Stems", color: "#E8A0BF", startIndoors: "—", directSow: "early Apr", bloom: "Jun–Jul", height: "75cm", use: "Cut flower, novelty pod", socialAngle: "Bizarre crown-shaped pods = viral potential", regency: "Eccentric in form and utterly charming. The most talked-about arrival of the Season.", emoji: "🐣" },
  { name: "Shirley Poppy Pastel Doubles", cat: "Cut Flowers", source: "Stems", color: "#F4C2C2", startIndoors: "—", directSow: "early Apr", bloom: "Jun–Jul", height: "60cm", use: "Tissue-paper blooms", socialAngle: "Crêpe-paper petals in backlight = guaranteed saves", regency: "Translucent, trembling, and heartbreakingly brief. The fleeting beauty of youth itself.", emoji: "🩰" },
  { name: "Love in a Mist Cramer's Plum Loco", cat: "Cut Flowers", source: "Stems", color: "#7B3F6E", startIndoors: "Apr", directSow: "May", bloom: "Jul–Sep", height: "60cm", use: "Cut flower, pods", socialAngle: "Doubled up on Cramer's Plum = succession harvest", regency: "She returns — wilder this time, and with 'Loco' appended. We are intrigued.", emoji: "🔮" },
  { name: "Zinnia Lilliput Rose", cat: "Cut Flowers", source: "Stems", color: "#E8828A", startIndoors: "Apr", directSow: "late May", bloom: "Jul–frost", height: "50cm", use: "Small pompom cut", socialAngle: "Button-sized pompoms = miniature bouquet series", regency: "Diminutive and perfectly formed. Proof that consequence need not require height.", emoji: "🌹" },
  { name: "Zinnia Queeny Lime Blotch", cat: "Cut Flowers", source: "Stems", color: "#B5CC5E", startIndoors: "Apr", directSow: "late May", bloom: "Jul–frost", height: "75cm", use: "Designer cut flower", socialAngle: "Lime green + blotch = high-fashion garden content", regency: "Lime and rose, most unexpectedly paired. The ton cannot look away.", emoji: "🍋" },
  { name: "Zinnia Queeny Lemon Peach", cat: "Cut Flowers", source: "Stems", color: "#F5D5A0", startIndoors: "Apr", directSow: "late May", bloom: "Jul–frost", height: "75cm", use: "Pastel statement", socialAngle: "Lemon-to-peach fade = sunrise palette content", regency: "Soft as a sunrise over Norfolk County. She flatters every arrangement she enters.", emoji: "🌅" },

  // === FOLIAGE & FILLER ===
  { name: "Bupleurum Green Gold", cat: "Foliage & Filler", source: "Order 1", color: "#9ACD32", startIndoors: "Mar", directSow: "Apr–May", bloom: "Jun–Aug", height: "60cm", use: "Filler, arrangements", socialAngle: "The unsung hero of arrangements — florist tips", regency: "The quiet companion who makes everyone else shine brighter.", emoji: "🌿" },
  { name: "Cress Attraxa", cat: "Foliage & Filler", source: "Stems", color: "#8FBC8F", startIndoors: "Mar–Apr", directSow: "Apr", bloom: "Jun–Aug", height: "70cm", use: "Filler, textural seed heads", socialAngle: "Unique filler nobody else is growing — florist content", regency: "An unusual texture that elevates every arrangement. The milliner of the flower world.", emoji: "🪡" },
  { name: "Orach Ruby Gold", cat: "Foliage & Filler", source: "Stems", color: "#A0522D", startIndoors: "Mar", directSow: "Apr", bloom: "foliage season-long", height: "120cm", use: "Dramatic foliage, edible", socialAngle: "Towering ruby-gold leaves = stunning backdrop shots", regency: "Four feet of jewel-toned foliage. She is the velvet curtain behind the stage.", emoji: "👑" },
  { name: "Utrecht Blue Millet & Wheat", cat: "Foliage & Filler", source: "Stems", color: "#7B8DA4", startIndoors: "Apr", directSow: "May", bloom: "Aug–frost", height: "90cm", use: "Dried flower, texture", socialAngle: "Blue-toned grains = elevated autumn/dried arrangements", regency: "Neither flower nor fruit, yet indispensable to the composition. Quietly magnificent.", emoji: "🌾" },

  // === THE KITCHEN GARDEN ===
  { name: "Brussels Sprouts Flower Sprout", cat: "Kitchen Garden", source: "Order 1", color: "#6B8E23", startIndoors: "Apr", directSow: "May", bloom: "Harvest Oct", height: "60cm", use: "Edible, novelty", socialAngle: "'What I'm growing that's NOT a flower' twist", regency: "Not every member of the household must be decorative. Some must be delicious.", emoji: "🥬" },
  { name: "Wulff Dill", cat: "Kitchen Garden", source: "Moonglow", color: "#7BA05B", startIndoors: "—", directSow: "May", bloom: "Jul–Aug", height: "90cm", use: "Herb, pollinator, filler", socialAngle: "Dill umbels in bouquets = garden-to-vase crossover", regency: "Fragrant, feathery, and welcome in both the kitchen and the cutting garden. A true polymath.", emoji: "🌿" },
  { name: "Brown Sugar Tomato", cat: "Kitchen Garden", source: "Moonglow", color: "#8B5E3C", startIndoors: "Mar", directSow: "—", bloom: "Harvest Aug–Sep", height: "150cm", use: "Heirloom, rich flavour", socialAngle: "Moody brown tomato = 'not your ordinary garden' content", regency: "Dark, complex, and possessed of uncommon depth. One does not simply slice him on toast.", emoji: "🟤" },
  { name: "Moonglow Jewel Tomato F2", cat: "Kitchen Garden", source: "Moonglow", color: "#DAA520", startIndoors: "Mar", directSow: "—", bloom: "Harvest Aug–Sep", height: "varies", use: "F2 experimental, kaleidoscopic", socialAngle: "F2 = genetic lottery content — 'what colour will mine be?'", regency: "An F2 of uncertain parentage. Each fruit a surprise. The Season's most daring experiment.", emoji: "🎰" },
  { name: "White Tomesol Tomato", cat: "Kitchen Garden", source: "Moonglow", color: "#FFFDD0", startIndoors: "Mar", directSow: "—", bloom: "Harvest Aug–Sep", height: "150cm", use: "White heirloom, mild", socialAngle: "White tomato = 'wait, tomatoes come in white?!' hook", regency: "Pale, luminous, and utterly unexpected. She defies every convention of her species.", emoji: "🤍" },
  { name: "Gunmetal Gray Dwarf Tomato", cat: "Kitchen Garden", source: "Moonglow", color: "#708090", startIndoors: "Mar", directSow: "—", bloom: "Harvest Aug–Sep", height: "90cm", use: "Dwarf, unusual colour", socialAngle: "Gray-purple tomato = instant scroll-stopper", regency: "Compact, steely, and rather distinguished. The Duke of the tomato patch, if you will.", emoji: "🩶" },
  { name: "Blueberry Dessert Tomato", cat: "Kitchen Garden", source: "Moonglow", color: "#4F6D8E", startIndoors: "Mar", directSow: "—", bloom: "Harvest Aug–Sep", height: "150cm", use: "Blue-black cherry, sweet", socialAngle: "Blue-black cherries = stunning harvest shots", regency: "Jewel-dark and impossibly sweet. One eats them like bonbons in the garden.", emoji: "💜" },
  { name: "Superbunny Microdwarf Tomato", cat: "Kitchen Garden", source: "Moonglow", color: "#FF6347", startIndoors: "Mar", directSow: "—", bloom: "Harvest Jul–Sep", height: "20cm", use: "Windowsill, novelty micro", socialAngle: "Tiny plant, real tomatoes = irresistible size comparison", regency: "Absurdly small and thoroughly productive. The youngest Bridgerton sibling, if you will.", emoji: "🐰" },
  { name: "Wolverine Tomato", cat: "Kitchen Garden", source: "Moonglow", color: "#C0392B", startIndoors: "Mar", directSow: "—", bloom: "Harvest Aug–Sep", height: "120cm", use: "Striped novelty", socialAngle: "Wild striping + fierce name = instant social personality", regency: "Striped, untamed, and answering to a rather fearsome name. Excellent in a salad.", emoji: "🐺" },
];

const CATEGORIES = ["All", "Cut Flowers", "Foliage & Filler", "Kitchen Garden"];

const TIMELINE = {
  "Feb–Mar": {
    label: "The First Whispers of the Season",
    seeds: ["Pansy Chianti", "Blue Glitter Sea Holly"],
    tasks: [
      "Commence pansy and sea holly cultivation beneath grow lights",
      "Prepare seed trays with the solemnity the occasion demands",
      "Label each of the 37 varieties — a household in order is a household at peace",
    ],
    social: [
      "📸 Flat lay: ALL seed packets from three orders — 'The full guest list for the Season'",
      "🎬 Reel: triple unboxing — three suppliers, one Norfolk County garden",
      "📝 Post: 'Snow in Simcoe, but under these grow lights — 37 reasons for optimism'",
    ],
  },
  "Mar": {
    label: "Society Begins to Stir",
    seeds: ["Marigold Glow Up Gold", "Lupin Pink Fairy", "Bupleurum", "Caramel Rudbeckia", "Honeywort", "Orach Ruby Gold", "All 7 tomatoes"],
    tasks: [
      "Sow ALL tomatoes indoors — the kitchen garden contingent is 7 varieties strong",
      "Start marigolds, lupins, bupleurum, rudbeckia, honeywort, and orach",
      "Inspect pansy and sea holly seedlings; thin the weak (ruthless but necessary)",
      "Grow lights on 14–16 hr timer — the Ontario sun does not yet oblige us",
    ],
    social: [
      "📸 The tomato lineup: seven varieties in labelled pots — 'Meet the household staff'",
      "📝 Carousel: '37 varieties entering Society this Season' — packet portraits",
      "🎬 Time-lapse: seed to sprout over 7 days, scored to something dramatic",
    ],
  },
  "Apr": {
    label: "Preparations Reach a Fever Pitch",
    seeds: ["Nigella ×3", "Zinnia ×7", "Cornflower ×2", "Callistephus", "Cress Attraxa", "Utrecht Blue Millet", "Brussels Sprouts", "Lilliput Rose"],
    tasks: [
      "Sow every remaining flower variety indoors — the sowing room is now a full campaign",
      "Direct sow all poppies outdoors (Red Breadseed, Hens & Chicks, Shirley Doubles) — they loathe transplanting",
      "Begin hardening off pansies and sea holly in late April",
      "Pot up crowded seedlings — even a seedling deserves room to breathe",
      "Direct sow Wulff dill once soil warms",
    ],
    social: [
      "📸 Seedling shelf tour — 'the ballroom, fully dressed and dangerously overcrowded'",
      "🎬 Reel: 'POV: You told yourself ten varieties. You ordered thirty-seven.'",
      "📝 Educational: 'Direct sowing poppies in Zone 6b — cold soil, no coddling'",
    ],
  },
  "May": {
    label: "The Grand Debut",
    seeds: ["All varieties take to the garden or are well underway"],
    tasks: [
      "Transplant hardened seedlings after last frost (~May 15–20)",
      "Move tomatoes out last — they demand the warmest welcome",
      "Direct sow nigella, cornflower, bupleurum for succession plantings",
      "Mulch beds, install supports for tall varieties (orach, marigold, tomatoes)",
      "Stake tomato cages — 7 varieties require serious infrastructure",
    ],
    social: [
      "📸 Before/after: bare soil to planted estate — transformation content",
      "🎬 Planting day reel — the satisfying geometry of a freshly planted bed",
      "📝 Garden map: 'The full estate — cut flower beds, poppy field, tomato row, herb patch'",
    ],
  },
  "Jun": {
    label: "First Flowers & Rising Intrigue",
    seeds: ["Bupleurum", "Cornflowers", "Pansies peak", "Poppies blooming!", "Honeywort opening", "Dill feathering"],
    tasks: [
      "POPPY SEASON — the breadseed, shirleys, and hens & chicks all peak now",
      "Pinch ALL zinnias at 30cm for bushier plants (that's seven varieties of pinching)",
      "Succession sow zinnias for extended harvest",
      "Tie up tomato vines as they scramble upward",
      "Weed, water deeply, feed fortnightly — standards must be maintained",
    ],
    social: [
      "📸 Poppy field in bloom — 750 red breadseeds = maximum visual impact",
      "🎬 Reel: Shirley poppies backlit at golden hour — tissue-paper petals glowing",
      "📝 'Three poppy varieties compared' — educational carousel",
      "📸 First cornflower bloom — 'She has arrived, and she is magnificent'",
    ],
  },
  "Jul–Aug": {
    label: "The Height of the Season",
    seeds: ["All 7 zinnias exploding", "Nigella ×3 blooming", "Marigolds towering", "Rudbeckia glowing", "Sea holly metallic blue", "Tomato harvest begins", "Orach at full drama"],
    tasks: [
      "Harvest cut flowers every 2–3 days — abundance demands diligence",
      "First tomato harvests! — photograph every unusual variety at the slice",
      "Deadhead for continuous bloom (one does not rest on laurels)",
      "Save nigella and poppy seed pods for dried arrangements",
      "Harvest dill for kitchen + leave umbels for filler bouquets",
      "Cut orach branches for dramatic foliage in arrangements",
    ],
    social: [
      "📸 Weekly bouquet series using the named colour palettes",
      "🎬 'Harvest with me' — golden hour in Norfolk County, ASMR cutting",
      "📝 Tomato rainbow: all 7 varieties sliced open, side by side — 'the tomato spectrum'",
      "📸 Sea holly close-up — metallic blue architecture",
      "🎬 Reel: 'I grew a gray tomato and a blue one and a white one'",
      "📝 Arrangement tutorial: using foliage (orach, dill, cress) to elevate bouquets",
    ],
  },
  "Sep–Oct": {
    label: "A Triumphant Final Act",
    seeds: ["Callistephus peaks", "Zinnias persevere", "Utrecht Blue Millet ready", "Late tomatoes", "Brussels Sprouts harvest"],
    tasks: [
      "Celebrate the late asters — they saved their best for last",
      "Harvest dried flowers: sea holly, nigella pods, millet, poppy heads",
      "Final tomato harvests before frost — green tomato chutney with the rest",
      "Harvest Brussels Sprouts Flower Sprouts",
      "Collect seed from open-pollinated varieties",
      "Document everything for the household archives",
    ],
    social: [
      "📸 'Still blooming in October' — callistephus and late zinnias",
      "🎬 Dried arrangement reel: sea holly + nigella pods + millet + poppy heads",
      "📝 Season recap: month-by-month carousel — the whole glorious arc",
      "🎬 Cooking reel: a meal from the kitchen garden — tomatoes, dill, sprouts",
      "📸 Seed saving — 'securing next year's prospects'",
      "📝 Final count: '37 varieties, one garden, one Season — here's what I'd grow again'",
    ],
  },
};

const CONTENT_PILLARS = [
  { icon: "🌱", title: "The Transformation", desc: "Seed to bloom, 37 times over — documented with the devotion of a society column." },
  { icon: "💐", title: "The Arrangement", desc: "Weekly bouquets from your own garden. Foliage stars alongside flowers now." },
  { icon: "🍅", title: "The Kitchen Dispatch", desc: "Seven tomato varieties, dill, sprouts, and orach. The edible subplot nobody expected." },
  { icon: "📚", title: "The Field Report", desc: "Zone 6b wisdom, variety reviews, and honest accounts from the Norfolk County grounds." },
  { icon: "🎭", title: "The Confession", desc: "Relatable gardening truths, charming failures, and the madness of ordering from three suppliers." },
];

const PALETTES = [
  { name: "The Midnight Promenade", colors: ["#8B4570", "#722F37", "#7B3F6E", "#9ACD32"], seeds: "Nigella Cramer's Plum · Pansy Chianti · Cramer's Plum Loco · Bupleurum" },
  { name: "The Golden Hour Affair", colors: ["#DAA520", "#C68E4E", "#D4A855", "#FFDAB9"], seeds: "Marigold Glow Up · Caramel Rudbeckia · Queeny Lime Orange · Peaches & Cream" },
  { name: "The Country House Ball", colors: ["#7BA7C9", "#4169E1", "#C8A2C8", "#B76BA3"], seeds: "Nigella Miss Jekyll · Cornflower Blue Diadem · Zinderella Lilac · Cornflower Romantic" },
  { name: "The Blushing Introduction", colors: ["#FA8072", "#FFDAB9", "#FFB6C1", "#F5D5A0"], seeds: "Callistephus Salmon Rose · Peaches & Cream · Lupin Pink Fairy · Queeny Lemon Peach" },
  { name: "The Poppy Rebellion", colors: ["#CC3333", "#E8A0BF", "#F4C2C2", "#A0522D"], seeds: "Red Breadseed · Hens & Chicks · Shirley Doubles · Orach Ruby Gold" },
  { name: "The Steely Assembly", colors: ["#4682B4", "#5B7EA1", "#7B8DA4", "#8FBC8F"], seeds: "Sea Holly · Honeywort · Utrecht Blue Millet · Cress Attraxa" },
  { name: "The Tomato Spectrum", colors: ["#8B5E3C", "#FFFDD0", "#708090", "#4F6D8E"], seeds: "Brown Sugar · White Tomesol · Gunmetal Gray · Blueberry Dessert", isTomato: true },
];

const Flourish = ({ style = {} }) => (
  <div style={{ textAlign: "center", color: "#C4A882", fontSize: "18px", letterSpacing: "8px", userSelect: "none", ...style }}>❦ ✿ ❦</div>
);

export default function SeedPlan() {
  const [activeTab, setActiveTab] = useState("timeline");
  const [expandedMonth, setExpandedMonth] = useState("Feb–Mar");
  const [selectedSeed, setSelectedSeed] = useState(null);
  const [catFilter, setCatFilter] = useState("All");

  const filtered = catFilter === "All" ? SEEDS : SEEDS.filter(s => s.cat === catFilter);

  return (
    <div style={{
      fontFamily: "'Cormorant Garamond', 'Georgia', serif",
      background: "linear-gradient(178deg, #FAF6F0 0%, #F3ECE0 30%, #EDE4D5 70%, #E8DCC9 100%)",
      minHeight: "100vh",
      color: "#3B2F20",
      position: "relative",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500&family=Outfit:wght@300;400;500;600&family=Cormorant+SC:wght@400;600&display=swap" rel="stylesheet" />

      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        .seed-card:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(59,47,32,0.1); }
        .month-btn:hover { background: rgba(196,168,130,0.12) !important; }
      `}</style>

      <div style={{ position: "absolute", top: "12px", left: "16px", fontSize: "28px", color: "#D4C4A8", opacity: 0.35 }}>❧</div>
      <div style={{ position: "absolute", top: "12px", right: "16px", fontSize: "28px", color: "#D4C4A8", opacity: 0.35, transform: "scaleX(-1)" }}>❧</div>

      {/* Header */}
      <div style={{ padding: "48px 24px 28px", textAlign: "center", animation: "fadeUp 0.8s ease both" }}>
        <div style={{ fontSize: "10px", fontFamily: "'Outfit', sans-serif", letterSpacing: "5px", textTransform: "uppercase", color: "#A89474", marginBottom: "14px" }}>
          ✦ Simcoe, Ontario · Zone 6b · The 2026 Season ✦
        </div>
        <h1 style={{ fontFamily: "'Cormorant SC', serif", fontSize: "clamp(30px, 6vw, 50px)", fontWeight: 400, margin: "0 0 4px", letterSpacing: "2px", lineHeight: 1.05 }}>
          The Garden Ledger
        </h1>
        <div style={{ fontSize: "17px", fontStyle: "italic", color: "#8B7D6B", marginTop: "6px" }}>
          Three Orders · 37 Varieties · One Norfolk County Garden
        </div>
        <Flourish style={{ marginTop: "18px" }} />
        <div style={{ maxWidth: "560px", margin: "14px auto 0", fontSize: "14px", fontStyle: "italic", lineHeight: 1.8, color: "#9A8B74" }}>
          "Thirty-seven varieties have been summoned from three purveyors to the estate grounds along Highway 3 —
          cut flowers, foliage, seven tomatoes of unusual character, poppies sown with reckless ambition,
          and one Brussels sprout for good measure. What follows is their Season."
        </div>

        {/* Order summary badges */}
        <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "18px", flexWrap: "wrap" }}>
          {[
            { name: "Original Order", id: "WEB-024012", count: 16 },
            { name: "Moonglow Gardens", id: "R709518406", count: 12 },
            { name: "Stems Flower Farm", id: "#29659", count: 9 },
          ].map((o, i) => (
            <div key={i} style={{
              fontSize: "11px", fontFamily: "'Outfit', sans-serif", padding: "6px 14px",
              background: "rgba(59,47,32,0.06)", border: "1px solid rgba(196,168,130,0.25)",
              borderRadius: "2px", color: "#6B5D4A",
            }}>
              <strong>{o.name}</strong> · {o.id} · {o.count} varieties
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", justifyContent: "center", gap: "4px", padding: "8px 24px 0", animation: "fadeUp 0.8s ease 0.15s both" }}>
        {[
          { id: "timeline", label: "The Calendar" },
          { id: "seeds", label: "The Registry" },
          { id: "social", label: "The Gazette" },
        ].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
            padding: "10px 22px",
            border: activeTab === tab.id ? "1px solid #3B2F20" : "1px solid transparent",
            background: activeTab === tab.id ? "#3B2F20" : "transparent",
            color: activeTab === tab.id ? "#FAF6F0" : "#A89474",
            fontSize: "11px", fontFamily: "'Outfit', sans-serif", fontWeight: 500,
            letterSpacing: "2px", textTransform: "uppercase", cursor: "pointer",
            borderRadius: "2px", transition: "all 0.35s ease",
          }}>{tab.label}</button>
        ))}
      </div>

      <div style={{ padding: "24px", maxWidth: "820px", margin: "0 auto" }}>

        {/* === TIMELINE === */}
        {activeTab === "timeline" && (
          <div style={{ animation: "fadeUp 0.5s ease both" }}>
            {Object.entries(TIMELINE).map(([month, data], idx) => {
              const isOpen = expandedMonth === month;
              return (
                <div key={month} style={{ marginBottom: "6px", animation: `fadeUp 0.5s ease ${idx * 0.06}s both` }}>
                  <button className="month-btn" onClick={() => setExpandedMonth(isOpen ? null : month)} style={{
                    width: "100%", display: "flex", alignItems: "center", gap: "16px", padding: "18px 22px",
                    background: isOpen ? "linear-gradient(135deg, #3B2F20, #4A3C2A)" : "rgba(255,255,255,0.5)",
                    color: isOpen ? "#F3ECE0" : "#3B2F20",
                    border: isOpen ? "1px solid #3B2F20" : "1px solid rgba(196,168,130,0.25)",
                    borderRadius: isOpen ? "3px 3px 0 0" : "3px", cursor: "pointer", textAlign: "left",
                    fontFamily: "'Cormorant Garamond', serif", transition: "all 0.35s ease",
                  }}>
                    <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "10px", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", opacity: 0.6, minWidth: "65px" }}>{month}</span>
                    <span style={{ fontSize: "19px", fontWeight: 500, fontStyle: "italic", flex: 1 }}>{data.label}</span>
                    <span style={{ fontSize: "16px", transition: "transform 0.35s", transform: isOpen ? "rotate(180deg)" : "rotate(0)", opacity: 0.5 }}>⌄</span>
                  </button>
                  {isOpen && (
                    <div style={{ background: "rgba(255,255,255,0.7)", borderRadius: "0 0 3px 3px", border: "1px solid rgba(196,168,130,0.25)", borderTop: "none", padding: "22px 24px", backdropFilter: "blur(10px)", animation: "fadeUp 0.4s ease both" }}>
                      <div style={{ marginBottom: "20px" }}>
                        <div style={{ fontSize: "9px", fontFamily: "'Outfit', sans-serif", letterSpacing: "3px", textTransform: "uppercase", color: "#A89474", marginBottom: "10px" }}>Varieties in Attendance</div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                          {data.seeds.map((s, i) => (
                            <span key={i} style={{ fontSize: "12px", fontFamily: "'Outfit', sans-serif", padding: "4px 12px", background: "rgba(59,47,32,0.06)", borderRadius: "2px", border: "1px solid rgba(196,168,130,0.2)", color: "#5A4E3C" }}>{s}</span>
                          ))}
                        </div>
                      </div>
                      <div style={{ marginBottom: "20px" }}>
                        <div style={{ fontSize: "9px", fontFamily: "'Outfit', sans-serif", letterSpacing: "3px", textTransform: "uppercase", color: "#A89474", marginBottom: "10px" }}>Duties of the Season</div>
                        {data.tasks.map((task, i) => (
                          <div key={i} style={{ fontSize: "15px", lineHeight: 1.7, padding: "5px 0", borderBottom: i < data.tasks.length - 1 ? "1px solid rgba(196,168,130,0.15)" : "none", display: "flex", gap: "12px", alignItems: "baseline" }}>
                            <span style={{ color: "#C4A882", fontSize: "8px" }}>◆</span><span>{task}</span>
                          </div>
                        ))}
                      </div>
                      <div>
                        <div style={{ fontSize: "9px", fontFamily: "'Outfit', sans-serif", letterSpacing: "3px", textTransform: "uppercase", color: "#A89474", marginBottom: "10px" }}>Dispatches to the Public</div>
                        {data.social.map((idea, i) => (
                          <div key={i} style={{ fontSize: "14px", lineHeight: 1.7, padding: "8px 14px", margin: "5px 0", background: "linear-gradient(90deg, rgba(196,168,130,0.08), transparent)", borderRadius: "2px", borderLeft: "2px solid #C4A882", fontStyle: "italic" }}>{idea}</div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* === SEED REGISTRY === */}
        {activeTab === "seeds" && (
          <div style={{ animation: "fadeUp 0.5s ease both" }}>
            <div style={{ textAlign: "center", fontStyle: "italic", color: "#9A8B74", fontSize: "14px", marginBottom: "16px", lineHeight: 1.7 }}>
              "Thirty-seven souls, arranged by station. Tap any to reveal their particulars."
            </div>
            {/* Category filter */}
            <div style={{ display: "flex", justifyContent: "center", gap: "6px", marginBottom: "18px", flexWrap: "wrap" }}>
              {CATEGORIES.map(cat => (
                <button key={cat} onClick={() => { setCatFilter(cat); setSelectedSeed(null); }} style={{
                  padding: "6px 16px", fontSize: "11px", fontFamily: "'Outfit', sans-serif", letterSpacing: "1px",
                  border: catFilter === cat ? "1px solid #3B2F20" : "1px solid rgba(196,168,130,0.3)",
                  background: catFilter === cat ? "#3B2F20" : "transparent",
                  color: catFilter === cat ? "#FAF6F0" : "#8B7D6B",
                  borderRadius: "2px", cursor: "pointer", transition: "all 0.3s ease",
                }}>
                  {cat} {cat !== "All" && <span style={{ opacity: 0.6 }}>({SEEDS.filter(s => s.cat === cat).length})</span>}
                </button>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "10px" }}>
              {filtered.map((seed, i) => {
                const globalIdx = SEEDS.indexOf(seed);
                const isSelected = selectedSeed === globalIdx;
                return (
                  <button key={globalIdx} className="seed-card" onClick={() => setSelectedSeed(isSelected ? null : globalIdx)} style={{
                    background: isSelected ? "linear-gradient(145deg, #3B2F20, #4A3C2A)" : "rgba(255,255,255,0.6)",
                    color: isSelected ? "#F3ECE0" : "#3B2F20",
                    border: `1px solid ${isSelected ? "#3B2F20" : "rgba(196,168,130,0.25)"}`,
                    borderRadius: "3px", padding: "16px", textAlign: "left", cursor: "pointer",
                    transition: "all 0.35s ease", position: "relative", overflow: "hidden",
                    animation: `fadeUp 0.4s ease ${i * 0.03}s both`,
                  }}>
                    <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "3px", background: `linear-gradient(90deg, ${seed.color}, transparent)` }} />
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
                      <span style={{ fontSize: "16px" }}>{seed.emoji}</span>
                      <span style={{ fontSize: "9px", fontFamily: "'Outfit', sans-serif", letterSpacing: "1.5px", textTransform: "uppercase", opacity: 0.45 }}>{seed.source}</span>
                    </div>
                    <div style={{ fontSize: "15px", fontWeight: 600, lineHeight: 1.2, marginBottom: "4px", fontStyle: "italic" }}>{seed.name}</div>
                    <div style={{ fontSize: "12px", fontStyle: "italic", opacity: 0.65, lineHeight: 1.45 }}>{seed.regency}</div>
                    {isSelected && (
                      <div style={{ marginTop: "12px", paddingTop: "12px", borderTop: "1px solid rgba(243,236,224,0.15)", animation: "fadeUp 0.3s ease both" }}>
                        <div style={{ fontSize: "12px", fontFamily: "'Outfit', sans-serif", lineHeight: 2 }}>
                          <div><span style={{ opacity: 0.5, fontSize: "9px", letterSpacing: "1px" }}>INDOORS</span> {seed.startIndoors}</div>
                          <div><span style={{ opacity: 0.5, fontSize: "9px", letterSpacing: "1px" }}>DIRECT SOW</span> {seed.directSow}</div>
                          <div><span style={{ opacity: 0.5, fontSize: "9px", letterSpacing: "1px" }}>BLOOM</span> {seed.bloom}</div>
                          <div><span style={{ opacity: 0.5, fontSize: "9px", letterSpacing: "1px" }}>HEIGHT</span> {seed.height}</div>
                          <div><span style={{ opacity: 0.5, fontSize: "9px", letterSpacing: "1px" }}>PURPOSE</span> {seed.use}</div>
                        </div>
                        <div style={{ marginTop: "8px", padding: "8px 10px", background: "rgba(255,255,255,0.08)", borderRadius: "2px", fontSize: "11px", fontFamily: "'Outfit', sans-serif", lineHeight: 1.5 }}>
                          📸 <span style={{ fontStyle: "italic", fontFamily: "'Cormorant Garamond', serif", fontSize: "13px" }}>{seed.socialAngle}</span>
                        </div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* === THE GAZETTE === */}
        {activeTab === "social" && (
          <div style={{ animation: "fadeUp 0.5s ease both" }}>
            <div style={{ textAlign: "center", fontStyle: "italic", color: "#9A8B74", fontSize: "14px", marginBottom: "28px", lineHeight: 1.8, maxWidth: "520px", margin: "0 auto 28px" }}>
              "Dear Reader — thirty-seven varieties across three orders demands a content strategy of corresponding ambition.
              What follows is the programme for the Season."
            </div>

            {/* Pillars */}
            <div style={{ marginBottom: "32px" }}>
              <div style={{ fontSize: "9px", fontFamily: "'Outfit', sans-serif", letterSpacing: "3px", textTransform: "uppercase", color: "#A89474", marginBottom: "14px", textAlign: "center" }}>The Five Pillars of the Season's Content</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "10px" }}>
                {CONTENT_PILLARS.map((p, i) => (
                  <div key={i} style={{ background: "rgba(255,255,255,0.6)", border: "1px solid rgba(196,168,130,0.2)", borderRadius: "3px", padding: "18px", animation: `fadeUp 0.4s ease ${i * 0.08}s both` }}>
                    <div style={{ fontSize: "22px", marginBottom: "8px" }}>{p.icon}</div>
                    <div style={{ fontSize: "16px", fontWeight: 600, fontStyle: "italic", marginBottom: "6px" }}>{p.title}</div>
                    <div style={{ fontSize: "12px", fontFamily: "'Outfit', sans-serif", color: "#8B7D6B", lineHeight: 1.6, fontWeight: 300 }}>{p.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <Flourish style={{ marginBottom: "28px" }} />

            {/* Weekly Cadence */}
            <div style={{ marginBottom: "32px" }}>
              <div style={{ fontSize: "9px", fontFamily: "'Outfit', sans-serif", letterSpacing: "3px", textTransform: "uppercase", color: "#A89474", marginBottom: "14px", textAlign: "center" }}>The Weekly Social Calendar</div>
              <div style={{ background: "rgba(255,255,255,0.6)", border: "1px solid rgba(196,168,130,0.2)", borderRadius: "3px", padding: "22px" }}>
                {[
                  { day: "Monday", type: "The Portrait", note: "A single bloom or garden vignette. Let the image speak." },
                  { day: "Tuesday", type: "The Kitchen Plot", note: "Tomato updates, dill harvest, edible garden content." },
                  { day: "Thursday", type: "The Moving Picture", note: "Reels — harvesting, arranging, sowing. Hands in soil." },
                  { day: "Friday", type: "The Dispatch", note: "Variety reviews, Zone 6b tips, three-supplier comparison." },
                  { day: "Sunday", type: "The Promenade", note: "Story series — a garden walk-through. Bouquet of the week." },
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: "18px", alignItems: "baseline", padding: "12px 0", borderBottom: i < 4 ? "1px solid rgba(196,168,130,0.15)" : "none" }}>
                    <span style={{ fontFamily: "'Cormorant SC', serif", fontSize: "13px", fontWeight: 600, letterSpacing: "1px", color: "#A89474", minWidth: "80px" }}>{item.day}</span>
                    <div>
                      <div style={{ fontSize: "16px", fontWeight: 600, fontStyle: "italic" }}>{item.type}</div>
                      <div style={{ fontSize: "13px", fontFamily: "'Outfit', sans-serif", color: "#8B7D6B", fontWeight: 300, marginTop: "2px" }}>{item.note}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Palettes */}
            <div style={{ marginBottom: "32px" }}>
              <div style={{ fontSize: "9px", fontFamily: "'Outfit', sans-serif", letterSpacing: "3px", textTransform: "uppercase", color: "#A89474", marginBottom: "14px", textAlign: "center" }}>Colour Palettes for Content</div>
              {PALETTES.map((palette, i) => (
                <div key={i} style={{
                  background: palette.isTomato ? "rgba(59,47,32,0.06)" : "rgba(255,255,255,0.6)",
                  border: "1px solid rgba(196,168,130,0.2)", borderRadius: "3px", padding: "16px 18px", marginBottom: "8px",
                  display: "flex", alignItems: "center", gap: "16px", animation: `fadeUp 0.4s ease ${i * 0.06}s both`,
                }}>
                  <div style={{ display: "flex", flexShrink: 0 }}>
                    {palette.colors.map((c, j) => (
                      <div key={j} style={{ width: "28px", height: "28px", borderRadius: "50%", background: c, border: "2px solid #FAF6F0", marginLeft: j > 0 ? "-8px" : 0, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }} />
                    ))}
                  </div>
                  <div>
                    <div style={{ fontSize: "15px", fontWeight: 600, fontStyle: "italic" }}>{palette.name} {palette.isTomato && "🍅"}</div>
                    <div style={{ fontSize: "11px", fontFamily: "'Outfit', sans-serif", color: "#8B7D6B", fontWeight: 300, marginTop: "2px" }}>{palette.seeds}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Hooks */}
            <div>
              <div style={{ fontSize: "9px", fontFamily: "'Outfit', sans-serif", letterSpacing: "3px", textTransform: "uppercase", color: "#A89474", marginBottom: "14px", textAlign: "center" }}>Hooks That Command Attention</div>
              <div style={{ background: "rgba(255,255,255,0.6)", border: "1px solid rgba(196,168,130,0.2)", borderRadius: "3px", padding: "22px" }}>
                {[
                  "\"I grew 37 varieties from three seed companies. Here's what happened.\"",
                  "\"The flower that made a stranger stop their car on Highway 3.\"",
                  "\"I grew a gray tomato, a white tomato, and a blue one. From Simcoe.\"",
                  "\"750 poppy seeds, scattered on frozen ground. Two months later:\"",
                  "\"This zinnia does not look real and it cost $0.35 per seed.\"",
                  "\"The tiny tomato plant on my windowsill is outproducing my garden.\"",
                  "\"My October garden outperforms my July garden. Allow me to explain.\"",
                  "\"Three Canadian seed suppliers compared — who I'd order from again.\"",
                  "\"What $114 in seeds became — a Season in review.\"",
                ].map((hook, i) => (
                  <div key={i} style={{ fontSize: "15px", fontStyle: "italic", padding: "9px 0", borderBottom: i < 8 ? "1px solid rgba(196,168,130,0.12)" : "none", lineHeight: 1.6, color: "#4A3C2A" }}>{hook}</div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ textAlign: "center", padding: "36px 24px 40px" }}>
        <Flourish />
        <div style={{ fontSize: "11px", fontFamily: "'Outfit', sans-serif", color: "#A89474", marginTop: "12px", letterSpacing: "0.5px", lineHeight: 1.8 }}>
          Order 1: WEB-024012 · Order 2: R709518406 (Moonglow Gardens) · Order 3: #29659 (Stems Flower Farm)<br />
          Total investment: ~C$114 · Last frost Simcoe ~May 15–20
        </div>
        <div style={{ fontSize: "13px", fontStyle: "italic", color: "#B5A68E", marginTop: "10px" }}>
          "One does not order from three seed purveyors by accident.
          One does it because the heart wants what the heart wants, and the garden has room."
        </div>
      </div>
    </div>
  );
}
