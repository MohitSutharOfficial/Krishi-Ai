import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

import User from './models/user.model.js';
import Product from './models/Product.model.js';
import Chat from './models/Chat.model.js';
import Contact from './models/Contact.model.js';
import GovtScheme from './models/GovtScheme.model.js';
import LandRecord from './models/LandRecord.model.js';
import MLHistory from './models/MLHistory.model.js';
import Post from './models/UserCommunity.model.js';
import WaterSource from './models/WaterSource.model.js';
import WaterRequest from './models/WaterRequest.model.js';
import Allocation from './models/Allocation.model.js';

dotenv.config();

// ─── HELPER FUNCTIONS ────────────────────────────────────────────────

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const randFloat = (min, max, dec = 2) => +(Math.random() * (max - min) + min).toFixed(dec);

// ─── STATIC DATA ─────────────────────────────────────────────────────

const INDIAN_STATES = [
    'Rajasthan', 'Maharashtra', 'Punjab', 'Uttar Pradesh', 'Madhya Pradesh',
    'Gujarat', 'Haryana', 'Karnataka', 'Tamil Nadu', 'Andhra Pradesh',
    'Bihar', 'West Bengal', 'Telangana', 'Odisha', 'Kerala',
    'Chhattisgarh', 'Jharkhand', 'Assam', 'Himachal Pradesh', 'Uttarakhand'
];

const DISTRICTS_BY_STATE = {
    'Rajasthan': ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota', 'Ajmer', 'Bikaner', 'Sikar', 'Nagaur', 'Alwar', 'Bharatpur'],
    'Maharashtra': ['Pune', 'Nashik', 'Nagpur', 'Kolhapur', 'Solapur', 'Aurangabad', 'Satara', 'Sangli', 'Ahmednagar', 'Jalgaon'],
    'Punjab': ['Ludhiana', 'Amritsar', 'Patiala', 'Jalandhar', 'Bathinda', 'Moga', 'Sangrur', 'Ferozepur', 'Gurdaspur', 'Kapurthala'],
    'Uttar Pradesh': ['Lucknow', 'Varanasi', 'Agra', 'Kanpur', 'Meerut', 'Bareilly', 'Gorakhpur', 'Allahabad', 'Mathura', 'Moradabad'],
    'Madhya Pradesh': ['Indore', 'Bhopal', 'Jabalpur', 'Ujjain', 'Sagar', 'Gwalior', 'Hoshangabad', 'Dewas', 'Vidisha', 'Ratlam'],
    'Gujarat': ['Ahmedabad', 'Rajkot', 'Surat', 'Vadodara', 'Junagadh', 'Bhavnagar', 'Mehsana', 'Kutch', 'Anand', 'Kheda'],
    'Haryana': ['Karnal', 'Hisar', 'Ambala', 'Sirsa', 'Rohtak', 'Panipat', 'Kurukshetra', 'Jind', 'Fatehabad', 'Kaithal'],
    'Karnataka': ['Belgaum', 'Dharwad', 'Mysore', 'Shimoga', 'Bellary', 'Raichur', 'Hassan', 'Mandya', 'Tumkur', 'Davangere'],
    'Tamil Nadu': ['Thanjavur', 'Madurai', 'Coimbatore', 'Salem', 'Tiruchirappalli', 'Tirunelveli', 'Erode', 'Dindigul', 'Vellore', 'Nagapattinam'],
    'Andhra Pradesh': ['Guntur', 'Krishna', 'East Godavari', 'West Godavari', 'Kurnool', 'Prakasam', 'Nellore', 'Chittoor', 'Anantapur', 'Visakhapatnam'],
    'Bihar': ['Patna', 'Muzaffarpur', 'Bhagalpur', 'Gaya', 'Darbhanga', 'Purnia', 'Munger', 'Rohtas', 'Vaishali', 'Samastipur'],
    'West Bengal': ['Burdwan', 'Hooghly', 'Nadia', 'Murshidabad', 'Birbhum', 'Bankura', 'Midnapore', 'Malda', 'Dinajpur', 'Cooch Behar'],
    'Telangana': ['Nizamabad', 'Karimnagar', 'Warangal', 'Medak', 'Nalgonda', 'Khammam', 'Adilabad', 'Mahbubnagar', 'Rangareddy', 'Hyderabad'],
    'Odisha': ['Sambalpur', 'Balasore', 'Cuttack', 'Puri', 'Ganjam', 'Kalahandi', 'Koraput', 'Mayurbhanj', 'Sundargarh', 'Bolangir'],
    'Kerala': ['Palakkad', 'Thrissur', 'Wayanad', 'Idukki', 'Ernakulam', 'Kottayam', 'Alappuzha', 'Kollam', 'Kannur', 'Malappuram'],
    'Chhattisgarh': ['Raipur', 'Durg', 'Bilaspur', 'Rajnandgaon', 'Korba', 'Bastar', 'Janjgir', 'Raigarh', 'Mahasamund', 'Dhamtari'],
    'Jharkhand': ['Ranchi', 'Dhanbad', 'Hazaribagh', 'Giridih', 'Dumka', 'Deoghar', 'Bokaro', 'Palamu', 'Gumla', 'Lohardaga'],
    'Assam': ['Kamrup', 'Nagaon', 'Sonitpur', 'Dibrugarh', 'Jorhat', 'Cachar', 'Goalpara', 'Barpeta', 'Darrang', 'Sivasagar'],
    'Himachal Pradesh': ['Kangra', 'Mandi', 'Shimla', 'Kullu', 'Hamirpur', 'Una', 'Solan', 'Bilaspur', 'Sirmaur', 'Chamba'],
    'Uttarakhand': ['Dehradun', 'Haridwar', 'Nainital', 'Udham Singh Nagar', 'Almora', 'Tehri', 'Pauri', 'Pithoragarh', 'Chamoli', 'Rudraprayag']
};

const CROPS = [
    'Wheat', 'Rice', 'Bajra', 'Jowar', 'Maize', 'Cotton', 'Sugarcane',
    'Turmeric', 'Mustard', 'Groundnut', 'Soybean', 'Chickpea', 'Lentil',
    'Onion', 'Potato', 'Tomato', 'Brinjal', 'Okra', 'Garlic', 'Ginger',
    'Sunflower', 'Sesame', 'Cumin', 'Coriander', 'Fenugreek'
];

