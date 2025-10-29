import React from 'react';
import { FaShoppingCart, FaBars, FaTimes, FaBox } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

const Header = ({ onCartClick, onHomeClick, onOrdersClick, currentView }) => {
  const { cartItemCount } = useCart();
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <header className="bg-gradient-to-r from-purple-600 to-purple-800 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-5">
          <div 
            className="cursor-pointer transition-transform hover:scale-105"
            onClick={onHomeClick}
          >
            <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
              🛍️ Vibe Commerce
            </h1>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-white text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>

          {/* Navigation */}
          <nav className={`
            ${menuOpen ? 'flex' : 'hidden'} md:flex
            absolute md:relative top-full left-0 right-0 md:top-auto
            flex-col md:flex-row gap-3 md:gap-4 items-center
            bg-gradient-to-r from-purple-600 to-purple-800 md:bg-none
            p-5 md:p-0
            transition-all duration-300 ease-in-out
          `}>
            <button
              className={`
                w-full md:w-auto px-5 py-2.5 rounded-full font-semibold
                transition-all duration-300 flex items-center justify-center gap-2
                ${currentView === 'products' 
                  ? 'bg-white text-purple-600' 
                  : 'bg-white/20 hover:bg-white/30'
                }
              `}
              onClick={() => {
                onHomeClick();
                setMenuOpen(false);
              }}
            >
              Products
            </button>
            <button
              className={`
                w-full md:w-auto px-5 py-2.5 rounded-full font-semibold
                transition-all duration-300 flex items-center justify-center gap-2
                ${currentView === 'orders' 
                  ? 'bg-white text-purple-600' 
                  : 'bg-white/20 hover:bg-white/30'
                }
              `}
              onClick={() => {
                onOrdersClick();
                setMenuOpen(false);
              }}
            >
              <FaBox />
              <span>My Orders</span>
            </button>
            <button
              className={`
                w-full md:w-auto px-5 py-2.5 rounded-full font-semibold
                transition-all duration-300 flex items-center justify-center gap-2 relative
                ${currentView === 'cart' 
                  ? 'bg-white text-purple-600' 
                  : 'bg-white/20 hover:bg-white/30'
                }
              `}
              onClick={() => {
                onCartClick();
                setMenuOpen(false);
              }}
            >
              <FaShoppingCart />
              <span>Cart</span>
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold border-2 border-white">
                  {cartItemCount}
                </span>
              )}
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
