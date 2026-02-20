import React from 'react';

const Header = ({ cartCount, toggleCart }) => {
    return (
        <header className="bg-green-600 text-white p-4 sticky top-0 z-50 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <img
                        src="/logo.png"
                        alt="VS Farms Logo"
                        className="h-20 w-20 md:h-24 md:w-24 rounded-full border-4 border-white shadow-lg transform hover:scale-105 transition-transform duration-300 z-10"
                        onError={(e) => { e.target.onerror = null; e.target.src = '/logo.svg'; }}
                    />
                    <h1 className="text-3xl font-bold tracking-wide text-white drop-shadow-md hidden md:block">VS Farms</h1>
                </div>
                <button
                    onClick={toggleCart}
                    className="relative px-4 py-2 bg-green-700 rounded-md hover:bg-green-800 transition"
                >
                    <span>🛒 Cart</span>
                    {cartCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full px-2 py-0.5">
                            {cartCount}
                        </span>
                    )}
                </button>
            </div>
        </header>
    );
};

export default Header;
