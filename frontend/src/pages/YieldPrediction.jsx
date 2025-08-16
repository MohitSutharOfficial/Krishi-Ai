import React, { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import {
  FaLeaf,
  FaCloudRain,
  FaMapMarkerAlt,
  FaFlask,
  FaCalendarAlt,
  FaSeedling,
  FaChartLine,
} from "react-icons/fa";
import { MdOutlinePestControl } from "react-icons/md";
import { useTranslation } from "react-i18next";

// Data Lists
const states = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

const seasons = ["Autumn", "Kharif", "Rabi", "Summer", "Whole Year", "Winter"];

const crops = [
  "Apple",
  "Banana",
  "Blackgram",
  "Chickpea",
  "Coconut",
  "Coffee",
  "Cotton",
  "Grapes",
  "Groundnut",
  "Jute",
  "Kidneybeans",
  "Lentil",
  "Maize",
  "Mango",
  "Mothbeans",
  "Mungbean",
  "Muskmelon",
  "Orange",
  "Papaya",
  "Pigeonpeas",
  "Pomegranate",
  "Rice",
  "Sugarcane",
  "Tea",
  "Tobacco",
  "Watermelon",
  "Wheat",
];
// --- FIX: Define Components OUTSIDE ---

const InputField = ({
  label,
  name,
  type = "number",
  icon: Icon,
  placeholder,
  value,
  onChange,
}) => (
  <div className="flex flex-col space-y-2">
    <label className="text-sm font-medium text-gray-600">{label}</label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Icon className="text-green-500" />
      </div>
      <input
        type={type}
        name={name}
        value={value} // Passed from parent
        onChange={onChange} // Passed from parent
        placeholder={placeholder}
        className="w-full bg-green-50/50 border border-green-200 text-gray-800 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block pl-10 p-2.5 placeholder-gray-500 transition-all"
        required
      />
    </div>
  </div>
);

const SelectField = ({
  label,
  name,
  icon: Icon,
  options,
  defaultText,
  value,
  onChange,
}) => (
  <div className="flex flex-col space-y-2">
    <label className="text-sm font-medium text-gray-600">{label}</label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Icon className="text-green-500" />
      </div>
      <select
        name={name}
        value={value} // Passed from parent
        onChange={onChange} // Passed from parent
        className="w-full bg-green-50/50 border border-green-200 text-gray-800 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block pl-10 p-2.5 appearance-none transition-all"
        required
      >
        <option value="" className="text-gray-500">
          {defaultText}
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt} className="bg-white text-gray-800">
            {opt}
          </option>
        ))}
      </select>
    </div>
  </div>
);