const CROP_VARIETIES = {
    'Wheat': ['Lokwan', 'Sharbati', 'MP Wheat', 'Durum', 'HD-2967'],
    'Rice': ['Basmati', 'Sona Masoori', 'IR-64', 'Swarna', 'Ponni'],
    'Bajra': ['HHB-67', 'Pusa Composite', 'ICTP-8203', 'Raj-171', 'GHB-558'],
    'Jowar': ['Maldandi', 'CSV-15', 'Parbhani Moti', 'SPV-462', 'Dagdi'],
    'Maize': ['DHM-117', 'HQPM-1', 'Ganga-11', 'Navjot', 'Pusa Early'],
    'Cotton': ['Bunny', 'Brahma', 'NCS-145', 'Suraj', 'Ankur-651'],
    'Sugarcane': ['Co-238', 'CoS-767', 'Co-0238', 'CoJ-64', 'BO-91'],
    'Turmeric': ['Salem', 'Erode', 'Alleppey Finger', 'Rajapore', 'Sangli'],
    'Mustard': ['Pusa Bold', 'Varuna', 'RH-30', 'Bio-902', 'Kranti'],
    'Groundnut': ['TAG-24', 'JL-24', 'TG-37A', 'ICGS-44', 'Kadiri-6'],
    'Soybean': ['JS-335', 'NRC-7', 'JS-9560', 'MAUS-71', 'Pusa-16'],
    'Chickpea': ['JG-11', 'Pusa-256', 'KAK-2', 'Vijay', 'Rajas'],
    'Lentil': ['Pusa Vaibhav', 'IPL-316', 'HUL-57', 'Lens-4076', 'K-75'],
    'Onion': ['Nasik Red', 'Agrifound Dark Red', 'Pusa Red', 'Bellary', 'Poona Fursungi'],
    'Potato': ['Kufri Jyoti', 'Kufri Bahar', 'Kufri Pukhraj', 'Kufri Chandramukhi', 'Kufri Sindhuri'],
    'Tomato': ['Pusa Ruby', 'Arka Rakshak', 'Pusa Early Dwarf', 'Arka Vikas', 'Punjab Chhuhara'],
    'Brinjal': ['Pusa Purple Long', 'Arka Shirish', 'Punjab Sadabahar', 'Pant Rituraj', 'Pusa Kranti'],
    'Okra': ['Pusa Sawani', 'Arka Anamika', 'Parbhani Kranti', 'Punjab Padmini', 'VRO-6'],
    'Garlic': ['Yamuna Safed', 'Agrifound White', 'Godavari', 'Bhima Purple', 'Ooty-1'],
    'Ginger': ['Varada', 'Mahima', 'Rejatha', 'IISR Suprabha', 'Nadia'],
    'Sunflower': ['KBSH-44', 'Morden', 'DRSF-108', 'PAC-1091', 'Surya'],
    'Sesame': ['GT-10', 'TKG-22', 'RT-346', 'Pragati', 'Nirmala'],
    'Cumin': ['GC-4', 'RZ-19', 'RZ-209', 'Gujarat Cumin-2', 'MC-43'],
    'Coriander': ['Pant Haritma', 'RCR-41', 'Gujarat Coriander-2', 'CS-6', 'Sadhana'],
    'Fenugreek': ['Pusa Early Bunching', 'RMT-1', 'AFG-3', 'Hisar Sonali', 'Kasuri']
};

const MARKET_PRICES_INR = {
    'Wheat': { min: 1800, max: 2800 }, 'Rice': { min: 2200, max: 4500 },
    'Bajra': { min: 1500, max: 2600 }, 'Jowar': { min: 1700, max: 3200 },
    'Maize': { min: 1400, max: 2400 }, 'Cotton': { min: 5500, max: 7200 },
    'Sugarcane': { min: 280, max: 400 }, 'Turmeric': { min: 6000, max: 14000 },
    'Mustard': { min: 4200, max: 6800 }, 'Groundnut': { min: 4500, max: 6500 },
    'Soybean': { min: 3500, max: 5200 }, 'Chickpea': { min: 3800, max: 5800 },
    'Lentil': { min: 4000, max: 6200 }, 'Onion': { min: 800, max: 3500 },
    'Potato': { min: 600, max: 2200 }, 'Tomato': { min: 500, max: 4000 },
    'Brinjal': { min: 600, max: 2000 }, 'Okra': { min: 1000, max: 3000 },
    'Garlic': { min: 3000, max: 12000 }, 'Ginger': { min: 2500, max: 8000 },
    'Sunflower': { min: 4500, max: 6500 }, 'Sesame': { min: 5000, max: 9000 },
    'Cumin': { min: 12000, max: 25000 }, 'Coriander': { min: 5000, max: 9000 },
    'Fenugreek': { min: 4000, max: 7000 }
};

const DISEASES = [
    { name: 'Pepper bell Bacterial spot', crop: 'Pepper', confidence: 92 },
    { name: 'Potato Early blight', crop: 'Potato', confidence: 88 },
    { name: 'Potato Late blight', crop: 'Potato', confidence: 91 },
    { name: 'Tomato Target Spot', crop: 'Tomato', confidence: 85 },
    { name: 'Tomato Tomato mosaic virus', crop: 'Tomato', confidence: 94 },
    { name: 'Tomato YellowLeaf Curl Virus', crop: 'Tomato', confidence: 90 },
    { name: 'Tomato Bacterial spot', crop: 'Tomato', confidence: 87 },
    { name: 'Tomato Early blight', crop: 'Tomato', confidence: 89 },
    { name: 'Tomato Late blight', crop: 'Tomato', confidence: 93 },
    { name: 'Tomato Leaf mold', crop: 'Tomato', confidence: 86 },
    { name: 'Tomato Septoria leaf spot', crop: 'Tomato', confidence: 84 },
    { name: 'Tomato Spider mites Two spotted spider mite', crop: 'Tomato', confidence: 82 },
    { name: 'Leaf Blight', crop: 'Wheat', confidence: 95 },
    { name: 'Brown Rust', crop: 'Wheat', confidence: 88 },
    { name: 'Downy Mildew', crop: 'Bajra', confidence: 86 },
    { name: 'Blast', crop: 'Rice', confidence: 91 },
    { name: 'Sheath Blight', crop: 'Rice', confidence: 87 },
    { name: 'Bacterial Leaf Blight', crop: 'Rice', confidence: 89 },
    { name: 'Wilt', crop: 'Chickpea', confidence: 90 },
    { name: 'Anthracnose', crop: 'Soybean', confidence: 85 }
];

const PRODUCT_CATEGORIES = [
    'Fertilizers', 'Seeds', 'Irrigation', 'Pesticides', 'Machinery',
    'Tools', 'Software', 'Greenhouses', 'Pumps', 'Composters',
    'Weather Stations', 'Sprayers', 'Solar Panels', 'Drip Irrigation'
];

const AVATARS = [
    'https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Blank&hairColor=Black&facialHairType=Blank&clotheType=CollarSweater&clotheColor=PastelGreen&eyeType=Default&eyebrowType=Default&mouthType=Smile&skinColor=Brown',
    'https://avataaars.io/?avatarStyle=Transparent&topType=Turban&accessoriesType=Round&hatColor=Blue01&facialHairType=BeardMajestic&facialHairColor=Black&clotheType=ShirtVNeck&clotheColor=PastelRed&eyeType=Default&eyebrowType=Default&mouthType=Smile&skinColor=Brown',
    'https://avataaars.io/?avatarStyle=Transparent&topType=Hijab&accessoriesType=Blank&hatColor=PastelGreen&clotheType=BlazerSweater&eyeType=Default&eyebrowType=Default&mouthType=Smile&skinColor=Light',
    'https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairDreads01&accessoriesType=Blank&hairColor=Black&facialHairType=BeardLight&facialHairColor=Black&clotheType=Hoodie&clotheColor=PastelBlue&eyeType=Default&eyebrowType=Default&mouthType=Smile&skinColor=DarkBrown',
    'https://avataaars.io/?avatarStyle=Transparent&topType=LongHairStraight&accessoriesType=Blank&hairColor=Black&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Smile&skinColor=Brown'
];

