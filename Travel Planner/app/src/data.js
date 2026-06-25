export const PRELOADED_COUNTRIES = [
  {
    id: "japan",
    name: "Japan",
    description: "An elegant archipelago blending hyper-modern neon skylines with serene ancient Shinto shrines, sacred mountains, and picturesque cherry blossom paths.",
    flag: "🇯🇵",
    coverImage: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80",
    bestSeason: "April – May (Cherry Blossom) & Oct – November (Autumn Leaves)",
    flightDuration: "Approx. 11-12 hours from standard hubs",
    currency: "Japanese Yen (JPY, ¥)",
    language: "Japanese",
    rating: 4.9,
    category: "Cultural",
    landmarksCount: 15,
    hotelsCount: 42,
    weather: {
      temp: 18,
      condition: "Partly Cloudy",
      humidity: 62,
      windSpeed: 12,
      forecast: [
        { day: "Mon", temp: 18, condition: "Partly Cloudy" },
        { day: "Tue", temp: 19, condition: "Sunny" },
        { day: "Wed", temp: 16, condition: "Light Rain" },
        { day: "Thu", temp: 15, condition: "Cloudy" },
        { day: "Fri", temp: 17, condition: "Clear" }
      ]
    },
    history: "With thousands of years of imperial lineage and isolated cultural refinement, Japan progressed from classical feudal Shogunates to a pioneering powerhouse of technological innovation while preserving sacred aesthetics of Zen and Wabi-Sabi.",
    localSecret: "Visit Yanaka in Tokyo to experience a nostalgic pre-war village atmosphere, or bathe in the secluded iron-rich waters of Arima Onsen near Kobe.",
    visaRequirement: "Visa-free for up to 90 days for over 68 countries (including EU, USA, Canada, Gulf nations). Electronic Visa (e-Visa) accessible for some other passports.",
    cultureTips: [
      "Avoid tipping anywhere; it is considered bad manners. High quality service is a matter of pride.",
      "Stand on the left side of escalators in Tokyo, but on the right side in Osaka.",
      "Bow slightly when introducing yourself or thanking someone.",
      "Never talk loudly on trains or answer phone calls inside public transport."
    ]
  },
  {
    id: "italy",
    name: "Italy",
    description: "A sun-drenched Mediterranean dream filled with spectacular masterclass art, ancient Roman ruins, colorful cliffside coastal villas, and unmatched culinary heritage.",
    flag: "🇮🇹",
    coverImage: "https://images.unsplash.com/photo-1541088645395-63364d318667?auto=format&fit=crop&w=1200&q=80",
    bestSeason: "May – June & September – October (Golden light and soft breezes)",
    flightDuration: "Approx. 2-4 hours inside Europe",
    currency: "Euro (EUR, €)",
    language: "Italian",
    rating: 4.8,
    category: "Cultural",
    landmarksCount: 22,
    hotelsCount: 65,
    weather: {
      temp: 24,
      condition: "Sunny & Warm",
      humidity: 50,
      windSpeed: 8,
      forecast: [
        { day: "Mon", temp: 24, condition: "Sunny" },
        { day: "Tue", temp: 26, condition: "Sunny" },
        { day: "Wed", temp: 25, condition: "Clear" },
        { day: "Thu", temp: 23, condition: "Sunny" },
        { day: "Fri", temp: 24, condition: "Partly Cloudy" }
      ]
    },
    history: "The cradle of Western civilization, home to the sprawling Roman Empire, and the radiant epicenter of the Renaissance. Italy's landscape is literally shaped by centuries of revolutionary architecture, legendary fine arts, and regional gastronomy.",
    localSecret: "Skip the heavy crowds of Venice and visit Treviso, a scenic canal town featuring beautiful watermills and the birth town of Tiramisu.",
    visaRequirement: "Schengen Visa regulations apply. Visa-free access for many countries under the ETIAS regime.",
    cultureTips: [
      "Do not request parmesan cheese for seafood dishes; it's considered poor flavor pairing.",
      "Never order a cappuccino after 11:00 AM. Milk coffees are strictly reserved for breakfast hours.",
      "Keep cash handy; many boutique gelaterias and rural trattorias prefer small coins.",
      "Pay for your espresso at the cash register first, then take the receipt to the counter bar."
    ]
  },
  {
    id: "greece",
    name: "Greece",
    description: "The birthplace of philosophy and democracy, boasting iconic whitewashed volcanic cliffs, cascading sapphire waters, and ancient mountaintop temples.",
    flag: "🇬🇷",
    coverImage: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80",
    bestSeason: "Late May – September (Perfect for beach lovers and island hopping)",
    flightDuration: "Approx. 3 hours from central Europe",
    currency: "Euro (EUR, €)",
    language: "Greek",
    rating: 4.8,
    category: "Beach",
    landmarksCount: 14,
    hotelsCount: 38,
    weather: {
      temp: 28,
      condition: "Clear Sky",
      humidity: 43,
      windSpeed: 18,
      forecast: [
        { day: "Mon", temp: 28, condition: "Clear Sky" },
        { day: "Tue", temp: 29, condition: "Clear Sky" },
        { day: "Wed", temp: 30, condition: "Clear Sky" },
        { day: "Thu", temp: 27, condition: "Breezy/Sunny" },
        { day: "Fri", temp: 29, condition: "Clear Sky" }
      ]
    },
    history: "Boasting classical heritage of philosophical academies, the earliest Olympian games, and Byzantine maritime routes, Greece's rich ancient ruins tell epic tales of gods, heroes, and modern coastal trade.",
    localSecret: "Explore Milos instead of Santorini for breathtaking colorful volcanic coves and pristine beaches without standard tourist congestion.",
    visaRequirement: "Schengen Zone country. Standard digital Schengen processes apply.",
    cultureTips: [
      "Greeks wave with closed fingers. An open hand facing outward (Moutza) is very offensive.",
      "Dinner starts late, usually after 9:30 PM. Restaurants remain buzzing until past midnight.",
      "Do not flush paper down the toilet in older Greek coastal villages; plumbing is fragile."
    ]
  },
  {
    id: "morocco",
    name: "Morocco",
    description: "A sensory tapestry of intricate medina souks, magnificent rose-tinted deserts, Atlas mountain panoramas, and geometric tiled riads.",
    flag: "🇲🇦",
    coverImage: "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?auto=format&fit=crop&w=1200&q=80",
    bestSeason: "October – April (Mild desert evenings and cooler city strolls)",
    flightDuration: "Approx. 3-4 hours from mainland Europe",
    currency: "Moroccan Dirham (MAD, د.م.)",
    language: "Arabic & Berber (French widely spoken)",
    rating: 4.7,
    category: "Adventure",
    landmarksCount: 12,
    hotelsCount: 29,
    weather: {
      temp: 22,
      condition: "Sunny & Dry",
      humidity: 35,
      windSpeed: 10,
      forecast: [
        { day: "Mon", temp: 22, condition: "Sunny" },
        { day: "Tue", temp: 24, condition: "Sunny" },
        { day: "Wed", temp: 21, condition: "Sunny" },
        { day: "Thu", temp: 23, condition: "Sunny" },
        { day: "Fri", temp: 25, condition: "Calm" }
      ]
    },
    history: "At the crossroads of African, Berber, Arabian, and Moorish kingdoms, Morocco developed unique high-walled clay fortress towns, beautiful ceramic mosaic standards, and rich desert caravan culture.",
    localSecret: "Walk the scenic coastal ramparts of Chefchaouen at early sunrise to capture the completely empty, beautiful blue-wash alleys.",
    visaRequirement: "Visa-free for standard passports of USA, EU, UAE, Saudi Arabia, Bahrain, and UK for up to 90 days.",
    cultureTips: [
      "Always accept the offer of mint tea (whiskey marocain); refusing is seen as inhospitable.",
      "Dress respectfully when walking outside modern resorts, covering shoulders and knees.",
      "Haggling is completely expected in the souks. Propose 40% of the initial vendor claim."
    ]
  },
  {
    id: "thailand",
    name: "Thailand",
    description: "The land of bright smiles, emerald rainforest sanctuaries, pristine white-sand beaches, and spicy dynamic street food markets.",
    flag: "🇹🇭",
    coverImage: "https://images.unsplash.com/photo-1528181304800-2f1258bb9df3?auto=format&fit=crop&w=1200&q=80",
    bestSeason: "November – February (Cool and dry winter period)",
    flightDuration: "Approx. 10-11 hours from Europe",
    currency: "Thai Baht (THB, ฿)",
    language: "Thai",
    rating: 4.7,
    category: "Beach",
    landmarksCount: 18,
    hotelsCount: 51,
    weather: {
      temp: 31,
      condition: "Tropical Breeze",
      humidity: 71,
      windSpeed: 14,
      forecast: [
        { day: "Mon", temp: 31, condition: "T-Storms" },
        { day: "Tue", temp: 32, condition: "Partly Cloudy" },
        { day: "Wed", temp: 30, condition: "Light Rain" },
        { day: "Thu", temp: 31, condition: "Partly Cloudy" },
        { day: "Fri", temp: 33, condition: "Sunny" }
      ]
    },
    history: "The only Southeast Asian nation never colonized by a foreign power. Siam maintained its sacred sovereign Buddhist traditions, which are vividly reflected in glittering temples and legendary martial arts championships.",
    localSecret: "Hop on a ferry to Koh Lanta for family-friendly, spacious, completely laidback sunset beaches and beautiful mangrove forests.",
    visaRequirement: "Thailand recently launched a 60-day visa exemption scheme for standard travelers of 93 countries.",
    cultureTips: [
      "Never touch anyone on the head; it is regarded as the highest, most sacred part of the body.",
      "Take off your shoes when entering any residential home or designated temple chamber.",
      "Never step on currency; notes bear the image of the King and doing so is illegal."
    ]
  },
  {
    id: "switzerland",
    name: "Switzerland",
    description: "A gorgeous alpine fantasy featuring soaring snow-capped glacier peaks, crystal-clear turquoise lakes, fairytale wooden cabins, and timeless clocks.",
    flag: "🇨🇭",
    coverImage: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80",
    bestSeason: "December – March (Winter sports) & June – September (Lush hiking trails)",
    flightDuration: "Approx. 1-2 hours inside Europe",
    currency: "Swiss Franc (CHF, CHF)",
    language: "German, French, Italian, Romansh",
    rating: 4.9,
    category: "Winter",
    landmarksCount: 10,
    hotelsCount: 22,
    weather: {
      temp: 11,
      condition: "Chilly & Clear",
      humidity: 55,
      windSpeed: 6,
      forecast: [
        { day: "Mon", temp: 11, condition: "Clear" },
        { day: "Tue", temp: 12, condition: "Clear" },
        { day: "Wed", temp: 9, condition: "Snow Shower" },
        { day: "Thu", temp: 10, condition: "Partly Cloudy" },
        { day: "Fri", temp: 13, condition: "Sunny" }
      ]
    },
    history: "Characterized by its armed neutrality, direct democracy, and decentralized cantonal assembly structure. Switzerland's history is deeply connected to financial safety, elite watchmaking precision, and glorious mountain mountaineering trails.",
    localSecret: "Visit Lauterbrunnen's secondary valley hikes to spot some of the 72 spectacular cascading underground waterfalls.",
    visaRequirement: "Standard Schengen policies apply. Swiss borders require no physical check if entering from Schengen hubs.",
    cultureTips: [
      "Do not cut potatoes or lettuce with a knife in traditional taverns; break them apart with your fork helper.",
      "Sundays are sacred quiet days. Throwing paper glass bottles or mowing lawns is forbidden.",
      "Swiss tap water is incredibly clean; carry a steel flask to refill at any ornate town fountain."
    ]
  },
  {
    id: "egypt",
    name: "Egypt",
    description: "An awe-inspiring kingdom of colossal ancient Pharaoh monuments, endless golden Sahara dunes, and the vibrant life-giving paths of the historic Nile River.",
    flag: "🇪🇬",
    coverImage: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=1200&q=80",
    bestSeason: "October – April (Mild winter breezes perfect for exploring pyramids)",
    flightDuration: "Approx. 4-5 hours from mainland Europe",
    currency: "Egyptian Pound (EGP, E£)",
    language: "Arabic",
    rating: 4.8,
    category: "Cultural",
    landmarksCount: 20,
    hotelsCount: 55,
    weather: {
      temp: 26,
      condition: "Sunny & Dry",
      humidity: 38,
      windSpeed: 14,
      forecast: [
        { day: "Mon", temp: 26, condition: "Sunny" },
        { day: "Tue", temp: 27, condition: "Sunny" },
        { day: "Wed", temp: 28, condition: "Sunny" },
        { day: "Thu", temp: 25, condition: "Sunny" },
        { day: "Fri", temp: 26, condition: "Clear" }
      ]
    },
    history: "Home of one of the world's oldest literate civilizations, spanning the magnificent absolute kingdom of the Pharaonic dynasties, Pyramids construction, and timeless Hellenistic Ptolemaic eras.",
    localSecret: "Walk the beautiful authentic El Moez street in Cairo at nighttime to experience the largest concentration of medieval Islamic architectural treasures.",
    visaRequirement: "Easy Visa-on-arrival or official e-Visa portal access for over 70 nations, including EU, USA, Gulf countries.",
    cultureTips: [
      "Always use your right hand for eating, offering, or accepting gifts.",
      "Agree on taxi pricing or purchase taxi metered applications before setting off.",
      "Dress respectfully when touring places of worship, covering shoulders and knees.",
      "Tipping (Baksheesh) is deeply ingrained in daily transactions; keep small change."
    ]
  },
  {
    id: "france",
    name: "France",
    description: "An elegant cultural center famous for haute couture, the world's most romantic museums, scenic lavender valleys, and world-class wine estates.",
    flag: "🇫🇷",
    coverImage: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80",
    bestSeason: "April – June & September – October (Lovely weather and smaller crowds)",
    flightDuration: "Approx. 1-2 hours inside Western Europe",
    currency: "Euro (EUR, €)",
    language: "French",
    rating: 4.9,
    category: "Cultural",
    landmarksCount: 30,
    hotelsCount: 88,
    weather: {
      temp: 18,
      condition: "Partly Cloudy",
      humidity: 68,
      windSpeed: 9,
      forecast: [
        { day: "Mon", temp: 18, condition: "Partly Cloudy" },
        { day: "Tue", temp: 20, condition: "Sunny" },
        { day: "Wed", temp: 17, condition: "Light Rain" },
        { day: "Thu", temp: 16, condition: "Cloudy" },
        { day: "Fri", temp: 19, condition: "Clear" }
      ]
    },
    history: "A centerpiece of continental European history, birthplace of Enlightenment values, the French Revolution, and a historic superpower backing global high art and gastronomy standards.",
    localSecret: "Explore the hidden passages (passages couverts) of Paris for quiet glass-roofed 19th-century boutique shopping walks.",
    visaRequirement: "Schengen Zone rules apply. Citizens of USA, UK, Canada, Australia do not need a pre-visa for stays up to 90 days.",
    cultureTips: [
      "Always start your conversations with a polite \"Bonjour\" or \"Bonsoir\"; it is necessary etiquette.",
      "Wait for the host to say \"Bon Appétit\" before eating.",
      "Do not rush dinners; French dining is treated as an artful leisure experience.",
      "Bread is placed directly on the tablecloth, not on your personal plate."
    ]
  },
  {
    id: "brazil",
    name: "Brazil",
    description: "A vibrant South American giant filled with ecstatic Samba celebrations, pristine golden tropical coastlines, and the unmatched wilderness of the Amazon basin.",
    flag: "🇧🇷",
    coverImage: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=1200&q=80",
    bestSeason: "December – March (Brazilian Summer & Carnival atmosphere)",
    flightDuration: "Approx. 11-12 hours from central Europe",
    currency: "Brazilian Real (BRL, R$)",
    language: "Portuguese",
    rating: 4.8,
    category: "Adventure",
    landmarksCount: 16,
    hotelsCount: 45,
    weather: {
      temp: 29,
      condition: "Sunny & Humid",
      humidity: 74,
      windSpeed: 12,
      forecast: [
        { day: "Mon", temp: 29, condition: "Sunny" },
        { day: "Tue", temp: 30, condition: "T-Storm" },
        { day: "Wed", temp: 28, condition: "Rainy" },
        { day: "Thu", temp: 31, condition: "Sunny" },
        { day: "Fri", temp: 30, condition: "Clear" }
      ]
    },
    history: "Once an immense Portuguese empire colony, Brazil synthesized native tribes, European colonial layout, and African beats to form the world's most joyful and resource-rich country.",
    localSecret: "Paddle through the flooded forest trails of Iguaçu Falls of Paraná state near the border to view hidden cascades from the bottom.",
    visaRequirement: "Most European Union, UK, and South American citizens require no visa. Standard electronic visa portals available for others.",
    cultureTips: [
      "Avoid using the 'OK' hand sign; it is considered extremely rude in Brazilian culture.",
      "Hissing to attract a waiter's attention (psst) is common and not considered impolite.",
      "Personal space is smaller; expect warm hugs and double cheek kisses when greeting.",
      "Avoid drinking beverages directly out of cans; use a glass cup or straw."
    ]
  },
  {
    id: "australia",
    name: "Australia",
    description: "A vast continental paradise sporting beautiful surf breaks, majestic coral reefs, rare dynamic wildlife, and relaxed cosmopolitan harbors.",
    flag: "🇦🇺",
    coverImage: "https://images.unsplash.com/photo-1523482596682-cd93a6e54520?auto=format&fit=crop&w=1200&q=80",
    bestSeason: "September – November (Spring) & March – May (Autumn)",
    flightDuration: "Approx. 20-22 hours from Western Europe hubs",
    currency: "Australian Dollar (AUD, $)",
    language: "English",
    rating: 4.9,
    category: "Nature",
    landmarksCount: 11,
    hotelsCount: 30,
    weather: {
      temp: 22,
      condition: "Sunny & Clear",
      humidity: 52,
      windSpeed: 16,
      forecast: [
        { day: "Mon", temp: 22, condition: "Sunny" },
        { day: "Tue", temp: 23, condition: "Clear" },
        { day: "Wed", temp: 24, condition: "Sunny" },
        { day: "Thu", temp: 21, condition: "Breezy" },
        { day: "Fri", temp: 22, condition: "Sunny" }
      ]
    },
    history: "Inhabited for over 65,000 years by First Nations Indigenous peoples, Australia merged its ancient heritage with British layout to form a highly developed maritime trade and cultural commonwealth.",
    localSecret: "Take a boat to Rottnest Island near Perth to witness the quokkas, the friendliest and most photogenic animals on earth.",
    visaRequirement: "Electronic Travel Authority (ETA) or e-Visa requested prior to landing for almost all nationalities.",
    cultureTips: [
      "Tipping is welcomed but completely optional; workers are paid a respectable minimum wage.",
      "Always swim strictly between the red and yellow flags on beaches; currents can be dangerous.",
      "Ensure to address bus drivers and services with a friendly \"G'day\" or \"Thank you mate\".",
      "Always apply powerful reef-safe SPF sunscreen; the southern sun is exceptionally raw."
    ]
  },
  {
    id: "turkey",
    name: "Turkey",
    description: "A marvelous bridge between two continents, blending magnificent Ottoman palaces, Roman theaters, and geothermal whimsical mineral hot springs.",
    flag: "🇹🇷",
    coverImage: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1200&q=80",
    bestSeason: "April – June & September – November (Delightful temperatures for sightseeing)",
    flightDuration: "Approx. 3-4 hours from London/Paris hubs",
    currency: "Turkish Lira (TRY, ₺)",
    language: "Turkish",
    rating: 4.8,
    category: "Cultural",
    landmarksCount: 25,
    hotelsCount: 72,
    weather: {
      temp: 21,
      condition: "Clear & Breezy",
      humidity: 45,
      windSpeed: 11,
      forecast: [
        { day: "Mon", temp: 21, condition: "Sunny" },
        { day: "Tue", temp: 23, condition: "Clear" },
        { day: "Wed", temp: 22, condition: "Sunny" },
        { day: "Thu", temp: 19, condition: "Partly Cloudy" },
        { day: "Fri", temp: 20, condition: "Sunny" }
      ]
    },
    history: "The rich historic hub of classic superpowers: Byzantine, Roman, and Ottoman Empires. Turkey blends ancient structures and bustling spice markets with modern maritime charm.",
    localSecret: "Rent a small wooden boat in Kas to explore the ancient half-sunken ruins of Kekova submerged right under crystal clear turquoise waters.",
    visaRequirement: "Visa-free access for over 80 countries or a fast 3-minute electronic visa (e-Visa) process for others.",
    cultureTips: [
      "Always take off shoes when visiting a local carpet shop or home guest chamber.",
      "Accept tea (Çay) when offered by shopkeepers; it's a sincere gesture of local hospitality.",
      "Cover your hair, shoulders, and knees when stepping inside the majestic historical mosques.",
      "Ensure to bargain when purchasing artisanal assets in the Grand Bazaar."
    ]
  },
  {
    id: "usa",
    name: "United States",
    description: "A massive diverse territory framing soaring high-tech metropolises, scenic coastal highways, and epic protected canyon parks.",
    flag: "🇺🇸",
    coverImage: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1200&q=80",
    bestSeason: "May – September (Pleasent for road trips and national park hikes)",
    flightDuration: "Approx. 7-8 hours from standard Western Europe hubs",
    currency: "US Dollar (USD, $)",
    language: "English",
    rating: 4.8,
    category: "Adventure",
    landmarksCount: 45,
    hotelsCount: 120,
    weather: {
      temp: 24,
      condition: "Mainly Sunny",
      humidity: 49,
      windSpeed: 10,
      forecast: [
        { day: "Mon", temp: 24, condition: "Sunny" },
        { day: "Tue", temp: 25, condition: "Sunny" },
        { day: "Wed", temp: 26, condition: "Sunny" },
        { day: "Thu", temp: 23, condition: "Partly Cloudy" },
        { day: "Fri", temp: 24, condition: "Clear" }
      ]
    },
    history: "Established by independence pioneers and rapid 19th-century industrial setups, formulating a global center for entertainment, space science exploration, and financial tech systems.",
    localSecret: "Take a quiet bicycle ride down the Red Rock Canyon scenic loop near Las Vegas at sunset for brilliant orange sand glow pictures.",
    visaRequirement: "Fast online authorization via Electronic System for Travel Authorization (ESTA) for visa waiver passports.",
    cultureTips: [
      "Tipping 15% to 20% is standard and expected at sit-down dining servers and taxi providers.",
      "Always stand on the right side of metro escalators, staying clear for running traffic.",
      "Sales taxes are added at the register; prices seen on tags exclude local state taxes.",
      "Rent a car; vast parts of the grand state scenery have minimal train connections."
    ]
  }
];

