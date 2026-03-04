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

  // === ORDER 4: Ontario Seed Company (OSC-2026) ===
  { name: "Candyland Tomato", cat: "Kitchen Garden", source: "OSC", color: "#F5E642", startIndoors: "Mar", directSow: "—", bloom: "Harvest Jul–Sep", height: "90cm", use: "Cherry tomato, huge clusters", socialAngle: "Clusters of 20+ tiny gold tomatoes = irresistible harvest content", regency: "She arrives in cascading abundance — hundreds of tiny golden spheres, impossible to eat just one.", emoji: "✨" },
  { name: "Ground Cherry", cat: "Kitchen Garden", source: "OSC", color: "#D4A040", startIndoors: "Mar–Apr", directSow: "—", bloom: "Harvest Aug–Sep", height: "60cm", use: "Edible husk fruit, tropical flavour", socialAngle: "'I grew a fruit nobody can identify' — maximum curiosity engagement", regency: "Wrapped in a papery husk like an unsigned calling card. Sweet, peculiar, and utterly beguiling.", emoji: "🏮" },
  { name: "Lavender", cat: "Foliage & Filler", source: "OSC", color: "#967BB6", startIndoors: "Feb–Mar", directSow: "Apr–May", bloom: "Jul–Aug (Y2)", height: "45cm", use: "Perennial herb, dried, pollinator", socialAngle: "Lavender bundles = instant lifestyle content — sachets, bees, dried arrangements", regency: "Of all the Continent's offerings, lavender alone perfumes the air with equal parts calm and ambition.", emoji: "💜" },
  { name: "Rosemary", cat: "Kitchen Garden", source: "OSC", color: "#708B4A", startIndoors: "Feb–Mar", directSow: "—", bloom: "Foliage + blue flowers Jun", height: "60cm", use: "Culinary herb, aromatic, bee magnet", socialAngle: "Rosemary in bouquets — 'yes, it belongs in arrangements too'", regency: "For remembrance — and for lamb. No estate garden is complete without her.", emoji: "🌿" },
  { name: "Sweet Basil", cat: "Kitchen Garden", source: "OSC", color: "#4A7C3F", startIndoors: "Apr–May", directSow: "late May", bloom: "Harvest Jun–frost", height: "45cm", use: "Culinary herb, essential", socialAngle: "Caprese with your own tomatoes AND your own basil — the ultimate garden-to-table content", regency: "She is indispensable. Without her, the tomato is merely an acquaintance.", emoji: "🍃" },
  { name: "Spicy Globe Basil", cat: "Kitchen Garden", source: "OSC", color: "#5A8B3A", startIndoors: "Apr–May", directSow: "late May", bloom: "Harvest Jun–frost", height: "25cm", use: "Compact ornamental basil, spicy", socialAngle: "Perfect dome shape = the most photogenic herb in the garden", regency: "Small, perfectly spherical, and rather formidably flavoured. The terrier of the herb border.", emoji: "🫧" },
  { name: "Blue Spice Bush Basil", cat: "Kitchen Garden", source: "OSC", color: "#8B9F6B", startIndoors: "Apr", directSow: "late May", bloom: "Harvest Jun–frost", height: "35cm", use: "Ornamental basil, vanilla-anise scent", socialAngle: "Blue-tinged basil nobody has heard of — 'this exists?!' content", regency: "Of unusual colouring and surprising fragrance — simultaneously ornamental and edible. Overqualified for the salad.", emoji: "🫐" },
  { name: "Bells of Ireland", cat: "Cut Flowers", source: "OSC", color: "#4CAF50", startIndoors: "Mar–Apr", directSow: "Apr", bloom: "Jul–Sep", height: "75cm", use: "Architectural filler, fresh + dried", socialAngle: "All-green stems = the florist's secret weapon for making colour pop", regency: "She provides no colour of her own — and yet every arrangement improves dramatically in her presence.", emoji: "🍀" },
  { name: "French Marigold Petite Yellow", cat: "Cut Flowers", source: "OSC", color: "#FFD700", startIndoors: "Apr", directSow: "late May", bloom: "Jul–frost", height: "25cm", use: "Edging, companion planting, small cuts", socialAngle: "Front-row edging that also deters pests — 'form AND function' garden content", regency: "Diminutive but industrious. She repels pests, enchants pollinators, and asks nothing in return.", emoji: "💛" },
  { name: "Pansy Inspire True Blue", cat: "Cut Flowers", source: "OSC", color: "#1E56A0", startIndoors: "Feb–Mar", directSow: "—", bloom: "May–Jul", height: "20cm", use: "True blue edging, early season", socialAngle: "True blue pansy alongside Cornflower Blue Diadem — a rare all-blue spring moment", regency: "She arrived early and uncompromising, with the truest blue this garden has ever witnessed.", emoji: "🔵" },
  { name: "Pansy Super Swiss Giants", cat: "Cut Flowers", source: "OSC", color: "#8B6DB8", startIndoors: "Feb–Mar", directSow: "—", bloom: "May–Jul", height: "22cm", use: "Large-faced edging pansies", socialAngle: "Enormous pansy faces — macro photography gold", regency: "Of uncommonly generous proportions. One does not merely glance at a Swiss Giant — one stares.", emoji: "🌸" },
  { name: "Snapdragon Rocket Hybrids", cat: "Cut Flowers", source: "OSC", color: "#E84393", startIndoors: "Mar–Apr", directSow: "May", bloom: "Jun–frost", height: "100cm", use: "Tall cut flower, classic", socialAngle: "Snaps at 100cm = the tallest stem in the arrangement — and the most theatrical", regency: "She stands a full metre tall and refuses to be overlooked. Commanding attention since 1904.", emoji: "🚀" },
  { name: "Snapdragon Panorama Mixed", cat: "Cut Flowers", source: "OSC", color: "#FF7F50", startIndoors: "Mar–Apr", directSow: "May", bloom: "Jun–frost", height: "75cm", use: "Mid-height cut flower", socialAngle: "Classic cottage snap across a wide colour mix — succession arrangements all summer", regency: "A reliable presence throughout the Season. Not flashy — simply indispensable and always correct.", emoji: "🌄" },
  { name: "Statice Art Shades Mixed", cat: "Cut Flowers", source: "OSC", color: "#9B89C4", startIndoors: "Mar", directSow: "Apr–May", bloom: "Jul–Sep", height: "60cm", use: "Dried flower, everlasting", socialAngle: "'My bouquet from July is still beautiful in November' — the case for everlastings", regency: "She does not fade. While others wilt and depart, she endures into November without complaint.", emoji: "📎" },
  { name: "Strawflower Mixed Colours", cat: "Cut Flowers", source: "OSC", color: "#E8734A", startIndoors: "Apr", directSow: "May", bloom: "Jul–frost", height: "75cm", use: "Dried flower, everlasting", socialAngle: "Crispy petals that hold colour for years — the zero-waste flower", regency: "Her petals have the texture of fine paper and the longevity of a well-placed rumour.", emoji: "🏵️" },
  { name: "Edelweiss", cat: "Cut Flowers", source: "OSC", color: "#E8E4D0", startIndoors: "Feb–Mar", directSow: "Apr", bloom: "Jun–Aug", height: "22cm", use: "Alpine novelty, dried, edging", socialAngle: "'I grew Edelweiss in Ontario' — the audacity alone is content", regency: "She descended from the Austrian Alps to grace a Norfolk County garden. We are honoured. She is indifferent.", emoji: "🏔️" },
  { name: "Sedum Spirit", cat: "Foliage & Filler", source: "OSC", color: "#C4906A", startIndoors: "—", directSow: "Apr–May", bloom: "Aug–Oct", height: "35cm", use: "Perennial succulent, pollinator magnet", socialAngle: "Flat pink heads when everything else has faded — 'September's most underrated plant'", regency: "She blooms when her contemporaries have long retired. A perennial of admirable persistence.", emoji: "🪨" },
  { name: "Lupins Russells Red", cat: "Cut Flowers", source: "OSC", color: "#C0392B", startIndoors: "Mar", directSow: "May", bloom: "Jun–Jul (Y2)", height: "100cm", use: "Perennial border, dramatic cut", socialAngle: "Bold red lupins alongside Pink Fairy — same genus, entirely different drama", regency: "Her predecessor arrived in pink. She arrived in scarlet. The ton noticed.", emoji: "❤️‍🔥" },
  { name: "Ozark Sundrop", cat: "Cut Flowers", source: "OSC", color: "#F1C40F", startIndoors: "—", directSow: "Apr–May", bloom: "May–Aug", height: "45cm", use: "Perennial wildflower, pollinator", socialAngle: "Native-adjacent prairie plant in a cut flower garden — 'rewilding meets floristry'", regency: "She opens in the evening when all others have retired for the night. A creature of independent temperament.", emoji: "🌙" },
  { name: "Pyretheum Painted Daisy", cat: "Cut Flowers", source: "OSC", color: "#E74C3C", startIndoors: "Mar", directSow: "Apr–May", bloom: "Jun–Aug", height: "50cm", use: "Cut flower, natural insecticide", socialAngle: "A daisy that also repels bugs — the garden's most beautiful utility player", regency: "Charming in the border, devastating to the aphid population. A flower of uncommon usefulness.", emoji: "🌼" },
];

const CATEGORIES = ["All", "Cut Flowers", "Foliage & Filler", "Kitchen Garden"];

