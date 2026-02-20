import React from 'react';

const StickyCart = ({ count, total, openCart }) => {
    if (count === 0) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-40 md:hidden border-t border-gray-200">
            <div className="flex justify-between items-center max-w-7xl mx-auto">
                <div>
                    <p className="text-gray-500 text-xs font-medium uppercase tracking-wider">{count} Items</p>
                    <p className="text-lg font-bold text-gray-900">₹{total}</p>
                </div>
                <button
                    onClick={openCart}
                    className="bg-green-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-green-700 active:scale-95 transition-all flex items-center gap-2"
                >
                    View Cart
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default StickyCart;
