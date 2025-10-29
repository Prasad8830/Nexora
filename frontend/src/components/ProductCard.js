import React from 'react';
import { FaShoppingCart, FaPlus, FaMinus, FaTrash } from 'react-icons/fa';

const ProductCard = ({ product, onAddToCart, onUpdateQuantity, onRemove, loading, cartItem }) => {
  const quantityInCart = cartItem?.quantity || 0;
  const isInCart = quantityInCart > 0;

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col h-full animate-fade-in">
      <div className="relative w-full h-64 overflow-hidden bg-gray-100">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x300?text=Product+Image';
          }}
        />
        {product.stock < 10 && product.stock > 0 && (
          <span className="absolute top-3 right-3 bg-yellow-500 text-white px-3 py-1.5 rounded-full text-xs font-bold uppercase">
            Only {product.stock} left!
          </span>
        )}
        {product.stock === 0 && (
          <span className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1.5 rounded-full text-xs font-bold uppercase">
            Out of Stock
          </span>
        )}
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <span className="text-primary text-xs font-bold uppercase tracking-wider mb-2">
          {product.category}
        </span>
        <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow">
          {product.description}
        </p>
        
        <div className="flex justify-between items-center gap-3 mt-auto">
          <span className="text-3xl font-extrabold text-primary">
            ${product.price.toFixed(2)}
          </span>
          
          {!isInCart ? (
            <button
              className="flex-1 bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-2"
              onClick={() => onAddToCart(product._id)}
              disabled={loading || product.stock === 0}
            >
              <FaShoppingCart />
              {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
          ) : (
            <div className="flex-1 flex items-center justify-center gap-2 bg-yellow-400 rounded-xl p-1.5 border-2 border-yellow-500">
              <button
                className="bg-white hover:bg-gray-100 text-gray-800 font-bold p-2.5 rounded-lg transition-all duration-200 disabled:opacity-50"
                onClick={() => {
                  if (quantityInCart === 1) {
                    onRemove(cartItem._id);
                  } else {
                    onUpdateQuantity(cartItem._id, quantityInCart - 1);
                  }
                }}
                disabled={loading}
              >
                {quantityInCart === 1 ? <FaTrash size={14} /> : <FaMinus size={14} />}
              </button>
              
              <span className="text-gray-900 font-bold text-lg min-w-[2rem] text-center">
                {quantityInCart}
              </span>
              
              <button
                className="bg-white hover:bg-gray-100 text-gray-800 font-bold p-2.5 rounded-lg transition-all duration-200 disabled:opacity-50"
                onClick={() => onUpdateQuantity(cartItem._id, quantityInCart + 1)}
                disabled={loading || quantityInCart >= product.stock}
              >
                <FaPlus size={14} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
