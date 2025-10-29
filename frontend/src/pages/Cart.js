import React, { useState } from 'react';
import { FaShoppingBag } from 'react-icons/fa';
import CartItem from '../components/CartItem';
import CheckoutModal from '../components/CheckoutModal';
import ReceiptModal from '../components/ReceiptModal';
import { useCart } from '../context/CartContext';
import { checkout } from '../services/api';
import toast from 'react-hot-toast';

const Cart = ({ onContinueShopping }) => {
  const { cart, removeItem, updateItem, clearCartData } = useCart();
  const [updating, setUpdating] = useState(false);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [receiptModalOpen, setReceiptModalOpen] = useState(false);
  const [receipt, setReceipt] = useState(null);

  const handleUpdateQuantity = async (itemId, quantity) => {
    try {
      setUpdating(true);
      await updateItem(itemId, quantity);
    } catch (error) {
      console.error('Error updating quantity:', error);
    } finally {
      setUpdating(false);
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      setUpdating(true);
      await removeItem(itemId);
    } catch (error) {
      console.error('Error removing item:', error);
    } finally {
      setUpdating(false);
    }
  };

  const handleCheckout = async (customerData) => {
    try {
      const response = await checkout(customerData);
      setReceipt(response.data);
      setCheckoutModalOpen(false);
      setReceiptModalOpen(true);
      clearCartData();
      toast.success('Order placed successfully!');
    } catch (error) {
      console.error('Checkout error:', error);
      const message = error.response?.data?.message || 'Checkout failed. Please try again.';
      toast.error(message);
      throw error;
    }
  };

  const handleReceiptClose = () => {
    setReceiptModalOpen(false);
    setReceipt(null);
    onContinueShopping();
  };

  if (!cart) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="spinner"></div>
        <p className="mt-5 text-lg text-gray-600">Loading cart...</p>
      </div>
    );
  }

  const isEmpty = !cart.items || cart.items.length === 0;

  return (
    <div className="py-10 md:py-16 min-h-[calc(100vh-200px)]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">🛒 Shopping Cart</h2>
          {!isEmpty && (
            <p className="text-lg text-gray-600">
              {cart.items.length} {cart.items.length === 1 ? 'item' : 'items'} in your cart
            </p>
          )}
        </div>

        {isEmpty ? (
          <div className="text-center py-20 px-5 bg-white rounded-2xl shadow-lg max-w-lg mx-auto">
            <FaShoppingBag className="text-8xl text-gray-300 mx-auto mb-6" />
            <h3 className="text-3xl font-bold text-gray-900 mb-3">Your cart is empty</h3>
            <p className="text-lg text-gray-600 mb-8">Add some items to get started!</p>
            <button 
              className="px-8 py-4 bg-primary text-white font-semibold text-lg rounded-xl hover:bg-primary-dark transition-all duration-300"
              onClick={onContinueShopping}
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">
              {cart.items.map((item) => (
                <CartItem
                  key={item._id}
                  item={item}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemove={handleRemoveItem}
                  updating={updating}
                />
              ))}
            </div>

            <div className="lg:sticky lg:top-24">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 pb-4 border-b-2 border-gray-100">
                  Order Summary
                </h3>
                
                <div className="mb-6">
                  <div className="flex justify-between items-center py-3 text-gray-600">
                    <span>Subtotal:</span>
                    <span>${cart.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 text-gray-600">
                    <span>Shipping:</span>
                    <span className="text-green-600 font-bold">FREE</span>
                  </div>
                  <div className="flex justify-between items-center py-3 text-gray-600">
                    <span>Tax:</span>
                    <span>$0.00</span>
                  </div>
                  <div className="h-0.5 bg-gray-100 my-4"></div>
                  <div className="flex justify-between items-center py-4 font-bold text-gray-900 text-xl">
                    <span>Total:</span>
                    <span className="text-3xl text-primary font-extrabold">
                      ${cart.total.toFixed(2)}
                    </span>
                  </div>
                </div>

                <button
                  className="w-full px-6 py-4 bg-primary text-white font-semibold text-lg rounded-xl hover:bg-primary-dark transition-all duration-300 mb-3 disabled:opacity-60 disabled:cursor-not-allowed"
                  onClick={() => setCheckoutModalOpen(true)}
                  disabled={updating}
                >
                  Proceed to Checkout
                </button>

                <button
                  className="w-full px-6 py-3 bg-transparent border-2 border-primary text-primary font-semibold rounded-xl hover:bg-primary hover:text-white transition-all duration-300"
                  onClick={onContinueShopping}
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <CheckoutModal
        isOpen={checkoutModalOpen}
        onClose={() => setCheckoutModalOpen(false)}
        onSubmit={handleCheckout}
        total={cart?.total || 0}
        itemCount={cart?.items?.length || 0}
      />

      <ReceiptModal
        isOpen={receiptModalOpen}
        onClose={handleReceiptClose}
        receipt={receipt}
      />
    </div>
  );
};

export default Cart;
