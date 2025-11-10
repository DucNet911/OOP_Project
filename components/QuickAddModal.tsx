import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { useCart } from '../contexts/CartContext';

interface QuickAddModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}

const CloseIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const QuickAddModal: React.FC<QuickAddModalProps> = ({ isOpen, onClose, product }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(undefined);
  const [selectedFlavor, setSelectedFlavor] = useState<string | undefined>(undefined);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    if (product) {
      setQuantity(1);
      setSelectedSize(product.sizes ? product.sizes[0] : undefined);
      setSelectedFlavor(product.flavors ? product.flavors[0] : undefined);
      setIsAdding(false);
    }
  }, [product]);

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    if (isAdding) return;
    setIsAdding(true);
    addToCart({
      ...product,
      quantity,
      size: selectedSize,
      flavor: selectedFlavor,
    });
    setTimeout(() => {
      setIsAdding(false);
      onClose();
    }, 1000);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-gym-dark rounded-lg shadow-xl w-full max-w-md p-6 relative animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white" aria-label="Close modal">
          <CloseIcon className="w-6 h-6" />
        </button>
        
        <div className="flex items-start space-x-4">
          <img src={product.images[0]} alt={product.name} className="w-24 h-24 object-cover rounded-md flex-shrink-0" />
          <div>
            <h2 className="text-lg font-bold text-white leading-tight">{product.name}</h2>
            <p className="text-xl font-bold text-gym-yellow mt-1">{product.price.toLocaleString('vi-VN')}₫</p>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-800 space-y-4">
          {product.flavors && (
            <div>
              <h3 className="text-sm font-semibold text-gym-gray uppercase mb-2">Hương vị: <span className="text-white font-bold">{selectedFlavor}</span></h3>
              <div className="flex flex-wrap gap-2">
                {product.flavors.map(flavor => (
                  <button key={flavor} onClick={() => setSelectedFlavor(flavor)} className={`px-3 py-1.5 text-sm font-semibold rounded-full border-2 transition-colors ${selectedFlavor === flavor ? 'bg-gym-yellow text-gym-darker border-gym-yellow' : 'bg-transparent text-white border-gray-700 hover:border-gym-yellow'}`}>
                    {flavor}
                  </button>
                ))}
              </div>
            </div>
          )}

          {product.sizes && (
            <div>
              <h3 className="text-sm font-semibold text-gym-gray uppercase mb-2">Kích cỡ: <span className="text-white font-bold">{selectedSize}</span></h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(size => (
                  <button key={size} onClick={() => setSelectedSize(size)} className={`px-3 py-1.5 text-sm font-semibold rounded-full border-2 transition-colors ${selectedSize === size ? 'bg-gym-yellow text-gym-darker border-gym-yellow' : 'bg-transparent text-white border-gray-700 hover:border-gym-yellow'}`}>
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gym-gray uppercase">Số lượng</h3>
            <div className="flex items-center border border-gray-700 rounded-md">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-3 py-2 text-md font-bold hover:bg-gym-darker transition-colors">-</button>
              <span className="px-4 py-2 text-md font-bold">{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)} className="px-3 py-2 text-md font-bold hover:bg-gym-darker transition-colors">+</button>
            </div>
          </div>

          <button onClick={handleAddToCart} disabled={isAdding} className={`w-full bg-gym-yellow text-gym-darker font-bold py-3 rounded-md hover:bg-yellow-300 transition-colors disabled:opacity-75 disabled:cursor-wait ${isAdding ? 'animate-cart-bump' : ''}`}>
            {isAdding ? 'Đã thêm!' : `Thêm vào giỏ - ${(product.price * quantity).toLocaleString('vi-VN')}₫`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuickAddModal;
