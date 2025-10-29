import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import ProductList from './pages/ProductList';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import { CartProvider } from './context/CartContext';

function App() {
  const [currentView, setCurrentView] = useState('products');

  const handleCartClick = () => {
    setCurrentView('cart');
  };

  const handleHomeClick = () => {
    setCurrentView('products');
  };

  const handleOrdersClick = () => {
    setCurrentView('orders');
  };

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-gray-100">
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#fff',
              color: '#1f2937',
              padding: '16px',
              borderRadius: '12px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              fontWeight: '600'
            },
            success: {
              iconTheme: {
                primary: '#10b981',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
        
        <Header
          onCartClick={handleCartClick}
          onHomeClick={handleHomeClick}
          onOrdersClick={handleOrdersClick}
          currentView={currentView}
        />

        <main className="flex-1">
          {currentView === 'products' ? (
            <ProductList />
          ) : currentView === 'cart' ? (
            <Cart onContinueShopping={handleHomeClick} />
          ) : (
            <Orders onContinueShopping={handleHomeClick} />
          )}
        </main>

        <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-8 mt-16 text-center">
          <div className="max-w-7xl mx-auto px-4">
            <p className="opacity-90 text-sm">© 2025 Vibe Commerce.</p>
          </div>
        </footer>
      </div>
    </CartProvider>
  );
}

export default App;