export const PRELOADED_LANDMARKS = [
  // --- JAPAN ---
  {
    id: "lm-fushimi",
    name: "Fushimi Inari Shrine",
    countryId: "japan",
    countryName: "Japan",
    location: "Kyoto",
    description: "A mesmerizing network of over ten thousand bright vermilion Torii gates snaking through sacred mystical mountain forests, dedicated to the Shinto god of agriculture and business.",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    annualVisitors: "2.7 Million",
    unesco: true,
    category: "Cultural",
    funFact: "The stone fox statues (Kitsune) guarding the shrines hold keys to rice granaries in their mouths."
  },
  {
    id: "lm-fuji",
    name: "Mount Fuji",
    countryId: "japan",
    countryName: "Japan",
    location: "Honshu Island",
    description: "An exceptionally symmetric, snow-capped sacred volcanic peak that serves as the iconic national landscape, cultural centerpiece, and popular pilgrimage landmark.",
    image: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    annualVisitors: "3.2 Million",
    unesco: true,
    category: "Nature",
    funFact: "Mount Fuji is actually comprised of three separate volcanoes nested on top of each other: Komitake, Ko-Fuji, and Shin-Fuji."
  },
  {
    id: "lm-sensoji",
    name: "Sensō-ji Temple",
    countryId: "japan",
    countryName: "Japan",
    location: "Asakusa, Tokyo",
    description: "Tokyo's oldest and most famous ancient Buddhist temple compound, featuring the majestic Kaminarimon Gate, a giant red paper lantern, and busy traditional shopping avenues.",
    image: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
    annualVisitors: "30 Million",
    unesco: false,
    category: "Cultural",
    funFact: "The giant paper lantern in the outer gate weighs over 700 kilograms and is hand-crafted using traditional split-bamboo frames."
  },
  {
    id: "lm-kinkakuji",
    name: "Golden Pavilion (Kinkaku-ji)",
    countryId: "japan",
    countryName: "Japan",
    location: "Kyoto",
    description: "A breathtaking Zen Buddhist temple whose top two floors are completely covered in brilliant pure gold leaf, reflecting beautifully in the Mirror Pond.",
    image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    annualVisitors: "1.5 Million",
    unesco: true,
    category: "Historical",
    funFact: "The gold leaf is chosen to ward off any extreme negative thoughts or impurities, reflecting the purity of Zen practices."
  },

  // --- ITALY ---
  {
    id: "lm-colosseum",
    name: "Colosseum",
    countryId: "italy",
    countryName: "Italy",
    location: "Rome",
    description: "A monumental ancient stone amphitheater built at the heart of classical Rome, historical theater of gladiatorial fights, epic naval mock-battles, and dramatic theatrical performances.",
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
    annualVisitors: "7.6 Million",
    unesco: true,
    category: "Historical",
    funFact: "The Colosseum could be completely filled with water to reconstruct massive simulated naval combats for public entertainment."
  },
  {
    id: "lm-pantheon",
    name: "Pantheon",
    countryId: "italy",
    countryName: "Italy",
    location: "Rome",
    description: "An incredibly preserved 2,000-year-old Roman temple turned church, featuring the world's largest unreinforced concrete dome with a central oculus skyward.",
    image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    annualVisitors: "9.0 Million",
    unesco: true,
    category: "Historical",
    funFact: "When it rains, water flows down through the dome's oculus but disappears because of 22 tiny hidden drainage holes in the marble floor."
  },
  {
    id: "lm-venice",
    name: "Grand Canal and Gondolas",
    countryId: "italy",
    countryName: "Italy",
    location: "Venice",
    description: "The primary water-boulevard of Venice, lined with over 170 ancient Renaissance and Byzantine palaces, populated by romantic traditional hand-carved black gondolas.",
    image: "https://images.unsplash.com/photo-1520175480921-4edfa2983e0f?auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
    annualVisitors: "5.5 Million",
    unesco: true,
    category: "Scenic",
    funFact: "Gondolas are made of eight different types of wood, and always tilt left to counterbalance the weight of the standing gondolier."
  },
  {
    id: "lm-pisa",
    name: "Leaning Tower of Pisa",
    countryId: "italy",
    countryName: "Italy",
    location: "Pisa",
    description: "The free-standing campanile bell tower of Pisa Cathedral, world-famous for its dramatic four-degree tilt caused by soft, unstable ground foundations.",
    image: "https://images.unsplash.com/photo-1541088645395-63364d318667?auto=format&fit=crop&w=600&q=80",
    rating: 4.7,
    annualVisitors: "3.2 Million",
    unesco: true,
    category: "Historical",
    funFact: "Construction took 199 years; the tilt actually worsened as constructors tried to fix it by building one side of upper storeys taller."
  },

  // --- GREECE ---
  {
    id: "lm-parthenon",
    name: "Acropolis of Athens",
    countryId: "greece",
    countryName: "Greece",
    location: "Athens",
    description: "The crown jewel of Athens sitting atop a rocky citadel, housing the Parthenon—an aesthetic masterstroke of classical Doric architecture honoring the goddess Athena.",
    image: "https://images.unsplash.com/photo-1608670860541-0dc8e29a8a72?auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
    annualVisitors: "3.1 Million",
    unesco: true,
    category: "Historical",
    funFact: "The Parthenon contains absolutely no straight lines; each marble column swells slightly outward to correct optical illusions."
  },
  {
    id: "lm-santorini",
    name: "Oia Seaside Cliffs",
    countryId: "greece",
    countryName: "Greece",
    location: "Santorini Island",
    description: "A dreamy volcanic cliffside village characterized by steep whitewashed houses, cobalt dome churches, and legendary sunset spectacles overlooking the Caldera.",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    annualVisitors: "2.4 Million",
    unesco: false,
    category: "Coastal",
    funFact: "Many of Santorini's iconic buildings are carved directly into the soft volcanic pumice stone walls to stay naturally insulated."
  },
  {
    id: "lm-meteora",
    name: "Meteora Hanging Monasteries",
    countryId: "greece",
    countryName: "Greece",
    location: "Kalabaka",
    description: "Six active ancient Eastern Orthodox monasteries balanced impossibly on top of massive, steep, weather-sculpted sandstone rock pillars.",
    image: "https://images.unsplash.com/photo-1505342261962-d27ca275b2e9?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    annualVisitors: "1.4 Million",
    unesco: true,
    category: "Scenic",
    funFact: "Until the 1920s, monks and provisions were hoisted up the vertical stone cliffs using large ropes, nets, and fragile wooden ladders."
  },
  {
    id: "lm-delphi",
    name: "Ancient Delphi",
    countryId: "greece",
    countryName: "Greece",
    location: "Phocis",
    description: "An extraordinary archaeological sanctuary of Apollo situated on the beautiful green slopes of Mt. Parnassus, home of the legendary Oracle.",
    image: "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
    annualVisitors: "1.1 Million",
    unesco: true,
    category: "Historical",
    funFact: "Ancient Greeks considered Delphi to be the absolute center (the navel or Omphalos) of the entire earth."
  },

  // --- MOROCCO ---
  {
    id: "lm-chefchaouen",
    name: "Chefchaouen Medina",
    countryId: "morocco",
    countryName: "Morocco",
    location: "Rif Mountains",
    description: "A breathtaking high-altitude fortress village world-famous for its peaceful medina washed in rich shades of sky blue and decorated with brass oil lamps.",
    image: "https://images.unsplash.com/photo-1549944850-84e00be42151?auto=format&fit=crop&w=600&q=80",
    rating: 4.7,
    annualVisitors: "1.2 Million",
    unesco: false,
    category: "Scenic",
    funFact: "The blue color of Chefchaouen was introduced by Jewish refugees in the 1930s to reflect the divinity of heaven."
  },
  {
    id: "lm-bahia",
    name: "Bahia Palace",
    countryId: "morocco",
    countryName: "Morocco",
    location: "Marrakech",
    description: "A glittering 19th-century palace designed to capture the beauty of Moroccan and Islamic craftsmanship, featuring intricate cedarwood ceilings and courtyards.",
    image: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
    annualVisitors: "1.9 Million",
    unesco: false,
    category: "Cultural",
    funFact: "The palace name Bahia translates to 'The Brilliance', designed for the grand vizier's favorite wife in his extensive harem."
  },
  {
    id: "lm-ergchebbi",
    name: "Sahara Desert Dunes",
    countryId: "morocco",
    countryName: "Morocco",
    location: "Merzouga",
    description: "Immense wind-blown golden sand dunes rising up to 150 meters high, providing stunning camel treks and nights in traditional Berber nomad camp tents.",
    image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    annualVisitors: "0.8 Million",
    unesco: false,
    category: "Adventure",
    funFact: "Locals believe the towering hot sands of Erg Chebbi possess therapeutic properties that can cure chronic rheumatisms."
  },
  {
    id: "lm-hassan",
    name: "Hagia Hassan II Mosque",
    countryId: "morocco",
    countryName: "Morocco",
    location: "Casablanca",
    description: "A breathtaking marine mosque perched directly over the Atlantic Ocean, with a giant glass floor and the world's second-tallest minaret.",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    annualVisitors: "2.1 Million",
    unesco: false,
    category: "Cultural",
    funFact: "The mosque features a high-tech laser beam pointing directly from the top of the minaret toward Mecca over a distance of 30 kilometers."
  },

  // --- THAILAND ---
  {
    id: "lm-watpho",
    name: "Wat Pho (Reclining Buddha)",
    countryId: "thailand",
    countryName: "Thailand",
    location: "Bangkok",
    description: "A beautiful gilded Buddhist temple sanctuary featuring a massive resting Buddha statue stretching 46 meters in length, complete with mother-of-pearl carved soles.",
    image: "https://images.unsplash.com/photo-1598977123418-45f04b016823?auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
    annualVisitors: "1.8 Million",
    unesco: true,
    category: "Cultural",
    funFact: "Wat Pho is considered the historical cradle and academic keeper of traditional Thai medicine and deep pressure massage."
  },
  {
    id: "lm-watarun",
    name: "Wat Arun (Temple of Dawn)",
    countryId: "thailand",
    countryName: "Thailand",
    location: "Chao Phraya River, Bangkok",
    description: "An incredibly iconic, towering riverside temple whose spires (Prang) are elaborately decorated with millions of pieces of colorful Chinese porcelain floral mosaics.",
    image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    annualVisitors: "2.2 Million",
    unesco: false,
    category: "Scenic",
    funFact: "The porcelain used on the temple columns was originally used as ballast on ancient trading boats sailing between China and Siam."
  },
  {
    id: "lm-phiphi",
    name: "Phi Phi Island Cliffs",
    countryId: "thailand",
    countryName: "Thailand",
    location: "Krabi Province",
    description: "A majestic archipelago of towering vertical limestone cliffs popping out of beautiful turquoise lagoons, famous for rich white sand beaches.",
    image: "https://images.unsplash.com/photo-1528181304800-2f1258bb9df3?auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
    annualVisitors: "1.9 Million",
    unesco: false,
    category: "Coastal",
    funFact: "The hidden lagoon of Maya Bay became world-famous after being chosen as the primary set for Leonardo DiCaprio's adventure movie 'The Beach'."
  },
  {
    id: "lm-ayutthaya",
    name: "Ayutthaya Historical Ruins",
    countryId: "thailand",
    countryName: "Thailand",
    location: "Ayutthaya Province",
    description: "The atmospheric red-brick ruins of the second historic capital of Siam, featuring monumental stupas and a famous sandstone Buddha head wrapped inside tree roots.",
    image: "https://images.unsplash.com/photo-1552590740-45f04b016823?auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
    annualVisitors: "1.5 Million",
    unesco: true,
    category: "Historical",
    funFact: "No one knows exactly how the stone Buddha head landed inside the tree, but the roots have grown around it perfectly without cracking the face."
  },

  // --- SWITZERLAND ---
  {
    id: "lm-jungfrau",
    name: "Jungfraujoch - Top of Europe",
    countryId: "switzerland",
    countryName: "Switzerland",
    location: "Bernese Alps",
    description: "The highest railway station in Europe located 3,454 meters above sea level, providing immersive high-altitude access to glorious glacial peaks and snow palaces.",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    annualVisitors: "1.1 Million",
    unesco: true,
    category: "Winter",
    funFact: "A fully functional Swiss Post Box is situated inside the high-altitude glacier station compound, sending letters directly via cogwheel train pipelines."
  },
  {
    id: "lm-matterhorn",
    name: "The Matterhorn Peak",
    countryId: "switzerland",
    countryName: "Switzerland",
    location: "Zermatt",
    description: "A monumental, jagged four-sided pyramid peak rising majestically above the alpine resort valley of Zermatt, defining the spirit of extreme mountaineering.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    annualVisitors: "0.9 Million",
    unesco: false,
    category: "Nature",
    funFact: "The symmetric profile of the Matterhorn is the original silhouette used for the famous mountain on Toblerone chocolate boxes."
  },
  {
    id: "lm-chillon",
    name: "Chillon Castle",
    countryId: "switzerland",
    countryName: "Switzerland",
    location: "Veytaux, Lake Geneva",
    description: "An incredibly scenic medieval island fortress situated directly on the shores of Lake Geneva, complete with massive battlements and ancient halls.",
    image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
    annualVisitors: "0.4 Million",
    unesco: false,
    category: "Historical",
    funFact: "The Castle inspired Lord Byron to write his famous poem 'The Prisoner of Chillon' after he visited the dungeons in 1816."
  },
  {
    id: "lm-rhinefalls",
    name: "The Rhine Falls",
    countryId: "switzerland",
    countryName: "Switzerland",
    location: "Neuhausen",
    description: "The absolute most powerful and widest plain waterfall in Europe, sending roaring cascades over rock gates with platforms on the edge.",
    image: "https://images.unsplash.com/photo-1548132967-334-10e028bd69f7?auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
    annualVisitors: "1.3 Million",
    unesco: false,
    category: "Nature",
    funFact: "During the warm summer glacial melt period, up to 600,000 liters of water crash over the rocky waterfall edge every single second."
  },

  // --- EGYPT ---
  {
    id: "lm-pyramids",
    name: "Giza Pyramids Complex",
    countryId: "egypt",
    countryName: "Egypt",
    location: "Giza Plateau, Cairo",
    description: "The last remaining wonder of the ancient world. Majestic tombs built during the Old Kingdom for Pharaohs Khufu, Khafre, and Menkaure, guarded by the Great Sphinx.",
    image: "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    annualVisitors: "14.7 Million",
    unesco: true,
    category: "Historical",
    funFact: "For over 3,800 years, the Great Pyramid of Giza was the tallest man-made structure in the entire world."
  },
  {
    id: "lm-karnak",
    name: "Karnak Temple Complex",
    countryId: "egypt",
    countryName: "Egypt",
    location: "Luxor, Upper Egypt",
    description: "The largest open-air religious site ever built by mankind, featuring the colossal Great Hypostyle Hall containing 134 towering sandstone papyrus-shaped columns.",
    image: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    annualVisitors: "2.5 Million",
    unesco: true,
    category: "Historical",
    funFact: "Construction at Karnak began in the Middle Kingdom and continued for over 1,500 years, with nearly every Pharaoh adding their own expansion."
  },
  {
    id: "lm-abusimbel",
    name: "Abu Simbel Temples",
    countryId: "egypt",
    countryName: "Egypt",
    location: "Aswan Province",
    description: "Two grand temples carved directly into sandstone cliffs by Ramesses II, guarded by four colossal 20-meter statues of the Pharaoh guarding the entrance.",
    image: "https://images.unsplash.com/photo-1623345805780-8f01f714e65f?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    annualVisitors: "1.2 Million",
    unesco: true,
    category: "Historical",
    funFact: "The alignment is so precise that twice a year, the sun's rays shine deep into the temple to illuminate the statues inside."
  },
  {
    id: "lm-alexandria",
    name: "Citadel of Qaitbay",
    countryId: "egypt",
    countryName: "Egypt",
    location: "Alexandria Coast",
    description: "A defensive 15th-century maritime fortress built right on the shores of the Mediterranean Sea, constructed on the exact ruins of the ancient Pharos Lighthouse.",
    image: "https://images.unsplash.com/photo-1553913861-c0fddf2619ee?auto=format&fit=crop&w=600&q=80",
    rating: 4.7,
    annualVisitors: "0.9 Million",
    unesco: false,
    category: "Scenic",
    funFact: "The Citadel was constructed using the very stone blocks that fell during the massive ancient earthquake that destroyed the Lighthouse of Alexandria."
  },

  // --- FRANCE ---
  {
    id: "lm-eiffel",
    name: "Eiffel Tower",
    countryId: "france",
    countryName: "France",
    location: "Champ de Mars, Paris",
    description: "A colossal wrought-iron lattice tower which serves as the global romantic signature of Parisian architecture and engineering innovation.",
    image: "https://images.unsplash.com/photo-1543349689-9a4d426bee8e?auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
    annualVisitors: "7.0 Million",
    unesco: true,
    category: "Historical",
    funFact: "During cold winter temperatures, the thermal contraction shrinks the Eiffel Tower by up to six inches!"
  },
  {
    id: "lm-louvre",
    name: "The Louvre Museum",
    countryId: "france",
    countryName: "France",
    location: "Heart of Paris",
    description: "The world's absolute largest and richest art museum, housing the iconic glass Louvre Pyramid and priceless historical treasures like the Mona Lisa.",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    annualVisitors: "9.6 Million",
    unesco: true,
    category: "Cultural",
    funFact: "It would take you approximately 100 continuous days of walking to view every single work of art exhibited if you spent exactly 30 seconds at each."
  },
  {
    id: "lm-versailles",
    name: "Palace of Versailles",
    countryId: "france",
    countryName: "France",
    location: "Versailles, Île-de-France",
    description: "The breathtaking baroque royal palace of Louis XIV, featuring the golden Hall of Mirrors, spectacular fountains, and geometric royal gardens.",
    image: "https://images.unsplash.com/photo-1563811905662-7f9175440783?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    annualVisitors: "8.1 Million",
    unesco: true,
    category: "Historical",
    funFact: "The maintenance of the palace's hundreds of geometric garden hedge shapes requires an elite group of full-time standard gardeners."
  },
  {
    id: "lm-montsaintmichel",
    name: "Mont Saint-Michel Abbey",
    countryId: "france",
    countryName: "France",
    location: "Normandy Coast",
    description: "A fairytale medieval sanctuary built high on a steep, rocky tidal island, completely cut off from the French mainland during high ocean tides.",
    image: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    annualVisitors: "2.5 Million",
    unesco: true,
    category: "Scenic",
    funFact: "The sea tide around Mont Saint-Michel changes exceptionally fast, moving at the speed of a galloping horse."
  },

  // --- BRAZIL ---
  {
    id: "lm-christ",
    name: "Christ the Redeemer",
    countryId: "brazil",
    countryName: "Brazil",
    location: "Corcovado Mountain, Rio de Janeiro",
    description: "An immense, breathtaking Art Deco statue of Jesus Christ overlooking Rio de Janeiro, with wide welcoming arms representing peace.",
    image: "https://images.unsplash.com/photo-1516306580123-e6e52b1b7d5f?auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
    annualVisitors: "2.1 Million",
    unesco: true,
    category: "Scenic",
    funFact: "The outer layers of the colossal Christ statue are made of thousands of tiny triangular soapstone tiles, chosen for their weather resistance."
  },
  {
    id: "lm-iguazu",
    name: "Iguazu Falls",
    countryId: "brazil",
    countryName: "Brazil",
    location: "Foz do Iguaçu, Paraná State",
    description: "An incredibly massive system of 275 separate roaring waterfalls layout nestled in deep tropical rainforest, bordering Argentina and Brazil.",
    image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    annualVisitors: "1.8 Million",
    unesco: true,
    category: "Nature",
    funFact: "Upon seeing the spectacular site, Eleanor Roosevelt reportedly exclaimed 'My poor Niagara!', since Iguazu is twice as wide."
  },
  {
    id: "lm-sugarloaf",
    name: "Sugarloaf Mountain",
    countryId: "brazil",
    countryName: "Brazil",
    location: "Guanabara Bay, Rio de Janeiro",
    description: "A massive, rounded granite peak that rises directly out of the harbor's edge, accessed via glass cable cars with panoramic views.",
    image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
    annualVisitors: "1.5 Million",
    unesco: true,
    category: "Scenic",
    funFact: "The geological name refers to the traditional shape of concentrated block sugar during colonial sugarcane refining periods."
  },
  {
    id: "lm-amazonriver",
    name: "Amazon Rainforest Basin",
    countryId: "brazil",
    countryName: "Brazil",
    location: "Manaus, Amazonas State",
    description: "The absolute largest rainforest ecosystem on earth, teeming with rare jungle wildlife, spectacular winding riverways, and endemic pink dolphins.",
    image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    annualVisitors: "0.5 Million",
    unesco: true,
    category: "Adventure",
    funFact: "The canopy of the Amazon forest is so dense that when it rains, it can take up to 10 minutes for water drops to search down to the forest floor."
  },

  // --- AUSTRALIA ---
  {
    id: "lm-opera",
    name: "Sydney Opera House",
    countryId: "australia",
    countryName: "Australia",
    location: "Bennelong Point, Sydney",
    description: "A world-renowned multi-venue performing arts center featuring unique expressionist concrete sails resembling shells or wind-swept sails in the wind.",
    image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    annualVisitors: "8.2 Million",
    unesco: true,
    category: "Scenic",
    funFact: "The self-cleaning roof of the Sydney Opera House is covered by 1,056,006 pristine self-cleaning Swedish-made ceramic tiles."
  },
  {
    id: "lm-greatbarrier",
    name: "Great Barrier Reef",
    countryId: "australia",
    countryName: "Australia",
    location: "Coral Sea, Queensland",
    description: "The largest coral reef ecosystem on the planet, featuring thousands of individual reef structures teeming with sharks, manta rays, and dolphins.",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    annualVisitors: "2.0 Million",
    unesco: true,
    category: "Nature",
    funFact: "The Great Barrier Reef is the only organic, living structure on the planet that is visible directly from outer space satellite cameras."
  },
  {
    id: "lm-uluru",
    name: "Uluru (Ayers Rock)",
    countryId: "australia",
    countryName: "Australia",
    location: "Red Centre, Northern Territory",
    description: "A holy, massive red sandstone monolith sitting in the deep Australian desert, glowing brilliantly in changing colors at sunset and sunrise.",
    image: "https://images.unsplash.com/photo-1529142697600-db4b4e723cf9?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    annualVisitors: "0.4 Million",
    unesco: true,
    category: "Cultural",
    funFact: "Uluru is an underground mountain; the spectacular rock block continues deeper down into the earth for roughly another 5-6 kilometers."
  },
  {
    id: "lm-twelveapostles",
    name: "Twelve Apostles Sea Stacks",
    countryId: "australia",
    countryName: "Australia",
    location: "Great Ocean Road, Victoria",
    description: "A collection of dramatic limestone towers standing tall in the roaring Southern Ocean, carved by relentless wind and waves.",
    image: "https://images.unsplash.com/photo-1510101901865-c32242e63f39?auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
    annualVisitors: "2.2 Million",
    unesco: false,
    category: "Scenic",
    funFact: "Despite the name, there were only ever nine limestone stacks; continuous wave erosion caused one stack to crash in 2005."
  },

  // --- TURKEY ---
  {
    id: "lm-hagiasophia",
    name: "Hagia Sophia Grand Mosque",
    countryId: "turkey",
    countryName: "Turkey",
    location: "Sultanahmet, Istanbul",
    description: "An architectural marvel boasting an immense golden dome, serving over 1,500 years as an imperial cathedral, mosque, and a unifying global museum symbol.",
    image: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    annualVisitors: "6.5 Million",
    unesco: true,
    category: "Cultural",
    funFact: "The colossal columns supporting the Hagia Sophia dome were dismantled and brought from classical Greek temple ruins like the Temple of Ephesus."
  },
  {
    id: "lm-cappadocia",
    name: "Cappadocia Fairy Chimneys",
    countryId: "turkey",
    countryName: "Turkey",
    location: "Göreme Valley, Nevşehir",
    description: "A fantastical landscape of symmetric white stone volcanic spires, with ancient cave churches and hundreds of hot air balloons flying at sunrise.",
    image: "https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    annualVisitors: "3.5 Million",
    unesco: true,
    category: "Scenic",
    funFact: "Entire underground cities containing up to eight levels were carved into the soft stone to shelter standard residents during ancient wars."
  },
  {
    id: "lm-ephesus",
    name: "Ancient City of Ephesus",
    countryId: "turkey",
    countryName: "Turkey",
    location: "Selçuk, İzmir Coastal Area",
    description: "One of the most magnificent preserved classical Roman archaeological sites in the Mediterranean, featuring the stunning Library of Celsus.",
    image: "https://images.unsplash.com/photo-1599930113854-d6d7fd52bb6c?auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
    annualVisitors: "2.0 Million",
    unesco: true,
    category: "Historical",
    funFact: "The Library of Celsus was actually built over the tomb of Celsus, with double walls to safeguard his priceless scrolls from extreme humidity."
  },
  {
    id: "lm-pamukkale",
    name: "Pamukkale Travertines",
    countryId: "turkey",
    countryName: "Turkey",
    location: "Denizli Province",
    description: "Whimsical pure-white terraces formed by mineral-rich thermal springs, containing pristine turquoise-colored natural hot spring bath pools.",
    image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
    annualVisitors: "2.2 Million",
    unesco: true,
    category: "Nature",
    funFact: "The mineral-rich hot spring waters have temperature levels ranging up to 100 degrees Celsius and are famous for skincare benefits."
  },

  // --- UNITED STATES ---
  {
    id: "lm-grandcanyon",
    name: "Grand Canyon National Park",
    countryId: "usa",
    countryName: "United States",
    location: "Arizona State",
    description: "A mind-bending geological gorge carved over millions of years by the Colorado River, exposing horizontal bands of ancient red-rock history.",
    image: "https://images.unsplash.com/photo-1615551043360-33de8b5f410c?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    annualVisitors: "5.9 Million",
    unesco: true,
    category: "Nature",
    funFact: "The Grand Canyon exposes schist rock formations at its deepest spots that are nearly two billion years old—almost half the age of the earth."
  },
  {
    id: "lm-liberty",
    name: "Statue of Liberty",
    countryId: "usa",
    countryName: "United States",
    location: "Liberty Island, New York City",
    description: "A monumental neoclassical copper statue representing Libertas, the Roman goddess of liberty, welcoming international travelers to New York.",
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
    annualVisitors: "4.4 Million",
    unesco: true,
    category: "Historical",
    funFact: "The colossal green statue arrived from France as 350 individual copper sheets packed in 214 wooden crates, requiring months to fully assemble."
  },
  {
    id: "lm-yellowstone",
    name: "Yellowstone Hot Springs",
    countryId: "usa",
    countryName: "United States",
    location: "Wyoming State Wilderness",
    description: "The absolute oldest national park in the world, home to wild buffalo herds, towering geysers, and the colorful Grand Prismatic Spring.",
    image: "https://images.unsplash.com/photo-1570654639102-bdd9a87fa01d?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    annualVisitors: "4.1 Million",
    unesco: true,
    category: "Nature",
    funFact: "The gorgeous bright yellow and green colors of the thermal springs are caused by specialized colonies of heat-loving bacteria living in different layers."
  },
  {
    id: "lm-goldengate",
    name: "Golden Gate Bridge",
    countryId: "usa",
    countryName: "United States",
    location: "San Francisco, California",
    description: "The iconic, international-orange suspension bridge spanning the foggy entrance to the San Francisco Bay, a masterpiece of modern design.",
    image: "https://images.unsplash.com/photo-1549000832-60b86a7abdc8?auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
    annualVisitors: "10 Million",
    unesco: false,
    category: "Scenic",
    funFact: "The bridge's colorful orange hue is not a primer, but a custom color named 'International Orange', chosen to make it visible in deep fog."
  }
];

