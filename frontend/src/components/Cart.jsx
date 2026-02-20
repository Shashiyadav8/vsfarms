import React, { useState } from 'react';

const Cart = ({ cartItems, updateQuantity, removeFromCart, isOpen, closeCart }) => {
    const [customer, setCustomer] = useState({ name: '', phone: '', address: '' });

    const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

    const handleSendOrder = () => {
        if (!customer.name || !customer.phone || !customer.address) {
            alert("Please fill in all delivery details.");
            return;
        }

        if (cartItems.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        let message = `*📦 New Order for VS Farms*\n`;
        message += `Customer: ${customer.name}\n`;
        message += `Phone: ${customer.phone}\n`;
        message += `Address: ${customer.address}\n\n`;
        message += `*Order Details:*\n`;

        cartItems.forEach((item, index) => {
            message += `${index + 1}. ${item.name} - ${item.qty} ${item.unit} - ₹${item.price * item.qty}\n`;
        });

        message += `\n*Total Bill: ₹${totalAmount}*`;

        const encodedMessage = encodeURIComponent(message);
        const shopOwnerPhone = "919848782380"; // Replace with actual number
        const whatsappUrl = `https://wa.me/${shopOwnerPhone}?text=${encodedMessage}`;

        window.open(whatsappUrl, '_blank');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black opacity-50" onClick={closeCart}></div>

            {/* Cart Panel */}
            <div className="relative bg-white w-full max-w-md h-full shadow-xl flex flex-col p-4 overflow-y-auto">
                <div className="flex justify-between items-center border-b pb-4 mb-4">
                    <h2 className="text-xl font-bold">Your Cart</h2>
                    <button onClick={closeCart} className="text-gray-500 hover:text-black text-2xl">&times;</button>
                </div>

                {cartItems.length === 0 ? (
                    <div className="flex-1 flex items-center justify-center text-gray-500">Cart is empty</div>
                ) : (
                    <div className="flex-1 overflow-y-auto space-y-4">
                        {cartItems.map((item) => (
                            <div key={item.id} className="flex justify-between items-center border-b pb-2">
                                <div>
                                    <h4 className="font-semibold">{item.name}</h4>
                                    <p className="text-sm text-gray-500">₹{item.price}/{item.unit}</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => updateQuantity(item.id, item.qty - 1)}
                                        className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"
                                    >-</button>
                                    <span>{item.qty}</span>
                                    <button
                                        onClick={() => updateQuantity(item.id, item.qty + 1)}
                                        className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"
                                    >+</button>
                                    <button onClick={() => removeFromCart(item.id)} className="text-red-500 text-sm ml-2">Remove</button>
                                </div>
                            </div>
                        ))}

                        <div className="border-t pt-4 mt-4">
                            <div className="flex justify-between text-lg font-bold">
                                <span>Total</span>
                                <span>₹{totalAmount}</span>
                            </div>
                        </div>

                        {/* Customer Details Form */}
                        <div className="mt-6 space-y-3">
                            <h3 className="font-semibold text-gray-700">Delivery Details</h3>
                            <input
                                type="text"
                                placeholder="Name"
                                className="w-full p-2 border rounded"
                                value={customer.name}
                                onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                            />
                            <input
                                type="tel"
                                placeholder="Phone Number"
                                className="w-full p-2 border rounded"
                                value={customer.phone}
                                onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                            />
                            <textarea
                                placeholder="Address"
                                className="w-full p-2 border rounded h-20"
                                value={customer.address}
                                onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                            ></textarea>
                        </div>
                    </div>
                )}

                <div className="mt-4 pt-4 border-t">
                    <button
                        onClick={handleSendOrder}
                        className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 flex items-center justify-center gap-2"
                    >
                        <span>Place Order on WhatsApp</span>
                        {/* WhatsApp Icon SVG could go here */}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
