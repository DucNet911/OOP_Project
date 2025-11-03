import React, { useState, useCallback, useEffect } from 'react';
import { CartProvider } from './contexts/CartContext';
import { Product, Theme, User, Order, OrderStatus, CartItem, Review } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import ProductPage from './components/ProductPage';
import CategoryPage from './components/CategoryPage';
import CheckoutPage from './components/CheckoutPage';
import CartSidebar from './components/CartSidebar';
import AuthModal from './components/AuthModal';
import Chatbot from './components/Chatbot';
import { navLinks, allProducts as initialProducts } from './constants';
import BrandsPage from './components/BrandsPage';
import { brands } from './constants';
import AdminPage from './components/AdminPage';
import AccountPage from './components/AccountPage';
import OrderHistoryPage from './components/OrderHistoryPage';
import InfoPage from './components/InfoPage';

// Mock Data for initial orders
const initialOrders: Order[] = [
  {
    id: 'GS12345',
    date: '15/07/2023',
    status: 'Đã giao hàng',
    total: 1850000,
    items: [
      { ...initialProducts.find(p => p.id === 1)!, quantity: 1, size: '5Lbs', flavor: 'Double Rich Chocolate' },
    ],
    customer: { name: 'Nguyễn Văn An', email: 'an.nguyen@example.com', phone: '0901234567', address: '123 Đường A, Quận B, TP. HCM' },
    paymentStatus: 'Đã thanh toán',
    paymentMethod: 'card',
  },
  {
    id: 'GS12340',
    date: '10/07/2023',
    status: 'Đang xử lý',
    total: 2700000,
    items: [
      { ...initialProducts.find(p => p.id === 7)!, quantity: 1, flavor: 'Icy Blue Razz' },
      { ...initialProducts.find(p => p.id === 5)!, quantity: 1, flavor: 'Chocolate' },
    ],
    customer: { name: 'Trần Thị Bích', email: 'bich.tran@example.com', phone: '0912345678', address: '456 Đường C, Quận D, Hà Nội' },
    paymentStatus: 'Chưa thanh toán',
    paymentMethod: 'cod',
  },
];


type Page = 'home' | 'product' | 'category' | 'checkout' | 'brands' | 'account' | 'order-history' | 'info';