const VILLAGES = [
    'Rampur', 'Kishanpur', 'Sitapura', 'Begas', 'Manpur', 'Jodhpur',
    'Nagaur', 'Sikar', 'Tonk', 'Bundi', 'Chittorgarh', 'Barmer',
    'Dungarpur', 'Sawai Madhopur', 'Jhunjhunu', 'Didwana', 'Ladnun',
    'Merta', 'Phalodi', 'Pokhran', 'Sujangarh', 'Neem Ka Thana'
];

const SOURCE_TYPES = ['TUBEWELL', 'CANAL-PUMP', 'SUBMERSIBLE', 'WELL', 'BOREWELL', 'TANK'];

// Approximate center coordinates for Indian states
const STATE_COORDS = {
    'Rajasthan': [26.9124, 75.7873], 'Maharashtra': [19.7515, 75.7139],
    'Punjab': [31.1471, 75.3412], 'Uttar Pradesh': [26.8467, 80.9462],
    'Madhya Pradesh': [22.9734, 78.6569], 'Gujarat': [22.2587, 71.1924],
    'Haryana': [29.0588, 76.0856], 'Karnataka': [15.3173, 75.7139],
    'Tamil Nadu': [11.1271, 78.6569], 'Andhra Pradesh': [15.9129, 79.7400],
    'Bihar': [25.0961, 85.3131], 'West Bengal': [22.9868, 87.8550],
    'Telangana': [18.1124, 79.0193], 'Odisha': [20.9517, 85.0985],
    'Kerala': [10.8505, 76.2711], 'Chhattisgarh': [21.2787, 81.8661],
    'Jharkhand': [23.6102, 85.2799], 'Assam': [26.2006, 92.9376],
    'Himachal Pradesh': [31.1048, 77.1734], 'Uttarakhand': [30.0668, 79.0193]
};

const FIRST_NAMES = [
    'Rajesh', 'Suresh', 'Mahesh', 'Ramesh', 'Dinesh', 'Priya', 'Sunita',
    'Anita', 'Kavita', 'Geeta', 'Mohan', 'Sohan', 'Ratan', 'Kisan',
    'Bhola', 'Lakshmi', 'Sita', 'Radha', 'Kamla', 'Parvati',
    'Devendra', 'Narendra', 'Vijay', 'Arun', 'Gopal', 'Meena',
    'Pratap', 'Baldev', 'Hari', 'Jagdish', 'Shanti', 'Pushpa'
];

const LAST_NAMES = [
    'Sharma', 'Verma', 'Patel', 'Singh', 'Kumar', 'Yadav', 'Jat',
    'Meena', 'Gurjar', 'Rajput', 'Choudhary', 'Kumawat', 'Saini',
    'Bishnoi', 'Soni', 'Agarwal', 'Tiwari', 'Pandey', 'Mishra',
    'Reddy', 'Naidu', 'Patil', 'Deshmukh', 'Iyer', 'Nair'
];

const GOVT_SCHEMES = [
    {
        title: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)',
        description: 'Income support of Rs.6000 per year in three equal installments to all land holding farmer families.',
        ministry: 'Ministry of Agriculture & Farmers Welfare',
        benefits: 'Rs.6000 per year directly transferred to bank account in 3 installments of Rs.2000 each.',
        criteria: { minPh: 0, maxPh: 14, targetCrop: null, targetDisease: null },
        isActive: true
    },
    {
        title: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
        description: 'Crop insurance scheme providing financial support to farmers suffering crop loss/damage due to unforeseen events.',
        ministry: 'Ministry of Agriculture & Farmers Welfare',
        benefits: 'Insurance coverage and financial support for crop loss due to natural calamities, pests & diseases.',
        criteria: { minPh: 0, maxPh: 14, targetCrop: null, targetDisease: null },
        isActive: true
    },
    {
        title: 'Soil Health Card Scheme',
        description: 'Provides soil health cards to farmers carrying crop-wise recommendations of nutrients and fertilizers.',
        ministry: 'Ministry of Agriculture & Farmers Welfare',
        benefits: 'Free soil testing and nutrient recommendations for improved crop yield.',
        criteria: { minPh: 4.5, maxPh: 8.5, targetCrop: null, targetDisease: null },
        isActive: true
    },
    {
        title: 'National Mission on Sustainable Agriculture (NMSA)',
        description: 'Promotes sustainable agriculture through climate change adaptation measures.',
        ministry: 'Ministry of Agriculture & Farmers Welfare',
        benefits: 'Subsidies for micro irrigation, organic farming, and climate-resilient practices.',
        criteria: { minPh: 0, maxPh: 14, targetCrop: null, targetDisease: null },
        isActive: true
    },
    {
        title: 'Paramparagat Krishi Vikas Yojana (PKVY)',
        description: 'Promotes organic farming through adoption of organic village by cluster approach.',
        ministry: 'Ministry of Agriculture & Farmers Welfare',
        benefits: 'Rs.50000 per hectare for 3 years for organic farming inputs and certification.',
        criteria: { minPh: 5.5, maxPh: 7.5, targetCrop: null, targetDisease: null },
        isActive: true
    },
    {
        title: 'Rashtriya Krishi Vikas Yojana (RKVY)',
        description: 'Provides states with autonomy to plan and execute agriculture and allied sector schemes.',
        ministry: 'Ministry of Agriculture & Farmers Welfare',
        benefits: 'Funding for infrastructure, technology adoption, and value chain development.',
        criteria: { minPh: 0, maxPh: 14, targetCrop: null, targetDisease: null },
        isActive: true
    },
    {
        title: 'e-NAM (National Agriculture Market)',
        description: 'Pan-India electronic trading portal for agriculture commodities.',
        ministry: 'Ministry of Agriculture & Farmers Welfare',
        benefits: 'Transparent price discovery, online trading, and direct farmer-buyer linkage.',
        criteria: { minPh: 0, maxPh: 14, targetCrop: null, targetDisease: null },
        isActive: true
    },
    {
        title: 'Kisan Credit Card (KCC)',
        description: 'Provides adequate and timely credit support to farmers for agricultural and allied activities.',
        ministry: 'Ministry of Finance',
        benefits: 'Credit up to Rs.3 lakh at subsidized interest rate of 4% per annum.',
        criteria: { minPh: 0, maxPh: 14, targetCrop: null, targetDisease: null },
        isActive: true
    },
    {
        title: 'Sub-Mission on Agricultural Mechanization (SMAM)',
        description: 'Promotes farm mechanization to increase productivity and reduce drudgery.',
        ministry: 'Ministry of Agriculture & Farmers Welfare',
        benefits: '40-50% subsidy on purchase of agricultural machinery and equipment.',
        criteria: { minPh: 0, maxPh: 14, targetCrop: null, targetDisease: null },
        isActive: true
    },
    {
        title: 'National Horticulture Mission (NHM)',
        description: 'Promotes holistic growth of the horticulture sector including fruits, vegetables, spices, and flowers.',
        ministry: 'Ministry of Agriculture & Farmers Welfare',
        benefits: 'Subsidies for setting up orchards, greenhouses, cold storage, and post-harvest infrastructure.',
        criteria: { minPh: 5.0, maxPh: 8.0, targetCrop: 'Turmeric', targetDisease: null },
        isActive: true
    },
    {
        title: 'Plant Protection and Quarantine Scheme',
        description: 'Provides integrated pest management support and disease control measures for farmers.',
        ministry: 'Ministry of Agriculture & Farmers Welfare',
        benefits: 'Free pest monitoring, bio-control agents, and disease management advisory.',
        criteria: { minPh: 0, maxPh: 14, targetCrop: null, targetDisease: 'Leaf Blight' },
        isActive: true
    },
    {
        title: 'National Mission on Oilseeds and Oil Palm (NMOOP)',
        description: 'Increases production and productivity of oilseeds and oil palm.',
        ministry: 'Ministry of Agriculture & Farmers Welfare',
        benefits: 'Subsidized seeds, mini kits, and demonstrations for oilseed farmers.',
        criteria: { minPh: 5.5, maxPh: 8.0, targetCrop: 'Mustard', targetDisease: null },
        isActive: true
    }
];

