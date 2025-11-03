import React from 'react';
import { useCart } from '../contexts/CartContext';
import { CartItem } from '../types';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose, onCheckout }) => {
  const { cartItems, removeFromCart, updateQuantity, itemCount } = useCart();

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = () => {
    onCheckout();
    onClose();
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-60 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
        aria-hidden="true"
      ></div>
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-gym-dark shadow-2xl z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-heading"
      >
        <div className="flex flex-col h-full">
          <header className="flex items-center justify-between p-4 border-b border-gray-700">
            <h2 id="cart-heading" className="text-xl font-bold text-gym-yellow uppercase">Giỏ hàng ({itemCount})</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white" aria-label="Close cart">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </header>

          <div className="flex-grow overflow-y-auto p-4">
            {cartItems.length === 0 ? (
              <p className="text-gym-gray text-center mt-10">Giỏ hàng của bạn đang trống.</p>
            ) : (
              <ul className="space-y-4">
                {cartItems.map((item: CartItem, index) => (
                  <li key={`${item.id}-${item.size}-${item.flavor}-${index}`} className="flex items-start space-x-4">
                    <img src={item.images[0]} alt={item.name} className="w-20 h-20 object-cover rounded" />
                    <div className="flex-grow">
                      <p className="text-white font-semibold text-sm">{item.name}</p>
                      <p className="text-xs text-gym-gray font-mono">SKU: {item.sku}</p>
                      {(item.size || item.flavor) && (
                        <p className="text-xs text-gym-gray mt-1">
                          {item.flavor && <span>{item.flavor}</span>}
                          {item.flavor && item.size && <span> / </span>}
                          {item.size && <span>{item.size}</span>}
                        </p>
                      )}
                      <p className="text-gym-yellow font-bold my-1">{item.price.toLocaleString('vi-VN')}₫</p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-gray-600 rounded">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1, item.size, item.flavor)} className="px-2 py-1 text-lg">-</button>
                          <span className="px-3 py-1 text-sm">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1, item.size, item.flavor)} className="px-2 py-1 text-lg">+</button>
                        </div>
                        <button onClick={() => removeFromCart(item.id, item.size, item.flavor)} className="text-gray-500 hover:text-red-500 text-xs underline">Xóa</button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          {cartItems.length > 0 && (
            <footer className="p-4 border-t border-gray-700 space-y-4">
              <div className="flex justify-between font-bold">
                <span>Tạm tính:</span>
                <span className="text-gym-yellow text-lg">{subtotal.toLocaleString('vi-VN')}₫</span>
              </div>
              <button 
                onClick={handleCheckout}
                className="w-full bg-gym-yellow text-gym-darker font-bold py-3 rounded-md hover:bg-yellow-300 transition-colors"
              >
                Thanh toán
              </button>
              <button onClick={onClose} className="w-full text-center text-gym-gray hover:text-white text-sm">
                Tiếp tục mua sắm
              </button>
            </footer>
          )}
        </div>
      </div>
    </>
  );
};

export default CartSidebar;