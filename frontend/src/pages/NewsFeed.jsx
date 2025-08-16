import React, { useState, useEffect, useRef } from 'react';
import Data from '../data/news.json';
import { useAuthContext } from '../context/AuthContext';
import { FaSearch, FaCalendarAlt, FaExternalLinkAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const NewsFeed = () => {
  const { t } = useTranslation();
  const { BACKEND_URL } = useAuthContext();
  const [newsData, setNewsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredNews, setFilteredNews] = useState([]);
  const topRef = useRef(null);
  // Fetch news data from backend scraper, fall back to static JSON
  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/news`, { method: 'POST' });
        if (!response.ok) throw new Error('API request failed');
        const scraped = await response.json();
        if (!Array.isArray(scraped) || scraped.length === 0) throw new Error('No news from scraper');
        // Map scraper fields { href, text, imgSrc } to the format the UI expects
        const data = scraped.map(item => ({
          title: item.text,
          link: item.href,
          photo_url: item.imgSrc,
          snippet: item.text,
          source_name: 'LiveMint',
          published_datetime_utc: new Date().toISOString()
        }));
        setNewsData(data);
        setFilteredNews(data);
      } catch (err) {
        console.warn('News API unavailable, using static data:', err.message);
        const data = Data || [];
        setNewsData(data);
        setFilteredNews(data);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsData();
  }, [BACKEND_URL]);

  // Filter news data based on search term
  useEffect(() => {
    if (!newsData) return;

    const filtered = searchTerm.trim() === ''
      ? newsData
      : newsData.filter(item =>
        (item.title && item.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.snippet && item.snippet.toLowerCase().includes(searchTerm.toLowerCase()))
      );

    setFilteredNews(filtered);
  }, [newsData, searchTerm]);

  const loadMore = (value) => {
    setLimit(limit + value);
    // Scroll to top of news feed when changing pages
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setLimit(10); // Reset to first page when searching
  }
  return (
    <div className="bg-[#FEFAE0] min-h-screen flex flex-col">
      <div className="pt-20 max-w-7xl mx-auto my-6 px-3 md:px-5 lg:px-6 w-full">
        <div ref={topRef} className="mb-8">
          <h1 className="text-3xl font-bold mb-4 text-center text-green-500 transition duration-500 ease-in-out transform hover:scale-105">
            {t('news_feed_title')}
          </h1>

          {/* Search bar */}
          <div className="relative max-w-sm mx-auto mb-6">
            <input
              type="text"
              placeholder={t('search_news_placeholder')}
              value={searchTerm}
              onChange={handleSearch}
              className="w-full bg-white text-gray-800 border border-green-200 rounded-lg py-2 px-4 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col justify-center items-center h-64">
            <div className="w-20 h-20 border-4 border-green-500 border-opacity-50 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-green-400 animate-pulse">{t('loading_news')}</p>
          </div>
        ) : error ? (
          <div className="bg-red-900 bg-opacity-20 border border-red-500 rounded-lg p-6 text-center">
            <p className="text-red-500 text-lg">{error}</p>
            <p className="text-gray-600 mt-2">{t('try_again_later')}</p>
          </div>
        ) : (
          <>
            {filteredNews.length === 0 ? (
              <div className="bg-white rounded-lg p-8 text-center">
                <p className="text-xl text-gray-600">{t('no_news_matching')} "{searchTerm}"</p>
                <button
                  onClick={() => setSearchTerm('')}
                  className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors duration-300"
                >
                  {t('clear_search')}
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredNews && filteredNews.length > 0 && filteredNews.slice(Math.max(0, limit - 10), Math.min(limit, filteredNews.length)).map((item, index) => (
                    <div
                      key={index}
                      className="bg-white border border-green-200 shadow-lg rounded-lg overflow-hidden flex flex-col h-full transition duration-300 ease-in-out transform hover:scale-[1.02] hover:shadow-xl hover:border-green-500"
                    >
                      <div className="relative h-36 overflow-hidden">
                        <img
                          src={item.photo_url}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://placehold.co/600x400/333/green?text=Agriculture+News";
                          }}
                        />
                      </div>
                      <div className="flex-grow p-3">
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-gray-800 hover:text-green-300 group"
                        >
                          <h2 className="text-base font-semibold mb-2 text-green-400 group-hover:text-green-300 line-clamp-2">
                            {item.title}
                          </h2>
                          <div className="flex items-center text-gray-500 text-xs mb-2">
                            <FaCalendarAlt className="mr-1" />
                            <span>{item.published_datetime_utc ? new Date(item.published_datetime_utc).toLocaleDateString() : t('unknown_date')}</span>
                          </div>
                          <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                            {item.snippet}
                          </p>
                          <div className="flex justify-between items-center mt-1">
                            <p className="text-gray-500 text-xs">
                              {item.source_name || t('unknown_source')}
                            </p>
                            <span className="text-green-400 text-xs flex items-center group-hover:text-green-300">
                              {t('read_more')} <FaExternalLinkAlt className="ml-1 h-3 w-3" />
                            </span>
                          </div>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination controls */}
                <div className="flex justify-between items-center sticky bottom-3 p-2 backdrop-blur-md bg-[#FEFAE0] bg-opacity-80 border border-green-200 rounded-full shadow-lg max-w-xs mx-auto">
                  <button
                    className={`flex items-center justify-center bg-white hover:bg-green-700 text-gray-800 hover:text-white px-2 py-1 rounded-full transition-all duration-300 ${!filteredNews || limit <= 10 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
                    disabled={!filteredNews || limit <= 10}
                    onClick={() => loadMore(-10)}
                  >
                    <FaChevronLeft className="mr-1" /> <span className="text-xs">{t('prev_page')}</span>
                  </button>
                  <span className="text-gray-600 text-xs">
                    {Math.ceil(limit / 10)} / {filteredNews && filteredNews.length > 0 ? Math.ceil(filteredNews.length / 10) : 1}
                  </span>
                  <button
                    className={`flex items-center justify-center bg-white hover:bg-green-700 text-gray-800 hover:text-white px-2 py-1 rounded-full transition-all duration-300 ${!filteredNews || limit >= filteredNews.length ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
                    disabled={!filteredNews || limit >= filteredNews.length}
                    onClick={() => loadMore(10)}
                  >
                    <span className="text-xs">{t('next_page')}</span> <FaChevronRight className="ml-1" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default NewsFeed;
