const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const corsOptions = {
    origin: ['https://vsfarms-frontend.onrender.com', 'http://localhost:5173'],
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/kiranam_store')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// We just need to define how the files are stored
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'vs_farms_products', // The folder name in your Cloudinary account
        allowed_formats: ['jpg', 'png', 'jpeg', 'webp', 'jfif', 'svg'],
    },
});

const upload = multer({ storage: storage });

// Routes
const Product = require('./models/Product');

// Get all products
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a new product (with image upload)
app.post('/api/products', upload.single('image'), async (req, res) => {
    // Cloudinary automatically provides the uploaded image URL inside req.file.path
    const imageUrl = req.file ? req.file.path : req.body.image;

    const product = new Product({
        name: req.body.name,
        category: req.body.category,
        price: req.body.price,
        unit: req.body.unit,
        image: imageUrl
    });

    try {
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a product
app.delete('/api/products/:id', async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: 'Product deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Global Error Handler for Multer / Cloudinary / Express
app.use((err, req, res, next) => {
    console.error('Backend Error:', err);
    res.status(500).json({ message: err.message || 'Fatal Server Error' });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
