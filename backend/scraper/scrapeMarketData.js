import axios from "axios";

// Updated resource ID — active dataset with 2025/2026 data
const RESOURCE_ID = "9ef84268-d588-465a-a308-a864a43d0070";
const BASE_URL = `https://api.data.gov.in/resource/${RESOURCE_ID}`;

// All tracked commodities — must match EXACT Agmarknet commodity names
// Commodity names verified against live API (9ef84268) on 14-04-2026
// These EXACT strings match what the API returns in the 'commodity' field
const TRACKED_COMMODITIES = new Set([
  // Grains
  "Wheat", "Rice", "Maize", "Jowar(Sorghum)", "Paddy(Common)",
  "Bajra(Pearl Millet/Cumbu)", "Ragi(Finger Millet)", "Barley(Jau)",
  "Foxtail Millet(Navane)", "Kodo Millet(Varagu)",
  // Pulses
  "Bengal Gram(Gram)(Whole)", "Bengal Gram Dal(Chana Dal)",
  "Black Gram(Urd Beans)(Whole)", "Black Gram Dal(Urd Dal)",
  "Green Gram(Moong)(Whole)", "Green Gram Dal(Moong Dal)",
  "Lentil(Masur)(Whole)", "Arhar(Tur/Red Gram)(Whole)", "Arhar Dal(Tur Dal)",
  "Kulthi(Horse Gram)", "Peas Wet", "Peas(Dry)", "Green Peas",
  "Cowpea(Lobia/Karamani)", "Kabuli Chana(Chickpeas-White)",
  // Oilseeds
  "Groundnut", "Sesamum(Sesame,Gingelly,Til)", "Mustard", "Soyabean",
  "Sunflower", "Castor Seed", "Safflower", "Taramira",
  // Vegetables
  "Onion", "Onion Green", "Potato", "Tomato", "Brinjal", "Cabbage",
  "Cauliflower", "Capsicum", "Green Chilli", "Chili Red",
  "Bhindi(Ladies Finger)", "Ladies Finger",
  "Drumstick", "Bitter gourd", "Bottle gourd", "Pumpkin", "Sweet Pumpkin",
  "Raddish", "Carrot", "Spinach", "Cucumbar(Kheera)", "Garlic",
  "Beans", "French Beans(Frasbean)", "Cluster beans", "Guar",
  "Pointed gourd(Parval)", "Ridgeguard(Tori)", "Snakeguard", "Sponge gourd",
  "Tinda", "Ashgourd", "Colacasia", "Sweet Potato", "Yam(Ratalu)",
  "Elephant Yam(Suran)/Amorphophallus", "Sweet Corn ", "Baby Corn",
  "Beetroot", "Turnip", "Mint(Pudina)", "Coriander(Leaves)", "Methi(Leaves)",
  // Fruits
  "Apple", "Orange", "Banana", "Banana - Green", "Mango", "Mango(Raw-Ripe)",
  "Pineapple", "Grapes", "Papaya", "Pomegranate", "Water Melon",
  "Karbuja(Musk Melon)", "Guava", "Lemon", "Lime",
  "Coconut", "Tender Coconut", "Jack Fruit(Ripe)",
  "Chikoos(Sapota)", "Amla(Nelli Kai)", "Tamarind Fruit",
  "Mousambi(Sweet Lime)",
  // Spices
  "Dry Chillies", "Cummin Seed(Jeera)", "Corriander seed", "Methi Seeds",
  "Black pepper", "Ajwan", "Soanf",
  // Cash Crops / Others
  "Cotton", "Tobacco", "Gur(Jaggery)", "Copra",
  "Cashewnuts", "Arecanut(Betelnut/Supari)",
  "Tapioca", "Isabgul(Psyllium)",
]);

// Format date as dd-MM-yyyy (data.gov.in API format)
function formatDate(date) {
  const dd   = String(date.getDate()).padStart(2, "0");
  const mm   = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = date.getFullYear();
  return `${dd}-${mm}-${yyyy}`;
}

// Get last N calendar dates (handles weekends / public holidays)
function getRecentDates(count = 7) {
  const dates = [];
  const d = new Date();
  for (let i = 0; i < count; i++) {
    dates.push(formatDate(d));
    d.setDate(d.getDate() - 1);
  }
  return dates;
}

