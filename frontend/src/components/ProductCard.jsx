import React from 'react';

const ProductCard = ({ product, cartItem, addToCart, updateQuantity }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col border border-gray-100">
            <div className="relative">
                <img
                    src={product.image || 'https://placehold.co/200x200?text=' + product.name}
                    alt={product.name}
                    className="w-full h-32 md:h-40 object-cover"
                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/200x200?text=' + product.name; }}
                />
                {cartItem && (
                    <div className="absolute top-2 right-2 bg-green-600 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-sm">
                        {cartItem.qty} in cart
                    </div>
                )}
            </div>

            <div className="p-3 flex-1 flex flex-col justify-between">
                <div>
                    <h3 className="text-base font-bold text-gray-800 leading-tight mb-1 truncate">{product.name}</h3>
                    <div className="flex justify-between items-baseline mb-2">
                        <p className="text-gray-500 text-xs font-medium">{product.unit}</p>
                        <p className="text-base font-bold text-green-700">₹{product.price}</p>
                    </div>
                </div>

                {cartItem ? (
                    <div className="flex items-center justify-between bg-green-50 rounded-lg p-1 mt-auto">
                        <button
                            onClick={() => updateQuantity(product._id, cartItem.qty - 1)}
                            className="w-8 h-8 flex items-center justify-center bg-white text-green-700 rounded-md shadow-sm border border-green-200 hover:bg-green-100 font-bold text-lg"
                        >
                            -
                        </button>
                        <span className="font-bold text-gray-800 text-base">{cartItem.qty}</span>
                        <button
                            onClick={() => addToCart(product)}
                            className="w-8 h-8 flex items-center justify-center bg-green-600 text-white rounded-md shadow-sm hover:bg-green-700 font-bold text-lg"
                        >
                            +
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={() => addToCart(product)}
                        className="mt-auto w-full bg-white text-green-600 border border-green-600 py-2 rounded-lg hover:bg-green-50 font-bold text-sm transition-colors duration-200 flex items-center justify-center gap-1 group"
                    >
                        <span>Add</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                    </button>
                )}
            </div>
        </div>
    );
};

export default ProductCard;