const TIMELINE = {
  "Feb–Mar": {
    label: "The First Whispers of the Season",
    seeds: ["Pansy Chianti", "Blue Glitter Sea Holly"],
    tasks: [
      "Commence pansy and sea holly cultivation beneath grow lights",
      "Prepare seed trays with the solemnity the occasion demands",
      "Label each of the 57 varieties — a household in order is a household at peace",
    ],
    social: [
      "📸 Flat lay: ALL seed packets from four orders — 'The full guest list for the Season'",
      "🎬 Reel: quadruple unboxing — four suppliers, one Norfolk County garden",
      "📝 Post: 'Snow in Simcoe, but under these grow lights — 57 reasons for optimism'",
    ],
    issues: [
      { platform: "Instagram", caption: "Dearest gentle gardener — the seed packets have arrived. Four parcels from four purveyors. Fifty-seven varieties. This author has made enquiry and finds herself quite overwhelmed, in the most magnificent way possible. We begin beneath grow lights, in February, in Ontario. One must begin somewhere. ❦ #LadyGardendown #SeedStarting #Zone6b" },
      { platform: "TikTok / Reel", caption: "Dearest gentle gardener — four seed orders unpacked on camera, with narration. Original Order, Moonglow Gardens, Stems Flower Farm, and now the Ontario Seed Company. Fifty-seven varieties entering Society this Season. The ton could not be more excited." },
      { platform: "Stories", caption: "Dearest gentle gardener — flat lay of all packets. Ask your audience to guess the count. Reveal: fifty-seven. Watch the reactions. One does enjoy a dramatic reveal." },
      { platform: "Educational Post", caption: "Dearest gentle gardener — pansies and Sea Holly are the first under glass. Both want cold stratification and eight weeks' head start. Under these grow lights, twelve hours daily, they have already begun. The Season starts long before the soil thaws." },
    ],
    palettes: [],
  },
  "Mar": {
    label: "Society Begins to Stir",
    seeds: ["Marigold Glow Up Gold", "Lupin Pink Fairy", "Bupleurum", "Caramel Rudbeckia", "Honeywort", "Orach Ruby Gold", "All tomatoes"],
    tasks: [
      "Sow ALL tomatoes indoors — the kitchen garden contingent is strong this Season",
      "Start marigolds, lupins, bupleurum, rudbeckia, honeywort, and orach",
      "Inspect pansy and sea holly seedlings; thin the weak (ruthless but necessary)",
      "Grow lights on 14–16 hr timer — the Ontario sun does not yet oblige us",
    ],
    social: [
      "📸 The tomato lineup: nine varieties in labelled pots — 'Meet the household staff'",
      "📝 Carousel: '57 varieties entering Society this Season' — packet portraits",
      "🎬 Time-lapse: seed to sprout over 7 days, scored to something dramatic",
    ],
    issues: [
      { platform: "Instagram", caption: "Dearest gentle gardener — nine tomatoes are now under glass. Brown Sugar, White Tomesol, Gunmetal Gray, Blueberry Dessert, Wolverine, Superbunny, Moonglow F2, Candyland, and Ground Cherry. This is not a tomato collection. This is a society, and this author is their reluctant chaperone. 🍅 #TomatoSeason #HeirloomTomatoes #LadyGardendown" },
      { platform: "Carousel", caption: "Dearest gentle gardener — a portrait series. Fifty-seven seed packets, photographed individually, each with their Regency epithet. Nigella Cramer's Plum: 'Dark, brooding, and utterly magnetic.' Shirley Poppy Pastel Doubles: 'Translucent, trembling, and heartbreakingly brief.' The ton shall meet each one in turn." },
      { platform: "TikTok / Reel", caption: "Dearest gentle gardener — the grow lights burn for sixteen hours. Ontario's sun has not yet obliged us. We press on. A time-lapse of seed to sprout, seven days condensed into thirty seconds. This is what patience looks like in Zone 6b." },
      { platform: "Stories", caption: "Dearest gentle gardener — poll your audience: how many tomato varieties is too many? Correct answer: there is no such number. This author has nine and considers it a reasonable beginning." },
    ],
    palettes: [],
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
      "🎬 Reel: 'POV: You told yourself ten varieties. You ordered fifty-seven.'",
      "📝 Educational: 'Direct sowing poppies in Zone 6b — cold soil, no coddling'",
    ],
    issues: [
      { platform: "Instagram", caption: "Dearest gentle gardener — it is poppy sowing day. Seven hundred and fifty seeds of Red Breadseed, scattered onto cold soil at Highway 3 with the abandon of one who has entirely lost count. We shall not speak of this to the neighbours. They will see the results in June, and they will understand. ❦ #PoppyField #DirectSow #RedBreadseed" },
      { platform: "Shelf Tour Reel", caption: "Dearest gentle gardener — a tour of the seedling shelves. Every horizontal surface is occupied. The dining table has been sacrificed. The grow lights hum continuously. This is what fifty-seven varieties looks like in April, before the garden is ready to receive them. POV: you told yourself ten varieties. You ordered fifty-seven." },
      { platform: "Educational Post", caption: "Dearest gentle gardener — poppies are the Season's most opinionated guests. They will not be moved once sown. They require cold soil in early April and only the lightest covering — they need light to germinate. Scatter, barely press, and step away. They do the rest. Zone 6b tip: trust them completely." },
      { platform: "Stories", caption: "Dearest gentle gardener — show the before: bare seed trays, labelled and waiting. Check back daily for the sprout reveal. This is the content that creates loyal followers — they are invested now. They have seen the seeds. They will want to see the flowers." },
    ],
    palettes: [],
  },
  "May": {
    label: "The Grand Debut",
    seeds: ["All varieties take to the garden or are well underway"],
    tasks: [
      "Transplant hardened seedlings after last frost (~May 15–20)",
      "Move tomatoes out last — they demand the warmest welcome",
      "Direct sow nigella, cornflower, bupleurum for succession plantings",
      "Mulch beds, install supports for tall varieties (orach, marigold, tomatoes)",
      "Stake tomato cages — the tomato contingent requires serious infrastructure",
    ],
    social: [
      "📸 Before/after: bare soil to planted estate — transformation content",
      "🎬 Planting day reel — the satisfying geometry of a freshly planted bed",
      "📝 Garden map: 'The full estate — cut flower beds, poppy field, tomato row, herb patch'",
    ],
    issues: [
      { platform: "Instagram", caption: "Dearest gentle gardener — the last frost has passed. The seedlings, raised with considerable devotion since February, have been transplanted. The estate at Highway 3 is fully occupied. This author is exhausted, exhilarated, and rather thoroughly muddy. We are officially gardening. ❦ #PlantingDay #LastFrost #Zone6b" },
      { platform: "Before/After Reel", caption: "Dearest gentle gardener — before and after: bare soil transformed into planted beds in a single remarkable afternoon. The satisfying geometry of seedlings in rows, mulched and staked and ready for the Season. This is the moment one orders seeds for, in February, in the dark, in Ontario." },
      { platform: "Educational Carousel", caption: "Dearest gentle gardener — a guide to transplanting in Zone 6b. Hardening off: ten days of increasingly long outdoor sessions. Last frost date: approximately May 15–20 in Simcoe. Tomatoes go out last — they are the most frost-intolerant and the most dramatic about it. Nigella, cornflower, and bupleurum sown directly for succession. The household is in order." },
      { platform: "Garden Map Post", caption: "Dearest gentle gardener — here is the estate in full: foliage strip along the lane, cut flower beds, poppy meadow, kitchen garden along the farm side. Thirty feet wide, one hundred feet deep, fifty-seven varieties within. Share the map. The ton wishes to see where their flowers come from.", palette: "The Blushing Introduction" },
    ],
    palettes: ["The Blushing Introduction", "The Country House Ball"],
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
    issues: [
      { platform: "Instagram", caption: "Dearest gentle gardener — the poppies are blooming. All three varieties, simultaneously, in a field of shameless spectacle along Highway 3. Seven hundred and fifty Red Breadseed, the Hens and Chicks with their peculiar crown-shaped pods, and the Shirley Doubles, translucent in the morning light. This is what one scatters seeds on cold April soil for. ❦ #PoppySeason #CutFlowerGarden #NorfolkCounty", palette: "The Poppy Rebellion" },
      { platform: "Golden Hour Reel", caption: "Dearest gentle gardener — Shirley poppies at golden hour. The petals are the texture of crêpe paper and they glow in backlight with an almost unreasonable beauty. This reel is taken at 7pm in June, in Simcoe, Ontario. The light does its finest work at this hour and this author intends to exploit it entirely.", palette: "The Poppy Rebellion" },
      { platform: "Educational Carousel", caption: "Dearest gentle gardener — three poppy varieties, compared. Red Breadseed: massive, scarlet, dramatic, bred for the cutting garden and the seed head alike. Shirley Pastel Doubles: tissue-paper petals in blush and cream, heartbreakingly brief. Hens and Chicks: eccentric crown-shaped pods, the most photographed plant in the garden by July. One does not need to choose. One grows all three.", palette: "The Poppy Rebellion" },
      { platform: "First Bloom Post", caption: "Dearest gentle gardener — the first cornflower has opened. Cornflower Blue Diadem: a true, unwavering blue that is genuinely rare in the flower world. She has arrived, and she is magnificent. One photographs her against a pale background, says nothing else, and allows the colour to do its work.", palette: "The Country House Ball" },
    ],
    palettes: ["The Poppy Rebellion", "The Country House Ball", "The Steely Assembly"],
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
      "📝 Tomato rainbow: all 9 varieties sliced open, side by side — 'the tomato spectrum'",
      "📸 Sea holly close-up — metallic blue architecture",
      "🎬 Reel: 'I grew a gray tomato and a blue one and a white one'",
      "📝 Arrangement tutorial: using foliage (orach, dill, cress) to elevate bouquets",
    ],
    issues: [
      { platform: "Weekly Bouquet Series", caption: "Dearest gentle gardener — it is high Season, and this author cuts flowers every two days. The arrangement on the kitchen table changes weekly. Queeny Lime Orange beside Zinderella Lilac. Caramel Rudbeckia against Blue Glitter Sea Holly. Orach Ruby Gold as the velvet backdrop to everything. One has become quite accustomed to abundance. ❦ #CutFlowerBouquet #WeeklyFlowers #FromTheGarden", palette: "The Golden Hour Affair" },
      { platform: "Harvest Reel", caption: "Dearest gentle gardener — a harvest reel. Golden hour over Norfolk County, scissors in hand, flowers in bucket. The satisfying snip of a zinnia stem at its correct length. The weight of a marigold head. The way Orach Ruby Gold towers above everything at four feet. This is what ASMR gardening looks like. Come harvest with me.", palette: "The Golden Hour Affair" },
      { platform: "Tomato Reveal Post", caption: "Dearest gentle gardener — nine tomatoes, sliced open. Brown Sugar: dark amber flesh, complex and extraordinary. White Tomesol: pale and luminous, mild as a summer morning. Gunmetal Gray: grey-purple skin, a revelation in the salad bowl. Blueberry Dessert: jewel-dark and impossibly sweet. Wolverine: dramatically striped, fierce by name and disposition. Candyland: cascading in golden clusters of twenty or more. The kitchen garden has exceeded every expectation.", palette: "The Tomato Spectrum" },
      { platform: "Arrangement Tutorial", caption: "Dearest gentle gardener — the secret to a superior arrangement is foliage, and this garden has three exceptional varieties: Orach Ruby Gold at four feet, jewel-toned and theatrical. Cress Attraxa, textural and unusual. Wulff Dill, feathery and fragrant, the florist's overlooked companion. Begin with these. Add flowers second. The arrangement will be extraordinary.", palette: "The Steely Assembly" },
    ],
    palettes: ["The Midnight Promenade", "The Golden Hour Affair", "The Country House Ball", "The Blushing Introduction", "The Steely Assembly", "The Sunset Promenade"],
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
      "📝 Final count: '57 varieties, one garden, one Season — here's what I'd grow again'",
    ],
    issues: [
      { platform: "Instagram", caption: "Dearest gentle gardener — it is October, and Callistephus Classic Salmon Rose has only just arrived. While others have long since retired, she makes her entrance now, fashionably devastatingly late. The zinnias are still going. The season is not over until Lady Gardendown decides it is over. ❦ #OctoberGarden #StillBlooming #CutFlowerSeason", palette: "The Blushing Introduction" },
      { platform: "Dried Arrangement Reel", caption: "Dearest gentle gardener — a dried arrangement constructed entirely from this garden: Sea Holly, metallic and unyielding, standing as it did in July. Nigella pods rattling with seed for next Season. Utrecht Blue Millet, elevated texture. Poppy heads, sentinel and dignified. Strawflower, its papery petals unchanged since August. This arrangement will be beautiful in November. In December. Possibly in March.", palette: "The Steely Assembly" },
      { platform: "Season Recap Carousel", caption: "Dearest gentle gardener — a Season in review. February: four seed orders, fifty-seven hopes. April: seven hundred and fifty poppies scattered onto cold ground. June: the field bloomed scarlet and translucent and extraordinary. July: nine tomatoes sliced open, all unusual. October: still cutting flowers. Here is what this author would grow again — and what she shall, with modifications, in 2027. The household thanks you for your company this Season." },
      { platform: "Kitchen Garden Reel", caption: "Dearest gentle gardener — a meal from the kitchen garden: heirloom tomatoes from nine varieties, fresh dill scattered over everything, Brussels Sprout Flower Sprouts, three basils. One does not require an occasion to dine extraordinarily well. The garden provided. This author merely assembled.", palette: "The Tomato Spectrum" },
    ],
    palettes: ["The Tomato Spectrum", "The Steely Assembly", "The Midnight Promenade"],
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
  {
    name: "The Midnight Promenade",
    desc: "Dark plum, wine, and jewel tones — the Season's most commanding arrangement.",
    seeds: ["Nigella Cramer's Plum", "Pansy Chianti Shades F1", "Love in a Mist Cramer's Plum Loco", "Lupins Russells Red", "Statice Art Shades Mixed", "Bupleurum Green Gold"],
  },
  {
    name: "The Golden Hour Affair",
    desc: "Warm ambers, peach, and gold — for harvest photography at dusk.",
    seeds: ["African Marigold Glow Up Gold", "Caramel Rudbeckia", "Zinnia Queeny Lime Orange", "Zinnia Peaches + Cream", "Ozark Sundrop", "Strawflower Mixed Colours"],
  },
  {
    name: "The Country House Ball",
    desc: "True blues, lilac, and lavender — the aristocracy of the cutting garden.",
    seeds: ["Nigella Miss Jekyll", "Cornflower Blue Diadem", "Zinnia Zinderella Lilac", "Pansy Inspire True Blue", "Lavender", "Statice Art Shades Mixed"],
  },
  {
    name: "The Blushing Introduction",
    desc: "Blush, cream, and soft coral — delicate, bridal, and entirely disarming.",
    seeds: ["Callistephus Classic Salmon Rose", "Zinnia Peaches + Cream", "Lupin Pink Fairy", "Zinnia Queeny Lemon Peach", "Snapdragon Panorama Mixed", "Pansy Super Swiss Giants"],
  },
  {
    name: "The Poppy Rebellion",
    desc: "Scarlet, blush, and ruby earth — a field in full, magnificent defiance.",
    seeds: ["Red Breadseed Poppy", "Poppy Hens & Chicks", "Shirley Poppy Pastel Doubles", "Pyretheum Painted Daisy", "Orach Ruby Gold", "Lupins Russells Red"],
  },
  {
    name: "The Steely Assembly",
    desc: "Blue-silver, grey-green, and cool metallics — sophisticated and architectural.",
    seeds: ["Blue Glitter Sea Holly", "Kiwi Blue Honeywort", "Utrecht Blue Millet & Wheat", "Cress Attraxa", "Bells of Ireland", "Edelweiss"],
  },
  {
    name: "The Sunset Promenade",
    desc: "Coral, flame, and warm orange — the drama of a Norfolk County evening.",
    seeds: ["Snapdragon Rocket Hybrids", "Zinnia Molotov Mix", "French Marigold Petite Yellow", "Strawflower Mixed Colours", "Pyretheum Painted Daisy", "Cornflower Classic Romantic"],
  },
  {
    name: "The Tomato Spectrum",
    desc: "Brown, cream, grey, and midnight blue — the most unusual kitchen garden on Highway 3.",
    seeds: ["Brown Sugar Tomato", "White Tomesol Tomato", "Gunmetal Gray Dwarf Tomato", "Blueberry Dessert Tomato", "Wolverine Tomato", "Candyland Tomato"],
    isTomato: true,
  },
];

