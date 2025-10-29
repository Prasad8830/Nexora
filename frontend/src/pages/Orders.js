import React, { useState, useEffect } from 'react';
import { FaBox, FaCalendar, FaShoppingBag, FaReceipt } from 'react-icons/fa';
import { getOrders } from '../services/api';

const Orders = ({ onContinueShopping }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await getOrders();
      setOrders(response.data || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError('Failed to load orders. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const toggleOrderDetails = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="spinner"></div>
        <p className="mt-5 text-lg text-gray-600">Loading your orders...</p>
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
            onClick={fetchOrders}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const isEmpty = orders.length === 0;

  return (
    <div className="py-10 md:py-16 min-h-[calc(100vh-200px)]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">📦 My Orders</h2>
          <p className="text-lg text-gray-600">
            {isEmpty ? 'No orders yet' : `You have ${orders.length} ${orders.length === 1 ? 'order' : 'orders'}`}
          </p>
        </div>

        {isEmpty ? (
          <div className="text-center py-20 px-5 bg-white rounded-2xl shadow-lg max-w-lg mx-auto">
            <FaShoppingBag className="text-8xl text-gray-300 mx-auto mb-6" />
            <h3 className="text-3xl font-bold text-gray-900 mb-3">No orders yet</h3>
            <p className="text-lg text-gray-600 mb-8">Start shopping to see your orders here!</p>
            <button 
              className="px-8 py-4 bg-primary text-white font-semibold text-lg rounded-xl hover:bg-primary-dark transition-all duration-300"
              onClick={onContinueShopping}
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div 
                key={order._id} 
                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                {/* Order Header */}
                <div 
                  className="p-6 bg-gradient-to-r from-purple-50 to-purple-100 cursor-pointer hover:from-purple-100 hover:to-purple-200 transition-all"
                  onClick={() => toggleOrderDetails(order._id)}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="bg-primary text-white p-3 rounded-xl">
                        <FaBox size={24} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-bold text-gray-900">
                            Order #{order.orderNumber || order._id.slice(-8).toUpperCase()}
                          </h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                            order.status === 'completed' 
                              ? 'bg-green-100 text-green-700' 
                              : order.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-blue-100 text-blue-700'
                          }`}>
                            {order.status || 'Completed'}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <FaCalendar size={12} />
                          <span>{formatDate(order.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between md:justify-end gap-6">
                      <div className="text-right">
                        <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                        <p className="text-2xl font-extrabold text-primary">
                          ${order.total.toFixed(2)}
                        </p>
                      </div>
                      <button className="text-primary hover:text-primary-dark transition-all">
                        <span className="text-xl">{expandedOrder === order._id ? '▼' : '▶'}</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Order Details - Expandable */}
                {expandedOrder === order._id && (
                  <div className="p-6 border-t border-gray-100 animate-fade-in">
                    {/* Customer Info */}
                    <div className="mb-6 pb-6 border-b border-gray-100">
                      <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <FaReceipt className="text-primary" />
                        Customer Information
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Name:</span>
                          <span className="ml-2 font-semibold text-gray-900">{order.customerName}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Email:</span>
                          <span className="ml-2 font-semibold text-gray-900">{order.customerEmail}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Phone:</span>
                          <span className="ml-2 font-semibold text-gray-900">{order.customerPhone}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Address:</span>
                          <span className="ml-2 font-semibold text-gray-900">{order.shippingAddress}</span>
                        </div>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-4">Order Items ({order.items.length})</h4>
                      <div className="space-y-3">
                        {order.items.map((item, index) => (
                          <div 
                            key={index}
                            className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all"
                          >
                            <div className="w-20 h-20 bg-white rounded-lg overflow-hidden shadow-sm flex-shrink-0">
                              <img 
                                src={item.product?.image || item.image || 'https://via.placeholder.com/80'} 
                                alt={item.product?.name || item.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.src = 'https://via.placeholder.com/80?text=Product';
                                }}
                              />
                            </div>
                            <div className="flex-grow">
                              <h5 className="font-bold text-gray-900 mb-1">
                                {item.product?.name || item.name}
                              </h5>
                              <p className="text-sm text-gray-600">
                                Quantity: <span className="font-semibold">{item.quantity}</span>
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-gray-600 mb-1">Price</p>
                              <p className="text-xl font-bold text-primary">
                                ${item.price.toFixed(2)}
                              </p>
                              <p className="text-xs text-gray-500">
                                ${(item.price * item.quantity).toFixed(2)} total
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Order Summary */}
                      <div className="mt-6 pt-6 border-t-2 border-gray-200">
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-bold text-gray-900">Order Total:</span>
                          <span className="text-3xl font-extrabold text-primary">
                            ${order.total.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
