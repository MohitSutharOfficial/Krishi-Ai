import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaHome, FaStore, FaSeedling, FaCloudSun, FaUser } from 'react-icons/fa';

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const tabs = [
    { label: t('home'), icon: FaHome, path: '/' },
    { label: t('market'), icon: FaStore, path: '/farmermarketplace' },
    { label: t('crop_ai', 'Crop AI'), icon: FaSeedling, path: '/croppredict', primary: true },
    { label: t('weather'), icon: FaCloudSun, path: '/weather' },
    { label: t('profile'), icon: FaUser, path: '/profile' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-gray-200"
      style={{ minHeight: '56px', boxShadow: '0 -2px 10px rgba(0,0,0,0.08)' }}
    >
      <div className="flex items-end justify-around px-1 pt-1 pb-1.5">
        {tabs.map((tab) => {
          const active = isActive(tab.path);
          const Icon = tab.icon;

          if (tab.primary) {
            return (
              <button
                key={tab.path}
                onClick={() => navigate(tab.path)}
                className="flex flex-col items-center justify-center -mt-5 focus:outline-none"
              >
                <div
                  className={`flex items-center justify-center w-14 h-14 rounded-full bg-golden shadow-lg border-4 border-white ${
                    active ? 'ring-2 ring-golden-light' : ''
                  }`}
                >
                  <Icon className="text-white" size={24} />
                </div>
                <span
                  className={`mt-0.5 font-medium ${active ? 'text-golden' : 'text-gray-500'}`}
                  style={{ fontSize: '12px' }}
                >
                  {tab.label}
                </span>
              </button>
            );
          }

          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className="flex flex-col items-center justify-center py-1 flex-1 focus:outline-none"
            >
              <Icon className={active ? 'text-golden' : 'text-gray-500'} size={24} />
              <span
                className={`mt-0.5 ${active ? 'text-golden font-medium' : 'text-gray-500'}`}
                style={{ fontSize: '12px' }}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
