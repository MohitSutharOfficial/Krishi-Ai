# KrishiAi Database Documentation

## Overview

KrishiAi uses **MongoDB** with **Mongoose ODM**. The database contains 11 collections covering users, agriculture data, marketplace, water management, ML predictions, and community features.

---

## ER Diagram (Text-Based)

```
┌─────────────────────┐
│        USER          │
│─────────────────────│
│ _id (ObjectId) PK    │
│ name                 │
│ email (unique)       │
│ password             │
│ role (enum)          │
│ avatar               │
│ cart [String]        │
│ createdAt            │
└──────────┬──────────┘
           │
           │ 1:1
           ▼
┌─────────────────────┐         ┌─────────────────────┐
│    LAND RECORD       │         │     ML HISTORY       │
│─────────────────────│         │─────────────────────│
│ _id PK               │         │ _id PK               │
│ farmer → User (1:1)  │         │ user → User           │
│ location (GeoJSON)   │         │ type (enum)           │
│ soilDetails {nested} │         │ inputData (Object)    │
│ areaInAcres          │         │ predictionResult (Obj)│
│ currentCrop          │         │ createdAt             │
│ activeDiseases []    │         └─────────────────────┘
└──────────┬──────────┘
           │
     (via soil/disease data from ML predictions)

┌─────────────────────┐       ┌─────────────────────┐
│    WATER SOURCE      │       │      ALLOCATION      │
│─────────────────────│       │─────────────────────│
│ _id PK               │◄──────│ waterSource → WS     │
│ sourceId (unique)    │       │ farmer → User         │
│ village              │       │ startTime             │
│ capacityLPH          │       │ endTime               │
│ manager → User       │       │ durationMinutes       │
│ operationalHours {}  │       │ status (enum)         │
│ connectedFarmers[]   │       │ isMLOptimized         │
│   → User             │       └─────────────────────┘
└──────────┬──────────┘
           │
           │
           ▼
┌─────────────────────┐
│   WATER REQUEST      │
│─────────────────────│
│ _id PK               │
│ farmer → User        │
│ waterSource → WS     │
│ preferredDate        │
│ durationMinutes      │
│ reason               │
│ status (enum)        │
└─────────────────────┘

┌─────────────────────┐    ┌─────────────────────┐    ┌─────────────────────┐
│       PRODUCT        │    │        CHAT          │    │   POST (Community)   │
│─────────────────────│    │─────────────────────│    │─────────────────────│
│ _id PK               │    │ _id PK               │    │ _id PK               │
│ name                 │    │ sender → User        │    │ name                 │
│ price (String)       │    │ receiver → User      │    │ email                │
│ description          │    │ message              │    │ title                │
│ image                │    │ timestamp            │    │ message              │
│ category             │    └─────────────────────┘    │ createdAt            │
│ seller (String)      │                                └─────────────────────┘
│ date                 │
└─────────────────────┘

┌─────────────────────┐    ┌─────────────────────┐
│      CONTACT         │    │    GOVT SCHEME       │
│─────────────────────│    │─────────────────────│
│ _id PK               │    │ _id PK               │
│ name                 │    │ title                │
│ email                │    │ description          │
│ message              │    │ ministry             │
│ createdAt            │    │ benefits             │
└─────────────────────┘    │ criteria {nested}    │
                           │ isActive             │
                           └─────────────────────┘
```

### Relationship Summary

| Relationship | Type | Description |
|---|---|---|
| User → LandRecord | 1:1 | Each farmer has one land record |
| User → MLHistory | 1:Many | Users can have multiple ML predictions |
| User → Chat | 1:Many | Users send/receive many chat messages |
| User → WaterSource.manager | 1:Many | A user can manage multiple sources |
| User → WaterSource.connectedFarmers | Many:Many | Farmers connect to water sources |
| User → WaterRequest | 1:Many | Farmers make many water requests |
| User → Allocation | 1:Many | Farmers have many water allocations |
| WaterSource → WaterRequest | 1:Many | A source receives many requests |
| WaterSource → Allocation | 1:Many | A source has many scheduled allocations |

---

## Collections Detail

