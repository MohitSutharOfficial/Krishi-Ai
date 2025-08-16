import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import { useTranslation } from 'react-i18next';

export default function Form() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    location: '',
    expertise: '',
    cropType: '',
    irrigationMethod: '',
    pesticideUsage: '',
    fertilizerUsage: '',
    farmSize: '',
    extraData: '',
  });

  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/results');
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FEFAE0] text-gray-600">
      {/* Navbar at the top */}
      

      {/* Main content */}
      <main className="flex-grow flex items-center justify-center py-8 mt-16"> {/* Added mt-16 */}
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg border border-green-700"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-green-500">
            {t('farmer_input_form')}
          </h2>

          {/* Location Field */}
          <div className="mb-4">
            <label className="block text-green-400 font-medium mb-2" htmlFor="location">
              {t('location')}
            </label>
            <input
              type="text"
              name="location"
              id="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-green-50 text-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder={t('enter_location')}
            />
          </div>

          {/* Expertise Field */}
          <div className="mb-4">
            <label className="block text-green-400 font-medium mb-2" htmlFor="expertise">
              {t('expertise_farming')}
            </label>
            <select
              name="expertise"
              id="expertise"
              value={formData.expertise}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-green-50 text-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">{t('select_expertise')}</option>
              <option value="Beginner">{t('beginner')}</option>
              <option value="Intermediate">{t('intermediate')}</option>
              <option value="Expert">{t('expert_level')}</option>
            </select>
          </div>

          {/* Crop Type Field */}
          <div className="mb-4">
            <label className="block text-green-400 font-medium mb-2" htmlFor="cropType">
              {t('crop_type')}
            </label>
            <input
              type="text"
              name="cropType"
              id="cropType"
              value={formData.cropType}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-green-50 text-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder={t('enter_crop_type')}
            />
          </div>

          {/* Irrigation Method Field */}
          <div className="mb-4">
            <label className="block text-green-400 font-medium mb-2" htmlFor="irrigationMethod">
              {t('irrigation_method')}
            </label>
            <select
              name="irrigationMethod"
              id="irrigationMethod"
              value={formData.irrigationMethod}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-green-50 text-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">{t('select_irrigation')}</option>
              <option value="Drip">{t('drip')}</option>
              <option value="Sprinkler">{t('sprinkler_method')}</option>
              <option value="Surface">{t('surface')}</option>
            </select>
          </div>

          {/* Pesticide Usage Field */}
          <div className="mb-4">
            <label className="block text-green-400 font-medium mb-2" htmlFor="pesticideUsage">
              {t('pesticide_usage')}
            </label>
            <input
              type="text"
              name="pesticideUsage"
              id="pesticideUsage"
              value={formData.pesticideUsage}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-green-50 text-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your pesticide usage"
            />
          </div>

          {/* Fertilizer Usage Field */}
          <div className="mb-4">
            <label className="block text-green-400 font-medium mb-2" htmlFor="fertilizerUsage">
              {t('fertilizer_usage')}
            </label>
            <input
              type="text"
              name="fertilizerUsage"
              id="fertilizerUsage"
              value={formData.fertilizerUsage}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-green-50 text-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your fertilizer usage"
            />
          </div>

          {/* Farm Size Field */}
          <div className="mb-4">
            <label className="block text-green-400 font-medium mb-2" htmlFor="farmSize">
              {t('farm_size')}
            </label>
            <input
              type="text"
              name="farmSize"
              id="farmSize"
              value={formData.farmSize}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-green-50 text-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter the size of your farm"
            />
          </div>

          {/* Additional Information Field */}
          <div className="mb-4">
            <label className="block text-green-400 font-medium mb-2" htmlFor="extraData">
              {t('additional_info')}
            </label>
            <textarea
              name="extraData"
              id="extraData"
              value={formData.extraData}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-green-50 text-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter any additional information"
              rows="4"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-green-600 text-neutral-100 rounded hover:bg-green-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {t('submit')}
          </button>
        </form>
      </main>
    </div>
  );
}
