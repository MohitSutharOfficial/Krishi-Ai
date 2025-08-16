import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

let isConnected = false;

const connectToMongoDb = async () => {
    if (isConnected) return;

    try {
        const conn = await mongoose.connect(process.env.MONGO_DB_URL);
        isConnected = true;
        console.log(`Connected to database`);
    } catch (err) {
        console.log(`Error connecting to db: ${err}`);
    }
}
export default connectToMongoDb;