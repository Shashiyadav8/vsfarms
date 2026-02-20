const mongoose = require('mongoose');
const Product = require('./models/Product');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/kiranam_store')
    .then(() => console.log('MongoDB Connected for Seeding'))
    .catch(err => console.log(err));

const seedProducts = [
    {
        name: "Basmati Rice",
        category: "Grains",
        price: 120,
        unit: "kg",
        image: "https://placehold.co/200x200?text=Rice",
    },
    {
        name: "Toor Dal",
        category: "Pulses",
        price: 150,
        unit: "kg",
        image: "https://placehold.co/200x200?text=Toor+Dal",
    },
    {
        name: "Sunflower Oil",
        category: "Oil",
        price: 180,
        unit: "liter",
        image: "https://placehold.co/200x200?text=Oil",
    },
    {
        name: "Sugar",
        category: "Essentials",
        price: 45,
        unit: "kg",
        image: "https://placehold.co/200x200?text=Sugar",
    },
    {
        name: "Salt",
        category: "Essentials",
        price: 20,
        unit: "pkt",
        image: "https://placehold.co/200x200?text=Salt",
    },
    {
        name: "Turmeric Powder",
        category: "Spices",
        price: 80,
        unit: "200g",
        image: "https://placehold.co/200x200?text=Turmeric",
    },
];

const seedDB = async () => {
    await Product.deleteMany({});
    await Product.insertMany(seedProducts);
    console.log('Database Seeded!');
    mongoose.connection.close();
};

seedDB();
