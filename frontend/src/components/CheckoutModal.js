import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const CheckoutModal = ({ isOpen, onClose, onSubmit, total, itemCount }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: ''
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors = {};

    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Name is required';
    } else if (formData.customerName.trim().length < 2) {
      newErrors.customerName = 'Name must be at least 2 characters';
    }

    if (!formData.customerEmail.trim()) {
      newErrors.customerEmail = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.customerEmail)) {
      newErrors.customerEmail = 'Please enter a valid email';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit(formData);
      // Reset form on success
      setFormData({ customerName: '', customerEmail: '' });
      setErrors({});
    } catch (error) {
      console.error('Checkout error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[1000] p-5 animate-fade-in" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto relative animate-slide-up shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <button 
          className="absolute top-5 right-5 bg-gray-100 w-9 h-9 rounded-full flex items-center justify-center text-gray-600 hover:bg-red-500 hover:text-white transition-all duration-200 hover:rotate-90 z-10"
          onClick={onClose} 
          aria-label="Close modal"
        >
          <FaTimes className="text-lg" />
        </button>

        <div className="p-8 pb-5 border-b-2 border-gray-100">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">🛒 Checkout</h2>
          <p className="text-gray-600">Complete your order</p>
        </div>

        <div className="px-8 py-6 bg-gray-50 border-b-2 border-gray-100">
          <div className="flex justify-between items-center py-2 text-gray-600">
            <span>Items:</span>
            <span>{itemCount}</span>
          </div>
          <div className="flex justify-between items-center py-3 mt-3 border-t-2 border-dashed border-gray-300 font-bold text-gray-900 text-lg">
            <span>Total:</span>
            <span className="text-2xl text-primary">${total.toFixed(2)}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8">
          <div className="mb-6">
            <label htmlFor="customerName" className="block mb-2 font-semibold text-gray-900 text-sm">
              Full Name *
            </label>
            <input
              type="text"
              id="customerName"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className={`w-full px-4 py-3 border-2 rounded-lg text-base transition-all duration-200 ${
                errors.customerName 
                  ? 'border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-100' 
                  : 'border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10'
              } outline-none`}
              disabled={submitting}
            />
            {errors.customerName && (
              <span className="block text-red-500 text-sm mt-1.5 font-medium">
                {errors.customerName}
              </span>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="customerEmail" className="block mb-2 font-semibold text-gray-900 text-sm">
              Email Address *
            </label>
            <input
              type="email"
              id="customerEmail"
              name="customerEmail"
              value={formData.customerEmail}
              onChange={handleChange}
              placeholder="your.email@example.com"
              className={`w-full px-4 py-3 border-2 rounded-lg text-base transition-all duration-200 ${
                errors.customerEmail 
                  ? 'border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-100' 
                  : 'border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10'
              } outline-none`}
              disabled={submitting}
            />
            {errors.customerEmail && (
              <span className="block text-red-500 text-sm mt-1.5 font-medium">
                {errors.customerEmail}
              </span>
            )}
          </div>

          <div className="flex gap-3 mt-8">
            <button
              type="button"
              className="flex-1 px-6 py-3 bg-transparent border-2 border-primary text-primary rounded-xl font-semibold hover:bg-primary hover:text-white transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
              onClick={onClose}
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
              disabled={submitting}
            >
              {submitting ? 'Processing...' : 'Place Order'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutModal;
