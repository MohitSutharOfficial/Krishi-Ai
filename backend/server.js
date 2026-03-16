import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import connectToMongoDb from './db/connectMongo.js';
import newsRoutes from './routes/news.routes.js';
import marketRoutes from './routes/market.routes.js';
import contactRoutes from './routes/contact.routes.js';
import allusers from './routes/allusers.routes.js';
import userRoute from './routes/userRoute.routes.js';
import chats from './routes/chats.routes.js';
import productRoutes from './routes/products.routes.js';
import userCartRoute from './routes/userCartRoute.routes.js';
import communityRoute from './routes/communityRoute.routes.js';
import homeRoute from './routes/home.routes.js';
import mlRoutes from './routes/ml.routes.js';
import parchiRoutes from './routes/parchi.routes.js';
import adminRoutes from './routes/admin.routes.js';
import schemesRoutes from './routes/schemes.routes.js';
import chatRoutes from './routes/chat.routes.js';
import cookieParser from 'cookie-parser';
dotenv.config();
const app = express();

// CORS — only allow your frontend domain
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean);
app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (ALLOWED_ORIGINS.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    next();
});

const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB (cached for serverless reuse)
connectToMongoDb();

app.use('/', homeRoute);
app.use('/api/auth', authRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/marketdata', marketRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/users', allusers);
app.use('/api/user', userRoute);
app.use('/api/chats', chats);
app.use('/api/products', productRoutes);
app.use('/api/profile/cart', userCartRoute);
app.use('/api/community', communityRoute);
app.use('/api/ml', mlRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/parchi', parchiRoutes);
app.use('/api/schemes', schemesRoutes);
app.use('/api/chat', chatRoutes);

// Only listen when running locally (not on Vercel serverless)
if (!process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

// Export for Vercel serverless
export default app;