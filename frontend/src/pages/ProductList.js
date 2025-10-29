import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../services/api';
import { useCart } from '../context/CartContext';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingItem, setUpdatingItem] = useState(null);
  const { cart, addItem, updateItem, removeItem } = useCart();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      setUpdatingItem(productId);
      await addItem(productId, 1);
    } catch (err) {
      console.error('Error adding to cart:', err);
    } finally {
      setUpdatingItem(null);
    }
  };

  const handleUpdateQuantity = async (itemId, quantity) => {
    try {
      setUpdatingItem(itemId);
      await updateItem(itemId, quantity);
    } catch (err) {
      console.error('Error updating quantity:', err);
    } finally {
      setUpdatingItem(null);
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      setUpdatingItem(itemId);
      await removeItem(itemId);
    } catch (err) {
      console.error('Error removing item:', err);
    } finally {
      setUpdatingItem(null);
    }
  };

  const getCartItem = (productId) => {
    return cart?.items?.find(item => item.product?._id === productId || item.productId === productId);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="spinner"></div>
        <p className="mt-5 text-lg text-gray-600">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="max-w-lg p-10 bg-white rounded-2xl shadow-lg text-center">
          <h2 className="text-5xl mb-4">😕 Oops!</h2>
          <p className="text-lg text-gray-600 mb-6">{error}</p>
          <button 
            className="px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-all duration-300"
            onClick={fetchProducts}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10 md:py-16 min-h-[calc(100vh-200px)]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">Featured Products</h2>
          <p className="text-lg text-gray-600">Discover our amazing collection of electronics and accessories</p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-16 px-5 text-gray-600">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No products available</h3>
            <p className="text-lg">Check back soon for new items!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {products.map((product) => {
              const cartItem = getCartItem(product._id);
              return (
                <ProductCard
                  key={product._id}
                  product={product}
                  cartItem={cartItem}
                  onAddToCart={handleAddToCart}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemove={handleRemoveItem}
                  loading={updatingItem === product._id || updatingItem === cartItem?._id}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
