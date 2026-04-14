import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectToMongoDb = async () => {
    // readyState: 0=disconnected, 1=connected, 2=connecting, 3=disconnecting
    if (mongoose.connection.readyState === 1) {
        return; // already connected — reuse on warm lambda
    }

    try {
        await mongoose.connect(process.env.MONGO_DB_URL, {
            serverSelectionTimeoutMS: 10000, // fail fast if Atlas is unreachable
            socketTimeoutMS: 45000,
            maxPoolSize: 10,                 // keep pool small for serverless
            bufferCommands: false,           // ← KEY: don't buffer, throw immediately
        });
        console.log('✅ Connected to MongoDB');
    } catch (err) {
        console.error(`❌ MongoDB connection error: ${err.message}`);
        throw err; // re-throw so the API handler returns 500 instead of timing out
    }
};

export default connectToMongoDb;