const PRODUCTS_DATA = [
    { name: 'DAP Fertilizer 50kg', price: '1350', description: 'Di-ammonium Phosphate fertilizer bag, ideal for wheat and rice crops. Contains 18% Nitrogen and 46% Phosphorus.', image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop', category: 'Fertilizers' },
    { name: 'Urea 45kg Bag', price: '267', description: 'Government subsidized urea bag with 46% Nitrogen content. Essential for vegetative growth of crops.', image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=300&fit=crop', category: 'Fertilizers' },
    { name: 'NPK 10-26-26 50kg', price: '1470', description: 'Complex fertilizer suitable for potassium and phosphorus hungry crops like potato and onion.', image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=300&fit=crop', category: 'Fertilizers' },
    { name: 'Vermicompost 25kg', price: '350', description: 'Premium organic vermicompost for improving soil structure and microbial activity.', image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop', category: 'Fertilizers' },
    { name: 'HD-2967 Wheat Seeds 40kg', price: '2100', description: 'High yielding wheat variety suitable for irrigated conditions in North India. Resistant to yellow rust.', image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop', category: 'Seeds' },
    { name: 'Pusa Basmati-1 Rice Seeds 20kg', price: '1800', description: 'Premium basmati rice variety with long slender grains and excellent aroma. 135-140 days duration.', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop', category: 'Seeds' },
    { name: 'GHB-558 Bajra Seeds 5kg', price: '450', description: 'Hybrid pearl millet variety with high grain yield and fodder quality. Suitable for arid conditions.', image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop', category: 'Seeds' },
    { name: 'Drip Irrigation Kit (1 Acre)', price: '15000', description: 'Complete inline drip irrigation system with filters, mainline, sub-main, laterals, and drippers for 1 acre.', image: 'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?w=400&h=300&fit=crop', category: 'Irrigation' },
    { name: 'Sprinkler Set (30 nos)', price: '4500', description: 'Rain gun sprinkler set with 30 micro sprinklers, suitable for field crops and orchards.', image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400&h=300&fit=crop', category: 'Irrigation' },
    { name: 'Solar Water Pump 3HP', price: '175000', description: 'Solar powered submersible pump with 3HP motor. Includes solar panels, controller, and cables.', image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=300&fit=crop', category: 'Pumps' },
    { name: 'Imidacloprid 17.8% SL 250ml', price: '280', description: 'Systemic insecticide effective against aphids, jassids, whiteflies, and termites.', image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=400&h=300&fit=crop', category: 'Pesticides' },
    { name: 'Mancozeb 75% WP 1kg', price: '350', description: 'Broad spectrum contact fungicide for control of leaf blight, downy mildew, and anthracnose.', image: 'https://images.unsplash.com/photo-1592982537447-6f2a6a0c8b8b?w=400&h=300&fit=crop', category: 'Pesticides' },
    { name: 'Neem Oil 1 Litre', price: '450', description: 'Cold pressed neem oil for organic pest management. Effective against 200+ types of insects.', image: 'https://images.unsplash.com/photo-1611241893603-3c359704e0ee?w=400&h=300&fit=crop', category: 'Pesticides' },
    { name: 'Battery Operated Sprayer 16L', price: '2800', description: 'Rechargeable battery sprayer with 16L tank. 6-8 hours battery life, adjustable nozzle.', image: 'https://images.unsplash.com/photo-1622383563227-04401ab4e5ea?w=400&h=300&fit=crop', category: 'Sprayers' },
    { name: 'Power Tiller 9HP', price: '125000', description: 'Diesel powered rotary tiller for primary and secondary tillage. Air cooled engine.', image: 'https://images.unsplash.com/photo-1580674285054-bed31e145f59?w=400&h=300&fit=crop', category: 'Machinery' },
    { name: 'Manual Seed Drill', price: '3500', description: 'Single row manual seed drill for precise sowing of wheat, gram, mustard, and other small seeds.', image: 'https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?w=400&h=300&fit=crop', category: 'Machinery' },
    { name: 'Khurpi Set (6 pcs)', price: '380', description: 'Hand weeding tool set with comfortable wooden grip. Essential for intercultural operations.', image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop', category: 'Tools' },
    { name: 'Garden Pruning Secateur', price: '550', description: 'Heavy duty bypass pruning shears for fruit trees, vines, and shrubs. Hardened steel blade.', image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400&h=300&fit=crop', category: 'Tools' },
    { name: 'Polyhouse 500 sqm', price: '350000', description: 'Naturally ventilated polyhouse with GI structure, UV stabilized polyethylene film, and shade net.', image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400&h=300&fit=crop', category: 'Greenhouses' },
    { name: 'Digital Soil Testing Kit', price: '4500', description: 'Portable soil testing kit for NPK, pH, EC, and moisture. Includes reagents for 50 tests.', image: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=400&h=300&fit=crop', category: 'Tools' },
    { name: 'Weather Station Mini', price: '8500', description: 'Digital weather station with temperature, humidity, wind speed, rainfall, and UV index sensors.', image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=400&h=300&fit=crop', category: 'Weather Stations' },
    { name: 'Organic Compost Bin 200L', price: '2200', description: 'Rotating compost tumbler for kitchen and farm waste. Produces compost in 4-6 weeks.', image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop', category: 'Composters' },
    { name: 'Solar Panel 100W', price: '4200', description: 'Monocrystalline solar panel for farm lighting, mobile charging, and small appliance use.', image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=400&h=300&fit=crop', category: 'Solar Panels' },
    { name: 'Tarpaulin 12x18 ft', price: '850', description: 'Heavy duty HDPE tarpaulin for grain drying, storage protection, and temporary shade.', image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=400&h=300&fit=crop', category: 'Tools' },
    { name: 'Sugarcane Crusher Manual', price: '18000', description: 'Cast iron manual sugarcane juice extractor. Heavy duty rollers for maximum juice extraction.', image: 'https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?w=400&h=300&fit=crop', category: 'Machinery' }
];

const COMMUNITY_POSTS = [
    { title: 'Best time to sow wheat in Rajasthan?', message: 'I am planning to sow wheat this rabi season. Can experienced farmers from Rajasthan suggest the ideal sowing window for HD-2967 variety? My field is near Sikar district.' },
    { title: 'Yellowing leaves on my tomato plants', message: 'My tomato plants are showing yellowing of lower leaves. I have been watering regularly. Is this a nutrient deficiency or a disease? Any suggestions for treatment?' },
    { title: 'Subsidy on drip irrigation in Maharashtra', message: 'Has anyone applied for the drip irrigation subsidy under PMKSY in Maharashtra? What documents are needed and how long does approval take?' },
    { title: 'Organic pest control for cotton bollworm', message: 'I am an organic farmer and struggling with bollworm infestation in my cotton crop. What organic methods have worked for you? I have tried neem spray but it is not enough.' },
    { title: 'How to improve soil pH naturally?', message: 'My soil test shows pH of 8.5. I want to grow turmeric which needs slightly acidic soil. What natural amendments can I use to lower pH without chemicals?' },
    { title: 'Market prices for cumin are very low this year', message: 'Cumin prices in Unjha mandi have dropped to Rs.15000/quintal from Rs.25000/quintal last year. Should we store and wait or sell now? Need advice from experienced traders.' },
    { title: 'Success with zero tillage wheat', message: 'I tried zero tillage wheat cultivation for the first time this year using Happy Seeder. Saved Rs.3000/acre on land preparation. Yield was comparable to conventional method. Highly recommend!' },
    { title: 'Rainwater harvesting for small farmers', message: 'I have a 2 acre farm in Bundelkhand region. Looking for practical and affordable rainwater harvesting solutions. Budget is limited to Rs.50000.' },
    { title: 'PM-KISAN installment not received', message: 'I have not received my PM-KISAN 16th installment. My Aadhaar is linked and bank account is verified. Has anyone else faced this issue? How to check status?' },
    { title: 'Intercropping suggestions for sugarcane', message: 'I grow sugarcane in UP. The initial growth period of 2-3 months leaves a lot of space between rows. What are good intercrop options that won\'t compete with sugarcane?' },
    { title: 'Problem with whitefly in brinjal', message: 'Heavy whitefly attack on my brinjal crop in Malwa region. Yellow sticky traps are helping but not enough. What safe insecticide can I use that won\'t affect consumers?' },
    { title: 'Starting mushroom cultivation', message: 'I want to start oyster mushroom cultivation as a side business. I have a spare room of 10x12 feet. What is the investment needed and expected monthly income?' },
    { title: 'Soil testing lab recommendations in Punjab', message: 'Can anyone recommend a reliable soil testing lab in Ludhiana or Patiala district? Government lab has 2 month waiting. Need results urgently for rabi season planning.' },
    { title: 'KCC loan renewal process', message: 'My Kisan Credit Card is up for renewal. SBI is asking for too many documents. Is it same process everywhere or is this branch specific? What documents did you need?' },
    { title: 'Solar pump installation experience', message: 'Got a 5HP solar pump installed under Kusum Yojana with 60% subsidy. Total cost was Rs.4.5 lakh, paid Rs.1.8 lakh. Very happy with performance. Ask me anything about the process.' },
    { title: 'Black spots on bajra leaves', message: 'Noticed black spots spreading on my bajra crop leaves. The crop is about 45 days old. Could this be downy mildew? Should I spray fungicide or is it too late?' },
    { title: 'High yielding groundnut varieties for Gujarat', message: 'Looking for high yielding groundnut varieties suitable for Saurashtra region. Currently growing JL-24 but want to try something with better oil content.' },
    { title: 'Protecting wheat from nilgai damage', message: 'Nilgai (blue bull) are destroying my wheat crop every year. Fencing is too expensive for my 5 acre plot. What low cost solutions have worked for others in Haryana?' },
    { title: 'Turmeric processing and storage tips', message: 'First time growing turmeric. Harvest is due next month. Need guidance on boiling, drying, and polishing process. Also, how to store for best prices?' },
    { title: 'Group farming benefits', message: 'We are 8 small farmers in our village with 2-3 acres each. Thinking of forming a Farmer Producer Organization. What are the government benefits and registration process?' },
    { title: 'Water management in rice cultivation', message: 'Practicing alternate wetting and drying (AWD) in rice for the first time. Water saving is about 30% but I am worried about yield impact. Anyone with experience?' },
    { title: 'Crop insurance claim process', message: 'My soybean crop was damaged by excess rain. I have PMFBY insurance. The deadline for intimation is 72 hours. How do I file the claim? Is it through the CSC or the insurance company?' }
];

// ─── SEED FUNCTIONS ──────────────────────────────────────────────────

async function seedUsers() {
    console.log('  Seeding Users...');
    await User.deleteMany({});

    const hashedPassword = await bcrypt.hash('password123', 10);
    const adminPassword = await bcrypt.hash('admin123', 10);

    const users = [];

    // Admin user
    users.push({
        name: 'Admin KrishiAi',
        email: 'admin@krishiai.in',
        password: adminPassword,
        role: 'admin',
        avatar: AVATARS[0]
    });

    // 25 farmers
    for (let i = 0; i < 25; i++) {
        const firstName = FIRST_NAMES[i % FIRST_NAMES.length];
        const lastName = LAST_NAMES[i % LAST_NAMES.length];
        users.push({
            name: `${firstName} ${lastName}`,
            email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@krishiai.in`,
            password: hashedPassword,
            role: 'farmer',
            avatar: AVATARS[i % AVATARS.length]
        });
    }

    // 5 sellers
    const sellerNames = ['Agri Mart', 'Kisan Store', 'FarmTech Supplies', 'Green Harvest Trading', 'Bharat Agri Centre'];
    for (let i = 0; i < 5; i++) {
        users.push({
            name: sellerNames[i],
            email: `${sellerNames[i].toLowerCase().replace(/ /g, '')}@krishiai.in`,
            password: hashedPassword,
            role: 'seller',
            avatar: AVATARS[i % AVATARS.length]
        });
    }

    // 3 cooperatives
    const coopNames = ['Jaipur Kisan Sahkari Samiti', 'Punjab Farmer Cooperative', 'Maharashtra Shetkari Sangathan'];
    for (let i = 0; i < 3; i++) {
        users.push({
            name: coopNames[i],
            email: `${coopNames[i].toLowerCase().replace(/ /g, '').slice(0, 20)}@krishiai.in`,
            password: hashedPassword,
            role: 'cooperative',
            avatar: AVATARS[i % AVATARS.length]
        });
    }

    const inserted = await User.insertMany(users);
    console.log(`  ✓ Users: ${inserted.length} records`);
    return inserted;
}

async function seedProducts(users) {
    console.log('  Seeding Products...');
    await Product.deleteMany({});

    const sellers = users.filter(u => u.role === 'seller');
    const products = PRODUCTS_DATA.map((p, i) => ({
        ...p,
        seller: sellers[i % sellers.length]._id.toString()
    }));

    const inserted = await Product.insertMany(products);
    console.log(`  ✓ Products: ${inserted.length} records`);
    return inserted;
}

async function seedLandRecords(users) {
    console.log('  Seeding LandRecords...');
    await LandRecord.deleteMany({});

    const farmers = users.filter(u => u.role === 'farmer');
    const records = farmers.map((farmer, i) => {
        const state = INDIAN_STATES[i % INDIAN_STATES.length];
        const coords = STATE_COORDS[state];
        const lngOffset = (Math.random() - 0.5) * 0.4;
        const latOffset = (Math.random() - 0.5) * 0.4;

        const hasDisease = Math.random() < 0.3;
        const disease = pick(DISEASES);

        return {
            farmer: farmer._id,
            location: {
                type: 'Point',
                coordinates: [coords[1] + lngOffset, coords[0] + latOffset]
            },
            soilDetails: {
                nitrogen: randInt(20, 90),
                phosphorus: randInt(10, 80),
                potassium: randInt(15, 85),
                ph: randFloat(4.5, 9.0, 1),
                moisture: randInt(20, 80),
                lastTested: new Date(Date.now() - randInt(0, 180) * 86400000)
            },
            areaInAcres: randFloat(0.5, 15, 1),
            currentCrop: pick(CROPS),
            activeDiseases: hasDisease ? [{
                diseaseName: disease.name,
                detectedAt: new Date(Date.now() - randInt(0, 30) * 86400000),
                confidence: randFloat(disease.confidence - 10, disease.confidence, 1)
            }] : []
        };
    });

    const inserted = await LandRecord.insertMany(records);
    console.log(`  ✓ LandRecords: ${inserted.length} records`);
    return inserted;
}

async function seedGovtSchemes() {
    console.log('  Seeding GovtSchemes...');
    await GovtScheme.deleteMany({});

    const inserted = await GovtScheme.insertMany(GOVT_SCHEMES);
    console.log(`  ✓ GovtSchemes: ${inserted.length} records`);
    return inserted;
}

async function seedWaterSources(users) {
    console.log('  Seeding WaterSources...');
    await WaterSource.deleteMany({});

    const farmers = users.filter(u => u.role === 'farmer');
    const sources = [];

    for (let i = 0; i < 20; i++) {
        const village = VILLAGES[i % VILLAGES.length];
        const sourceType = SOURCE_TYPES[i % SOURCE_TYPES.length];
        const manager = farmers[i % farmers.length];
        const numConnected = randInt(2, 6);
        const startIdx = (i * 3) % farmers.length;
        const connectedFarmers = [];
        for (let j = 0; j < numConnected && j + startIdx < farmers.length; j++) {
            connectedFarmers.push(farmers[(startIdx + j) % farmers.length]._id);
        }

        sources.push({
            sourceId: `${sourceType}-${String(i + 1).padStart(2, '0')}`,
            village,
            capacityLPH: randInt(2000, 15000),
            manager: manager._id,
            operationalHours: {
                start: pick([5, 6, 7]),
                end: pick([17, 18, 19, 20])
            },
            connectedFarmers
        });
    }

    const inserted = await WaterSource.insertMany(sources);
    console.log(`  ✓ WaterSources: ${inserted.length} records`);
    return inserted;
}

async function seedWaterRequests(users, waterSources) {
    console.log('  Seeding WaterRequests...');
    await WaterRequest.deleteMany({});

    const farmers = users.filter(u => u.role === 'farmer');
    const requests = [];

    for (let i = 0; i < 25; i++) {
        const farmer = farmers[i % farmers.length];
        const source = waterSources[i % waterSources.length];
        const daysAhead = randInt(1, 30);
        const status = pick(['pending', 'pending', 'approved', 'rejected']);

        requests.push({
            farmer: farmer._id,
            waterSource: source._id,
            preferredDate: new Date(Date.now() + daysAhead * 86400000),
            durationMinutes: pick([30, 45, 60, 90, 120]),
            reason: pick([
                'Wheat crop needs irrigation before heading stage',
                'Mustard field is very dry, soil moisture critically low',
                'Newly transplanted rice seedlings need water urgently',
                'Sugarcane ratoon crop requires scheduled irrigation',
                'Post-sowing irrigation needed for chickpea',
                'Vegetable nursery needs daily watering',
                'Preparing field for next season sowing',
                'Drought stress visible on standing crop'
            ]),
            status
        });
    }

    const inserted = await WaterRequest.insertMany(requests);
    console.log(`  ✓ WaterRequests: ${inserted.length} records`);
    return inserted;
}

async function seedAllocations(users, waterSources) {
    console.log('  Seeding Allocations...');
    await Allocation.deleteMany({});

    const farmers = users.filter(u => u.role === 'farmer');
    const allocations = [];

    for (let i = 0; i < 30; i++) {
        const farmer = farmers[i % farmers.length];
        const source = waterSources[i % waterSources.length];
        const daysOffset = randInt(-5, 15);
        const startHour = randInt(6, 16);
        const durationMin = pick([30, 45, 60, 90]);
        const startTime = new Date(Date.now() + daysOffset * 86400000);
        startTime.setHours(startHour, 0, 0, 0);
        const endTime = new Date(startTime.getTime() + durationMin * 60000);

        let status;
        if (daysOffset < -1) status = 'completed';
        else if (daysOffset < 0) status = pick(['completed', 'active']);
        else status = 'scheduled';

        allocations.push({
            farmer: farmer._id,
            waterSource: source._id,
            startTime,
            endTime,
            durationMinutes: durationMin,
            status,
            isMLOptimized: Math.random() < 0.3
        });
    }

    const inserted = await Allocation.insertMany(allocations);
    console.log(`  ✓ Allocations: ${inserted.length} records`);
    return inserted;
}

async function seedMLHistory(users) {
    console.log('  Seeding MLHistory...');
    await MLHistory.deleteMany({});

    const farmers = users.filter(u => u.role === 'farmer');
    const records = [];

    // Crop recommendations
    for (let i = 0; i < 20; i++) {
        const farmer = farmers[i % farmers.length];
        records.push({
            user: farmer._id,
            type: 'crop_recommendation',
            inputData: {
                nitrogen: randInt(20, 90),
                phosphorus: randInt(10, 80),
                potassium: randInt(15, 85),
                temperature: randFloat(18, 38),
                humidity: randFloat(30, 90),
                ph: randFloat(4.5, 9.0, 1),
                rainfall: randFloat(50, 300),
                water_level: randFloat(10, 80)
            },
            predictionResult: {
                predicted_crop: pick(CROPS).toLowerCase(),
                details: {
                    name: pick(CROPS),
                    best_season: pick(['Kharif', 'Rabi', 'Zaid']),
                    soil_type: pick(['Alluvial', 'Black', 'Red', 'Laterite', 'Sandy Loam']),
                    growing_time: pick(['90-120 days', '120-150 days', '60-90 days', '150-180 days'])
                }
            },
            createdAt: new Date(Date.now() - randInt(0, 90) * 86400000)
        });
    }

    // Disease detections
    for (let i = 0; i < 15; i++) {
        const farmer = farmers[i % farmers.length];
        const disease = pick(DISEASES);
        records.push({
            user: farmer._id,
            type: 'disease_detection',
            inputData: {
                image: `disease_scan_${i + 1}.jpg`,
                crop: disease.crop
            },
            predictionResult: {
                disease: disease.name,
                confidence: randFloat(disease.confidence - 8, disease.confidence, 1),
                treatment: `Apply appropriate fungicide/pesticide. Follow integrated pest management practices for ${disease.crop}.`
            },
            createdAt: new Date(Date.now() - randInt(0, 60) * 86400000)
        });
    }

    // Rainfall predictions
    for (let i = 0; i < 10; i++) {
        const farmer = farmers[i % farmers.length];
        const state = pick(INDIAN_STATES);
        const district = pick(DISTRICTS_BY_STATE[state]);
        records.push({
            user: farmer._id,
            type: 'rainfall',
            inputData: {
                city: district,
                state,
                current_temp: randFloat(20, 42),
                current_humidity: randFloat(30, 95)
            },
            predictionResult: {
                rainfall_24h: pick(['YES', 'NO']),
                rainfall_48h: pick(['YES', 'NO']),
                rainfall_72h: pick(['YES', 'NO']),
                confidence_24h: randFloat(55, 95),
                confidence_48h: randFloat(50, 90),
                confidence_72h: randFloat(45, 85),
                irrigation_recommendation: pick([
                    'Delay irrigation — rain expected within 24 hours',
                    'Irrigate now — no rain expected in next 72 hours',
                    'Light irrigation recommended — partial rain expected',
                    'Hold irrigation — monsoon activity detected'
                ])
            },
            createdAt: new Date(Date.now() - randInt(0, 45) * 86400000)
        });
    }

    // Yield predictions
    for (let i = 0; i < 8; i++) {
        const farmer = farmers[i % farmers.length];
        const crop = pick(CROPS);
        records.push({
            user: farmer._id,
            type: 'yield_prediction',
            inputData: {
                Crop: crop,
                Crop_Year: 2025,
                Season: pick(['Kharif', 'Rabi', 'Whole Year']),
                State: pick(INDIAN_STATES),
                Area: randFloat(1, 20, 1),
                Annual_Rainfall: randFloat(400, 1800),
                Fertilizer: randFloat(50, 300),
                Pesticide: randFloat(5, 50)
            },
            predictionResult: {
                predicted_yield: randFloat(500, 8000),
                unit: 'Production (Tonnes)'
            },
            createdAt: new Date(Date.now() - randInt(0, 30) * 86400000)
        });
    }

    const inserted = await MLHistory.insertMany(records);
    console.log(`  ✓ MLHistory: ${inserted.length} records`);
    return inserted;
}

async function seedContacts() {
    console.log('  Seeding Contacts...');
    await Contact.deleteMany({});

    const contacts = [
        { name: 'Rakesh Tiwari', email: 'rakesh.tiwari@gmail.com', message: 'I want to register as a seller on KrishiAi. How can I create a seller account and list my agricultural products?' },
        { name: 'Sunita Devi', email: 'sunita.d@yahoo.in', message: 'My soil test report is showing incorrect values. Can I reset my profile and redo the soil analysis from the ML section?' },
        { name: 'Mohan Patel', email: 'mohan.patel@outlook.com', message: 'The crop recommendation feature suggested rice for my arid land in Barmer. This seems incorrect. Can you check the algorithm?' },
        { name: 'Kavita Sharma', email: 'kavita.s@gmail.com', message: 'I love the disease detection feature! It correctly identified late blight on my potato crop. Thank you for this amazing tool.' },
        { name: 'Bhagwan Singh', email: 'bhagwan.singh@rediffmail.com', message: 'Can you add more language options? My parents only speak Marwari and the current translations do not cover that.' },
        { name: 'Deepak Yadav', email: 'deepak.yadav@gmail.com', message: 'The market data section is not loading for me since yesterday. I am using Chrome on mobile. Please fix this issue.' },
        { name: 'Geeta Kumari', email: 'geeta.k@hotmail.com', message: 'How can I connect with other farmers in my area through the community feature? I am new to the platform.' },
        { name: 'Ratan Lal', email: 'ratan.lal@gmail.com', message: 'I would like to suggest adding a feature for weather-based farming calendar specific to each region and crop.' },
        { name: 'Pratap Singh', email: 'pratap.s@yahoo.in', message: 'The Parchi water scheduling system is brilliant. It has resolved so many water disputes in our village. Great work team!' },
        { name: 'Anju Meena', email: 'anju.meena@gmail.com', message: 'I am a agricultural extension worker. Can I get bulk registration for 50 farmers in my block? Is there any official partnership program?' },
        { name: 'Vijay Kumar', email: 'vijay.k@outlook.com', message: 'The PM-KISAN information page has outdated eligibility criteria. Please update it with the latest government notification.' },
        { name: 'Lakshmi Naidu', email: 'lakshmi.n@gmail.com', message: 'Can you integrate real-time mandi prices from e-NAM portal? The current scraped data sometimes shows yesterdays prices.' },
        { name: 'Gopal Verma', email: 'gopal.v@gmail.com', message: 'I want to report a bug: the chat feature shows duplicate messages when internet is slow. Using the app from rural Rajasthan.' },
        { name: 'Pushpa Devi', email: 'pushpa.d@yahoo.in', message: 'Is there a way to export my ML prediction history as a PDF report? I need it for my bank loan application.' },
        { name: 'Hari Om', email: 'hari.om@gmail.com', message: 'Suggestion: Please add video tutorials for using the app in Hindi. Many farmers in our area are not comfortable with English text.' },
        { name: 'Devendra Patil', email: 'devendra.p@outlook.com', message: 'I run a Farmer Producer Organization. Can KrishiAi provide bulk pricing features for cooperatives buying products through the marketplace?' },
        { name: 'Baldev Singh', email: 'baldev.s@gmail.com', message: 'The yield prediction model gave very accurate results for my wheat crop in Punjab. The predicted 45 quintals/acre matched my actual harvest.' },
        { name: 'Meena Kumari', email: 'meena.k@yahoo.in', message: 'Is there an offline mode planned? Internet connectivity is very poor in my village and the app needs internet for everything.' },
        { name: 'Jagdish Choudhary', email: 'jagdish.c@gmail.com', message: 'My cooperative wants to manage water distribution through Parchi system. How do we set up water sources for our village?' },
        { name: 'Shanti Devi', email: 'shanti.d@rediffmail.com', message: 'Thank you for adding Rajasthani language support. It helps older farmers in our area understand the recommendations better.' }
    ];

    const inserted = await Contact.insertMany(contacts);
    console.log(`  ✓ Contacts: ${inserted.length} records`);
    return inserted;
}

async function seedCommunityPosts(users) {
    console.log('  Seeding Community Posts...');
    await Post.deleteMany({});

    const farmers = users.filter(u => u.role === 'farmer' || u.role === 'cooperative');
    const posts = COMMUNITY_POSTS.map((p, i) => {
        const user = farmers[i % farmers.length];
        return {
            name: user.name,
            email: user.email,
            title: p.title,
            message: p.message
        };
    });

    const inserted = await Post.insertMany(posts);
    console.log(`  ✓ Community Posts: ${inserted.length} records`);
    return inserted;
}

async function seedChats(users) {
    console.log('  Seeding Chats...');
    await Chat.deleteMany({});

    const farmers = users.filter(u => u.role === 'farmer');
    const messages = [];

    const conversations = [
        [
            'Namaste bhai! How is your wheat crop this season?',
            'Namaste! It is growing well. Using HD-2967 variety this time. Getting good tillers.',
            'Great! I am also planning to switch from Lok-1. What fertilizer schedule are you following?',
            'Started with DAP at sowing, then urea split in two doses. Soil test said potash is sufficient.',
            'Makes sense. My soil is deficient in potash so I added MOP. Let us compare yields after harvest!'
        ],
        [
            'Did you attend the KVK training program yesterday?',
            'Yes! They demonstrated SRI method for rice. Very interesting technique.',
            'How is it different from normal transplanting?',
            'Single seedlings with wider spacing and less water. They claim 30% more yield with less seed.',
            'I will try it on 1 acre next kharif season. Thanks for the info.'
        ],
        [
            'Bhai, nilgai destroyed half my mustard field last night!',
            'That is terrible! Have you tried the solar powered fence?',
            'Too expensive for me. Tried reflective tape but they got used to it.',
            'Try planting marigold border and use sirens. Some farmers in my area had success with that.',
            'Will try the marigold idea. It might help with other pests too. Thanks!'
        ],
        [
            'I am getting 95 quintals per acre sugarcane this year!',
            'That is excellent! What variety are you growing?',
            'Co-0238 with drip irrigation. The drip made a huge difference.',
            'I got the drip subsidy approved. Installing next month. Hope for similar results.',
            'Make sure to get inline drip, not online. And keep filters clean every week.'
        ]
    ];

    for (let c = 0; c < conversations.length; c++) {
        const user1 = farmers[c * 2];
        const user2 = farmers[c * 2 + 1];
        if (!user1 || !user2) break;

        for (let m = 0; m < conversations[c].length; m++) {
            const sender = m % 2 === 0 ? user1 : user2;
            const receiver = m % 2 === 0 ? user2 : user1;
            messages.push({
                sender: sender._id,
                receiver: receiver._id,
                message: conversations[c][m],
                timestamp: new Date(Date.now() - (conversations.length - c) * 86400000 + m * 600000)
            });
        }
    }

    const inserted = await Chat.insertMany(messages);
    console.log(`  ✓ Chats: ${inserted.length} records`);
    return inserted;
}

// ─── MAIN SEED FUNCTION ──────────────────────────────────────────────

export async function seedDatabase() {
    console.log('\n╔══════════════════════════════════════════════╗');
    console.log('║       KrishiAi Database Seeding Script       ║');
    console.log('╚══════════════════════════════════════════════╝\n');

    const mongoUri = process.env.MONGO_DB_URL || process.env.MONGODB_URI || 'mongodb://localhost:27017/farmsetu';

    try {
        if (mongoose.connection.readyState === 0) {
            console.log(`Connecting to MongoDB: ${mongoUri.replace(/\/\/.*@/, '//<credentials>@')}`);
            await mongoose.connect(mongoUri);
            console.log('Connected to MongoDB\n');
        }

        console.log('Seeding all collections...\n');

        // Users first (other collections depend on user IDs)
        const users = await seedUsers();

        // Independent collections (can reference users)
        const [products, landRecords, govtSchemes, waterSources, contacts, communityPosts, chats, mlHistory] = await Promise.all([
            seedProducts(users),
            seedLandRecords(users),
            seedGovtSchemes(),
            seedWaterSources(users),
            seedContacts(),
            seedCommunityPosts(users),
            seedChats(users),
            seedMLHistory(users)
        ]);

        // Dependent collections (need waterSources)
        const [waterRequests, allocations] = await Promise.all([
            seedWaterRequests(users, waterSources),
            seedAllocations(users, waterSources)
        ]);

        console.log('\n══════════════════════════════════════════════');
        console.log('  Seeding complete! Summary:');
        console.log('══════════════════════════════════════════════');
        console.log(`  Users:           ${users.length}`);
        console.log(`  Products:        ${products.length}`);
        console.log(`  LandRecords:     ${landRecords.length}`);
        console.log(`  GovtSchemes:     ${govtSchemes.length}`);
        console.log(`  WaterSources:    ${waterSources.length}`);
        console.log(`  WaterRequests:   ${waterRequests.length}`);
        console.log(`  Allocations:     ${allocations.length}`);
        console.log(`  MLHistory:       ${mlHistory.length}`);
        console.log(`  Contacts:        ${contacts.length}`);
        console.log(`  Community Posts: ${communityPosts.length}`);
        console.log(`  Chats:           ${chats.length}`);
        console.log('══════════════════════════════════════════════');
        console.log('\n  Default login credentials:');
        console.log('  Admin:  admin@krishiai.in / admin123');
        console.log('  Farmer: rajesh.sharma0@krishiai.in / password123');
        console.log('  Seller: agrimart@krishiai.in / password123\n');

    } catch (error) {
        console.error('\n✗ Seeding failed:', error.message);
        throw error;
    }
}

// ─── STANDALONE EXECUTION ────────────────────────────────────────────

// Run directly: node seed.js
const isMain = process.argv[1] && (
    process.argv[1].endsWith('seed.js') ||
    process.argv[1].endsWith('seed')
);

if (isMain) {
    seedDatabase()
        .then(() => {
            console.log('Done. Exiting...');
            process.exit(0);
        })
        .catch((err) => {
            console.error(err);
            process.exit(1);
        });
}
