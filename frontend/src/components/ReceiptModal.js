import React from 'react';
import { FaTimes, FaCheckCircle, FaDownload } from 'react-icons/fa';

const ReceiptModal = ({ isOpen, onClose, receipt }) => {
  if (!isOpen || !receipt) return null;

  const formatDate = (date) => {
    return new Date(date).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[1000] p-5 animate-fade-in" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative animate-slide-up shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <button 
          className="absolute top-5 right-5 bg-gray-100 w-9 h-9 rounded-full flex items-center justify-center text-gray-600 hover:bg-red-500 hover:text-white transition-all duration-200 hover:rotate-90 z-10 print:hidden"
          onClick={onClose} 
          aria-label="Close receipt"
        >
          <FaTimes className="text-lg" />
        </button>

        <div className="text-center p-10 pb-8 border-b-2 border-gray-100">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full text-white text-5xl mb-5 animate-scale-in">
            <FaCheckCircle />
          </div>
          <h2 className="text-4xl font-extrabold text-gray-900 mb-2">Order Successful!</h2>
          <p className="text-gray-600 text-lg">Thank you for your purchase</p>
        </div>

        <div className="p-8">
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-100">
              Order Details
            </h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-600 font-semibold text-sm">Order Number:</span>
                <span className="text-gray-900 font-medium text-right">{receipt.orderNumber}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-600 font-semibold text-sm">Date:</span>
                <span className="text-gray-900 font-medium text-right">{formatDate(receipt.timestamp)}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-600 font-semibold text-sm">Customer Name:</span>
                <span className="text-gray-900 font-medium text-right">{receipt.customerName}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600 font-semibold text-sm">Email:</span>
                <span className="text-gray-900 font-medium text-right">{receipt.customerEmail}</span>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-100">
              Items Purchased
            </h3>
            <div className="bg-gray-50 rounded-lg p-4">
              {receipt.items.map((item, index) => (
                <div key={index} className="flex justify-between items-center py-3 border-b border-gray-200 last:border-b-0">
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-gray-900">{item.name}</span>
                    <span className="text-sm text-gray-600">x{item.quantity}</span>
                  </div>
                  <span className="font-bold text-primary text-lg">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center py-5 px-5 bg-gradient-to-r from-purple-600 to-purple-800 rounded-xl text-white text-xl font-bold mb-6">
            <span>Total Amount:</span>
            <span className="text-3xl font-extrabold">${receipt.total.toFixed(2)}</span>
          </div>

          <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-4 text-center mb-6">
            <p className="text-yellow-900 text-sm mb-2">
              A confirmation email has been sent to <strong>{receipt.customerEmail}</strong>
            </p>
            <p className="text-yellow-900 text-sm font-semibold">
              Order Number: <strong>{receipt.orderNumber}</strong>
            </p>
          </div>
        </div>

        <div className="px-8 pb-8 flex gap-3 print:hidden">
          <button 
            className="flex-1 px-6 py-3 bg-transparent border-2 border-primary text-primary rounded-xl font-semibold hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
            onClick={handlePrint}
          >
            <FaDownload />
            Print Receipt
          </button>
          <button 
            className="flex-1 px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition-all duration-300"
            onClick={onClose}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReceiptModal;
