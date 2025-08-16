import React from 'react';
import { useTranslation } from 'react-i18next';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { FaLeaf, FaFlask, FaSeedling, FaInfoCircle } from 'react-icons/fa';

// Register Chart.js components
Chart.register(...registerables);

// Data for bar charts
const nutritionData = {
  labels: ['Nitrogen', 'Phosphorus', 'Potassium', 'Calcium', 'Magnesium', 'Sulfur', 'Iron', 'Manganese', 'Zinc'],
  datasets: [
    {
      label: 'Nutrient Level (%)',
      data: [1.2, 0.8, 1.5, 2.3, 0.5, 0.4, 0.1, 0.05, 0.02],
      backgroundColor: 'rgba(34, 197, 94, 0.5)',
      borderColor: 'rgba(34, 197, 94, 1)',
      borderWidth: 1,
    },
  ],
};

const pieData = {
  labels: ['Nitrogen', 'Phosphorus', 'Potassium', 'Calcium', 'Magnesium', 'Sulfur', 'Iron', 'Manganese', 'Zinc'],
  datasets: [
    {
      data: [1.2, 0.8, 1.5, 2.3, 0.5, 0.4, 0.1, 0.05, 0.02],
      backgroundColor: [
        'rgba(34, 197, 94, 0.6)',
        'rgba(129, 199, 132, 0.6)',
        'rgba(73, 209, 142, 0.6)',
        'rgba(34, 197, 94, 0.6)',
        'rgba(129, 199, 132, 0.6)',
        'rgba(73, 209, 142, 0.6)',
        'rgba(34, 197, 94, 0.6)',
        'rgba(129, 199, 132, 0.6)',
        'rgba(73, 209, 142, 0.6)',
      ],
      borderColor: 'rgba(34, 197, 94, 1)',
      borderWidth: 1,
    },
  ],
};

// Define soilData and cropRecommendations within the component
const soilData = {
  nutrition: {
    nitrogen: '1.2%',
    phosphorus: '0.8%',
    potassium: '1.5%',
    calcium: '2.3%',
    magnesium: '0.5%',
    sulfur: '0.4%',
    iron: '0.1%',
    manganese: '0.05%',
    zinc: '0.02%',
  },
  pH: '6.8',
  texture: 'Loamy',
  moisture: '15%',
  organicMatter: '3.5%',
  textureDepth: '30 cm',
};

const cropRecommendations = [
  {
    crop: 'Corn',
    season: 'Summer',
    return: 'High',
    idealConditions: 'Warm weather, full sun',
    commonDiseases: 'Corn blight, rust',
    requiredNutrients: 'Nitrogen, Potassium',
  },
  {
    crop: 'Wheat',
    season: 'Winter',
    return: 'Medium',
    idealConditions: 'Cool weather, moderate moisture',
    commonDiseases: 'Wheat rust, powdery mildew',
    requiredNutrients: 'Phosphorus, Potassium',
  },
  {
    crop: 'Tomatoes',
    season: 'Spring',
    return: 'High',
    idealConditions: 'Warm weather, full sun',
    commonDiseases: 'Blight, blossom end rot',
    requiredNutrients: 'Nitrogen, Calcium',
  },
];

const Result = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col min-h-screen bg-[#FEFAE0] text-gray-600">
       {/* Add Navbar here */}

      <header className="bg-white py-4 shadow-md pt-24">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl font-bold text-green-500">{t('soil_results_title')}</h1>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-8">
        {/* Soil Data Section */}
        <section className="bg-white p-6 rounded-lg shadow-lg border border-green-700 mb-8 min-h-[500px]"> {/* Increased height here */}
          <h2 className="text-2xl font-bold text-green-500 mb-4">{t('soil_data')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-green-400 mb-2 flex items-center">
                <FaLeaf className="mr-2" /> {t('nutrition_content')}
              </h3>
              <div className="mb-4">
                <Bar
                  data={nutritionData}
                  options={{
                    responsive: true,
                    scales: {
                      x: {
                        beginAtZero: true,
                      },
                      y: {
                        beginAtZero: true,
                        ticks: {
                          callback: (value) => `${value}%`,
                        },
                      },
                    },
                    plugins: {
                      legend: {
                        display: false,
                      },
                    },
                  }}
                />
              </div>
              <h3 className="text-lg font-semibold text-green-400 mb-2 flex items-center">
                <FaInfoCircle className="mr-2" /> {t('nutrient_proportions')}
              </h3>
              <div className="flex justify-center mb-4">
                <div className="flex justify-center items-center">
                  <Pie
                    data={pieData}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          position: 'bottom',
                        },
                      },
                    }}
                  />
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-green-400 mb-2 flex items-center">
                <FaFlask className="mr-2" /> {t('soil_parameters')}
              </h3>
              <div className="h-[300px] text-lg"> {/* Increased height and font size */}
                <p className="mb-2"><strong>{t('ph_label')}:</strong> {soilData.pH}</p>
                <p className="mb-2"><strong>{t('texture')}:</strong> {soilData.texture}</p>
                <p className="mb-2"><strong>{t('moisture')}:</strong> {soilData.moisture}</p>
                <p className="mb-2"><strong>{t('organic_matter')}:</strong> {soilData.organicMatter}</p>
                <p><strong>{t('texture_depth')}:</strong> {soilData.textureDepth}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Crop Recommendations Section */}
        <section className="bg-white p-6 rounded-lg shadow-lg border border-green-700">
          <h2 className="text-2xl font-bold text-green-500 mb-4">{t('cropRecommendationsTitle')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cropRecommendations.map((recommendation, index) => (
              <div key={index} className="bg-green-50 p-6 rounded-lg shadow-md flex flex-col items-center">
                <FaSeedling className="text-4xl text-green-400 mb-2" />
                <h3 className="text-lg font-semibold text-green-400 mb-2">{recommendation.crop}</h3>
                <p className="mb-2"><strong>{t('season')}:</strong> {recommendation.season}</p>
                <p className="mb-2"><strong>{t('expected_return')}:</strong> {recommendation.return}</p>
                <p className="mb-2"><strong>{t('ideal_conditions')}:</strong> {recommendation.idealConditions}</p>
                <p className="mb-2"><strong>{t('common_diseases')}:</strong> {recommendation.commonDiseases}</p>
                <p><strong>{t('required_nutrients')}:</strong> {recommendation.requiredNutrients}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Result;