const YieldPrediction = () => {
  const { t } = useTranslation();
  const { ML_BACKEND_URL } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const [formData, setFormData] = useState({
    State: "",
    Crop: "",
    Season: "",
    Crop_Year: new Date().getFullYear(),
    Area: "",
    Annual_Rainfall: "",
    Fertilizer: "",
    Pesticide: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    // Basic Validation
    if (!formData.State || !formData.Crop || !formData.Season) {
      toast.error(t('select_state_crop_season'));
      setLoading(false); // Stop loading if validation fails
      return;
    }

    try {
      const response = await fetch(`${ML_BACKEND_URL}/api/predict/yield`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (response.ok) {
        setResult(data);
        toast.success(t('yield_predicted'));
      } else {
        toast.error(data.error || t('prediction_failed'));
      }
    } catch (error) {
      console.error(error);
      toast.error(t('server_connection_failed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#FEFAE0] min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            <span className="text-green-500">{t('smart_yield_estimator')}</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Leverage advanced AI to forecast crop production based on regional
            climate, soil inputs, and historical data.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2 bg-white border border-green-200 rounded-xl p-6 shadow-xl">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 border-b border-green-200 pb-3">
              {t('production_parameters')}
            </h2>
            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
              {/* Dropdowns */}
              <SelectField
                label={t('state')}
                name="State"
                icon={FaMapMarkerAlt}
                options={states}
                defaultText="Select State"
                value={formData.State}
                onChange={handleChange}
              />
              <SelectField
                label={t('crop_type')}
                name="Crop"
                icon={FaSeedling}
                options={crops}
                defaultText="Select Crop"
                value={formData.Crop}
                onChange={handleChange}
              />
              <SelectField
                label={t('season')}
                name="Season"
                icon={FaCloudRain}
                options={seasons}
                defaultText="Select Season"
                value={formData.Season}
                onChange={handleChange}
              />

              {/* Numeric Inputs */}
              <InputField
                label={t('crop_year')}
                name="Crop_Year"
                icon={FaCalendarAlt}
                placeholder="e.g. 2025"
                value={formData.Crop_Year}
                onChange={handleChange}
              />

              <InputField
                label={t('area_hectares')}
                name="Area"
                icon={FaMapMarkerAlt}
                placeholder="e.g. 73814"
                value={formData.Area}
                onChange={handleChange}
              />

              <div className="md:col-span-2 border-t border-green-200 my-2"></div>

              <InputField
                label={t('annual_rainfall')}
                name="Annual_Rainfall"
                icon={FaCloudRain}
                placeholder="e.g. 850"
                value={formData.Annual_Rainfall}
                onChange={handleChange}
              />
              <InputField
                label={t('fertilizer_kg')}
                name="Fertilizer"
                icon={FaFlask}
                placeholder="e.g. 120"
                value={formData.Fertilizer}
                onChange={handleChange}
              />
              <InputField
                label={t('pesticide_kg')}
                name="Pesticide"
                icon={MdOutlinePestControl}
                placeholder="e.g. 30"
                value={formData.Pesticide}
                onChange={handleChange}
              />

              {/* Submit Button */}
              <div className="md:col-span-2 mt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 text-white font-bold py-3 px-4 rounded-lg shadow-lg transform transition hover:scale-[1.01] flex justify-center items-center"
                >
                  {loading ? (
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 1 1 16 0A8 8 0 0 1 4 12z"
                      ></path>
                    </svg>
                  ) : (
                    <>
                      <FaChartLine className="mr-2" /> {t('predict_yield')}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Result Section */}
          <div className="lg:col-span-1">
            {result ? (
              <div className="bg-white border-2 border-green-600/50 rounded-xl p-6 shadow-2xl h-full flex flex-col animate-slide-up-1">
                <div className="text-center mb-6">
                  <div className="w-24 h-24 mx-auto bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                    <FaChartLine className="text-5xl text-green-500" />
                  </div>
                  <h3 className="text-gray-500 uppercase tracking-wider text-sm mb-1">
                    {t('estimated_yield')}
                  </h3>
                  <h2 className="text-4xl font-bold text-gray-800">
                    {result.predicted_yield} Ton
                  </h2>
                  <p className="text-green-400 font-medium text-sm mt-1">
                    {t('production_units')}
                  </p>
                </div>

                <div className="flex-grow space-y-4">
                  <div className="bg-green-50/50 p-4 rounded-lg">
                    <h4 className="text-green-400 font-medium mb-1">
                      {t('configuration_label')}
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Prediction based on <strong>{formData.Season}</strong>{" "}
                      season in <strong>{formData.State}</strong>.
                    </p>
                  </div>
                  <div className="bg-green-50/50 p-4 rounded-lg">
                    <h4 className="text-green-400 font-medium mb-1">{t('inputs_label')}</h4>
                    <ul className="text-gray-600 text-sm list-disc list-inside">
                      <li>Area: {formData.Area} Hectares</li>
                      <li>Rainfall: {formData.Annual_Rainfall} mm</li>
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white border border-green-200 rounded-xl p-6 shadow-lg h-full flex flex-col items-center justify-center text-center opacity-70">
                <FaLeaf className="text-6xl text-gray-600 mb-4" />
                <p className="text-gray-500">
                  Fill the form parameters to generate a production forecast.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default YieldPrediction;
