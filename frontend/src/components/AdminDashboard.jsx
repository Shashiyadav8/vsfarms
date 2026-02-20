import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [products, setProducts] = useState([]);
    const [newItem, setNewItem] = useState({
        name: '',
        category: '',
        price: '',
        unit: '',
        image: null
    });

    useEffect(() => {
        if (isAuthenticated) {
            fetchProducts();
        }
    }, [isAuthenticated]);

    const fetchProducts = () => {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        fetch(`${apiUrl}/api/products`)
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(err => console.error(err));
    };

    const handleLogin = (e) => {
        e.preventDefault();
        const correctPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123';
        if (password === correctPassword) {
            setIsAuthenticated(true);
        } else {
            alert('Invalid Password');
        }
    };

    const handleInputChange = (e) => {
        if (e.target.name === 'image') {
            setNewItem({ ...newItem, image: e.target.files[0] });
        } else {
            setNewItem({ ...newItem, [e.target.name]: e.target.value });
        }
    };

    const addProduct = async (e) => {
        e.preventDefault();
        if (!newItem.name || !newItem.price) return;

        const formData = new FormData();
        formData.append('name', newItem.name);
        formData.append('category', newItem.category);
        formData.append('price', newItem.price);
        formData.append('unit', newItem.unit);
        if (newItem.image) {
            formData.append('image', newItem.image);
        }

        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const res = await fetch(`${apiUrl}/api/products`, {
                method: 'POST',
                body: formData
            });
            if (res.ok) {
                // Reset form but keep unit/category for convenience if needed, or clear all
                setNewItem({ name: '', category: '', price: '', unit: '', image: null });
                // Reset file input manually
                document.querySelector('input[type="file"]').value = '';
                fetchProducts();
            } else {
                const errorData = await res.json();
                alert(`Error adding product: ${errorData.message}`);
            }
        } catch (err) {
            console.error(err);
            alert('Failed to add product');
        }
    };

    const deleteProduct = async (id) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;

        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            await fetch(`${apiUrl}/api/products/${id}`, { method: 'DELETE' });
            fetchProducts();
        } catch (err) {
            console.error(err);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-md w-96">
                    <h1 className="text-2xl font-bold mb-6 text-center text-green-700">VS Farms Admin</h1>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <input
                            type="password"
                            placeholder="Enter Admin Password"
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 font-bold transition"
                        >
                            Login
                        </button>
                    </form>
                    <div className="mt-4 text-center">
                        <Link to="/" className="text-blue-500 hover:underline">Back to Shop</Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="container mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-green-800">VS Farms Dashboard</h1>
                    <button
                        onClick={() => setIsAuthenticated(false)}
                        className="text-red-600 hover:underline font-medium"
                    >
                        Logout
                    </button>
                </div>

                {/* Add Product Form */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                    <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
                    <form onSubmit={addProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="text" name="name" placeholder="Product Name"
                            value={newItem.name} onChange={handleInputChange}
                            className="p-2 border rounded" required
                        />
                        <input
                            type="text" name="category" placeholder="Category"
                            value={newItem.category} onChange={handleInputChange}
                            className="p-2 border rounded" required
                        />
                        <input
                            type="number" name="price" placeholder="Price"
                            value={newItem.price} onChange={handleInputChange}
                            className="p-2 border rounded" required
                        />
                        <input
                            type="text" name="unit" placeholder="Unit (e.g., kg, pkt)"
                            value={newItem.unit} onChange={handleInputChange}
                            className="p-2 border rounded" required
                        />
                        {/* File Input */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
                            <input
                                type="file" name="image"
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded bg-gray-50 text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
                            />
                        </div>

                        <button
                            type="submit"
                            className="md:col-span-2 bg-green-600 text-white py-3 rounded hover:bg-green-700 font-bold shadow-md transition"
                        >
                            Add Product
                        </button>
                    </form>
                </div>

                {/* Product List */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Product List</h2>
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b bg-gray-50">
                                <th className="p-3">Image</th>
                                <th className="p-3">Name</th>
                                <th className="p-3">Price</th>
                                <th className="p-3">Category</th>
                                <th className="p-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr key={product._id} className="border-b hover:bg-gray-50">
                                    <td className="p-3">
                                        <img
                                            src={product.image || 'https://placehold.co/50?text=?'}
                                            alt={product.name}
                                            className="w-16 h-16 object-cover rounded shadow-sm"
                                            onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/50?text=Error'; }}
                                        />
                                    </td>
                                    <td className="p-3 font-medium">{product.name}</td>
                                    <td className="p-3 text-green-700 font-bold">₹{product.price} / {product.unit}</td>
                                    <td className="p-3 text-gray-600">{product.category}</td>
                                    <td className="p-3">
                                        <button
                                            onClick={() => deleteProduct(product._id)}
                                            className="bg-red-500 text-white px-4 py-2 rounded text-sm hover:bg-red-600 shadow-sm transition"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {products.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="p-4 text-center text-gray-500">No products found. Add one above!</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
