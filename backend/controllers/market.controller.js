import fetchMarketData from "../scraper/scrapeMarketData.js";

// ── In-memory cache (30-minute TTL) ─────────────────────────────────────────
// Prevents the heavy multi-page scrape from running on every request
let _cache = null;
let _cacheTime = 0;
const CACHE_TTL_MS = 30 * 60 * 1000; // 30 minutes

export const getMarketData = async (req, res) => {
  try {
    const now = Date.now();

    // Return cached result if still fresh
    if (_cache && (now - _cacheTime) < CACHE_TTL_MS) {
      console.log(`📦 Serving cached market data (${_cache.length} records, age: ${Math.round((now - _cacheTime) / 1000)}s)`);
      return res.status(200).json({ marketData: _cache });
    }

    // Fetch fresh data
    const marketData = await fetchMarketData();

    if (marketData && marketData.length > 0) {
      _cache = marketData;
      _cacheTime = now;
      console.log(`✅ Cache updated: ${marketData.length} records`);
      return res.status(200).json({ marketData });
    }

    // If live fetch returned nothing, serve stale cache if available
    if (_cache) {
      console.warn("⚠️  Live fetch empty — serving stale cache");
      return res.status(200).json({ marketData: _cache });
    }

    return res.status(500).json({ error: "Error in fetching realtime market data" });
  } catch (err) {
    console.error("Error in market route:", err.message);

    // Serve stale cache on error rather than failing completely
    if (_cache) {
      return res.status(200).json({ marketData: _cache });
    }

    res.status(500).json({ error: "Internal Server Error" });
  }
};