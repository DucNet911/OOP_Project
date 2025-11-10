import React, { useState, useEffect } from 'react';
import { Product, User, Review } from '../types';
import { StarIcon } from '../constants';
import { useCart } from '../contexts/CartContext';
import ProductReviews from './ProductReviews';
import RelatedProducts from './RelatedProducts';

interface ProductPageProps {
  product: Product;
  allProducts: Product[];
  onProductSelect: (product: Product) => void;
  onBack: () => void;
  currentUser: User | null;
  onAddReview: (productId: number, review: Omit<Review, 'id' | 'date'>) => void;
  onAuthClick: () => void;
  onStockSubscribe: (productId: number, email: string) => void;
  onCategorySelect: (filter: { type: 'category' | 'brand', value: string }) => void;
  onOpenQuickAddModal: (product: Product) => void;
}

const BackIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
    </svg>
  );

const ProductPage: React.FC<ProductPageProps> = ({ product, allProducts, onProductSelect, onBack, currentUser, onAddReview, onAuthClick, onStockSubscribe, onCategorySelect, onOpenQuickAddModal }) => {
  const [mainImage, setMainImage] = useState(product.images[0]);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(product.sizes ? product.sizes[0] : undefined);
  const [selectedFlavor, setSelectedFlavor] = useState(product.flavors ? product.flavors[0] : undefined);
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [notificationEmail, setNotificationEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  
  useEffect(() => {
    if (currentUser) {
        // Generate a mock email for the logged-in user
        const mockEmail = currentUser.name.toLowerCase().replace(/\s+/g, '.') + '@example.com';
        setNotificationEmail(mockEmail);
    } else {
        setNotificationEmail('');
    }
    // Reset subscription status when the product changes
    setIsSubscribed(false);
  }, [currentUser, product.id]);

  useEffect(() => {
    // Reset state when product changes
    setMainImage(product.images[0]);
    setQuantity(1);
    setSelectedSize(product.sizes ? product.sizes[0] : undefined);
    setSelectedFlavor(product.flavors ? product.flavors[0] : undefined);
  }, [product]);

  const handleAddToCart = () => {
    if (isAdding) return;
    setIsAdding(true);
    const itemToAdd = {
      ...product,
      quantity,
      size: selectedSize,
      flavor: selectedFlavor,
    };
    addToCart(itemToAdd);
    setTimeout(() => setIsAdding(false), 1000);
  };
  
  const handleReviewSubmit = (review: Omit<Review, 'id' | 'date'>) => {
    onAddReview(product.id, review);
  };

  const handleSubscriptionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (notificationEmail.trim() && product) {
      onStockSubscribe(product.id, notificationEmail);
      setIsSubscribed(true);
    }
  };

  const relatedProducts = allProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="container mx-auto px-4 py-12">
      <nav className="mb-8">
        <button onClick={onBack} className="flex items-center space-x-2 text-sm text-gym-gray hover:text-gym-yellow transition-colors">
            <BackIcon className="h-4 w-4" />
            <span>Quay lại trang trước</span>
        </button>
      </nav>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        {/* Image Gallery */}
        <div>
          <div className="border border-gray-800 rounded-lg overflow-hidden mb-4">
            <img src={mainImage} alt={product.name} className="w-full h-auto object-cover aspect-square" />
          </div>
          <div className="flex space-x-2">
            {product.images.map((img, index) => (
              <button key={index} onClick={() => setMainImage(img)} className={`w-20 h-20 border-2 rounded-lg overflow-hidden ${mainImage === img ? 'border-gym-yellow' : 'border-gray-800 hover:border-gray-600'}`}>
                <img src={img} alt={`${product.name} thumbnail ${index + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">{product.name}</h1>
          <p className="text-sm text-gym-gray mb-2 font-mono">SKU: {product.sku}</p>
          <div className="flex items-center mb-4">
            <div className="flex text-gym-yellow">
              {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className={`h-5 w-5 ${i < Math.round(product.rating) ? 'text-gym-yellow' : 'text-gray-600'}`} />
              ))}
            </div>
            <span className="text-sm text-gym-gray ml-2">({product.reviews} đánh giá)</span>
            <span className="mx-2 text-gym-gray">|</span>
            <span className={`text-sm ${product.inStock ? 'text-green-500' : 'text-red-500'}`}>{product.inStock ? 'Còn hàng' : 'Hết hàng'}</span>
          </div>

          <div className="flex items-baseline space-x-3 mb-6">
            <p className="text-3xl font-bold text-gym-yellow">{product.price.toLocaleString('vi-VN')}₫</p>
            {product.oldPrice && (
              <p className="text-xl text-gym-gray line-through">{product.oldPrice.toLocaleString('vi-VN')}₫</p>
            )}
          </div>

          {/* Flavors */}
          {product.flavors && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gym-gray uppercase mb-2">Hương vị: <span className="text-white font-bold">{selectedFlavor}</span></h3>
              <div className="flex flex-wrap gap-2">
                {product.flavors.map(flavor => (
                  <button key={flavor} onClick={() => setSelectedFlavor(flavor)} className={`px-4 py-2 text-sm font-semibold rounded-full border-2 transition-colors ${selectedFlavor === flavor ? 'bg-gym-yellow text-gym-darker border-gym-yellow' : 'bg-transparent text-white border-gray-700 hover:border-gym-yellow'}`}>
                    {flavor}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Sizes */}
          {product.sizes && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gym-gray uppercase mb-2">Kích cỡ: <span className="text-white font-bold">{selectedSize}</span></h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(size => (
                  <button key={size} onClick={() => setSelectedSize(size)} className={`px-4 py-2 text-sm font-semibold rounded-full border-2 transition-colors ${selectedSize === size ? 'bg-gym-yellow text-gym-darker border-gym-yellow' : 'bg-transparent text-white border-gray-700 hover:border-gym-yellow'}`}>
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Quantity & Add to Cart */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center border border-gray-700 rounded-md">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-4 py-3 text-lg font-bold hover:bg-gym-dark transition-colors">-</button>
              <span className="px-6 py-3 text-lg font-bold">{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)} className="px-4 py-3 text-lg font-bold hover:bg-gym-dark transition-colors">+</button>
            </div>
            <button onClick={handleAddToCart} disabled={!product.inStock || isAdding} className={`flex-grow bg-gym-yellow text-gym-darker font-bold py-3 px-8 rounded-md hover:bg-yellow-300 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed ${isAdding ? 'animate-cart-bump' : ''}`}>
              {isAdding ? 'Đã thêm!' : (product.inStock ? 'Thêm vào giỏ' : 'Hết hàng')}
            </button>
          </div>
          
          {/* Stock Notification */}
          {!product.inStock && (
            <div className="mt-6 bg-gym-darker border border-gray-800 rounded-lg p-4 animate-fade-in">
                {isSubscribed ? (
                    <div className="text-center">
                        <p className="font-bold text-green-400">Đăng ký thành công!</p>
                        <p className="text-sm text-gym-gray mt-1">
                            Chúng tôi sẽ gửi email cho bạn tại <span className="font-semibold text-white">{notificationEmail}</span> ngay khi sản phẩm có hàng trở lại.
                        </p>
                    </div>
                ) : (
                    <>
                        <h3 className="font-bold text-white text-center">Nhận thông báo khi có hàng</h3>
                        <p className="text-sm text-gym-gray text-center mt-1 mb-4">
                            Sản phẩm này hiện đang tạm hết hàng. Nhập email của bạn để chúng tôi thông báo ngay khi có hàng trở lại.
                        </p>
                        <form onSubmit={handleSubscriptionSubmit} className="flex flex-col sm:flex-row items-center gap-2">
                            <input
                                type="email"
                                value={notificationEmail}
                                onChange={(e) => setNotificationEmail(e.target.value)}
                                placeholder="Nhập địa chỉ email của bạn"
                                required
                                className="flex-grow w-full bg-gym-dark border border-gray-700 rounded-md p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gym-yellow"
                            />
                            <button type="submit" className="w-full sm:w-auto bg-gym-yellow text-gym-darker font-bold py-3 px-6 rounded-md hover:bg-yellow-300 transition-colors">
                                Đăng ký
                            </button>
                        </form>
                    </>
                )}
            </div>
          )}

          {/* Description */}
          <div className="mt-6">
            <h3 className="text-lg font-bold text-white border-b border-gray-800 pb-2 mb-4">Mô tả sản phẩm</h3>
            <p className="text-gym-gray leading-relaxed">{product.description}</p>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <ProductReviews 
        reviews={product.productReviews || []}
        averageRating={product.rating}
        totalReviews={product.reviews}
        currentUser={currentUser}
        onSubmitReview={handleReviewSubmit}
        onAuthClick={onAuthClick}
      />

      {/* Related Products Section */}
      <RelatedProducts products={relatedProducts} onProductSelect={onProductSelect} onOpenQuickAddModal={onOpenQuickAddModal} />
    </div>
  );
};

export default ProductPage;