### 1. User
| Field | Type | Required | Notes |
|---|---|---|---|
| name | String | Yes | Trimmed |
| email | String | Yes | Unique, lowercase |
| password | String | Yes | bcrypt hashed, min 6 chars |
| role | String (enum) | No | `farmer`, `seller`, `cooperative`, `admin`. Default: `farmer` |
| avatar | String | Yes | URL to avataaars.io |
| cart | [String] | No | Array of Product ObjectId strings |
| createdAt | Date | No | Default: Date.now |

### 2. LandRecord
| Field | Type | Required | Notes |
|---|---|---|---|
| farmer | ObjectId (ref: User) | Yes | Unique — one record per farmer |
| location | GeoJSON Point | Yes | `{ type: 'Point', coordinates: [lng, lat] }` |
| soilDetails.nitrogen | Number | No | mg/kg |
| soilDetails.phosphorus | Number | No | mg/kg |
| soilDetails.potassium | Number | No | mg/kg |
| soilDetails.ph | Number | No | 0-14 scale |
| soilDetails.moisture | Number | No | Percentage |
| soilDetails.lastTested | Date | No | Default: Date.now |
| areaInAcres | Number | No | Default: 1 |
| currentCrop | String | No | |
| activeDiseases | Array | No | `[{ diseaseName, detectedAt, confidence }]` |
| timestamps | auto | — | createdAt, updatedAt |

### 3. Product
| Field | Type | Required | Notes |
|---|---|---|---|
| name | String | Yes | |
| price | String | Yes | Stored as string (e.g. "1350") |
| description | String | Yes | |
| image | String | Yes | URL |
| category | String | Yes | E.g. Fertilizers, Seeds, Irrigation, etc. |
| seller | String | Yes | User ObjectId stored as string |
| date | Date | No | Default: Date.now |

### 4. Chat
| Field | Type | Required | Notes |
|---|---|---|---|
| sender | ObjectId (ref: User) | Yes | |
| receiver | ObjectId (ref: User) | Yes | |
| message | String | Yes | |
| timestamp | Date | No | Default: Date.now |

### 5. Contact
| Field | Type | Required | Notes |
|---|---|---|---|
| name | String | Yes | |
| email | String | Yes | |
| message | String | Yes | |
| createdAt | Date | No | Default: Date.now |

### 6. GovtScheme
| Field | Type | Required | Notes |
|---|---|---|---|
| title | String | Yes | |
| description | String | No | |
| ministry | String | No | |
| benefits | String | No | |
| criteria.minPh | Number | No | |
| criteria.maxPh | Number | No | |
| criteria.targetCrop | String | No | |
| criteria.targetDisease | String | No | |
| isActive | Boolean | No | Default: true |
| timestamps | auto | — | createdAt, updatedAt |

### 7. MLHistory
| Field | Type | Required | Notes |
|---|---|---|---|
| user | ObjectId (ref: User) | No | |
| type | String (enum) | Yes | `crop_recommendation`, `disease_detection`, `rainfall`, `yield_prediction` |
| inputData | Object | No | Freeform — varies by prediction type |
| predictionResult | Object | No | Freeform — varies by prediction type |
| createdAt | Date | No | Default: Date.now |

### 8. Post (Community)
| Field | Type | Required | Notes |
|---|---|---|---|
| name | String | Yes | Author name |
| email | String | Yes | Author email |
| title | String | Yes | Post title |
| message | String | Yes | Post body |
| createdAt | Date | No | Default: Date.now |

### 9. WaterSource
| Field | Type | Required | Notes |
|---|---|---|---|
| sourceId | String | Yes | Unique, e.g. "TUBEWELL-01" |
| village | String | Yes | |
| capacityLPH | Number | Yes | Liters Per Hour |
| manager | ObjectId (ref: User) | No | |
| operationalHours.start | Number | No | Hour (24h), default: 6 |
| operationalHours.end | Number | No | Hour (24h), default: 18 |
| connectedFarmers | [ObjectId] (ref: User) | No | |
| timestamps | auto | — | createdAt, updatedAt |

