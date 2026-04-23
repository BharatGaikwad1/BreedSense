const breeds = [
  {
    breed_name: "Gir",
    animal_type: "cow",
    origin: "Gujarat, India",
    description: "The Gir is one of the principal Zebu breeds originating from the Gir forest area and surrounding districts of Gujarat. Known for its distinctive appearance with a large rounded forehead, long pendulous ears, and curved horns. It is considered one of the best dairy breeds among Indian cattle, prized for the high-quality A2 milk it produces.",
    milking_capacity: { daily_yield_liters: 12, lactation_period_days: 300, fat_content_percent: 4.5, annual_yield_liters: 3600 },
    physical_attributes: { average_weight_kg: "400-475", color: "Red with white patches, or entirely red", horns: "Curved, tilting backward", lifespan_years: "12-15" },
    utility: { primary_use: "Dairy", adaptability: "Tropical and subtropical climates", temperament: "Gentle, docile", disease_resistance: "High resistance to tropical diseases and tick infestations" }
  },
  {
    breed_name: "Sahiwal",
    animal_type: "cow",
    origin: "Punjab (India/Pakistan)",
    description: "The Sahiwal is one of the best dairy breeds of Zebu cattle, originating from the Sahiwal district of Punjab. This breed is known for its heat tolerance, tick resistance, and ability to produce good quantities of milk even under harsh conditions. It has been exported to many tropical countries for crossbreeding programs.",
    milking_capacity: { daily_yield_liters: 10, lactation_period_days: 305, fat_content_percent: 4.8, annual_yield_liters: 3050 },
    physical_attributes: { average_weight_kg: "350-500", color: "Reddish-brown to light brown", horns: "Short, stumpy", lifespan_years: "12-16" },
    utility: { primary_use: "Dairy", adaptability: "Hot and humid tropical climates", temperament: "Calm, lethargic", disease_resistance: "Excellent resistance to heat stress and parasites" }
  },
  {
    breed_name: "Red Sindhi",
    animal_type: "cow",
    origin: "Sindh (Pakistan/India)",
    description: "Red Sindhi is a dairy breed of cattle originating from the Sindh province. Known for its distinctive deep red color and compact body, this breed is well adapted to hot climates and produces reasonable quantities of milk. It is widely used for crossbreeding with European breeds to improve heat tolerance.",
    milking_capacity: { daily_yield_liters: 8, lactation_period_days: 290, fat_content_percent: 4.5, annual_yield_liters: 2320 },
    physical_attributes: { average_weight_kg: "300-400", color: "Deep red to dark cherry", horns: "Short, thick, curved upward", lifespan_years: "12-15" },
    utility: { primary_use: "Dairy", adaptability: "Arid and semi-arid climates", temperament: "Active, alert", disease_resistance: "Good resistance to tropical diseases" }
  },
  {
    breed_name: "Tharparkar",
    animal_type: "cow",
    origin: "Rajasthan, India",
    description: "The Tharparkar (or Thari) is a dual-purpose breed from the Thar Desert region of Rajasthan. It is one of the few Indian breeds that is good for both milk production and draft work. The breed is well adapted to harsh desert conditions with extreme temperatures and limited water availability.",
    milking_capacity: { daily_yield_liters: 7, lactation_period_days: 280, fat_content_percent: 4.8, annual_yield_liters: 1960 },
    physical_attributes: { average_weight_kg: "350-450", color: "White to light grey", horns: "Medium, curved upward and inward", lifespan_years: "12-15" },
    utility: { primary_use: "Dual-purpose", adaptability: "Desert and arid climates", temperament: "Hardy, docile", disease_resistance: "Very good resistance to heat stress and dehydration" }
  },
  {
    breed_name: "Ongole",
    animal_type: "cow",
    origin: "Andhra Pradesh, India",
    description: "The Ongole is a powerful draft breed from the Prakasam district of Andhra Pradesh. Known for its massive build, white coat, and distinctive large dewlap, it has been exported worldwide to develop other breeds including the American Brahman. Despite being primarily a draft breed, Ongole cows produce moderate quantities of milk.",
    milking_capacity: { daily_yield_liters: 5, lactation_period_days: 270, fat_content_percent: 4.2, annual_yield_liters: 1350 },
    physical_attributes: { average_weight_kg: "500-600", color: "White to light grey", horns: "Short, stumpy", lifespan_years: "12-15" },
    utility: { primary_use: "Draft", adaptability: "Tropical plains", temperament: "Calm but strong", disease_resistance: "Good natural immunity to tropical diseases" }
  },
  {
    breed_name: "Kankrej",
    animal_type: "cow",
    origin: "Gujarat/Rajasthan, India",
    description: "The Kankrej is a dual-purpose breed from the Kutch and Banaskantha districts of Gujarat. It is one of the heaviest Indian breeds with an impressive silvery-grey coat. Known for its strength and endurance as a draft animal, it also produces decent quantities of milk, making it a valuable dual-purpose breed.",
    milking_capacity: { daily_yield_liters: 6, lactation_period_days: 270, fat_content_percent: 4.3, annual_yield_liters: 1620 },
    physical_attributes: { average_weight_kg: "450-550", color: "Silvery grey to iron grey", horns: "Lyre-shaped, strong", lifespan_years: "12-15" },
    utility: { primary_use: "Dual-purpose", adaptability: "Semi-arid and tropical", temperament: "Active, powerful", disease_resistance: "High resistance to common cattle diseases" }
  },
  {
    breed_name: "Hariana",
    animal_type: "cow",
    origin: "Haryana, India",
    description: "The Hariana is a dual-purpose breed from the Rohtak, Hisar, and Jind districts of Haryana. It is one of the most popular breeds in northern India due to its versatility. The breed is known for its white to grey coat, efficient feed conversion, and ability to thrive on minimal resources.",
    milking_capacity: { daily_yield_liters: 5, lactation_period_days: 260, fat_content_percent: 4.5, annual_yield_liters: 1300 },
    physical_attributes: { average_weight_kg: "350-450", color: "White to light grey", horns: "Short to medium, slightly forward", lifespan_years: "12-14" },
    utility: { primary_use: "Dual-purpose", adaptability: "Plains and semi-arid regions", temperament: "Docile, active", disease_resistance: "Moderate disease resistance" }
  },
  {
    breed_name: "Rathi",
    animal_type: "cow",
    origin: "Rajasthan, India",
    description: "The Rathi is a dairy breed from the Bikaner, Ganganagar, and Jaisalmer districts of Rajasthan. Despite originating from harsh desert conditions, Rathi cattle are surprisingly good milk producers. The breed is known for its brown or brown-and-white coat, medium frame, and gentle disposition.",
    milking_capacity: { daily_yield_liters: 8, lactation_period_days: 285, fat_content_percent: 4.6, annual_yield_liters: 2280 },
    physical_attributes: { average_weight_kg: "300-400", color: "Brown with white patches", horns: "Medium, outward & upward", lifespan_years: "12-15" },
    utility: { primary_use: "Dairy", adaptability: "Arid desert climate", temperament: "Gentle, friendly", disease_resistance: "Good adaptability to desert conditions" }
  },
  {
    breed_name: "Kangayam",
    animal_type: "cow",
    origin: "Tamil Nadu, India",
    description: "The Kangayam is a hardy draft breed from the Kangayam region of Tamil Nadu. Known for its compact, muscular body and impressive strength, it was traditionally used for cart pulling and plowing. The breed is characterized by its grey coat that darkens with age and its distinctive backward-curved horns.",
    milking_capacity: { daily_yield_liters: 3, lactation_period_days: 240, fat_content_percent: 4.0, annual_yield_liters: 720 },
    physical_attributes: { average_weight_kg: "350-450", color: "Grey to dark grey", horns: "Long, backward-curving", lifespan_years: "14-16" },
    utility: { primary_use: "Draft", adaptability: "Tropical southern climate", temperament: "Spirited, energetic", disease_resistance: "High resistance to foot-and-mouth disease" }
  },
  {
    breed_name: "Deoni",
    animal_type: "cow",
    origin: "Maharashtra/Karnataka, India",
    description: "The Deoni is a dual-purpose breed from the Latur and Bidar districts of Maharashtra and Karnataka. It is one of the lesser-known but valuable Indian breeds, combining good milk production with reasonable draft capability. The breed exhibits a spotted black-and-white coat pattern.",
    milking_capacity: { daily_yield_liters: 4, lactation_period_days: 260, fat_content_percent: 4.3, annual_yield_liters: 1040 },
    physical_attributes: { average_weight_kg: "400-500", color: "Black and white spotted", horns: "Short, thick", lifespan_years: "12-14" },
    utility: { primary_use: "Dual-purpose", adaptability: "Deccan plateau climate", temperament: "Calm, manageable", disease_resistance: "Moderate to good" }
  },
  {
    breed_name: "Murrah",
    animal_type: "buffalo",
    origin: "Haryana, India",
    description: "The Murrah is the most popular and highest milk-producing buffalo breed in India, originating from Rohtak and Hisar districts of Haryana. It is characterized by its jet-black coat, tightly curled horns, and massive body. The breed is widely used for crossbreeding to improve milk production globally.",
    milking_capacity: { daily_yield_liters: 16, lactation_period_days: 310, fat_content_percent: 7.0, annual_yield_liters: 4960 },
    physical_attributes: { average_weight_kg: "500-700", color: "Jet black", horns: "Short, tightly curled (spiral)", lifespan_years: "18-20" },
    utility: { primary_use: "Dairy", adaptability: "Plains and irrigated regions", temperament: "Docile, easy to manage", disease_resistance: "Good resistance, requires regular deworming" }
  },
  {
    breed_name: "Jaffarabadi",
    animal_type: "buffalo",
    origin: "Gujarat, India",
    description: "The Jaffarabadi is the heaviest buffalo breed in India, originating from the Gir forests of Gujarat. Named after the town of Jaffarabad, this breed is known for its massive build, large drooping horns, and high milk production with excellent fat content. It is particularly valued in Gujarat for its rich, creamy milk.",
    milking_capacity: { daily_yield_liters: 14, lactation_period_days: 305, fat_content_percent: 8.0, annual_yield_liters: 4270 },
    physical_attributes: { average_weight_kg: "600-800", color: "Black", horns: "Heavy, drooping, curving upward", lifespan_years: "18-22" },
    utility: { primary_use: "Dairy", adaptability: "Coastal and forested regions", temperament: "Calm, slowmoving", disease_resistance: "Robust constitution, good natural immunity" }
  },
  {
    breed_name: "Mehsana",
    animal_type: "buffalo",
    origin: "Gujarat, India",
    description: "The Mehsana buffalo is a dairy breed from the Mehsana district of Gujarat. It is considered a cross-derivative of the Murrah and the Surti, combining the best dairy traits of both. Known for its longer lactation period and consistent milk production, it is the second most popular dairy buffalo breed in India.",
    milking_capacity: { daily_yield_liters: 12, lactation_period_days: 320, fat_content_percent: 7.2, annual_yield_liters: 3840 },
    physical_attributes: { average_weight_kg: "450-550", color: "Black to dark grey", horns: "Sickle-shaped, less curled than Murrah", lifespan_years: "18-20" },
    utility: { primary_use: "Dairy", adaptability: "Semi-arid plains", temperament: "Gentle, responsive", disease_resistance: "Good disease resistance" }
  },
  {
    breed_name: "Surti",
    animal_type: "buffalo",
    origin: "Gujarat, India",
    description: "The Surti is a medium-sized dairy buffalo breed from the Kaira and Vadodara districts of Gujarat. Despite its smaller size compared to other buffalo breeds, the Surti is an efficient milk producer with high fat content. It is well-suited for small and marginal farmers due to its lower feed requirements.",
    milking_capacity: { daily_yield_liters: 8, lactation_period_days: 300, fat_content_percent: 7.5, annual_yield_liters: 2400 },
    physical_attributes: { average_weight_kg: "400-500", color: "Brown to silver-grey", horns: "Sickle-shaped, medium length", lifespan_years: "16-18" },
    utility: { primary_use: "Dairy", adaptability: "Irrigated plains and riverine areas", temperament: "Docile, efficient", disease_resistance: "Moderate, good feed efficiency" }
  },
  {
    breed_name: "Bhadawari",
    animal_type: "buffalo",
    origin: "Uttar Pradesh/Madhya Pradesh, India",
    description: "The Bhadawari is a small but highly efficient buffalo breed from the Bhadawar area of Agra and Etawah districts. It is famous for having the highest fat content in milk among all buffalo breeds, making its milk ideal for ghee production. Despite its small size, it thrives on minimal resources.",
    milking_capacity: { daily_yield_liters: 5, lactation_period_days: 270, fat_content_percent: 8.5, annual_yield_liters: 1350 },
    physical_attributes: { average_weight_kg: "300-400", color: "Copper-brown to light brown", horns: "Short, slightly curved", lifespan_years: "16-18" },
    utility: { primary_use: "Dairy (ghee production)", adaptability: "Ravine and semi-arid terrain", temperament: "Hardy, independent", disease_resistance: "Excellent adaptability to poor nutrition" }
  },
  {
    breed_name: "Nili-Ravi",
    animal_type: "buffalo",
    origin: "Punjab (India/Pakistan)",
    description: "The Nili-Ravi is one of the most important dairy buffalo breeds from Punjab. It is characterized by its wall eyes (white-rimmed eyes), distinctive white markings on forehead and legs, and excellent milk production capabilities. The breed contributes significantly to the dairy industry in the Punjab region.",
    milking_capacity: { daily_yield_liters: 13, lactation_period_days: 305, fat_content_percent: 6.8, annual_yield_liters: 3965 },
    physical_attributes: { average_weight_kg: "450-600", color: "Black with white markings on face and legs", horns: "Small, curled", lifespan_years: "18-20" },
    utility: { primary_use: "Dairy", adaptability: "Irrigated canal areas, riverine regions", temperament: "Docile, easy to handle", disease_resistance: "Good resistance to common diseases" }
  },
  {
    breed_name: "Pandharpuri",
    animal_type: "buffalo",
    origin: "Maharashtra, India",
    description: "The Pandharpuri is a large dairy buffalo breed from the Solapur and Kolhapur districts of Maharashtra. Known for its distinctive long, flat, sword-like horns and large body, it produces significant quantities of milk. The breed is well adapted to the Deccan plateau climate.",
    milking_capacity: { daily_yield_liters: 7, lactation_period_days: 280, fat_content_percent: 7.0, annual_yield_liters: 1960 },
    physical_attributes: { average_weight_kg: "450-550", color: "Black", horns: "Long, flat, sword-shaped", lifespan_years: "16-18" },
    utility: { primary_use: "Dairy", adaptability: "Deccan plateau, semi-arid", temperament: "Docile", disease_resistance: "Good adaptability to local conditions" }
  },
  {
    breed_name: "Nagpuri",
    animal_type: "buffalo",
    origin: "Maharashtra, India",
    description: "The Nagpuri buffalo, also known as Elitchpuri, is from the Nagpur region of Maharashtra. It is notable for its exceptionally long, flat, curved horns that can span up to six feet. While primarily kept for draft purpose, Nagpuri buffaloes also produce moderate quantities of milk.",
    milking_capacity: { daily_yield_liters: 5, lactation_period_days: 260, fat_content_percent: 7.0, annual_yield_liters: 1300 },
    physical_attributes: { average_weight_kg: "400-500", color: "Black", horns: "Very long, flat, curving backward", lifespan_years: "16-18" },
    utility: { primary_use: "Dual-purpose", adaptability: "Central Indian plateau", temperament: "Hardy, active", disease_resistance: "Moderate resistance" }
  },
  {
    breed_name: "Toda",
    animal_type: "buffalo",
    origin: "Tamil Nadu (Nilgiris), India",
    description: "The Toda buffalo is a unique hill breed maintained by the Toda tribal community in the Nilgiri Hills of Tamil Nadu. This is one of the rarest buffalo breeds, kept mainly for ceremonial and cultural purposes. The Toda buffalo produces small quantities of very rich milk with extremely high fat content.",
    milking_capacity: { daily_yield_liters: 3, lactation_period_days: 240, fat_content_percent: 8.0, annual_yield_liters: 720 },
    physical_attributes: { average_weight_kg: "350-400", color: "Light brown to fawn", horns: "Curved, spreading outward", lifespan_years: "18-20" },
    utility: { primary_use: "Ceremonial / Dairy", adaptability: "High altitude hill regions", temperament: "Semi-wild, nervous", disease_resistance: "Excellent adaptation to cold, hilly terrain" }
  },
  {
    breed_name: "Chilika",
    animal_type: "buffalo",
    origin: "Odisha, India",
    description: "The Chilika buffalo is a unique aquatic breed found around Chilika Lake in Odisha. This breed is adapted to swampy and waterlogged environments, spending much of its time wading in water. It is a smaller breed, mainly kept for milk production in the coastal regions.",
    milking_capacity: { daily_yield_liters: 4, lactation_period_days: 250, fat_content_percent: 7.8, annual_yield_liters: 1000 },
    physical_attributes: { average_weight_kg: "300-400", color: "Black to dark grey", horns: "Medium, curved backward", lifespan_years: "16-18" },
    utility: { primary_use: "Dairy", adaptability: "Swampy, coastal, waterlogged areas", temperament: "Calm, aquatic-adapted", disease_resistance: "Good adaptation to humid conditions" }
  },
];

export default breeds;
