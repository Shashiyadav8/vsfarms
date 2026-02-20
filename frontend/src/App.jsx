import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import Cart from './components/Cart';
import AdminDashboard from './components/AdminDashboard';
import StickyCart from './components/StickyCart';

function Shop({ products, cart, addToCart, updateQuantity, removeFromCart }) {
  return (
    <main className="container mx-auto p-4 flex-1 pb-24 md:pb-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Natural Products</h2>
        <Link to="/admin" className="text-sm text-gray-500 hover:text-black">Admin Login</Link>
      </div>

      {/* Milk Pre-order Banner */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-r shadow-sm">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-base text-blue-800 font-bold">
              🥛 Milk & Curd Pre-order / పాలు & పెరుగు ఆర్డర్
            </p>
            <p className="text-sm text-blue-700 mt-1">
              Please order Milk & Curd <strong>1 day before</strong> for fresh delivery.
              <br />
              <span className="font-medium">తాజా పాలు మరియు పెరుగు కోసం దయచేసి ఒక రోజు ముందే ఆర్డర్ చేయండి.</span>
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map(product => (
          <ProductCard
            key={product._id}
            product={product}
            cartItem={cart.find(item => item.id === product._id)}
            addToCart={addToCart}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
          />
        ))}
      </div>
    </main>
  );
}

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    fetch(`${apiUrl}/api/products`)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Error fetching products:", err));
  }, []);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product._id);
      if (existing) {
        return prev.map(item => item.id === product._id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...product, id: product._id, qty: 1 }];
    });
    // Removed setIsCartOpen(true) to allow continuous browsing
  };

  const updateQuantity = (id, newQty) => {
    if (newQty < 1) {
      removeFromCart(id);
      return;
    }
    setCart(prev => prev.map(item => item.id === id ? { ...item, qty: newQty } : item));
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);
  const totalAmount = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <Header cartCount={totalItems} toggleCart={() => setIsCartOpen(!isCartOpen)} />

        <Routes>
          <Route path="/" element={
            <Shop
              products={products}
              cart={cart}
              addToCart={addToCart}
              updateQuantity={updateQuantity}
              removeFromCart={removeFromCart}
            />
          } />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>

        <Cart
          cartItems={cart}
          updateQuantity={updateQuantity}
          removeFromCart={removeFromCart}
          isOpen={isCartOpen}
          closeCart={() => setIsCartOpen(false)}
        />

        <StickyCart
          count={totalItems}
          total={totalAmount}
          openCart={() => setIsCartOpen(true)}
        />

        <footer className="bg-gray-800 text-white p-4 text-center mt-8 mb-16 md:mb-0">
          <p>&copy; 2026 VS Farms. Natural & Fresh.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