### 10. WaterRequest
| Field | Type | Required | Notes |
|---|---|---|---|
| farmer | ObjectId (ref: User) | Yes | |
| waterSource | ObjectId (ref: WaterSource) | Yes | |
| preferredDate | Date | Yes | |
| durationMinutes | Number | Yes | |
| reason | String | No | |
| status | String (enum) | No | `pending`, `approved`, `rejected`. Default: `pending` |
| timestamps | auto | — | createdAt, updatedAt |

### 11. Allocation
| Field | Type | Required | Notes |
|---|---|---|---|
| farmer | ObjectId (ref: User) | Yes | |
| waterSource | ObjectId (ref: WaterSource) | Yes | |
| startTime | Date | Yes | |
| endTime | Date | Yes | |
| durationMinutes | Number | Yes | |
| status | String (enum) | No | `scheduled`, `active`, `completed`, `cancelled`. Default: `scheduled` |
| isMLOptimized | Boolean | No | Default: false |
| timestamps | auto | — | createdAt, updatedAt |

---

## Setup Instructions

### Prerequisites

- **Node.js** v18+
- **MongoDB** (local install or MongoDB Atlas free tier)
- **npm** or **yarn**

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the `backend/` directory:

```env
# MongoDB connection string
MONGO_DB_URL=mongodb://localhost:27017/farmsetu

# For MongoDB Atlas (cloud):
# MONGO_DB_URL=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/farmsetu?retryWrites=true&w=majority

# JWT secret for authentication (use a strong random string)
JWT_SECRET=your_super_secret_jwt_key_change_this

# Server port
PORT=5000

# Node environment
NODE_ENV=development
```

### 3. Run the Seed Script

**Standalone (recommended for first setup):**

```bash
cd backend
node seed.js
```

**From server.js (programmatic):**

```javascript
import { seedDatabase } from './seed.js';

// Call after MongoDB connection is established
await seedDatabase();
```

### 4. Verify Seeding

After running the seed script, you should see:

```
╔══════════════════════════════════════════════╗
║     Krishi-Ai Database Seeding Script       ║
╚══════════════════════════════════════════════╝

Seeding all collections...

  ✓ Users:           34
  ✓ Products:        25
  ✓ LandRecords:     25
  ✓ GovtSchemes:     12
  ✓ WaterSources:    20
  ✓ WaterRequests:   25
  ✓ Allocations:     30
  ✓ MLHistory:       53
  ✓ Contacts:        20
  ✓ Community Posts:  22
  ✓ Chats:           20
```

### 5. Default Login Credentials

| Role | Email | Password |
|---|---|---|
| Admin | admin@krishiai.in | admin123 |
| Farmer | rajesh.sharma0@krishiai.in | password123 |
| Seller | agrimart@krishiai.in | password123 |

### 6. Start the Server

```bash
npm run server    # with nodemon (development)
npm start         # without nodemon (production)
```

The backend runs on `http://localhost:5000` by default.

---

## Environment Variables Reference

| Variable | Required | Default | Description |
|---|---|---|---|
| `MONGO_DB_URL` | Yes | — | MongoDB connection string |
| `JWT_SECRET` | Yes | — | Secret key for JWT token signing |
| `PORT` | No | 5000 | Server port |
| `NODE_ENV` | No | — | `development` or `production` |

### Frontend Environment Variables

The frontend (Vite) uses `VITE_` prefixed variables. Create `frontend/.env`:

```env
VITE_BACKEND_URL=http://localhost:5000
VITE_GEMINI_API_KEY=your_google_gemini_api_key
```

### ML Server

The Python ML server runs separately on port 5050. No additional env vars needed.

```bash
cd "ML Models"
pip install -r requirements.txt
python app.py
```

---

## Notes

- The seed script uses `deleteMany({})` to clear all existing data before seeding. **Do not run it on a production database.**
- The `contact.controller.js` was fixed from CommonJS to ES module syntax to match the rest of the codebase.
- The User model `role` enum was updated to include `'admin'` (required by the admin middleware).
- The LandRecord model was updated to include `areaInAcres` (accessed by the Parchi water scheduling controller).
- The MLHistory model `type` enum was updated to include `'yield_prediction'` (matching the ML server's yield endpoint).
