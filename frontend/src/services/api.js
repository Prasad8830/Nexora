import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000' + '/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Products API
export const getProducts = async () => {
  const response = await api.get('/products');
  return response.data;
};

export const getProduct = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

// Cart API
export const getCart = async () => {
  const response = await api.get('/cart');
  return response.data;
};

export const addToCart = async (productId, quantity = 1) => {
  const response = await api.post('/cart', { productId, quantity });
  return response.data;
};

export const updateCartItem = async (itemId, quantity) => {
  const response = await api.put(`/cart/${itemId}`, { quantity });
  return response.data;
};

export const removeFromCart = async (itemId) => {
  const response = await api.delete(`/cart/${itemId}`);
  return response.data;
};

export const clearCart = async () => {
  const response = await api.delete('/cart');
  return response.data;
};

// Checkout API
export const checkout = async (customerData) => {
  const response = await api.post('/checkout', customerData);
  return response.data;
};

export const getOrders = async () => {
  const response = await api.get('/checkout/orders');
  return response.data;
};

export const getOrder = async (orderId) => {
  const response = await api.get(`/checkout/orders/${orderId}`);
  return response.data;
};

export default api;
