const mongoose = require('mongoose');
const Product = require('./models/Product');
const dotenv = require('dotenv');

dotenv.config();

const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/kiranam_store';
console.log('Connecting to:', uri);

mongoose.connect(uri)
    .then(async () => {
        console.log('Diagnostic: Connected to MongoDB');
        try {
            const count = await Product.countDocuments();
            console.log(`Diagnostic: Found ${count} products`);
            const products = await Product.find();
            console.log('Diagnostic: Products:', products.map(p => p.name));
        } catch (e) {
            console.error('Diagnostic Error:', e);
        } finally {
            mongoose.disconnect();
        }
    })
    .catch(err => console.error('Diagnostic Connection Error:', err));