export const PRELOADED_HOTELS = [
  // --- JAPAN ---
  {
    id: "ht-thousand-kyoto",
    name: "The Thousand Kyoto",
    countryId: "japan",
    location: "Kyoto City Centre",
    image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=600&q=80",
    pricePerNight: 320,
    rating: 9.5,
    stars: 5,
    reviewsCount: 1420,
    amenities: ["Onsen Water", "Michelin Dining", "Garden Lounge", "Tatami Rooms"]
  },
  {
    id: "ht-hoshinoya-tokyo",
    name: "Hoshinoya Tokyo Ryokan",
    countryId: "japan",
    location: "Otemachi, Financial Tokyo",
    image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80",
    pricePerNight: 850,
    rating: 9.8,
    stars: 5,
    reviewsCount: 462,
    amenities: ["Rooftop Onsen Baths", "Traditional Kimono Spa", "Tea Ceremony", "Zen Beds"]
  },
  {
    id: "ht-park-hyatt-tokyo",
    name: "Park Hyatt Tokyo Tower",
    countryId: "japan",
    location: "Shinjuku Skyscraper Hub, Tokyo",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80",
    pricePerNight: 620,
    rating: 9.6,
    stars: 5,
    reviewsCount: 1980,
    amenities: ["Skyline Indoor Pool", "Jazz Bar Deck", "Bespoke Suites", "Pan-Tokyo Views"]
  },

  // --- ITALY ---
  {
    id: "ht-hassler-roma",
    name: "Hotel Hassler Roma",
    countryId: "italy",
    location: "Spanish Steps, Rome",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
    pricePerNight: 680,
    rating: 9.6,
    stars: 5,
    reviewsCount: 876,
    amenities: ["Rooftop Terraces", "Limousine Service", "Panoramic Dining", "Private Spa"]
  },
  {
    id: "ht-belmond-cipriana",
    name: "Cipriani, A Belmond Hotel",
    countryId: "italy",
    location: "Giudecca Lagoon, Venice",
    image: "https://images.unsplash.com/photo-1520175480921-4edfa2983e0f?auto=format&fit=crop&w=600&q=80",
    pricePerNight: 1100,
    rating: 9.8,
    stars: 5,
    reviewsCount: 430,
    amenities: ["Olympic-sized Pool", "Private Launch Boats", "Michelin Dining", "Secluded Gardens"]
  },
  {
    id: "ht-grand-tremezzo",
    name: "Grand Hotel Tremezzo Palace",
    countryId: "italy",
    location: "Tremezzina, Lake Como",
    image: "https://images.unsplash.com/photo-1541088645395-63364d318667?auto=format&fit=crop&w=600&q=80",
    pricePerNight: 950,
    rating: 9.7,
    stars: 5,
    reviewsCount: 710,
    amenities: ["Floating Lake Pool", "Elite Clay Courts", "Vintage Boat Rental", "Luxury Spa Palace"]
  },

  // --- GREECE ---
  {
    id: "ht-canaves-oia",
    name: "Canaves Oia Epitome",
    countryId: "greece",
    location: "Oia, Santorini",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80",
    pricePerNight: 890,
    rating: 9.8,
    stars: 5,
    reviewsCount: 540,
    amenities: ["Infinity Pool", "Ocean Sunset View", "Private Yacht Rental", "In-Villa Dining"]
  },
  {
    id: "ht-grande-bretagne",
    name: "Hotel Grande Bretagne Palace",
    countryId: "greece",
    location: "Syntagma Square, Athens",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
    pricePerNight: 480,
    rating: 9.6,
    stars: 5,
    reviewsCount: 1890,
    amenities: ["Rooftop Acropolis View", "Royal Indoor Spa", "Cellar Wine Tasting", "Bespoke Butlers"]
  },
  {
    id: "ht-blue-palace",
    name: "Elounda Blue Palace Resort",
    countryId: "greece",
    location: "Mirabello Gulf, Crete",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=600&q=80",
    pricePerNight: 390,
    rating: 9.5,
    stars: 5,
    reviewsCount: 1120,
    amenities: ["Seaside Bungalows", "Private Plunge Pools", "Traditional Caique Boat", "Eleni Crete Spa"]
  },

  // --- MOROCCO ---
  {
    id: "ht-la-mamounia",
    name: "La Mamounia Palace Hotel",
    countryId: "morocco",
    location: "Marrakech Centre",
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80",
    pricePerNight: 410,
    rating: 9.4,
    stars: 5,
    reviewsCount: 3200,
    amenities: ["Imperial Gardens", "Traditional Hammam", "Boutique Cigar Lounge", "Outdoor Oasis Pool"]
  },
  {
    id: "ht-royal-mansour",
    name: "The Royal Mansour Marrakech",
    countryId: "morocco",
    location: "Ancient Medina, Marrakech",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80",
    pricePerNight: 1250,
    rating: 9.9,
    stars: 5,
    reviewsCount: 310,
    amenities: ["Individual Private Riads", "Multi-Floor Thermal Spa", "Grand Moroccan Dining", "Bespoke Concierges"]
  },
  {
    id: "ht-kasbah-tamadot",
    name: "Virgin Kasbah Tamadot Retreat",
    countryId: "morocco",
    location: "Asni Mountain Valley, Atlas",
    image: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=600&q=80",
    pricePerNight: 690,
    rating: 9.7,
    stars: 5,
    reviewsCount: 480,
    amenities: ["Atlas Valley Pools", "Traditional Berber Tents", "Mule Treks", "Heated Indoor Hammam"]
  },

  // --- THAILAND ---
  {
    id: "ht-anantara-riverside",
    name: "Anantara Riverside Resort",
    countryId: "thailand",
    location: "Chao Phraya River, Bangkok",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80",
    pricePerNight: 185,
    rating: 9.2,
    stars: 5,
    reviewsCount: 2110,
    amenities: ["Tropical Pool", "Full Body Spa", "Sunset Cruises", "Thai Cooking Class"]
  },
  {
    id: "ht-mandarin-bangkok",
    name: "Mandarin Oriental Bangkok Palace",
    countryId: "thailand",
    location: "Riverside Center, Bangkok",
    image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=600&q=80",
    pricePerNight: 450,
    rating: 9.8,
    stars: 5,
    reviewsCount: 3120,
    amenities: ["Imperial River Spa", "2-Stars French Dining", "Teakwood Shuttle Boats", "Private Butler"]
  },
  {
    id: "ht-soneva-kiri",
    name: "Soneva Kiri Eco-Sanctuary",
    countryId: "thailand",
    location: "Koh Kood Tropical Island",
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80",
    pricePerNight: 980,
    rating: 9.9,
    stars: 5,
    reviewsCount: 260,
    amenities: ["Rainforest Pool Villas", "Tree-Pod Dining", "Private Sandy Beach", "Outdoor Cinema Paradox"]
  },

  // --- SWITZERLAND ---
  {
    id: "ht-kempinski-stmoritz",
    name: "Grand Hotel des Bains Kempinski",
    countryId: "switzerland",
    location: "St. Moritz, Engadin Valley",
    image: "https://images.unsplash.com/photo-1518733057074-95e5ee8af0db?auto=format&fit=crop&w=600&q=80",
    pricePerNight: 550,
    rating: 9.3,
    stars: 5,
    reviewsCount: 1040,
    amenities: ["Ski-in / Ski-out Access", "Alpine Thermal Spa", "Heated Pool", "Michelin Star Brasserie"]
  },
  {
    id: "ht-the-chedi-andermatt",
    name: "The Chedi Andermatt Lodge",
    countryId: "switzerland",
    location: "Gotthard Valley, Andermatt",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80",
    pricePerNight: 720,
    rating: 9.7,
    stars: 5,
    reviewsCount: 460,
    amenities: ["35m Indoor Thermal Pool", "Cheese Humidor Cellar", "Sake Sommelier Deck", "Ski Butlers"]
  },
  {
    id: "ht-badrutts-palace",
    name: "Badrutt's Palace Castle",
    countryId: "switzerland",
    location: "Via Serlas, St. Moritz",
    image: "https://images.unsplash.com/photo-1485081669829-bacb8c7bb1d3?auto=format&fit=crop&w=600&q=80",
    pricePerNight: 890,
    rating: 9.8,
    stars: 5,
    reviewsCount: 880,
    amenities: ["Private Lake Ski-boats", "Indoor Cave Pool", "Grand Ballroom Lounge", "Glacier Heli-rides"]
  },

  // --- EGYPT ---
  {
    id: "ht-menahouse",
    name: "Marriott Mena House",
    countryId: "egypt",
    location: "Giza, Cairo",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=600&q=80",
    pricePerNight: 280,
    rating: 9.6,
    stars: 5,
    reviewsCount: 1950,
    amenities: ["Pyramids View Balconies", "Royal Garden Lounge", "Heated Oasis Pool", "Classic Egyptian High-Tea"]
  },
  {
    id: "ht-old-cataract",
    name: "Sofitel Legend Old Cataract",
    countryId: "egypt",
    location: "Granite Cliffs, Aswan",
    image: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=600&q=80",
    pricePerNight: 390,
    rating: 9.8,
    stars: 5,
    reviewsCount: 920,
    amenities: ["Nile River Balconies", "Royal Sukkareya Terrace", "Chandeliers Lounge", "Pharaonic Spa Suite"]
  },
  {
    id: "ht-four-seasons-sharm",
    name: "Four Seasons Red Sea Resort",
    countryId: "egypt",
    location: "Sharks Bay, Sharm El Sheikh",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80",
    pricePerNight: 450,
    rating: 9.5,
    stars: 5,
    reviewsCount: 1540,
    amenities: ["Private Diving Coral Reef", "Moorish Villas Pool", "Yacht Safaris", "Seafront Hammams"]
  },

  // --- FRANCE ---
  {
    id: "ht-bristol",
    name: "Le Bristol Paris",
    countryId: "france",
    location: "Rue du Faubourg Saint-Honoré, Paris",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=600&q=80",
    pricePerNight: 1200,
    rating: 9.9,
    stars: 5,
    reviewsCount: 650,
    amenities: ["Michelin 3-Star Dining", "Glass Rooftop Pool", "Tranquil Courtyard Orchard", "Personalized French Concierges"]
  },
  {
    id: "ht-hotel-du-cap",
    name: "Hotel-du-Cap Eden Roc",
    countryId: "france",
    location: "Antibes, French Riviera Coast",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
    pricePerNight: 1450,
    rating: 9.9,
    stars: 5,
    reviewsCount: 380,
    amenities: ["Cliffside Heated Pool", "Teak Diving Boards", "Scenic Clay Courts", "Riviera Yacht Service"]
  },
  {
    id: "ht-chateau-de-la-chevre",
    name: "Château de la Chèvre d'Or",
    countryId: "france",
    location: "Medieval Village of Eze, Riviera",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80",
    pricePerNight: 750,
    rating: 9.7,
    stars: 5,
    reviewsCount: 490,
    amenities: ["Cliffside Infinite Pool", "Panoramic Bistro Deck", "Sculpture Terraces", "Limestone Vaults Suites"]
  },

  // --- BRAZIL ---
  {
    id: "ht-copacabana",
    name: "Belmond Copacabana Palace",
    countryId: "brazil",
    location: "Copacabana Beach, Rio de Janeiro",
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=600&q=80",
    pricePerNight: 430,
    rating: 9.5,
    stars: 5,
    reviewsCount: 2200,
    amenities: ["Oceanfront Terraces", "Samba Cocktail Lounge", "Michelin Star Pan-Asian", "Beaches Service Hut"]
  },
  {
    id: "ht-fasano-rio",
    name: "Hotel Fasano Rio de Janeiro",
    countryId: "brazil",
    location: "Ipanema Beach Front, Rio",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80",
    pricePerNight: 550,
    rating: 9.7,
    stars: 5,
    reviewsCount: 890,
    amenities: ["Rooftop Infinity Pool", "Mid-Century Jazz Lounge", "Bespoke Beach Butlers", "Fasano Italian Dining"]
  },
  {
    id: "ht-unique-saopaulo",
    name: "Hotel Unique Brazil",
    countryId: "brazil",
    location: "Sampa Jardins Area, São Paulo",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80",
    pricePerNight: 350,
    rating: 9.4,
    stars: 5,
    reviewsCount: 1650,
    amenities: ["Red-Bottom Rooftop Pool", "Skye Panoramic Bistro", "Futuristic Suites", "Sub-Canopy Spas"]
  },

  // --- AUSTRALIA ---
  {
    id: "ht-hyattsydney",
    name: "Park Hyatt Sydney",
    countryId: "australia",
    location: "The Rocks, Sydney Harbour",
    image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=600&q=80",
    pricePerNight: 750,
    rating: 9.7,
    stars: 5,
    reviewsCount: 1100,
    amenities: ["Harbour Bridge Views", "Rooftop Heated Pool", "Aromatic Thermal Day Spa", "Private Butler Service"]
  },
  {
    id: "ht-qualia-hamilton",
    name: "Qualia Great Barrier Reef",
    countryId: "australia",
    location: "Hamilton Island, Whitsundays",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80",
    pricePerNight: 1050,
    rating: 9.9,
    stars: 5,
    reviewsCount: 520,
    amenities: ["Oceanfront Pavilions", "Bespoke Infinity Pools", "Helicopter Reef Tours", "Deep Coral Sea Spas"]
  },
  {
    id: "ht-southern-ocean",
    name: "Southern Ocean Lodge Eco-Wild",
    countryId: "australia",
    location: "Hanson Bay Coastal, Kangaroo Island",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=600&q=80",
    pricePerNight: 950,
    rating: 9.8,
    stars: 5,
    reviewsCount: 310,
    amenities: ["Glass-Wall Ocean Suites", "Wildlife Safari Guides", "Open-Bar Southern Wines", "Eco-Basin Clay Spa"]
  },

  // --- TURKEY ---
  {
    id: "ht-fourseasbosphorus",
    name: "Four Seasons Hotel Bosphorus",
    countryId: "turkey",
    location: "Besiktas, Istanbul",
    image: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=600&q=80",
    pricePerNight: 590,
    rating: 9.6,
    stars: 5,
    reviewsCount: 1840,
    amenities: ["Bosphorus Waterfront Deck", "Turkish Marble Hammam", "Indoor Heated Colonade Pool", "Waterfront Ottoman Buffet"]
  },
  {
    id: "ht-museum-hotel",
    name: "Museum Cave Hotel Cappadocia",
    countryId: "turkey",
    location: "Uchisar, Cappadocia Castle Area",
    image: "https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?auto=format&fit=crop&w=600&q=80",
    pricePerNight: 490,
    rating: 9.8,
    stars: 5,
    reviewsCount: 650,
    amenities: ["Thermal Stone Cave Rooms", "Historical Artifact Museum", "Symmetric Valley Pools", "Lilac Garden Breakfast"]
  },
  {
    id: "ht-amanruya-bodrum",
    name: "Amanruya Aegean Sanctuary",
    countryId: "turkey",
    location: "Mandalya Bay Wilderness, Bodrum",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
    pricePerNight: 1200,
    rating: 9.7,
    stars: 5,
    reviewsCount: 220,
    amenities: ["Private Stone Pavilions", "Emerald 50m Pool", "Private Pebble Beach", "Bespoke Olive-Grove Spa"]
  },

  // --- UNITED STATES ---
  {
    id: "ht-theplaza",
    name: "The Plaza Hotel New York",
    countryId: "usa",
    location: "Fifth Avenue & Central Park South, NY",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80",
    pricePerNight: 950,
    rating: 9.7,
    stars: 5,
    reviewsCount: 4500,
    amenities: ["Champagne Crystal Lounge", "Central Park Access", "Butler Suite Operations", "Luxurious Guerlain Spa"]
  },
  {
    id: "ht-bellagio",
    name: "The Bellagio Resort & Casino",
    countryId: "usa",
    location: "The Strip, Las Vegas, Nevada",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
    pricePerNight: 290,
    rating: 9.5,
    stars: 5,
    reviewsCount: 18500,
    amenities: ["Musical Fountains Pool", "Botanical Conservatory", "Michelin Dining Rooms", "Private Baccarat Club"]
  },
  {
    id: "ht-amangiri",
    name: "Amangiri Canyon Resort",
    countryId: "usa",
    location: "Canyon Point Wilderness, Utah",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80",
    pricePerNight: 1850,
    rating: 9.9,
    stars: 5,
    reviewsCount: 180,
    amenities: ["Desert Rock-Curved Pool", "High-Tech stargazing", "Navajo Healing Spas", "Bespoke Desert Treks"]
  }
];
