import React from 'react';
import { Typewriter } from 'react-simple-typewriter';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaSeedling, FaStore, FaCloudSun, FaBug, FaTint, FaRobot } from 'react-icons/fa';
import { useAuthContext } from '../context/AuthContext';

const featureTiles = [
  { icon: FaSeedling, label: 'freeVirtualSoilCheck', path: '/croppredict', color: 'bg-green-600' },
  { icon: FaBug, label: 'Plant Diseases Detection', path: '/disease', color: 'bg-[#D62828]' },
  { icon: FaCloudSun, label: 'weather_title', path: '/weather', color: 'bg-[#48CAE4]' },
  { icon: FaStore, label: 'marketplaceTitle', path: '/farmermarketplace', color: 'bg-[#8B5E3C]' },
  { icon: FaTint, label: 'Smart Irrigation System', path: '/rainfall', color: 'bg-[#0096C7]' },
  { icon: FaRobot, label: 'crop_recommendation', path: '/crops', color: 'bg-[#F4A300]' },
];

function Hero() {
  const { t } = useTranslation();
  const { authUser } = useAuthContext();

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#FEFAE0] to-green-100">
      {/* Decorative background circles */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-green-400/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#F4A300]/10 rounded-full blur-3xl"></div>

      {/* Content container */}
      <div className="relative pt-24 sm:pt-32 pb-16 px-4 sm:px-6 lg:px-8 z-10">
        <div className="max-w-5xl mx-auto">
          {/* Greeting */}
          <div className="text-center mb-8">
            <h2 className="text-xl sm:text-2xl text-green-700 font-semibold mb-2">
              {authUser ? `🙏 ${t('heroTitle')}, ${authUser.name}!` : `🙏 ${t('heroTitle')}`}
            </h2>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-green-900 mb-4 tracking-tight">
              <span className="text-[#F4A300]">
                <Typewriter
                  words={t('heroSubtitles', { returnObjects: true })}
                  loop={true}
                  cursor
                  cursorStyle='|'
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={1000}
                />
              </span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {t('heroDescription')}
            </p>
          </div>

          {/* Feature Tiles Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-2xl mx-auto mb-10">
            {featureTiles.map((tile) => (
              <Link
                key={tile.path}
                to={tile.path}
                className="group flex flex-col items-center justify-center p-5 sm:p-6 bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 min-h-[140px] border border-green-100"
              >
                <div className={`${tile.color} text-white rounded-full p-4 mb-3 group-hover:scale-110 transition-transform`}>
                  <tile.icon className="w-7 h-7" />
                </div>
                <span className="text-sm sm:text-base font-bold text-gray-800 text-center leading-tight">
                  {t(tile.label)}
                </span>
              </Link>
            ))}
          </div>

          {/* Social proof */}
          <div className="text-center text-gray-500 text-sm sm:text-base">
            {t('joinThousands')}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