// Convert one API record → frontend format
// NOTE: New API (9ef84268) uses lowercase snake_case field names
function mapRecord(record) {
  // Support both old PascalCase and new lowercase field names
  const modal = parseFloat(record.modal_price ?? record.Modal_Price) || 0;
  const min   = parseFloat(record.min_price   ?? record.Min_Price)   || 0;
  const max   = parseFloat(record.max_price   ?? record.Max_Price)   || 0;

  const rawDate = record.arrival_date ?? record.Arrival_Date ?? "";
  const commodity = record.commodity  ?? record.Commodity   ?? "";
  const market    = record.market     ?? record.Market      ?? "";
  const variety   = record.variety    ?? record.Variety     ?? "";
  const state     = record.state      ?? record.State       ?? "";
  const district  = record.district   ?? record.District    ?? "";
  const grade     = record.grade      ?? record.Grade       ?? "";

  // Parse arrival date: dd/MM/yyyy or dd-MM-yyyy → YYYY-MM-DD
  let dateStr = "";
  if (rawDate) {
    const raw   = rawDate.replace(/\\/g, "/").replace(/-/g, "/");
    const parts = raw.split("/");
    if (parts.length === 3) {
      dateStr = `${parts[2]}-${parts[1]}-${parts[0]}`;
    }
  }

  return {
    ticker:   commodity,
    market:   variety && variety !== "Other"
              ? `${market} (${variety})`
              : market,
    state,
    district,
    grade,
    maxPrice: String(max),
    minPrice: String(min),
    price:    String(modal || Number(((max + min) / 2).toFixed(2))),
    date:     dateStr,
  };
}

async function fetchMarketData() {
  const apiKey = process.env.DATA_GOV_API_KEY;
  if (!apiKey) {
    console.error("❌ DATA_GOV_API_KEY is not set in .env");
    return [];
  }

  const recentDates = getRecentDates(7); // try today + previous 6 days
  console.log(`📡 Fetching market data for dates: ${recentDates.slice(0, 3).join(", ")} …`);

  for (const dateStr of recentDates) {
    try {
      // ── Step 1: Get total count for this date ──────────────────────────
      const countParams = new URLSearchParams({
        "api-key": apiKey,
        format:    "json",
        limit:     "1",
        offset:    "0",
        "filters[arrival_date]": dateStr,
      });
      const countRes = await axios.get(`${BASE_URL}?${countParams}`, { timeout: 20000 });
      const total = Number(countRes.data?.total ?? 0);

      if (total === 0) {
        console.log(`⚠️  No records for ${dateStr}`);
        continue;
      }

      console.log(`✅ ${total} records available for ${dateStr} — fetching all pages in parallel…`);

      // ── Step 2: Fetch all pages in parallel (page size = 2000) ─────────
      const PAGE_SIZE = 2000;
      const numPages = Math.ceil(total / PAGE_SIZE);
      const offsets  = Array.from({ length: numPages }, (_, i) => i * PAGE_SIZE);

      const pageRequests = offsets.map(offset => {
        const p = new URLSearchParams({
          "api-key": apiKey,
          format:    "json",
          limit:     String(PAGE_SIZE),
          offset:    String(offset),
          "filters[arrival_date]": dateStr,
        });
        return axios.get(`${BASE_URL}?${p}`, { timeout: 30000 })
          .then(r => r.data?.records ?? [])
          .catch(e => {
            console.error(`❌ Page offset=${offset} failed: ${e.message}`);
            return [];
          });
      });

      const pagesResults = await Promise.all(pageRequests);
      const allRecords   = pagesResults.flat();
      console.log(`📦 Fetched ${allRecords.length} total records for ${dateStr}`);

      // ── Step 3: Filter to tracked commodities ──────────────────────────
      const filtered = allRecords
        .filter(r => TRACKED_COMMODITIES.has(r.commodity ?? r.Commodity))
        .map(mapRecord);

      if (filtered.length === 0) {
        console.log(`⚠️  0 tracked commodities in ${allRecords.length} records — returning all`);
        return allRecords.map(mapRecord);
      }

      // ── Step 4: Deduplicate: one record per (ticker + market) pair ──────
      const seen = new Set();
      const unique = filtered.filter(item => {
        const key = `${item.ticker}||${item.market}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });

      console.log(`📊 Returning ${unique.length} unique records for ${filtered.length} matched entries (${dateStr})`);
      return unique;

    } catch (error) {
      console.error(`❌ Error fetching for ${dateStr}: ${error.message}`);
    }
  }

  console.warn("⚠️  All date attempts failed — frontend will use static fallback");
  return [];
}


export default fetchMarketData;
