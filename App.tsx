import React, { useState, useCallback, useEffect } from 'react';
import { CartProvider } from './contexts/CartContext';
import { Product, Theme, User, Order, OrderStatus, CartItem, Review, Article, Brand } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import ProductPage from './components/ProductPage';
import CategoryPage from './components/CategoryPage';
import CheckoutPage from './components/CheckoutPage';
import CartSidebar from './components/CartSidebar';
import AuthModal from './components/AuthModal';
import Chatbot from './components/Chatbot';
import { navLinks, allProducts as initialProducts, supplementArticles as initialSupplementArticles, nutritionArticles as initialNutritionArticles, brands as initialBrands } from './constants';
import BrandsPage from './components/BrandsPage';
import AdminPage from './components/AdminPage';
import AccountPage from './components/AccountPage';
import OrderHistoryPage from './components/OrderHistoryPage';
import InfoPage from './components/InfoPage';
import KnowledgeListPage from './components/KnowledgeListPage';

// Mock Data for initial orders
const initialOrders: Order[] = [
  {
    id: 'GS12345',
    date: '15/07/2023',
    status: 'Hoàn thành',
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
    {
    id: 'GS12346',
    date: '16/07/2023',
    status: 'Đang giao hàng',
    total: 950000,
    items: [
      { ...initialProducts.find(p => p.id === 7)!, quantity: 1, flavor: 'Fruit Punch' },
    ],
    customer: { name: 'Lê Minh', email: 'minh.le@example.com', phone: '0911111111', address: '111 Đường X, Quận Y, TP. HCM' },
    paymentStatus: 'Đã thanh toán',
    paymentMethod: 'card',
  },
  {
    id: 'GS12347',
    date: '17/07/2023',
    status: 'Chờ xác nhận',
    total: 1950000,
    items: [
      { ...initialProducts.find(p => p.id === 2)!, quantity: 1, size: '5Lbs', flavor: 'Chocolate Fudge' },
    ],
    customer: { name: 'Phạm Thị Hoa', email: 'hoa.pham@example.com', phone: '0922222222', address: '222 Đường Z, Quận W, Hà Nội' },
    paymentStatus: 'Chưa thanh toán',
    paymentMethod: 'cod',
  },
  {
    id: 'GS12348',
    date: '18/07/2023',
    status: 'Đã Hủy',
    total: 450000,
    items: [
      { ...initialProducts.find(p => p.id === 9)!, quantity: 1 },
    ],
    customer: { name: 'Hoàng Văn Nam', email: 'nam.hoang@example.com', phone: '0933333333', address: '333 Đường U, Quận V, Đà Nẵng' },
    paymentStatus: 'Chưa thanh toán',
    paymentMethod: 'cod',
  },
  {
    id: 'GS12349',
    date: '19/07/2023',
    status: 'Trả hàng',
    total: 1650000,
    items: [
      { ...initialProducts.find(p => p.id === 5)!, quantity: 1, flavor: 'Vanilla' },
    ],
    customer: { name: 'Vũ Thị Lan', email: 'lan.vu@example.com', phone: '0944444444', address: '444 Đường T, Quận S, Cần Thơ' },
    paymentStatus: 'Đã thanh toán',
    paymentMethod: 'card',
  },
];


type Page = 'home' | 'product' | 'category' | 'checkout' | 'brands' | 'account' | 'order-history' | 'info' | 'knowledge-list';

const App: React.FC = () => {
  const [page, setPage] = useState<Page>('home');
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [brands, setBrands] = useState<Brand[]>(initialBrands);
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [supplementArticles, setSupplementArticles] = useState<Article[]>(initialSupplementArticles);
  const [nutritionArticles, setNutritionArticles] = useState<Article[]>(initialNutritionArticles);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [theme, setTheme] = useState<Theme>('default');
  const [infoPageContent, setInfoPageContent] = useState<{title: string, content: React.ReactNode} | null>(null);
  const [knowledgeCategory, setKnowledgeCategory] = useState<string | null>(null);

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

  const handleAddBrand = useCallback((brandData: Omit<Brand, 'id'>) => {
    const newBrand: Brand = {
      ...brandData,
      id: Date.now(),
    };
    setBrands(prev => [newBrand, ...prev]);
  }, []);

  const handleUpdateBrand = useCallback((updatedBrand: Brand) => {
    setBrands(prev => prev.map(b => b.id === updatedBrand.id ? updatedBrand : b));
  }, []);

  const handleDeleteBrand = useCallback((brandId: number) => {
    setBrands(prev => prev.filter(b => b.id !== brandId));
  }, []);

  const handleToggleFeaturedBrand = useCallback((brandId: number) => {
    setBrands(prevBrands => 
      prevBrands.map(b => 
        b.id === brandId ? { ...b, isFeatured: !b.isFeatured } : b
      )
    );
  }, []);

  const handleAddArticle = useCallback((articleData: Omit<Article, 'id' | 'date'>) => {
    const newArticle: Article = {
        ...articleData,
        id: Date.now(),
        date: new Date().toLocaleDateString('vi-VN'),
    };

    if (newArticle.category === 'Kiến thức Supplement') {
        setSupplementArticles(prev => [newArticle, ...prev]);
    } else {
        setNutritionArticles(prev => [newArticle, ...prev]);
    }
  }, []);

  const handleUpdateArticle = useCallback((updatedArticle: Article) => {
      const updateList = (list: Article[]) => list.map(a => a.id === updatedArticle.id ? updatedArticle : a);
      
      const oldArticle = [...supplementArticles, ...nutritionArticles].find(a => a.id === updatedArticle.id);

      if (oldArticle?.category !== updatedArticle.category) {
          // Category changed, remove from old list and add to new
          if (oldArticle?.category === 'Kiến thức Supplement') {
              setSupplementArticles(prev => prev.filter(a => a.id !== updatedArticle.id));
              setNutritionArticles(prev => [updatedArticle, ...prev]);
          } else {
              setNutritionArticles(prev => prev.filter(a => a.id !== updatedArticle.id));
              setSupplementArticles(prev => [updatedArticle, ...prev]);
          }
      } else {
          // Category is the same, just update in place
          if (updatedArticle.category === 'Kiến thức Supplement') {
              setSupplementArticles(updateList);
          } else {
              setNutritionArticles(updateList);
          }
      }
  }, [supplementArticles, nutritionArticles]);

  const handleDeleteArticle = useCallback((articleId: number) => {
      setSupplementArticles(prev => prev.filter(a => a.id !== articleId));
      setNutritionArticles(prev => prev.filter(a => a.id !== articleId));
  }, []);


  const handlePlaceOrder = useCallback((orderDetails: Omit<Order, 'id' | 'date' | 'status'>) => {
    const newOrder: Order = {
      ...orderDetails,
      id: `GS${Math.floor(Math.random() * 90000) + 10000}`,
      date: new Date().toLocaleDateString('vi-VN'),
      status: 'Chờ xác nhận',
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
  
  const handleCancelOrder = useCallback((orderId: string) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId ? { ...order, status: 'Đã Hủy' } : order
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
    setKnowledgeCategory(null);
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
  
  const handleViewAllKnowledge = useCallback((categoryTitle: string) => {
    setKnowledgeCategory(categoryTitle);
    setPage('knowledge-list');
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
        return <BrandsPage brands={initialBrands} onBack={handleGoHome} onBrandSelect={handleBrandSelect} />;
      case 'account':
        return <AccountPage currentUser={currentUser!} onBack={handleGoHome} />;
      case 'order-history':
        return <OrderHistoryPage onBack={handleGoHome} orders={orders} onCancelOrder={handleCancelOrder} />;
      case 'info':
        return <InfoPage title={infoPageContent!.title} onBack={handleGoHome}>{infoPageContent!.content}</InfoPage>;
      case 'knowledge-list':
        const articles = knowledgeCategory === 'Kiến thức Supplement' 
            ? supplementArticles 
            : nutritionArticles;
        return <KnowledgeListPage 
            title={knowledgeCategory!} 
            articles={articles} 
            onBack={handleGoHome} 
        />;
      case 'home':
      default:
        const featuredProducts = products.filter(p => p.isFeatured);
        const featuredBrands = brands.filter(b => b.isFeatured);
        return <HomePage 
                  products={products} 
                  featuredProducts={featuredProducts} 
                  onProductSelect={handleProductSelect} 
                  onCategorySelect={handleCategorySelect} 
                  onViewAllKnowledge={handleViewAllKnowledge} 
                  supplementArticles={supplementArticles}
                  nutritionArticles={nutritionArticles}
                  featuredBrands={featuredBrands}
                  onBrandSelect={handleBrandSelect}
                />;
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
        brands={brands}
        onAddBrand={handleAddBrand}
        onUpdateBrand={handleUpdateBrand}
        onDeleteBrand={handleDeleteBrand}
        onToggleFeaturedBrand={handleToggleFeaturedBrand}
        orders={orders}
        onUpdateOrderStatus={handleUpdateOrderStatus}
        supplementArticles={supplementArticles}
        nutritionArticles={nutritionArticles}
        onAddArticle={handleAddArticle}
        onUpdateArticle={handleUpdateArticle}
        onDeleteArticle={handleDeleteArticle}
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
// FIX: Corrected typo from isIsAuthModalOpen to isAuthModalOpen.
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