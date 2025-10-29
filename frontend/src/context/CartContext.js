import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCart, addToCart, removeFromCart, updateCartItem } from '../services/api';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch cart on mount
  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const data = await getCart();
      setCart(data.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
      toast.error('Failed to load cart');
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (productId, quantity = 1) => {
    try {
      const data = await addToCart(productId, quantity);
      setCart(data.data);
      toast.success('Item added to cart!');
      return data;
    } catch (error) {
      console.error('Error adding to cart:', error);
      const message = error.response?.data?.message || 'Failed to add item to cart';
      toast.error(message);
      throw error;
    }
  };

  const removeItem = async (itemId) => {
    try {
      const data = await removeFromCart(itemId);
      setCart(data.data);
      toast.success('Item removed from cart');
      return data;
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast.error('Failed to remove item');
      throw error;
    }
  };

  const updateItem = async (itemId, quantity) => {
    try {
      const data = await updateCartItem(itemId, quantity);
      setCart(data.data);
      return data;
    } catch (error) {
      console.error('Error updating cart:', error);
      const message = error.response?.data?.message || 'Failed to update item';
      toast.error(message);
      throw error;
    }
  };

  const clearCartData = () => {
    setCart({ items: [], total: 0 });
  };

  const cartItemCount = cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  const value = {
    cart,
    loading,
    addItem,
    removeItem,
    updateItem,
    fetchCart,
    clearCartData,
    cartItemCount
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
