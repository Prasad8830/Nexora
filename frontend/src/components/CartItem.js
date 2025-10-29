import React from 'react';
import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa';

const CartItem = ({ item, onUpdateQuantity, onRemove, updating }) => {
  const handleIncrease = () => {
    onUpdateQuantity(item._id, item.quantity + 1);
  };

  const handleDecrease = () => {
    if (item.quantity > 1) {
      onUpdateQuantity(item._id, item.quantity - 1);
    }
  };

  return (
    <div className="bg-white rounded-xl p-5 flex flex-col md:flex-row gap-5 items-start md:items-center shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 mb-4 animate-fade-in">
      <div className="flex-shrink-0">
        <img 
          src={item.image} 
          alt={item.name}
          className="w-24 h-24 md:w-28 md:h-28 object-cover rounded-lg bg-gray-100"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/100x100?text=Product';
          }}
        />
      </div>

      <div className="flex-1 min-w-0 w-full md:w-auto">
        <h3 className="text-lg font-bold text-gray-900 mb-2 truncate md:whitespace-normal">
          {item.name}
        </h3>
        <p className="text-base text-primary font-semibold">
          ${item.price.toFixed(2)}
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-start md:items-center gap-5 w-full md:w-auto">
        <div className="flex items-center gap-3 bg-gray-100 rounded-lg px-3 py-2">
          <button
            className="bg-white w-8 h-8 rounded-md flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-200 hover:scale-110 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-white disabled:hover:text-primary"
            onClick={handleDecrease}
            disabled={updating || item.quantity <= 1}
            aria-label="Decrease quantity"
          >
            <FaMinus className="text-sm" />
          </button>
          <span className="font-bold text-base min-w-[30px] text-center text-gray-900">
            {item.quantity}
          </span>
          <button
            className="bg-white w-8 h-8 rounded-md flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-200 hover:scale-110 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
            onClick={handleIncrease}
            disabled={updating}
            aria-label="Increase quantity"
          >
            <FaPlus className="text-sm" />
          </button>
        </div>

        <div className="flex flex-col items-start md:items-end min-w-[100px] order-first md:order-none w-full md:w-auto mb-3 md:mb-0">
          <span className="text-xs text-gray-600 uppercase font-semibold">Total:</span>
          <span className="text-xl font-extrabold text-gray-900">
            ${(item.price * item.quantity).toFixed(2)}
          </span>
        </div>

        <button
          className="bg-red-100 text-red-500 w-10 h-10 rounded-lg flex items-center justify-center hover:bg-red-500 hover:text-white transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          onClick={() => onRemove(item._id)}
          disabled={updating}
          aria-label="Remove item"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