const App: React.FC = () => {
  const [page, setPage] = useState<Page>('home');
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [theme, setTheme] = useState<Theme>('default');
  const [infoPageContent, setInfoPageContent] = useState<{title: string, content: React.ReactNode} | null>(null);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAdminViewingSite, setIsAdminViewingSite] = useState(false);
  const [stockSubscriptions, setStockSubscriptions] = useState<{ productId: number; email: string; }[]>([]);

  useEffect(() => {
    if (currentUser?.role === 'admin' && !isAdminViewingSite) return;

    const body = document.body;
    body.classList.remove('theme-light', 'theme-black');
    if (theme !== 'default') {
        body.classList.add(`theme-${theme}`);
    }
  }, [theme, currentUser, isAdminViewingSite]);

  const handleLoginSuccess = useCallback((user: User) => {
    setCurrentUser(user);
    setIsAuthModalOpen(false);
    if (user.role === 'admin') {
      setIsAdminViewingSite(false);
    }
  }, []);

  const handleLogout = useCallback(() => {
    setCurrentUser(null);
    setPage('home');
    setIsAdminViewingSite(false);
  }, []);

  const handleAddProduct = useCallback((newProduct: Product) => {
    setProducts(prevProducts => [newProduct, ...prevProducts]);
  }, []);

  const handleUpdateProduct = useCallback((updatedProduct: Product) => {
    setProducts(prevProducts => 
      prevProducts.map(p => p.id === updatedProduct.id ? updatedProduct : p)
    );
  }, []);

  const handleDeleteProduct = useCallback((productId: number) => {
    setProducts(prevProducts => prevProducts.filter(p => p.id !== productId));
  }, []);
  
  const handleToggleFeaturedProduct = useCallback((productId: number) => {
    setProducts(prevProducts =>
      prevProducts.map(p =>
        p.id === productId ? { ...p, isFeatured: !p.isFeatured } : p
      )
    );
  }, []);

  const handlePlaceOrder = useCallback((orderDetails: Omit<Order, 'id' | 'date' | 'status'>) => {
    const newOrder: Order = {
      ...orderDetails,
      id: `GS${Math.floor(Math.random() * 90000) + 10000}`,
      date: new Date().toLocaleDateString('vi-VN'),
      status: 'Đang xử lý',
    };
    setOrders(prevOrders => [newOrder, ...prevOrders]);
    alert('Cảm ơn bạn đã đặt hàng! Chúng tôi sẽ xử lý đơn hàng của bạn sớm nhất.');
    setPage('home'); // Redirect to home after order
  }, []);

  const handleUpdateOrderStatus = useCallback((orderId: string, status: OrderStatus) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId ? { ...order, status } : order
      )
    );
  }, []);

  const handleAddReview = useCallback((productId: number, review: Omit<Review, 'id' | 'date'>) => {
    const newReview: Review = {
      ...review,
      id: Date.now(),
      date: new Date().toLocaleDateString('vi-VN'),
    };

    setProducts(prevProducts => {
      const newProducts = prevProducts.map(p => {
        if (p.id === productId) {
          const updatedReviews = [newReview, ...(p.productReviews || [])];
          // Recalculate average rating and review count
          const newTotalReviews = updatedReviews.length;
          const newAverageRating = newTotalReviews > 0
            ? updatedReviews.reduce((sum, r) => sum + r.rating, 0) / newTotalReviews
            : 0;

          return { 
            ...p, 
            productReviews: updatedReviews,
            reviews: newTotalReviews,
            rating: parseFloat(newAverageRating.toFixed(1)),
          };
        }
        return p;
      });

      // Update the selected product state as well if it's being viewed
      if (selectedProduct?.id === productId) {
        const updatedSelectedProduct = newProducts.find(p => p.id === productId);
        if (updatedSelectedProduct) {
          setSelectedProduct(updatedSelectedProduct);
        }
      }
      return newProducts;
    });
  }, [selectedProduct]);

  const handleStockSubscription = useCallback((productId: number, email: string) => {
    setStockSubscriptions(prev => {
        const exists = prev.some(sub => sub.productId === productId && sub.email === email);
        if (exists) {
            return prev;
        }
        return [...prev, { productId, email }];
    });
  }, []);

  const handleAdminViewSite = useCallback(() => {
    setIsAdminViewingSite(true);
    setPage('home');
    window.scrollTo(0, 0);
  }, []);

  const handleAdminReturnToPanel = useCallback(() => {
    setIsAdminViewingSite(false);
    window.scrollTo(0, 0);
  }, []);

  const handleGoHome = useCallback(() => {
    setPage('home');
    setSelectedProduct(null);
    setSelectedCategory(null);
    setSelectedBrand(null);
    window.scrollTo(0, 0);
  }, []);

  const handleProductSelect = useCallback((product: Product) => {
    setSelectedProduct(product);
    setPage('product');
    window.scrollTo(0, 0);
  }, []);

  const handleCategorySelect = useCallback((category: string) => {
    if (category === 'Thương hiệu') {
        setPage('brands');
    } else {
        setSelectedCategory(category);
        setSelectedBrand(null);
        setPage('category');
    }
    window.scrollTo(0, 0);
  }, []);
  
  const handleBrandSelect = useCallback((brandName: string) => {
    setSelectedBrand(brandName);
    setSelectedCategory(null);
    setPage('category');
    window.scrollTo(0, 0);
  }, []);

  const handleCheckout = useCallback(() => {
    setIsCartOpen(false);
    if (currentUser) {
      setPage('checkout');
      window.scrollTo(0, 0);
    } else {
      setIsAuthModalOpen(true);
    }
  }, [currentUser]);
  
  const handleAccountClick = useCallback(() => {
    if (currentUser) {
      setPage('account');
      window.scrollTo(0, 0);
    } else {
      setIsAuthModalOpen(true);
    }
  }, [currentUser]);

  const handleOrderHistoryClick = useCallback(() => {
    if (currentUser) {
      setPage('order-history');
      window.scrollTo(0, 0);
    } else {
      setIsAuthModalOpen(true);
    }
  }, [currentUser]);

  const handleInfoLinkClick = useCallback((title: string, content: React.ReactNode) => {
    setInfoPageContent({ title, content });
    setPage('info');
    window.scrollTo(0, 0);
  }, []);

  const renderPage = () => {
    switch (page) {
      case 'product':
        return <ProductPage 
                  product={selectedProduct!} 
                  allProducts={products}
                  onProductSelect={handleProductSelect}
                  onBack={handleGoHome} 
                  currentUser={currentUser} 
                  onAddReview={handleAddReview} 
                  onAuthClick={() => setIsAuthModalOpen(true)}
                  onStockSubscribe={handleStockSubscription}
                  onCategorySelect={handleCategorySelect}
               />;
      case 'category':
        const filterBy = selectedBrand 
          ? { type: 'brand' as const, value: selectedBrand }
          : { type: 'category' as const, value: selectedCategory! };
        return <CategoryPage products={products} filterBy={filterBy} onProductSelect={handleProductSelect} onBack={handleGoHome} />;
      case 'checkout':
        return <CheckoutPage onBackToShop={handleGoHome} onPlaceOrder={handlePlaceOrder} />;
      case 'brands':
        return <BrandsPage brands={brands} onBack={handleGoHome} onBrandSelect={handleBrandSelect} />;
      case 'account':
        return <AccountPage currentUser={currentUser!} onBack={handleGoHome} />;
      case 'order-history':
        return <OrderHistoryPage onBack={handleGoHome} orders={orders} />;
      case 'info':
        return <InfoPage title={infoPageContent!.title} onBack={handleGoHome}>{infoPageContent!.content}</InfoPage>;
      case 'home':
      default:
        const featuredProducts = products.filter(p => p.isFeatured);
        return <HomePage products={products} featuredProducts={featuredProducts} onProductSelect={handleProductSelect} onCategorySelect={handleCategorySelect} />;
    }
  };

  if (currentUser?.role === 'admin' && !isAdminViewingSite) {
    return <AdminPage 
        currentUser={currentUser} 
        onLogout={handleLogout}
        onViewSite={handleAdminViewSite}
        products={products}
        onAddProduct={handleAddProduct}
        onUpdateProduct={handleUpdateProduct}
        onDeleteProduct={handleDeleteProduct}
        onToggleFeatured={handleToggleFeaturedProduct}
        orders={orders}
        onUpdateOrderStatus={handleUpdateOrderStatus}
    />;
  }

  return (
    <CartProvider>
      <div className="bg-gym-darker text-white font-sans selection:bg-gym-yellow selection:text-gym-darker">
        <Header 
            navLinks={navLinks}
            products={products}
            onCartClick={() => setIsCartOpen(true)} 
            onAuthClick={() => setIsAuthModalOpen(true)}
            onCategorySelect={handleCategorySelect}
            onProductSelect={handleProductSelect}
            onLogoClick={handleGoHome}
            theme={theme}
            setTheme={setTheme}
            currentUser={currentUser}
            onLogout={handleLogout}
            onAccountClick={handleAccountClick}
            onOrderHistoryClick={handleOrderHistoryClick}
            isAdminViewingSite={currentUser?.role === 'admin' && isAdminViewingSite}
            onReturnToAdmin={handleAdminReturnToPanel}
        />
        <main className="min-h-screen">
          {renderPage()}
        </main>
        <CartSidebar 
            isOpen={isCartOpen} 
            onClose={() => setIsCartOpen(false)} 
            onCheckout={handleCheckout} 
        />
        <AuthModal 
            isOpen={isAuthModalOpen} 
            onClose={() => setIsAuthModalOpen(false)} 
            onLoginSuccess={handleLoginSuccess}
        />
        <Footer onInfoLinkClick={handleInfoLinkClick} />
        <Chatbot />
      </div>
    </CartProvider>
  );
};

export default App;