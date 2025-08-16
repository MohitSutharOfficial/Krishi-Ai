import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.model.js';
dotenv.config();

const updates = [
    { name: 'DAP Fertilizer 50kg', image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop' },
    { name: 'Urea 45kg Bag', image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=300&fit=crop' },
    { name: 'NPK 10-26-26 50kg', image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=300&fit=crop' },
    { name: 'Vermicompost 25kg', image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop' },
    { name: 'HD-2967 Wheat Seeds 40kg', image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop' },
    { name: 'Pusa Basmati-1 Rice Seeds 20kg', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop' },
    { name: 'GHB-558 Bajra Seeds 5kg', image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop' },
    { name: 'Drip Irrigation Kit (1 Acre)', image: 'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?w=400&h=300&fit=crop' },
    { name: 'Sprinkler Set (30 nos)', image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400&h=300&fit=crop' },
    { name: 'Solar Water Pump 3HP', image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=300&fit=crop' },
    { name: 'Imidacloprid 17.8% SL 250ml', image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=400&h=300&fit=crop' },
    { name: 'Mancozeb 75% WP 1kg', image: 'https://images.unsplash.com/photo-1592982537447-6f2a6a0c8b8b?w=400&h=300&fit=crop' },
    { name: 'Neem Oil 1 Litre', image: 'https://images.unsplash.com/photo-1611241893603-3c359704e0ee?w=400&h=300&fit=crop' },
    { name: 'Battery Operated Sprayer 16L', image: 'https://images.unsplash.com/photo-1622383563227-04401ab4e5ea?w=400&h=300&fit=crop' },
    { name: 'Power Tiller 9HP', image: 'https://images.unsplash.com/photo-1580674285054-bed31e145f59?w=400&h=300&fit=crop' },
    { name: 'Manual Seed Drill', image: 'https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?w=400&h=300&fit=crop' },
    { name: 'Khurpi Set (6 pcs)', image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop' },
    { name: 'Garden Pruning Secateur', image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400&h=300&fit=crop' },
    { name: 'Polyhouse 500 sqm', image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400&h=300&fit=crop' },
    { name: 'Digital Soil Testing Kit', image: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=400&h=300&fit=crop' },
    { name: 'Weather Station Mini', image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=400&h=300&fit=crop' },
    { name: 'Organic Compost Bin 200L', image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop' },
    { name: 'Solar Panel 100W', image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=400&h=300&fit=crop' },
    { name: 'Tarpaulin 12x18 ft', image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=400&h=300&fit=crop' },
    { name: 'Sugarcane Crusher Manual', image: 'https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?w=400&h=300&fit=crop' }
];

await mongoose.connect(process.env.MONGO_DB_URL);
console.log('Connected. Updating product images...');
let updated = 0;
for (const p of updates) {
    const result = await Product.updateOne({ name: p.name }, { $set: { image: p.image } });
    if (result.modifiedCount > 0) updated++;
}
console.log(`Updated ${updated} out of ${updates.length} product images`);
await mongoose.connection.close();
console.log('Done.');
