import axios from "axios";

const RESOURCE_ID = "35985678-0d79-46b4-9ed6-6f13308a1d24";
const BASE_URL = `https://api.data.gov.in/resource/${RESOURCE_ID}`;

// All tracked commodities — must match EXACT Agmarknet commodity names
const TRACKED_COMMODITIES = new Set([
  // Grains
  "Wheat", "Rice", "Maize", "Jowar(Sorghum)", "Paddy(Dhan)(Common)",
  "Bajra(Pearl Millet)", "Ragi (Finger Millet)", "Barley",
  // Pulses
  "Bengal Gram(Gram)(Whole)", "Black Gram (Urd Beans)(Whole)",
  "Green Gram (Moong)(Whole)", "Lentil (Masur)(Whole)",
  "Pigeon Pea (Arhar/Tur)(Whole)", "Horse Gram", "Peas Wet",
  // Oilseeds
  "Groundnut", "Sesamum(Sesame,Gingelly,Til)", "Mustard", "Soyabean",
  "Sunflower Seed", "Castor Seed", "Linseed", "Safflower",
  // Vegetables
  "Onion", "Potato", "Tomato", "Brinjal", "Cabbage",
  "Cauliflower", "Capsicum", "Green Chilli", "Ladies Finger",
  "Drumstick", "Bitter Gourd", "Bottle Gourd", "Pumpkin",
  "Radish", "Carrot", "Spinach", "Cucumber", "Garlic",
  // Fruits
  "Apple", "Orange", "Banana", "Mango", "Pineapple", "Grapes",
  "Papaya", "Pomegranate", "Watermelon", "Guava",
  "Lemon", "Coconut", "Jack Fruit", "Kinnow",
  // Spices
  "Turmeric", "Dry Chillies", "Cumin(Jeera)", "Coriander (Dhaniya)",
  "Ginger (Dry)", "Black Pepper", "Cardamom", "Fenugreek Seed (Methi)",
  // Cash Crops
  "Cotton(Lint)", "Sugarcane", "Jute", "Tobacco",
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
function mapRecord(record) {
  const modal = parseFloat(record.Modal_Price) || 0;
  const min   = parseFloat(record.Min_Price)   || 0;
  const max   = parseFloat(record.Max_Price)   || 0;

  // Parse arrival date: dd/MM/yyyy or dd-MM-yyyy → YYYY-MM-DD
  let dateStr = "";
  if (record.Arrival_Date) {
    const raw   = record.Arrival_Date.replace(/\\/g, "/").replace(/-/g, "/");
    const parts = raw.split("/");
    if (parts.length === 3) {
      dateStr = `${parts[2]}-${parts[1]}-${parts[0]}`;
    }
  }

  return {
    ticker:   record.Commodity,
    market:   record.Variety && record.Variety !== "Other"
              ? `${record.Market} (${record.Variety})`
              : record.Market,
    state:    record.State    || "",
    district: record.District || "",
    grade:    record.Grade    || "",
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
      const params = new URLSearchParams({
        "api-key": apiKey,
        format:    "json",
        limit:     "2000",          // fetch more rows to cover all commodities
        "filters[Arrival_Date]": dateStr,
      });

      const { data } = await axios.get(`${BASE_URL}?${params}`, { timeout: 20000 });

      if (!data || !data.records || data.records.length === 0) {
        console.log(`⚠️  No records for ${dateStr}`);
        continue;
      }

      console.log(`✅ Got ${data.records.length} total records for ${dateStr}`);

      // Filter to only our tracked commodities
      const filtered = data.records
        .filter(r => TRACKED_COMMODITIES.has(r.Commodity))
        .map(mapRecord);

      if (filtered.length === 0) {
        // Data exists for this date but none of our commodities — return all mapped
        console.log(`⚠️  0 tracked commodities in ${data.records.length} records — returning all`);
        return data.records.map(mapRecord);
      }

      // Deduplicate: keep one record per (ticker + market) pair
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
