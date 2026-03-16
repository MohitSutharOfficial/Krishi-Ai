
# KrishiAi

AI-powered agricultural platform empowering Indian farmers with crop recommendations, disease detection, weather forecasts, market prices, and community support.

**Live**: 

backend: [https://krishi-ai-orcin.vercel.app/](https://krishi-ai-orcin.vercel.app/)

frontend: [https://krishi-ai.pages.dev/](https://krishi-ai.pages.dev/) And [https://krishiai.mohitsuthar.me/](https://krishiai.mohitsuthar.me/)

Ml Model: [https://mohitsuthar-krishiai-ml.hf.space/](https://mohitsuthar-krishiai-ml.hf.space/)

Ml Model on Hugging Face: [https://huggingface.co/spaces/mohitsuthar/krishiai-ml](https://huggingface.co/spaces/mohitsuthar/krishiai-ml)

## Features

| Feature | Description |
|---------|-------------|
| Crop Recommendation | AI-driven suggestions for optimal crop selection |
| Disease Detection | Upload photos to identify plant diseases |
| Weather Updates | Hyperlocal forecasts for farming regions |
| Real-Time Market Data | Live commodity prices and trends |
| Marketplace | Buy/sell agricultural goods directly |
| Community Forum | Farmer discussions and knowledge sharing |
| Expert Consultations | Chat with agricultural specialists |
| Chatbot Assistant | 24/7 AI-powered farming queries |
| News Feed | Agricultural news, policies, and innovations |
| Multi-language | Support for 16+ Indian languages |

## Tech Stack

**Frontend**: React.js, Vite, Tailwind CSS, Framer Motion, i18next
**Backend**: Node.js, Express.js, MongoDB, Mongoose, JWT
**APIs**: OpenWeatherMap, Google Generative AI, Market Data
**Deployment**: Netlify (frontend), Render (backend)

## Quick Start

```bash
# Clone & install
git clone https://github.com/MohitSutharOfficial/KrishiAi.git
cd KrishiAi
npm install
cd frontend && npm install && cd ..

# Configure environment
cp .env.example .env  # Edit with your API keys

# Run development servers
npm run server          # Backend  (http://localhost:5000)
cd frontend && npm run dev  # Frontend (http://localhost:3000)
```

### Environment Variables

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
OPENWEATHER_API_KEY=your_openweather_api_key
GEMINI_API_KEY=your_google_gemini_api_key
```

## Project Structure

```
KrishiAi/
├── backend/
│   ├── controllers/    # Request handlers
│   ├── models/         # MongoDB schemas
│   ├── routes/         # API endpoints
│   ├── scraper/        # News & market data scrapers
│   ├── db/             # Database connection
│   ├── utils/          # JWT token generation
│   └── server.js       # Entry point
├── frontend/
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # Page components
│   │   ├── context/    # Auth context
│   │   ├── locales/    # i18n translations
│   │   └── App.jsx     # Root with routing
│   └── index.html
└── ML Models/          # Crop recommendation & prediction
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register user |
| POST | `/api/auth/login` | Login |
| POST | `/api/auth/logout` | Logout |
| GET | `/api/products` | List products |
| POST | `/api/products` | Create product |
| GET | `/api/community` | Community posts |
| POST | `/api/community` | Create post |
| POST | `/api/news` | Agricultural news |
| GET | `/api/marketdata` | Market prices |

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m "Add your feature"`
4. Push and open a pull request

## License

MIT License

## Author

**Mohit Suthar** - [GitHub](https://github.com/MohitSutharOfficial) | [LinkedIn](https://linkedin.com/in/mohit-suthar-4136a52a6/) | [Portfolio](https://mohitsuthar.me/)