const ZONES = [
  {
    id: "foliage",
    label: "Foliage & Filler Strip",
    depth: 16, yStart: 0,
    fill: "#C5D9B0", stroke: "#7B8F50",
    note: "Front-of-property structural planting. Tall foliage at the back frames the cut flower beds beyond. Direct sow throughout — these varieties resent transplanting.",
    rows: [
      {
        label: "Front edge",
        placement: "Bupleurum Green Gold (60cm): direct sow Apr\u2013May in drifts, 15cm apart, barely covered \u2014 do not transplant; cool-soil germinator, 10\u201314 days. Cress Attraxa (70cm): direct sow Apr, 20cm spacing alongside Bupleurum; harvest unusual textural seed heads before fully ripe for dried arrangements. Sedum Spirit (35cm): direct sow Apr\u2013May at the very front of this strip; a hardy Zone 6b perennial \u2014 mark clearly so it is not accidentally pulled before establishing in Year 1; blooms Aug\u2013Oct in flat terracotta-pink heads when most other plants have faded. Lavender (45cm): start indoors Feb\u2013Mar, 8+ weeks with gentle bottom heat; transplant after last frost in May, 45cm apart in the sunniest, best-drained position \u2014 perennial in Zone 6b with sharp drainage; modest bloom Year 1, full flowering Year 2.",
        seeds: ["Bupleurum Green Gold", "Cress Attraxa", "Sedum Spirit", "Lavender"],
      },
      {
        label: "Back",
        placement: "Orach Ruby Gold (120cm / 4ft): start indoors Mar, transplant May after last frost, 60cm spacing \u2014 position at the absolute rear of this strip so the jewel-toned height forms a living screen framing everything in front; young leaves edible all summer. Utrecht Blue Millet & Wheat (90cm): direct sow May after last frost, 15cm spacing in a back row \u2014 harvest seed heads when fully blue-grey (Aug\u2013Sep) for dried arrangements; leave a few stems standing for birds over winter. Bells of Ireland (75cm): cold-stratify seed 2 weeks in the fridge before starting indoors Mar\u2013Apr, or direct sow Apr; space 30cm apart \u2014 architectural filler used both fresh and dried; cut before calyxes brown for longest vase life.",
        seeds: ["Orach Ruby Gold", "Utrecht Blue Millet & Wheat", "Bells of Ireland"],
      },
    ],
  },
  {
    id: "path1",
    label: "Path",
    depth: 4, yStart: 16,
    fill: "#E5D9C8", stroke: "#C4A882",
    note: "Main access path \u2014 4\u2032 wide for comfortable harvest access.",
    rows: [],
  },
  {
    id: "zinnias",
    label: "Cut Flower Beds B \u2014 Zinnias",
    depth: 15, yStart: 20,
    fill: "#F0DFA0", stroke: "#C4A030",
    note: "Seven zinnia varieties for massed colour and non-stop harvest Jul\u2013frost. Start indoors Apr; transplant after last frost. Pinch ALL plants at 30cm for branching.",
    rows: [
      {
        label: "Front row",
        placement: "Zinnia Lilliput Rose (50cm): start indoors Apr, transplant after last frost (May 15\u201320), space 20\u201325cm apart in the front row \u2014 the shortest zinnia in this bed, placed here so it is never shaded by taller varieties behind. Pinch at 30cm for maximum branching. Ideal for small bud-vase cuts and miniature pompom bouquets.",
        seeds: ["Zinnia Lilliput Rose"],
      },
      {
        label: "Middle rows",
        placement: "Zinnia Zinderella Lilac (60cm), Zinnia Molotov Mix (70cm), Zinnia Peaches + Cream (60cm): start indoors Apr, transplant after last frost, space 25\u201330cm apart. These three form the main cutting block \u2014 pinch hard at 30cm for maximum branching. Succession-sow every 3 weeks through May for harvest extending into frost. Molotov's cactus-spined petals contrast with Zinderella's scabiosa form and Peaches + Cream's soft doubles \u2014 mix in arrangements freely.",
        seeds: ["Zinnia Zinderella Lilac", "Zinnia Molotov Mix", "Zinnia Peaches + Cream"],
      },
      {
        label: "Back rows",
        placement: "Zinnia Queeny Lime Orange, Zinnia Queeny Lime Blotch, Zinnia Queeny Lemon Peach (all 75cm): start indoors Apr, transplant after last frost, space 30cm apart in the back two rows \u2014 tallest zinnias in this bed; plant here so they cannot shade anything in front. Pinch at 30cm. Queeny varieties are designer-grade cuts with exceptional 40\u201360cm stem length and unusual colour gradients; stake with thin canes if exposed to wind.",
        seeds: ["Zinnia Queeny Lime Orange", "Zinnia Queeny Lime Blotch", "Zinnia Queeny Lemon Peach"],
      },
    ],
  },
  {
    id: "mixed",
    label: "Cut Flower Beds A \u2014 Mixed",
    depth: 15, yStart: 35,
    fill: "#D4C5E0", stroke: "#8B6B9E",
    note: "The heart of the cutting garden. 14 varieties from 20cm to 90cm \u2014 arranged strictly shortest-to-tallest front-to-back. Sea Holly and Marigold anchor the rear.",
    rows: [
      {
        label: "Front edge",
        placement: "Pansy Chianti Shades F1, Pansy Inspire True Blue, Pansy Super Swiss Giants (all 20\u201322cm): start indoors Feb\u2013Mar, 10\u201312 weeks; harden off late Apr, transplant as the frost-hardy front-edging anchor, 20cm spacing. French Marigold Petite Yellow (25cm): start indoors Apr, transplant May, 20cm spacing \u2014 deters soil pests at the bed edge. Edelweiss (22cm): start indoors Feb\u2013Mar, surface-sow (needs light to germinate), transplant May in a clump at the front centre \u2014 alpine novelty; keep on the drier side.",
        seeds: ["Pansy Chianti Shades F1", "Pansy Inspire True Blue", "Pansy Super Swiss Giants", "French Marigold Petite Yellow", "Edelweiss"],
      },
      {
        label: "Front-middle",
        placement: "Nigella Miss Jekyll (45cm), Nigella Persian Jewels (40cm), Nigella Cramer's Plum (60cm), Love in a Mist Cramer's Plum Loco (60cm): direct sow ALL FOUR IN PLACE in Apr \u2014 do not transplant; scatter thickly, barely cover, thin to 15cm when 5cm tall. Interplant the four varieties in drifts for a layered tonal effect. Ozark Sundrop (45cm): direct sow Apr\u2013May in this same band; a Zone 6b perennial that opens evening-through-morning \u2014 mark clearly so it is not disturbed; will strengthen in Year 2.",
        seeds: ["Nigella Miss Jekyll", "Nigella Persian Jewels", "Nigella Cramer's Plum", "Love in a Mist Cramer's Plum Loco", "Ozark Sundrop"],
      },
      {
        label: "Middle",
        placement: "Lupin Pink Fairy (50cm): start indoors Mar, transplant May \u2014 perennial, mark permanently, do NOT pull in autumn; blooms Jun\u2013Jul Year 2. Kiwi Blue Honeywort (60cm): start indoors Mar, transplant May, 25cm spacing. Caramel Rudbeckia (60cm): start indoors Mar\u2013Apr, transplant May, 30cm spacing \u2014 long harvest Jul\u2013Oct. Callistephus Classic Salmon Rose (60cm): start indoors Apr, transplant May, 25cm spacing \u2014 peaks Aug\u2013Oct; plant in a stable spot not disturbed by earlier-finishing neighbours. Kew Garden Collection (varies): follow per-variety packet instructions. Statice Art Shades Mixed (60cm): start indoors Mar, transplant May, 25cm spacing \u2014 harvest for drying when 80% open. Strawflower Mixed Colours (75cm): start indoors Apr (do not cover \u2014 needs light to germinate), transplant May, 25cm spacing \u2014 harvest for drying when outer petals open but centre still closed. Pyretheum Painted Daisy (50cm): start indoors Mar, transplant May, 30cm spacing \u2014 also a natural pest deterrent.",
        seeds: ["Lupin Pink Fairy", "Kiwi Blue Honeywort", "Caramel Rudbeckia", "Callistephus Classic Salmon Rose", "Kew Garden Collection", "Statice Art Shades Mixed", "Strawflower Mixed Colours", "Pyretheum Painted Daisy"],
      },
      {
        label: "Back rows",
        placement: "Cornflower Classic Romantic (80cm) and Cornflower Blue Diadem (70cm): start indoors Apr or direct sow May, 15cm spacing \u2014 may sprawl; insert thin bamboo canes at planting time before they need them. African Marigold Glow Up Gold (90cm): start indoors Mar\u2013Apr, transplant May, 45cm spacing \u2014 tallest marigold available; stake with a robust cane in the back row. Blue Glitter Sea Holly (70cm): start indoors Feb\u2013Mar (cold stratify 4 weeks), transplant May, 30cm spacing \u2014 dislikes wet roots; ensure excellent drainage; harvest metallic-blue bracts when fully coloured for fresh or dried use. Snapdragon Rocket Hybrids (100cm) and Snapdragon Panorama Mixed (75cm): start indoors Mar\u2013Apr, transplant May, 25cm spacing \u2014 tallest plants in this bed; insert canes at planting. Lupins Russells Red (100cm): start indoors Mar, transplant May, 45cm spacing \u2014 perennial, mark permanently, do NOT pull in autumn; blooms Jun\u2013Jul Year 2.",
        seeds: ["Cornflower Classic Romantic", "Cornflower Blue Diadem", "African Marigold Glow Up Gold", "Blue Glitter Sea Holly", "Snapdragon Rocket Hybrids", "Snapdragon Panorama Mixed", "Lupins Russells Red"],
      },
    ],
  },
  {
    id: "path2",
    label: "Path",
    depth: 4, yStart: 50,
    fill: "#E5D9C8", stroke: "#C4A882",
    note: "Central access path \u2014 separates the flower beds from the poppy meadow.",
    rows: [],
  },
  {
    id: "poppies",
    label: "Poppy Meadow",
    depth: 14, yStart: 54,
    fill: "#EEC5C5", stroke: "#B06060",
    note: "Direct sow ONLY \u2014 poppies categorically refuse transplanting. Scatter onto cold soil in early April and barely cover (they need light to germinate). Do not rake in.",
    rows: [
      {
        label: "Front edge",
        placement: "Poppy Hens & Chicks (75cm): direct sow onto cold soil in early April \u2014 scatter along the front edge, press lightly, do NOT cover (light required for germination). Once seedlings reach 5cm, thin to 20\u201325cm spacing. The bizarre crown-shaped pods are the season's most photographed detail \u2014 leave pods standing after petals drop. Zone 6b: sow as soon as soil can be worked, even if frost is still possible.",
        seeds: ["Poppy Hens & Chicks"],
      },
      {
        label: "Middle drift",
        placement: "Shirley Poppy Pastel Doubles (60cm): direct sow cold soil early April \u2014 scatter freely through the middle third of the meadow, barely press in, do not cover. Interplant with Red Breadseed for a layered bloom effect. Thin to 15cm once seedlings emerge. Harvest as buds for longest vase life; petals are translucent at golden hour \u2014 photograph backlit in evening light.",
        seeds: ["Shirley Poppy Pastel Doubles"],
      },
      {
        label: "Full-zone dense sow",
        placement: "Red Breadseed Poppy (90cm): 750 seeds \u2014 broadcast scatter across the ENTIRE meadow bed in early April onto cold soil; press lightly with the palm but do not cover (needs light to germinate). Once seedlings are 5cm tall, thin ruthlessly to 15cm spacing. The scarlet mass in June is the signature content moment of the season \u2014 photograph from the lane for scale. Allow seed heads to fully ripen and rattle for dried-arrangement harvest in Sep\u2013Oct.",
        seeds: ["Red Breadseed Poppy"],
      },
    ],
  },
  {
    id: "path3",
    label: "Path",
    depth: 4, yStart: 68,
    fill: "#E5D9C8", stroke: "#C4A882",
    note: "Rear access path \u2014 essential for tomato harvest without trampling.",
    rows: [],
  },
  {
    id: "kitchen",
    label: "Kitchen Garden",
    depth: 28, yStart: 72,
    fill: "#C8DEB5", stroke: "#6B8E23",
    note: "28 feet of productive chaos at the rear of the property. Tomatoes are the stars; dill and sprouts support in character roles. All tomatoes need staking \u2014 prepare cages before transplanting.",
    rows: [
      {
        label: "Front border \u2014 herbs",
        placement: "Wulff Dill (90cm): direct sow May after last frost, 30cm spacing along the front border \u2014 do not transplant; succession-sow every 3 weeks through Jun. Rosemary (60cm): start indoors Feb\u2013Mar (slow: 3\u20134 weeks germination), transplant May after last frost, 45cm spacing in the sunniest position \u2014 not fully hardy in Zone 6b; bring indoors before Oct frost or treat as an annual. Sweet Basil (45cm), Spicy Globe Basil (25cm), Blue Spice Bush Basil (35cm): start indoors Apr\u2013May, transplant late May only after soil is consistently warm above 15\u00b0C \u2014 basil collapses below 10\u00b0C; space 25\u201330cm apart. Brussels Sprouts Flower Sprout (60cm): start indoors Apr, transplant May, 45cm spacing at the end of the herb row \u2014 harvest Oct after first frost for best flavour.",
        seeds: ["Wulff Dill", "Rosemary", "Sweet Basil", "Spicy Globe Basil", "Blue Spice Bush Basil", "Brussels Sprouts Flower Sprout"],
      },
      {
        label: "Tomato rows \u2014 staked",
        placement: "Start ALL tomatoes indoors Mar under grow lights; transplant after last frost (May 15\u201320), minimum soil temp 15\u00b0C, space 60cm apart. Install cages or stakes BEFORE planting. Superbunny Microdwarf Tomato (20cm): plant in a large pot or at the very front edge \u2014 too small for a full row. Gunmetal Gray Dwarf Tomato (90cm): compact, cage required. Brown Sugar Tomato (150cm), White Tomesol Tomato (150cm), Blueberry Dessert Tomato (150cm): tall indeterminate \u2014 use 5-foot cages, tie in every 20cm. Wolverine Tomato (120cm): semi-indeterminate, cage. Moonglow Jewel Tomato F2 (varies): F2 genetic mix \u2014 expect size variation; mark each plant individually. Candyland Tomato (90cm): produces cascading clusters of 20+ tiny fruits \u2014 give a strong cage and 75cm spacing for air circulation. Ground Cherry (60cm): plant at the end of the row; husk fruit drops when ripe \u2014 harvest from the ground daily.",
        seeds: ["Superbunny Microdwarf Tomato", "Gunmetal Gray Dwarf Tomato", "Brown Sugar Tomato", "Moonglow Jewel Tomato F2", "White Tomesol Tomato", "Blueberry Dessert Tomato", "Wolverine Tomato", "Candyland Tomato", "Ground Cherry"],
      },
    ],
  },
];

