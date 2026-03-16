<div align="center">
  <img src="frontend/public/logo.svg" alt="KrishiAI Logo" width="380" />

  <br />
  <br />

  **AI-powered agricultural intelligence platform empowering Indian farmers with smart crop recommendations, plant disease detection, weather forecasts, real-time market prices, and community support.**

  <br />

  [![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
  [![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
  [![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
  [![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
  [![TensorFlow](https://img.shields.io/badge/TensorFlow-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white)](https://www.tensorflow.org/)
  [![GitHub Stars](https://img.shields.io/github/stars/MohitSutharOfficial/KrishiAi?style=for-the-badge&logo=github)](https://github.com/MohitSutharOfficial/KrishiAi)

  <br />

  [Live Demo](https://krishiai.mohitsuthar.me/) &nbsp;&bull;&nbsp; [Features](#-features) &nbsp;&bull;&nbsp; [Quick Start](#-quick-start) &nbsp;&bull;&nbsp; [API Reference](#-api-endpoints) &nbsp;&bull;&nbsp; [Contributing](#-contributing)

  <br />
</div>

---

## About

**KrishiAI** *(Krishi = Agriculture in Hindi)* is a full-stack intelligent agriculture platform built to help small and marginal farmers across India make data-driven decisions. By combining machine learning models with real-time data sources, KrishiAI delivers actionable insights — from choosing the right crop to diagnosing plant diseases from a single photograph.

> *"आपकी फसल, हमारी जिम्मेदारी"* — Your Crop, Our Responsibility

---

## Deployments

| Service | URL |
|:--------|:----|
| Frontend | [krishiai.mohitsuthar.me](https://krishiai.mohitsuthar.me/) |
| Frontend (Mirror) | [krishi-ai.pages.dev](https://krishi-ai.pages.dev/) |
| Backend API | [krishi-ai-orcin.vercel.app](https://krishi-ai-orcin.vercel.app/) |
| ML Model API | [mohitsuthar-krishiai-ml.hf.space](https://mohitsuthar-krishiai-ml.hf.space/) |
| Our ML jModel on Hugging Face | [huggingface.co/spaces/mohitsuthar/krishiai-ml](https://huggingface.co/spaces/mohitsuthar/krishiai-ml) |

---

## Features

### Core AI/ML Capabilities

| Feature | Description |
|:--------|:------------|
| **Crop Recommendation** | ML-powered suggestions based on soil type, climate, and region |
| **Plant Disease Detection** | Upload a leaf photo — deep learning model identifies diseases with treatment tips |
| **Rainfall Prediction** | 24h, 48h, and 72h rainfall forecasts using trained regression models |
| **Crop Yield Prediction** | Estimate expected yield based on historical data and growing conditions |
| **AI Chatbot** | 24/7 conversational assistant powered by Google Gemini for farming queries |

### Platform Features

| Feature | Description |
|:--------|:------------|
| **Real-Time Market Prices** | Live commodity prices scraped from government sources |
| **Weather Forecasts** | Hyperlocal weather data via OpenWeatherMap integration |
| **Farmer Marketplace** | Buy and sell agricultural goods directly — with cart and checkout |
| **Community Forum** | Farmer-to-farmer discussions, knowledge sharing, and Q&A |
| **Government Schemes** | Browse and match eligible agricultural subsidies and insurance plans |
| **Agricultural News** | Curated news feed on policies, innovations, and market trends |
| **Digital Parchi** | Digital record-keeping for crop transactions |
| **Educational Resources** | Courses and learning materials for modern farming techniques |
| **Multi-Language Support** | Available in **16+ Indian languages** including Hindi, Tamil, Telugu, Bengali, and more |

---

## Tech Stack

<table>
  <tr>
    <td><b>Frontend</b></td>
    <td>React 18, Vite, Tailwind CSS, Framer Motion, React Router v6, i18next, Chart.js, Recharts, Leaflet</td>
  </tr>
  <tr>
    <td><b>Backend</b></td>
    <td>Node.js, Express.js, MongoDB, Mongoose, JWT Authentication, Cheerio (scraping)</td>
  </tr>
  <tr>
    <td><b>ML / AI</b></td>
    <td>Python, Flask, TensorFlow/Keras, scikit-learn, Google Gemini API</td>
  </tr>
  <tr>
    <td><b>Deployment</b></td>
    <td>Cloudflare Pages (frontend), Vercel (backend), Hugging Face Spaces (ML), Docker</td>
  </tr>
</table>

---

## Quick Start

### Prerequisites

- **Node.js** >= 18.x
- **Python** >= 3.9 (for ML models)
- **MongoDB** instance (local or Atlas)

### Installation

```bash
# Clone the repository
git clone https://github.com/MohitSutharOfficial/KrishiAi.git
cd KrishiAi

# Install backend dependencies
npm install

# Install frontend dependencies
cd frontend && npm install && cd ..
```

### Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
OPENWEATHER_API_KEY=your_openweather_api_key
GEMINI_API_KEY=your_google_gemini_api_key
```

### Run Development Servers

```bash
# Start the backend server (http://localhost:5000)
npm run server

# In a separate terminal — start the frontend (http://localhost:3000)
cd frontend
npm run dev
```

### Run ML Model Server (Optional)

```bash
cd "ML Models"
pip install -r requirements.txt
python app.py
```

---

## Project Structure

```
KrishiAi/
├── backend/
│   ├── controllers/        # Route handlers (auth, products, ML, news, etc.)
│   ├── models/             # Mongoose schemas (User, Product, Chat, LandRecord...)
│   ├── routes/             # Express API route definitions
│   ├── middleware/          # Authentication middleware
│   ├── scraper/            # News & market data web scrapers
│   ├── db/                 # Database connection config
│   ├── utils/              # JWT token utilities
│   └── server.js           # Express entry point
│
├── frontend/
│   ├── public/             # Static assets (logo, sitemap, robots.txt)
│   └── src/
│       ├── components/     # 25+ reusable UI components
│       ├── pages/          # 44 page components (incl. admin panel)
│       ├── context/        # React AuthContext
│       ├── hooks/          # Custom hooks (useLogin, useLogout, etc.)
│       ├── data/           # Static JSON datasets
│       ├── locales/        # 16 language translation files
│       ├── lib/            # Utility functions
│       └── App.jsx         # Root component with lazy-loaded routing
│
├── ML Models/
│   ├── app.py              # Flask ML API server
│   ├── models/             # Trained models (.keras, .pkl)
│   ├── data/               # Crop data & treatment tips
│   ├── utils/              # Rainfall model utilities
│   ├── Dockerfile          # Container definition
│   └── requirements.txt    # Python dependencies
│
└── README.md
```

---

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|:-------|:---------|:------------|
| `POST` | `/api/auth/signup` | Register a new user |
| `POST` | `/api/auth/login` | Login and receive JWT token |
| `POST` | `/api/auth/logout` | Logout and clear session |

### Marketplace

| Method | Endpoint | Description |
|:-------|:---------|:------------|
| `GET` | `/api/products` | List all products |
| `POST` | `/api/products` | Create a new product listing |

### Community

| Method | Endpoint | Description |
|:-------|:---------|:------------|
| `GET` | `/api/community` | Fetch community posts |
| `POST` | `/api/community` | Create a new community post |

### Data & Intelligence

| Method | Endpoint | Description |
|:-------|:---------|:------------|
| `POST` | `/api/news` | Fetch agricultural news |
| `GET` | `/api/marketdata` | Get real-time market prices |

### ML Predictions

| Method | Endpoint | Description |
|:-------|:---------|:------------|
| `POST` | `/api/predict/crop` | Get crop recommendation |
| `POST` | `/api/predict/disease` | Detect plant disease from image |
| `POST` | `/api/predict/rainfall` | Predict rainfall (24h/48h/72h) |
| `POST` | `/api/predict/yield` | Predict crop yield |

---

## Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/your-feature`
3. **Commit** your changes: `git commit -m "Add your feature"`
4. **Push** to the branch: `git push origin feature/your-feature`
5. **Open** a Pull Request

Please ensure your code follows the existing style conventions and includes appropriate tests where applicable.

---

## License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## Author

<div align="center">

**Mohit Suthar**

[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/MohitSutharOfficial)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/mohit-suthar-4136a52a6/)
[![Portfolio](https://img.shields.io/badge/Portfolio-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://mohitsuthar.me/)

---

<sub>Built with passion for Indian agriculture</sub>

</div>