const getAllSeeds = (zone) => zone.rows.flatMap(r => r.seeds);

const Flourish = ({ style = {} }) => (
  <div style={{ textAlign: "center", color: "#C9960A", fontSize: "20px", letterSpacing: "8px", userSelect: "none", ...style }}>❦ ✿ ❦</div>
);

function parsePlacement(text) {
  const regex = /([A-Z][^(:]+\([^)]+\)):\s*/g;
  const matches = [];
  let m;
  while ((m = regex.exec(text)) !== null) {
    matches.push({ name: m[1].trim(), start: m.index, contentStart: m.index + m[0].length });
  }
  if (matches.length < 2) return null;
  return matches.map((entry, i) => ({
    plant: entry.name,
    detail: text.slice(entry.contentStart, i < matches.length - 1 ? matches[i + 1].start : text.length).replace(/\.\s*$/, "").trim(),
  }));
}

export default function SeedPlan() {
  const [activeTab, setActiveTab] = useState("timeline");
  const [expandedMonth, setExpandedMonth] = useState("Feb–Mar");
  const [expandedIssue, setExpandedIssue] = useState("Feb–Mar");
  const [selectedSeed, setSelectedSeed] = useState(null);
  const [catFilter, setCatFilter] = useState("All");
  const [selectedZone, setSelectedZone] = useState(null);

  const filtered = catFilter === "All" ? SEEDS : SEEDS.filter(s => s.cat === catFilter);

  return (
    <div style={{
      fontFamily: "'Cormorant Garamond', 'Georgia', serif",
      background: "linear-gradient(178deg, #F9EDD0 0%, #EDD9AF 25%, #E2C88A 60%, #D4B574 100%)",
      minHeight: "100vh",
      color: "#1A1208",
      position: "relative",
      overflowX: "hidden",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500&family=Outfit:wght@300;400;500;600&family=Cormorant+SC:wght@400;600&display=swap" rel="stylesheet" />

      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        .seed-card:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(59,47,32,0.1); }
        .month-btn:hover { background: rgba(196,168,130,0.12) !important; }
      `}</style>

      <div style={{ position: "absolute", top: "12px", left: "16px", fontSize: "30px", color: "#C9960A", opacity: 0.35 }}>❧</div>
      <div style={{ position: "absolute", top: "12px", right: "16px", fontSize: "30px", color: "#C9960A", opacity: 0.35, transform: "scaleX(-1)" }}>❧</div>

      {/* Masthead */}
      <div style={{ padding: "36px 24px 28px", textAlign: "center", animation: "fadeUp 0.8s ease both" }}>

        {/* Volume line with rules */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px", maxWidth: "720px", margin: "0 auto 20px" }}>
          <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, transparent, #C9960A)" }} />
          <div style={{ fontSize: "14px", fontFamily: "'Outfit', sans-serif", letterSpacing: "4px", textTransform: "uppercase", color: "#8B6A18", whiteSpace: "nowrap" }}>
            Volume I · The 2026 Season · Norfolk County, Ontario
          </div>
          <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, #C9960A, transparent)" }} />
        </div>

        {/* Portrait medallion */}
        <div style={{ margin: "0 auto 18px", width: "160px", height: "160px", filter: "drop-shadow(0 4px 18px rgba(26,18,8,0.28))" }}>
          <div style={{
            width: "100%", height: "100%", borderRadius: "50%",
            background: "#FBF5E8",
            border: "2.5px solid #3A3A3A",
            boxShadow: "0 0 0 5px #FBF5E8, 0 0 0 7px #3A3A3A",
            overflow: "hidden",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <img
              src="/gardener.jpg"
              alt="Lady Gardendown — gardening silhouette"
              style={{ width: "100%", height: "100%", objectFit: "contain", mixBlendMode: "multiply" }}
            />
          </div>
        </div>

        {/* Masthead title */}
        <div style={{ fontFamily: "'Cormorant SC', serif", fontSize: "clamp(15px, 2.5vw, 20px)", fontWeight: 400, letterSpacing: "6px", textTransform: "uppercase", color: "#8B6A18", marginBottom: "4px" }}>
          Lady Gardendown's
        </div>
        <h1 style={{ fontFamily: "'Cormorant SC', serif", fontSize: "clamp(34px, 7vw, 60px)", fontWeight: 400, margin: "0 0 2px", letterSpacing: "3px", lineHeight: 1.05, color: "#1A1208" }}>
          Flower Papers
        </h1>

        {/* Double rule beneath title */}
        <div style={{ maxWidth: "520px", margin: "12px auto" }}>
          <div style={{ height: "2px", background: "#1A1208", marginBottom: "3px" }} />
          <div style={{ height: "1px", background: "#1A1208", opacity: 0.35 }} />
        </div>

        <div style={{ fontSize: "18px", fontStyle: "italic", color: "#6B5020", marginBottom: "6px" }}>
          Four Orders · 57 Varieties · One Norfolk County Garden
        </div>

        {/* Thin rule */}
        <div style={{ maxWidth: "520px", margin: "10px auto" }}>
          <div style={{ height: "1px", background: "#1A1208", opacity: 0.2 }} />
        </div>

        <Flourish style={{ marginTop: "10px" }} />

        <div style={{ maxWidth: "620px", margin: "14px auto 0", fontSize: "18px", fontStyle: "italic", lineHeight: 1.9, color: "#7A5C1E" }}>
          "Dear Reader — fifty-seven varieties have been summoned from four purveyors to the estate grounds along Highway 3.
          Cut flowers, foliage, nine tomatoes of unusual character, poppies sown with reckless ambition,
          three basils, an Edelweiss, and one Brussels sprout for good measure.
          This author has made thorough enquiry. What follows is their Season."
        </div>

        {/* Order summary badges */}
        <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "18px", flexWrap: "wrap" }}>
          {[
            { name: "Original Order", id: "WEB-024012", count: 16 },
            { name: "Moonglow Gardens", id: "R709518406", count: 12 },
            { name: "Stems Flower Farm", id: "#29659", count: 9 },
            { name: "Ontario Seed Co.", id: "OSC-2026", count: 20 },
          ].map((o, i) => (
            <div key={i} style={{
              fontSize: "14px", fontFamily: "'Outfit', sans-serif", padding: "6px 14px",
              background: "rgba(59,47,32,0.06)", border: "1px solid rgba(196,168,130,0.25)",
              borderRadius: "2px", color: "#6B5D4A",
            }}>
              <strong>{o.name}</strong> · {o.count} varieties
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "4px", padding: "8px 16px 0", animation: "fadeUp 0.8s ease 0.15s both" }}>
        {[
          { id: "timeline", label: "The Calendar" },
          { id: "seeds", label: "The Registry" },
          { id: "social", label: "Issues" },
          { id: "palettes", label: "The Palettes" },
          { id: "layout", label: "The Grounds" },
          { id: "field", label: "The Field" },
        ].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
            padding: "9px 14px",
            border: activeTab === tab.id ? "1px solid #1E3A6E" : "1px solid rgba(180,140,60,0.3)",
            background: activeTab === tab.id ? "#1E3A6E" : "transparent",
            color: activeTab === tab.id ? "#F5EDD0" : "#7A5C1E",
            fontSize: "13px", fontFamily: "'Outfit', sans-serif", fontWeight: 500,
            letterSpacing: "1.5px", textTransform: "uppercase", cursor: "pointer",
            borderRadius: "2px", transition: "all 0.35s ease", whiteSpace: "nowrap",
          }}>{tab.label}</button>
        ))}
      </div>

      <div style={{ padding: "24px", maxWidth: "1200px", margin: "0 auto" }}>

        {/* === TIMELINE === */}
        {activeTab === "timeline" && (
          <div style={{ animation: "fadeUp 0.5s ease both" }}>
            {Object.entries(TIMELINE).map(([month, data], idx) => {
              const isOpen = expandedMonth === month;
              return (
                <div key={month} style={{ marginBottom: "6px", animation: `fadeUp 0.5s ease ${idx * 0.06}s both` }}>
                  <button className="month-btn" onClick={() => setExpandedMonth(isOpen ? null : month)} style={{
                    width: "100%", display: "flex", alignItems: "center", gap: "16px", padding: "18px 22px",
                    background: isOpen ? "linear-gradient(135deg, #1E3A6E, #152D57)" : "rgba(255,250,235,0.6)",
                    color: isOpen ? "#F5EDD0" : "#1A1208",
                    border: isOpen ? "1px solid #1E3A6E" : "1px solid rgba(180,140,60,0.25)",
                    borderRadius: isOpen ? "3px 3px 0 0" : "3px", cursor: "pointer", textAlign: "left",
                    fontFamily: "'Cormorant Garamond', serif", transition: "all 0.35s ease",
                  }}>
                    <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "14px", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", opacity: 0.6, minWidth: "65px" }}>{month}</span>
                    <span style={{ fontSize: "24px", fontWeight: 500, fontStyle: "italic", flex: 1 }}>{data.label}</span>
                    <span style={{ fontSize: "18px", transition: "transform 0.35s", transform: isOpen ? "rotate(180deg)" : "rotate(0)", opacity: 0.5 }}>⌄</span>
                  </button>
                  {isOpen && (
                    <div style={{ background: "rgba(255,250,230,0.82)", borderRadius: "0 0 3px 3px", border: "1px solid rgba(180,140,60,0.25)", borderTop: "none", padding: "22px 24px", backdropFilter: "blur(10px)", animation: "fadeUp 0.4s ease both" }}>
                      <div style={{ marginBottom: "20px" }}>
                        <div style={{ fontSize: "14px", fontFamily: "'Outfit', sans-serif", letterSpacing: "3px", textTransform: "uppercase", color: "#8B6A18", marginBottom: "10px" }}>Varieties in Attendance</div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                          {data.seeds.map((s, i) => (
                            <span key={i} style={{ fontSize: "14px", fontFamily: "'Outfit', sans-serif", padding: "4px 12px", background: "rgba(59,47,32,0.06)", borderRadius: "2px", border: "1px solid rgba(196,168,130,0.2)", color: "#5A4E3C" }}>{s}</span>
                          ))}
                        </div>
                      </div>
                      <div style={{ marginBottom: "20px" }}>
                        <div style={{ fontSize: "14px", fontFamily: "'Outfit', sans-serif", letterSpacing: "3px", textTransform: "uppercase", color: "#8B6A18", marginBottom: "10px" }}>Duties of the Season</div>
                        {data.tasks.map((task, i) => (
                          <div key={i} style={{ fontSize: "19px", lineHeight: 1.7, padding: "5px 0", borderBottom: i < data.tasks.length - 1 ? "1px solid rgba(196,168,130,0.15)" : "none", display: "flex", gap: "12px", alignItems: "baseline" }}>
                            <span style={{ color: "#C4A882", fontSize: "14px" }}>◆</span><span>{task}</span>
                          </div>
                        ))}
                      </div>
                      <div>
                        <div style={{ fontSize: "14px", fontFamily: "'Outfit', sans-serif", letterSpacing: "3px", textTransform: "uppercase", color: "#8B6A18", marginBottom: "10px" }}>Dispatches to the Public</div>
                        {data.social.map((idea, i) => (
                          <div key={i} style={{ fontSize: "18px", lineHeight: 1.7, padding: "8px 14px", margin: "5px 0", background: "linear-gradient(90deg, rgba(196,168,130,0.08), transparent)", borderRadius: "2px", borderLeft: "2px solid #C9960A", fontStyle: "italic" }}>{idea}</div>
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
            <div style={{ textAlign: "center", fontStyle: "italic", color: "#7A5C1E", fontSize: "18px", marginBottom: "16px", lineHeight: 1.7 }}>
              "Thirty-seven souls, arranged by station. Tap any to reveal their particulars."
            </div>
            {/* Category filter */}
            <div style={{ display: "flex", justifyContent: "center", gap: "6px", marginBottom: "18px", flexWrap: "wrap" }}>
              {CATEGORIES.map(cat => (
                <button key={cat} onClick={() => { setCatFilter(cat); setSelectedSeed(null); }} style={{
                  padding: "6px 16px", fontSize: "14px", fontFamily: "'Outfit', sans-serif", letterSpacing: "1px",
                  border: catFilter === cat ? "1px solid #1E3A6E" : "1px solid rgba(180,140,60,0.3)",
                  background: catFilter === cat ? "#1E3A6E" : "transparent",
                  color: catFilter === cat ? "#F5EDD0" : "#6B5020",
                  borderRadius: "2px", cursor: "pointer", transition: "all 0.3s ease",
                }}>
                  {cat} {cat !== "All" && <span style={{ opacity: 0.6 }}>({SEEDS.filter(s => s.cat === cat).length})</span>}
                </button>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(220px, 100%), 1fr))", gap: "10px" }}>
              {filtered.map((seed, i) => {
                const globalIdx = SEEDS.indexOf(seed);
                const isSelected = selectedSeed === globalIdx;
                return (
                  <button key={globalIdx} className="seed-card" onClick={() => setSelectedSeed(isSelected ? null : globalIdx)} style={{
                    background: isSelected ? "linear-gradient(145deg, #1E3A6E, #152D57)" : "rgba(255,250,235,0.65)",
                    color: isSelected ? "#F5EDD0" : "#1A1208",
                    border: `1px solid ${isSelected ? "#1E3A6E" : "rgba(180,140,60,0.25)"}`,
                    borderRadius: "3px", padding: "16px", textAlign: "left", cursor: "pointer",
                    transition: "all 0.35s ease", position: "relative", overflow: "hidden",
                    animation: `fadeUp 0.4s ease ${i * 0.03}s both`,
                  }}>
                    <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "3px", background: `linear-gradient(90deg, ${seed.color}, transparent)` }} />
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
                      <span style={{ fontSize: "18px" }}>{seed.emoji}</span>
                      <span style={{ fontSize: "14px", fontFamily: "'Outfit', sans-serif", letterSpacing: "1.5px", textTransform: "uppercase", opacity: 0.45 }}>{seed.source}</span>
                    </div>
                    <div style={{ fontSize: "19px", fontWeight: 600, lineHeight: 1.2, marginBottom: "4px", fontStyle: "italic" }}>{seed.name}</div>
                    <div style={{ fontSize: "16px", fontStyle: "italic", opacity: 0.65, lineHeight: 1.45 }}>{seed.regency}</div>
                    {isSelected && (
                      <div style={{ marginTop: "12px", paddingTop: "12px", borderTop: "1px solid rgba(243,236,224,0.15)", animation: "fadeUp 0.3s ease both" }}>
                        <div style={{ fontSize: "14px", fontFamily: "'Outfit', sans-serif", lineHeight: 2 }}>
                          <div><span style={{ opacity: 0.5, fontSize: "14px", letterSpacing: "1px" }}>INDOORS</span> {seed.startIndoors}</div>
                          <div><span style={{ opacity: 0.5, fontSize: "14px", letterSpacing: "1px" }}>DIRECT SOW</span> {seed.directSow}</div>
                          <div><span style={{ opacity: 0.5, fontSize: "14px", letterSpacing: "1px" }}>BLOOM</span> {seed.bloom}</div>
                          <div><span style={{ opacity: 0.5, fontSize: "14px", letterSpacing: "1px" }}>HEIGHT</span> {seed.height}</div>
                          <div><span style={{ opacity: 0.5, fontSize: "14px", letterSpacing: "1px" }}>PURPOSE</span> {seed.use}</div>
                        </div>
                        <div style={{ marginTop: "8px", padding: "8px 10px", background: "rgba(255,255,255,0.08)", borderRadius: "2px", fontSize: "14px", fontFamily: "'Outfit', sans-serif", lineHeight: 1.5 }}>
                          📸 <span style={{ fontStyle: "italic", fontFamily: "'Cormorant Garamond', serif", fontSize: "15px" }}>{seed.socialAngle}</span>
                        </div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            <Flourish style={{ marginTop: "28px" }} />
          </div>
        )}

        {/* === THE PALETTES === */}
        {activeTab === "palettes" && (
          <div style={{ animation: "fadeUp 0.5s ease both" }}>
            <div style={{ textAlign: "center", fontStyle: "italic", color: "#7A5C1E", fontSize: "18px", lineHeight: 1.8, maxWidth: "600px", margin: "0 auto 28px" }}>
              "Eight named arrangements for the Season — each palette drawn from the estate's own varieties,
              mapped by colour, character, and which flowers shall be in attendance."
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(340px, 100%), 1fr))", gap: "12px" }}>
              {PALETTES.map((palette, i) => (
                <div key={i} style={{
                  background: palette.isTomato ? "rgba(59,47,32,0.05)" : "rgba(255,255,255,0.65)",
                  border: "1px solid rgba(196,168,130,0.22)", borderRadius: "3px", padding: "20px",
                  animation: `fadeUp 0.4s ease ${i * 0.06}s both`,
                }}>
                  {/* Colour bar */}
                  <div style={{ display: "flex", marginBottom: "14px", borderRadius: "2px", overflow: "hidden" }}>
                    {palette.seeds.map((sName) => {
                      const sd = SEEDS.find(s => s.name === sName);
                      return sd ? (
                        <div key={sName} title={sName} style={{ flex: 1, height: "12px", background: sd.color }} />
                      ) : null;
                    })}
                  </div>
                  <div style={{ fontSize: "21px", fontWeight: 600, fontStyle: "italic", marginBottom: "4px", lineHeight: 1.2 }}>{palette.name} {palette.isTomato && "🍅"}</div>
                  <div style={{ fontSize: "15px", fontFamily: "'Outfit', sans-serif", color: "#6B5020", fontWeight: 300, marginBottom: "16px", lineHeight: 1.5 }}>{palette.desc}</div>
                  {/* Flower chips */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {palette.seeds.map((sName) => {
                      const sd = SEEDS.find(s => s.name === sName);
                      return (
                        <span key={sName} style={{
                          fontSize: "14px", fontFamily: "'Outfit', sans-serif",
                          padding: "4px 10px",
                          background: sd ? `${sd.color}22` : "rgba(59,47,32,0.05)",
                          border: `1px solid ${sd ? sd.color + "70" : "rgba(196,168,130,0.3)"}`,
                          borderRadius: "2px", color: "#3B2F20",
                          display: "flex", alignItems: "center", gap: "5px",
                        }}>
                          {sd?.emoji} {sName}
                        </span>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
            <Flourish style={{ marginTop: "32px" }} />
          </div>
        )}

        {/* === THE GROUNDS === */}
        {activeTab === "layout" && (
          <div style={{ animation: "fadeUp 0.5s ease both" }}>
            <div style={{ textAlign: "center", fontStyle: "italic", color: "#7A5C1E", fontSize: "18px", lineHeight: 1.8, maxWidth: "580px", margin: "0 auto 28px" }}>
              "The garden at Highway 3, Simcoe — thirty feet wide along the highway, one hundred feet deep behind the house,
              arranged with the deliberate ambition of one who has ordered from four seed purveyors."
            </div>

            {/* Map + detail side-by-side on wide screens */}
            <div style={{ display: "flex", gap: "28px", alignItems: "flex-start", justifyContent: "center", flexWrap: "wrap" }}>

              {/* Map column */}
              <div style={{ maxWidth: "900px", flex: "1 1 320px" }}>
                <div style={{ textAlign: "center", fontFamily: "'Cormorant SC', serif", fontSize: "14px", letterSpacing: "3px", color: "#8B6A18", marginBottom: "6px" }}>
                  Lane
                </div>

                <svg
                  viewBox="0 0 400 1020"
                  style={{ width: "100%", display: "block", border: "1px solid rgba(196,168,130,0.3)", borderRadius: "2px" }}
                  aria-label="Bird's-eye view of the garden layout"
                >
                  {/* Background */}
                  <rect x="0" y="0" width="400" height="1020" fill="#F8F3EB" />

                  {/* Left foot ruler */}
                  <line x1="22" y1="0" x2="22" y2="1000" stroke="#C4A882" strokeWidth="0.5" opacity="0.5" />
                  {[0,10,20,30,40,50,60,70,80,90,100].map(ft => (
                    <g key={ft}>
                      <line x1="16" y1={ft * 10} x2="22" y2={ft * 10} stroke="#C4A882" strokeWidth="0.8" />
                      <text x="13" y={ft * 10 + 3.5} textAnchor="end" fontSize="7" fontFamily="'Outfit', sans-serif" fill="#A89474">{ft}′</text>
                    </g>
                  ))}

                  {/* Width ruler at top */}
                  <line x1="30" y1="6" x2="382" y2="6" stroke="#C4A882" strokeWidth="0.5" opacity="0.5" />
                  {[0, 10, 20, 30].map((ft, i) => {
                    const x = 30 + (i / 3) * 352;
                    return (
                      <g key={ft}>
                        <line x1={x} y1="3" x2={x} y2="10" stroke="#C4A882" strokeWidth="0.8" />
                        <text x={x} y="16" textAnchor="middle" fontSize="7" fontFamily="'Outfit', sans-serif" fill="#A89474">{ft}′</text>
                      </g>
                    );
                  })}

                  {/* Zone blocks */}
                  {ZONES.map(zone => {
                    const isPath = zone.rows.length === 0;
                    const isSelected = selectedZone === zone.id;
                    const zoneH = zone.depth * 10;
                    const zoneY = zone.yStart * 10;
                    const seeds = getAllSeeds(zone);

                    return (
                      <g key={zone.id} onClick={() => !isPath && setSelectedZone(isSelected ? null : zone.id)} style={{ cursor: isPath ? "default" : "pointer" }}>
                        {/* Zone fill */}
                        <rect
                          x="30" y={zoneY} width="352" height={zoneH}
                          fill={zone.fill} stroke={zone.stroke}
                          strokeWidth={isSelected ? "2.5" : "1"}
                          opacity={selectedZone && !isSelected ? 0.5 : 1}
                          style={{ transition: "opacity 0.3s" }}
                        />

                        {/* Row dividers + seed swatches */}
                        {!isPath && (() => {
                          let cumY = 0;
                          return zone.rows.map((row, ri) => {
                            const rowH = zoneH / zone.rows.length;
                            const rowY = zoneY + cumY;
                            cumY += rowH;
                            return (
                              <g key={ri}>
                                {ri > 0 && (
                                  <line x1="30" y1={rowY} x2="382" y2={rowY} stroke={zone.stroke} strokeWidth="0.6" strokeDasharray="3,3" opacity="0.6" />
                                )}
                                {/* Row label */}
                                <text x="35" y={rowY + rowH * 0.38} fontSize="7.5" fontFamily="'Outfit', sans-serif" fill="#3B2F20" opacity="0.65" fontStyle="italic">{row.label}</text>
                                {/* Seed color swatches on right edge */}
                                {row.seeds.slice(0, 6).map((sName, si) => {
                                  const sd = SEEDS.find(s => s.name === sName);
                                  return sd ? (
                                    <circle key={si} cx={374 - si * 8} cy={rowY + rowH * 0.62} r="3" fill={sd.color} opacity="0.85" />
                                  ) : null;
                                })}
                              </g>
                            );
                          });
                        })()}

                        {/* Zone name label */}
                        {!isPath ? (
                          <g>
                            <text x="191" y={zoneY + zoneH * 0.5 - 4} textAnchor="middle" fontSize="9" fontFamily="'Cormorant Garamond', Georgia, serif" fontStyle="italic" fill="#3B2F20" opacity="0.65">{zone.label}</text>
                            <text x="191" y={zoneY + zoneH * 0.5 + 9} textAnchor="middle" fontSize="8" fontFamily="'Outfit', sans-serif" fill="#3B2F20" opacity="0.5">{zone.depth}′ · {getAllSeeds(zone).length} vars</text>
                          </g>
                        ) : (
                          <text x="206" y={zoneY + zoneH * 0.5 + 3.5} textAnchor="middle" fontSize="7" fontFamily="'Outfit', sans-serif" fill="#8B7D6B" opacity="0.6" letterSpacing="2">— PATH —</text>
                        )}
                      </g>
                    );
                  })}

                  {/* Compass rose — top right corner */}
                  <g transform="translate(378, 32)">
                    <circle cx="0" cy="0" r="16" fill="rgba(250,246,240,0.92)" stroke="#C4A882" strokeWidth="0.8" />
                    <text x="0" y="-5" textAnchor="middle" fontSize="8" fontFamily="'Cormorant SC', serif" fill="#3B2F20">N</text>
                    <line x1="0" y1="-13" x2="0" y2="-1" stroke="#3B2F20" strokeWidth="1.2" />
                    <polygon points="0,-13 -2.5,-5 2.5,-5" fill="#3B2F20" />
                    <text x="0" y="14" textAnchor="middle" fontSize="7" fontFamily="'Cormorant SC', serif" fill="#A89474">S</text>
                    <text x="-13" y="4" textAnchor="middle" fontSize="6.5" fontFamily="'Cormorant SC', serif" fill="#A89474">W</text>
                    <text x="13" y="4" textAnchor="middle" fontSize="6.5" fontFamily="'Cormorant SC', serif" fill="#A89474">E</text>
                  </g>

                  {/* Scale bar */}
                  <g transform="translate(35, 1007)">
                    <rect x="0" y="0" width="100" height="3" fill="none" stroke="#8B7D6B" strokeWidth="1" />
                    <line x1="0" y1="0" x2="0" y2="6" stroke="#8B7D6B" strokeWidth="1" />
                    <line x1="100" y1="0" x2="100" y2="6" stroke="#8B7D6B" strokeWidth="1" />
                    <text x="50" y="14" textAnchor="middle" fontSize="7" fontFamily="'Outfit', sans-serif" fill="#8B7D6B">10 feet</text>
                    <text x="0" y="14" textAnchor="middle" fontSize="6.5" fontFamily="'Outfit', sans-serif" fill="#A89474">0</text>
                  </g>
                </svg>

                <div style={{ textAlign: "center", fontFamily: "'Cormorant SC', serif", fontSize: "14px", letterSpacing: "3px", color: "#8B6A18", marginTop: "6px" }}>
                  Farm fields to the South & East →
                </div>
              </div>

              {/* Detail panel — right column on wide, below on narrow */}
              <div style={{ flex: "1 1 280px", maxWidth: "480px" }}>
                {selectedZone ? (() => {
                  const zone = ZONES.find(z => z.id === selectedZone);
                  if (!zone || zone.rows.length === 0) return null;
                  const seeds = getAllSeeds(zone);
                  return (
                    <div style={{ background: "rgba(255,255,255,0.75)", border: `1px solid ${zone.stroke}`, borderRadius: "3px", padding: "22px", animation: "fadeUp 0.3s ease both", backdropFilter: "blur(10px)" }}>
                      {/* Header */}
                      <div style={{ borderBottom: `2px solid ${zone.fill}`, paddingBottom: "12px", marginBottom: "16px" }}>
                        <div style={{ fontSize: "22px", fontWeight: 600, fontStyle: "italic", color: "#3B2F20", lineHeight: 1.2 }}>{zone.label}</div>
                        <div style={{ display: "flex", gap: "14px", marginTop: "6px" }}>
                          <span style={{ fontSize: "14px", fontFamily: "'Outfit', sans-serif", color: "#8B6A18" }}>30′ × {zone.depth}′ = {30 * zone.depth} sq ft</span>
                          <span style={{ fontSize: "14px", fontFamily: "'Outfit', sans-serif", color: "#8B6A18" }}>{seeds.length} {seeds.length === 1 ? "variety" : "varieties"}</span>
                        </div>
                        <div style={{ fontSize: "16px", fontFamily: "'Outfit', sans-serif", color: "#6B5020", marginTop: "8px", fontStyle: "italic", lineHeight: 1.6 }}>{zone.note}</div>
                      </div>

                      {/* Rows */}
                      {zone.rows.map((row, ri) => (
                        <div key={ri} style={{ marginBottom: ri < zone.rows.length - 1 ? "18px" : 0 }}>
                          <div style={{ fontSize: "14px", fontFamily: "'Outfit', sans-serif", letterSpacing: "2px", textTransform: "uppercase", color: zone.stroke, marginBottom: "6px", fontWeight: 600 }}>
                            {row.label}
                          </div>
                          {(() => {
                            const entries = parsePlacement(row.placement);
                            return entries ? (
                              <div style={{ marginBottom: "10px", display: "flex", flexDirection: "column", gap: "8px" }}>
                                {entries.map((e, ei) => (
                                  <div key={ei} style={{ background: `${zone.fill}55`, borderLeft: `2px solid ${zone.stroke}`, borderRadius: "2px", padding: "8px 10px" }}>
                                    <div style={{ fontSize: "13px", fontFamily: "'Outfit', sans-serif", fontWeight: 700, letterSpacing: "0.5px", color: zone.stroke, marginBottom: "3px" }}>{e.plant}</div>
                                    <div style={{ fontSize: "14px", fontFamily: "'Outfit', sans-serif", color: "#6B5D4A", lineHeight: 1.65 }}>{e.detail}</div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div style={{ fontSize: "15px", fontFamily: "'Outfit', sans-serif", color: "#6B5D4A", lineHeight: 1.65, marginBottom: "10px", background: `${zone.fill}55`, padding: "8px 10px", borderRadius: "2px", borderLeft: `2px solid ${zone.stroke}` }}>
                                {row.placement}
                              </div>
                            );
                          })()}
                          <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                            {row.seeds.map((sName, si) => {
                              const sd = SEEDS.find(s => s.name === sName);
                              return (
                                <span key={si} style={{
                                  fontSize: "14px", fontFamily: "'Outfit', sans-serif",
                                  padding: "3px 9px",
                                  background: sd ? `${sd.color}20` : "rgba(59,47,32,0.05)",
                                  border: `1px solid ${sd ? sd.color + "60" : "rgba(196,168,130,0.3)"}`,
                                  borderRadius: "2px", color: "#4A3C2A",
                                  display: "flex", alignItems: "center", gap: "4px",
                                }}>
                                  {sd?.emoji} {sName}
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })() : (
                  <div style={{ background: "rgba(255,255,255,0.45)", border: "1px solid rgba(196,168,130,0.2)", borderRadius: "3px", padding: "32px 22px", textAlign: "center", color: "#B5A68E" }}>
                    <div style={{ fontSize: "30px", marginBottom: "10px", opacity: 0.5 }}>❦</div>
                    <div style={{ fontSize: "17px", fontStyle: "italic", lineHeight: 1.7 }}>
                      Select a zone on the map — or use the legend below — to reveal planting details for each row.
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Legend */}
            <div style={{ maxWidth: "700px", margin: "24px auto 0" }}>
              <div style={{ fontSize: "14px", fontFamily: "'Outfit', sans-serif", letterSpacing: "3px", textTransform: "uppercase", color: "#8B6A18", marginBottom: "10px", textAlign: "center" }}>Zone Legend — click to explore</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", justifyContent: "center" }}>
                {ZONES.filter(z => z.rows.length > 0).map(zone => (
                  <button
                    key={zone.id}
                    onClick={() => setSelectedZone(selectedZone === zone.id ? null : zone.id)}
                    style={{
                      display: "flex", alignItems: "center", gap: "7px",
                      padding: "8px 14px",
                      background: selectedZone === zone.id ? zone.fill : "rgba(255,255,255,0.55)",
                      border: `1px solid ${selectedZone === zone.id ? zone.stroke : "rgba(180,140,60,0.25)"}`,
                      borderRadius: "2px", cursor: "pointer", transition: "all 0.25s ease",
                      fontFamily: "'Outfit', sans-serif", fontSize: "14px", color: "#4A3C2A",
                    }}
                  >
                    <span style={{ width: "10px", height: "10px", borderRadius: "2px", background: zone.fill, border: `1px solid ${zone.stroke}`, flexShrink: 0 }} />
                    {zone.label}
                    <span style={{ opacity: 0.5, fontSize: "13px" }}>{getAllSeeds(zone).length}</span>
                  </button>
                ))}
              </div>
            </div>

            <Flourish style={{ marginTop: "32px" }} />
          </div>
        )}

        {/* === THE FIELD === */}
        {activeTab === "field" && (
          <div style={{ animation: "fadeUp 0.5s ease both", maxWidth: "680px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", fontStyle: "italic", color: "#7A5C1E", fontSize: "18px", lineHeight: 1.8, marginBottom: "32px" }}>
              "Dear Reader — one does not merely read about gardens. One follows them.
              Lady Gardendown commends to your attention the dispatches of Single Furrow Farm,
              a fellow chronicler of seed, soil, and the seasons."
            </div>

            <a
              href="https://www.instagram.com/singlefurrowfarm"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "block", textDecoration: "none" }}
            >
              <div style={{
                background: "rgba(255,250,235,0.7)",
                border: "1px solid rgba(180,140,60,0.35)",
                borderRadius: "3px",
                padding: "36px 32px",
                textAlign: "center",
                cursor: "pointer",
                transition: "box-shadow 0.25s ease",
                boxShadow: "0 2px 12px rgba(180,140,60,0.08)",
              }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 24px rgba(180,140,60,0.2)"}
                onMouseLeave={e => e.currentTarget.style.boxShadow = "0 2px 12px rgba(180,140,60,0.08)"}
              >
                <div style={{ fontSize: "42px", marginBottom: "14px", opacity: 0.85 }}>🌾</div>
                <div style={{ fontFamily: "'Cormorant SC', serif", fontSize: "26px", color: "#1A1208", letterSpacing: "2px", marginBottom: "6px" }}>
                  Single Furrow Farm
                </div>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "14px", color: "#8B6A18", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "20px" }}>
                  @singlefurrowfarm
                </div>
                <div style={{ width: "48px", height: "1px", background: "rgba(180,140,60,0.4)", margin: "0 auto 20px" }} />
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "17px", color: "#6B5020", lineHeight: 1.7, maxWidth: "400px", margin: "0 auto 24px" }}>
                  "A farm of uncommon refinement, documented with the kind of candour
                  that makes one feel the soil between one's fingers from a considerable distance."
                </div>
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  padding: "10px 24px",
                  background: "linear-gradient(145deg, #1E3A6E, #152D57)",
                  color: "#F5EDD0",
                  fontFamily: "'Outfit', sans-serif", fontSize: "13px", letterSpacing: "2px", textTransform: "uppercase",
                  borderRadius: "2px",
                }}>
                  Follow on Instagram
                  <span style={{ fontSize: "16px" }}>→</span>
                </div>
              </div>
            </a>

            <Flourish style={{ marginTop: "36px" }} />
          </div>
        )}

        {/* === ISSUES === */}
        {activeTab === "social" && (
          <div style={{ animation: "fadeUp 0.5s ease both" }}>
            <div style={{ textAlign: "center", fontStyle: "italic", color: "#7A5C1E", fontSize: "18px", lineHeight: 1.8, maxWidth: "600px", margin: "0 auto 28px" }}>
              "Dear Reader — one does not garden anonymously. One documents, one publishes, one prevails.
              What follows is Lady Gardendown's programme of dispatches, arranged by Season.
              Select any period to reveal the suggested content for that month's readership."
            </div>

            {Object.entries(TIMELINE).map(([month, data], idx) => {
              const isOpen = expandedIssue === month;
              return (
                <div key={month} style={{ marginBottom: "6px", animation: `fadeUp 0.5s ease ${idx * 0.06}s both` }}>
                  <button className="month-btn" onClick={() => setExpandedIssue(isOpen ? null : month)} style={{
                    width: "100%", display: "flex", alignItems: "center", gap: "16px", padding: "18px 22px",
                    background: isOpen ? "linear-gradient(135deg, #1E3A6E, #152D57)" : "rgba(255,250,235,0.6)",
                    color: isOpen ? "#F5EDD0" : "#1A1208",
                    border: isOpen ? "1px solid #1E3A6E" : "1px solid rgba(180,140,60,0.25)",
                    borderRadius: isOpen ? "3px 3px 0 0" : "3px", cursor: "pointer", textAlign: "left",
                    fontFamily: "'Cormorant Garamond', serif", transition: "all 0.35s ease",
                  }}>
                    <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "14px", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", opacity: 0.6, minWidth: "65px" }}>{month}</span>
                    <span style={{ fontSize: "24px", fontWeight: 500, fontStyle: "italic", flex: 1 }}>{data.label}</span>
                    <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "14px", opacity: 0.5 }}>{data.issues.length} posts</span>
                    <span style={{ fontSize: "18px", transition: "transform 0.35s", transform: isOpen ? "rotate(180deg)" : "rotate(0)", opacity: 0.5 }}>⌄</span>
                  </button>
                  {isOpen && (
                    <div style={{ background: "rgba(255,250,230,0.82)", borderRadius: "0 0 3px 3px", border: "1px solid rgba(180,140,60,0.25)", borderTop: "none", padding: "22px 24px", backdropFilter: "blur(10px)", animation: "fadeUp 0.4s ease both" }}>
                      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "18px" }}>
                        {data.seeds.map((s, i) => (
                          <span key={i} style={{ fontSize: "14px", fontFamily: "'Outfit', sans-serif", padding: "3px 10px", background: "rgba(59,47,32,0.06)", borderRadius: "2px", border: "1px solid rgba(196,168,130,0.2)", color: "#5A4E3C" }}>{s}</span>
                        ))}
                      </div>
                      {data.palettes && data.palettes.length > 0 && (
                        <div style={{ marginBottom: "16px" }}>
                          <div style={{ fontSize: "14px", fontFamily: "'Outfit', sans-serif", letterSpacing: "2px", textTransform: "uppercase", color: "#8B6A18", marginBottom: "8px" }}>Palettes in Season</div>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                            {data.palettes.map((pName) => {
                              const palette = PALETTES.find(p => p.name === pName);
                              if (!palette) return null;
                              return (
                                <div key={pName} style={{ display: "flex", alignItems: "center", gap: "7px", background: "rgba(255,255,255,0.7)", border: "1px solid rgba(196,168,130,0.25)", borderRadius: "2px", padding: "5px 10px" }}>
                                  <div style={{ display: "flex" }}>
                                    {palette.seeds.slice(0, 4).map((sName) => {
                                      const sd = SEEDS.find(s => s.name === sName);
                                      return sd ? <div key={sName} style={{ width: "12px", height: "12px", borderRadius: "50%", background: sd.color, border: "1.5px solid rgba(255,255,255,0.8)", marginLeft: "-3px" }} /> : null;
                                    })}
                                  </div>
                                  <span style={{ fontSize: "14px", fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", color: "#3B2F20" }}>{pName}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                        {data.issues.map((post, i) => (
                          <div key={i} style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(196,168,130,0.2)", borderRadius: "3px", padding: "16px 18px", animation: `fadeUp 0.3s ease ${i * 0.07}s both` }}>
                            <div style={{ fontSize: "14px", fontFamily: "'Outfit', sans-serif", letterSpacing: "2px", textTransform: "uppercase", color: "#C9960A", marginBottom: "8px", fontWeight: 600 }}>
                              {post.platform}
                            </div>
                            <div style={{ fontSize: "17px", lineHeight: 1.75, color: "#3B2F20", fontStyle: "italic", borderLeft: "2px solid #C9960A", paddingLeft: "14px" }}>
                              {post.caption}
                            </div>
                            {post.palette && (() => {
                              const pal = PALETTES.find(p => p.name === post.palette);
                              if (!pal) return null;
                              return (
                                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "12px", paddingTop: "10px", borderTop: "1px solid rgba(196,168,130,0.15)" }}>
                                  <div style={{ display: "flex" }}>
                                    {pal.seeds.slice(0, 5).map((sName, si) => {
                                      const sd = SEEDS.find(s => s.name === sName);
                                      return sd ? <div key={sName} style={{ width: "14px", height: "14px", borderRadius: "50%", background: sd.color, border: "2px solid rgba(255,255,255,0.9)", marginLeft: si > 0 ? "-4px" : 0 }} /> : null;
                                    })}
                                  </div>
                                  <span style={{ fontSize: "14px", fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", color: "#6B5020" }}>
                                    Suggested palette: <strong>{post.palette}</strong>
                                  </span>
                                </div>
                              );
                            })()}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            <Flourish style={{ marginTop: "28px" }} />
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ textAlign: "center", padding: "36px 24px 40px" }}>
        <Flourish />
        <div style={{ fontSize: "14px", fontFamily: "'Outfit', sans-serif", color: "#1A1208", marginTop: "12px", letterSpacing: "0.5px", lineHeight: 1.8 }}>
          Total investment: ~C$171 · Last frost Simcoe ~May 15–20
        </div>
        <div style={{ fontSize: "15px", fontStyle: "italic", color: "#1A1208", marginTop: "10px" }}>
          "Yours, as always, with discretion and a trowel — Lady Gardendown.
          One does not order from four seed purveyors by accident. One does it because the heart wants what the heart wants, and the garden has room."
        </div>
      </div>
    </div>
  );
}
