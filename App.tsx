import React, { useState, useCallback, useEffect, useMemo } from 'react';
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
import AdminPage from './components/AdminPage';
import AccountPage from './components/AccountPage';
import OrderHistoryPage from './components/OrderHistoryPage';
import InfoPage from './components/InfoPage';
import KnowledgeListPage from './components/KnowledgeListPage';
import QuickAddModal from './components/QuickAddModal';
import BrandsPage from './components/BrandsPage';

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


type Page = 'home' | 'product' | 'category' | 'checkout' | 'account' | 'order-history' | 'info' | 'knowledge-list' | 'brands';

type HistoryState = {
  page: Page;
  selectedProduct: Product | null;
  listFilter: { type: 'category' | 'brand'; value: string } | null;
  infoPageContent: { title: string; content: React.ReactNode } | null;
  knowledgeCategory: string | null;
  scrollPosition: number;
};


// Helper to parse 'DD/MM/YYYY' strings into Date objects
const parseDate = (dateString: string): Date => {
  const [day, month, year] = dateString.split('/').map(Number);
  // JavaScript's month is 0-indexed (0 for January)
  return new Date(year, month - 1, day);
};

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [brands, setBrands] = useState<Brand[]>(initialBrands);
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [supplementArticles, setSupplementArticles] = useState<Article[]>(initialSupplementArticles);
  const [nutritionArticles, setNutritionArticles] = useState<Article[]>(initialNutritionArticles);
  const [theme, setTheme] = useState<Theme>('light');
  const [adminTheme, setAdminTheme] = useState<Theme>('light');
  const [productForQuickAdd, setProductForQuickAdd] = useState<Product | null>(null);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAdminViewingSite, setIsAdminViewingSite] = useState(false);
  const [stockSubscriptions, setStockSubscriptions] = useState<{ productId: number; email: string; }[]>([]);

  const [history, setHistory] = useState<HistoryState[]>([{
    page: 'home',
    selectedProduct: null,
    listFilter: null,
    infoPageContent: null,
    knowledgeCategory: null,
    scrollPosition: 0,
  }]);

  const currentState = history[history.length - 1];
  const { page, selectedProduct, listFilter, infoPageContent, knowledgeCategory } = currentState;
  
  useEffect(() => {
    const timer = setTimeout(() => {
      window.scrollTo({ top: currentState.scrollPosition, behavior: 'auto' });
    }, 0);
    return () => clearTimeout(timer);
  }, [currentState]);

  const navigateTo = (stateUpdate: Partial<Omit<HistoryState, 'scrollPosition'>>) => {
    const currentScrollY = window.scrollY;
    setHistory(prev => {
      const updatedLastState = { ...prev[prev.length - 1], scrollPosition: currentScrollY };
      const newHistory = [...prev.slice(0, -1), updatedLastState];
      
      const newState: HistoryState = {
        page: 'home',
        selectedProduct: null,
        listFilter: null,
        infoPageContent: null,
        knowledgeCategory: null,
        scrollPosition: 0,
        ...stateUpdate,
      };
      return [...newHistory, newState];
    });
  };

  const handleBack = useCallback(() => {
    if (history.length > 1) {
      setHistory(prev => prev.slice(0, -1));
    }
  }, [history.length]);
  
  const handleReturnToHome = useCallback(() => {
    setHistory(prev => {
        // Find the index of the last occurrence of the home page in history.
        const lastHomeIndex = prev.map(s => s.page).lastIndexOf('home');

        // If a 'home' state is found in the history stack (it always should be, at least at index 0)
        if (lastHomeIndex !== -1) {
            // Truncate the history array to end at that home state.
            // This makes it the current state, preserving its scroll position.
            return prev.slice(0, lastHomeIndex + 1);
        }

        // As a fallback in an unexpected scenario where no home state is found,
        // reset to a clean home state.
        return [{
            page: 'home',
            selectedProduct: null,
            listFilter: null,
            infoPageContent: null,
            knowledgeCategory: null,
            scrollPosition: 0,
        }];
    });
  }, []);

  const totalRevenue = useMemo(() => {
    return orders.reduce((acc, order) => {
        if (order.status !== 'Đã Hủy' && order.status !== 'Trả hàng') {
            return acc + order.total;
        }
        return acc;
    }, 0);
  }, [orders]);

  const productRevenueData = useMemo(() => {
    const now = new Date();
    // Only consider completed orders for revenue calculation
    const completedOrders = orders.filter(o => o.status === 'Hoàn thành');
  
    // --- Monthly Calculation (Last 30 days) ---
    const last30DaysRevenue = completedOrders
      .filter(o => {
        const orderDate = parseDate(o.date);
        const diffDays = (now.getTime() - orderDate.getTime()) / (1000 * 3600 * 24);
        return diffDays <= 30;
      })
      .reduce((sum, o) => sum + o.total, 0);
  
    const previous30DaysRevenue = completedOrders
      .filter(o => {
        const orderDate = parseDate(o.date);
        const diffDays = (now.getTime() - orderDate.getTime()) / (1000 * 3600 * 24);
        return diffDays > 30 && diffDays <= 60;
      })
      .reduce((sum, o) => sum + o.total, 0);
  
    const monthlyChange = previous30DaysRevenue > 0
      ? ((last30DaysRevenue - previous30DaysRevenue) / previous30DaysRevenue) * 100
      : (last30DaysRevenue > 0 ? 100 : 0);
  
    const monthlyChartData = [0, 0, 0, 0]; // Revenue for the last 4 weeks
    completedOrders
      .filter(o => {
          const orderDate = parseDate(o.date);
          const diffDays = (now.getTime() - orderDate.getTime()) / (1000 * 3600 * 24);
          return diffDays < 28; // Filter for the last 4 weeks (28 days)
      })
      .forEach(o => {
        const orderDate = parseDate(o.date);
        const diffDays = Math.floor((now.getTime() - orderDate.getTime()) / (1000 * 3600 * 24));
        const weekIndex = 3 - Math.floor(diffDays / 7);
        if (weekIndex >= 0 && weekIndex < 4) {
          monthlyChartData[weekIndex] += o.total;
        }
      });
  
    // --- Weekly Calculation (Last 7 days) ---
    const last7DaysRevenue = completedOrders
      .filter(o => {
          const orderDate = parseDate(o.date);
          const diffDays = (now.getTime() - orderDate.getTime()) / (1000 * 3600 * 24);
          return diffDays <= 7;
      })
      .reduce((sum, o) => sum + o.total, 0);
  
    const previous7DaysRevenue = completedOrders
      .filter(o => {
          const orderDate = parseDate(o.date);
          const diffDays = (now.getTime() - orderDate.getTime()) / (1000 * 3600 * 24);
          return diffDays > 7 && diffDays <= 14;
      })
      .reduce((sum, o) => sum + o.total, 0);
  
    const weeklyChange = previous7DaysRevenue > 0
      ? ((last7DaysRevenue - previous7DaysRevenue) / previous7DaysRevenue) * 100
      : (last7DaysRevenue > 0 ? 100 : 0);
  
    const weeklyChartData = Array(7).fill(0); // Revenue for the last 7 days
    completedOrders
      .filter(o => {
          const orderDate = parseDate(o.date);
          const diffDays = (now.getTime() - orderDate.getTime()) / (1000 * 3600 * 24);
          return diffDays < 7;
      })
      .forEach(o => {
        const orderDate = parseDate(o.date);
        const diffDays = Math.floor((now.getTime() - orderDate.getTime()) / (1000 * 3600 * 24));
        const dayIndex = 6 - diffDays;
        if (dayIndex >= 0 && dayIndex < 7) {
          weeklyChartData[dayIndex] += o.total;
        }
      });
  
    return {
      monthly: {
        total: last30DaysRevenue,
        change: monthlyChange,
        chartData: monthlyChartData,
      },
      weekly: {
        total: last7DaysRevenue,
        change: weeklyChange,
        chartData: weeklyChartData,
      },
    };
  }, [orders]);


  useEffect(() => {
    const body = document.body;
    const isAdminView = currentUser?.role === 'admin' && !isAdminViewingSite;

    if (isAdminView) {
        body.className = ''; // Clear all classes for admin view
        if (adminTheme !== 'default') {
            body.classList.add(`admin-theme-${adminTheme}`);
        }
    } else {
        body.className = 'bg-gym-darker text-white'; // Set base classes for site view
        if (theme !== 'default') {
            body.classList.add(`theme-${theme}`);
        }
    }
  }, [theme, adminTheme, currentUser, isAdminViewingSite]);

  const handleOpenQuickAddModal = useCallback((product: Product) => {
    setProductForQuickAdd(product);
  }, []);
  
  const handleCloseQuickAddModal = useCallback(() => {
    setProductForQuickAdd(null);
  }, []);

  const handleLoginSuccess = useCallback((user: User) => {
    setCurrentUser(user);
    setIsAuthModalOpen(false);
    if (user.role === 'admin') {
      setIsAdminViewingSite(false);
    }
  }, []);

  const handleLogout = useCallback(() => {
    setCurrentUser(null);
    setIsAdminViewingSite(false);
    setHistory([{
        page: 'home',
        selectedProduct: null,
        listFilter: null,
        infoPageContent: null,
        knowledgeCategory: null,
        scrollPosition: 0,
    }]);
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
      setBrands(prev => prev.map(b => b.id === brandId ? { ...b, isFeatured: !b.isFeatured } : b));
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
    setHistory([{ page: 'home', selectedProduct: null, listFilter: null, infoPageContent: null, knowledgeCategory: null, scrollPosition: 0 }]);
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

    const updateProductReviews = (p: Product) => {
      const updatedReviews = [newReview, ...(p.productReviews || [])];
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
    };

    setProducts(prevProducts => 
        prevProducts.map(p => p.id === productId ? updateProductReviews(p) : p)
    );

    if (selectedProduct?.id === productId) {
        setHistory(prev => {
            const lastState = prev[prev.length - 1];
            const updatedProduct = updateProductReviews(lastState.selectedProduct!);
            return [...prev.slice(0,-1), { ...lastState, selectedProduct: updatedProduct }];
        });
    }
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

  const handleGoHome = useCallback(() => {
    setHistory([{
        page: 'home',
        selectedProduct: null,
        listFilter: null,
        infoPageContent: null,
        knowledgeCategory: null,
        scrollPosition: 0,
    }]);
    window.scrollTo(0, 0);
  }, []);
  
  const handleProductSelect = useCallback((product: Product) => {
    navigateTo({ page: 'product', selectedProduct: product });
  }, []);

  const handleListFilterSelect = useCallback((filter: { type: 'category' | 'brand'; value: string }) => {
    navigateTo({ page: 'category', listFilter: filter });
  }, []);

  const handleAdminViewSite = useCallback(() => {
    setIsAdminViewingSite(true);
    handleGoHome();
  }, [handleGoHome]);

  const handleAdminReturnToPanel = useCallback(() => {
    setIsAdminViewingSite(false);
  }, []);

  const handleCheckout = useCallback(() => {
    setIsCartOpen(false);
    if (currentUser) {
      navigateTo({ page: 'checkout' });
    } else {
      setIsAuthModalOpen(true);
    }
  }, [currentUser]);
  
  const handleAccountClick = useCallback(() => {
    if (currentUser) {
      navigateTo({ page: 'account' });
    } else {
      setIsAuthModalOpen(true);
    }
  }, [currentUser]);

  const handleOrderHistoryClick = useCallback(() => {
    if (currentUser) {
      navigateTo({ page: 'order-history' });
    } else {
      setIsAuthModalOpen(true);
    }
  }, [currentUser]);

  const handleInfoLinkClick = useCallback((title: string, content: React.ReactNode) => {
    navigateTo({ page: 'info', infoPageContent: { title, content } });
  }, []);
  
  const handleViewAllKnowledge = useCallback((categoryTitle: string) => {
    navigateTo({ page: 'knowledge-list', knowledgeCategory: categoryTitle });
  }, []);
  
  const handleBrandsPageClick = useCallback(() => {
    navigateTo({ page: 'brands' });
  }, []);

  const renderPage = () => {
    switch (page) {
      case 'product':
        return <ProductPage 
                  product={selectedProduct!} 
                  allProducts={products}
                  onProductSelect={handleProductSelect}
                  onBack={handleBack} 
                  currentUser={currentUser} 
                  onAddReview={handleAddReview} 
                  onAuthClick={() => setIsAuthModalOpen(true)}
                  onStockSubscribe={handleStockSubscription}
                  onCategorySelect={(filter) => handleListFilterSelect(filter)}
                  onOpenQuickAddModal={handleOpenQuickAddModal}
               />;
      case 'category':
        return <CategoryPage products={products} filterBy={listFilter!} onProductSelect={handleProductSelect} onGoHome={handleReturnToHome} onOpenQuickAddModal={handleOpenQuickAddModal} />;
      case 'checkout':
        return <CheckoutPage onBackToShop={handleBack} onPlaceOrder={handlePlaceOrder} />;
      case 'account':
        return <AccountPage currentUser={currentUser!} onGoHome={handleReturnToHome} />;
      case 'order-history':
        return <OrderHistoryPage onGoHome={handleReturnToHome} orders={orders} onCancelOrder={handleCancelOrder} />;
      case 'info':
        return <InfoPage title={infoPageContent!.title} onGoHome={handleReturnToHome}>{infoPageContent!.content}</InfoPage>;
      case 'knowledge-list':
        const articles = knowledgeCategory === 'Kiến thức Supplement' 
            ? supplementArticles 
            : nutritionArticles;
        return <KnowledgeListPage 
            title={knowledgeCategory!} 
            articles={articles} 
            onGoHome={handleReturnToHome} 
        />;
      case 'brands':
        return <BrandsPage brands={brands} onGoHome={handleReturnToHome} onBrandSelect={(brandName) => handleListFilterSelect({ type: 'brand', value: brandName })} />;
      case 'home':
      default:
        const featuredProducts = products.filter(p => p.isFeatured);
        return <HomePage 
                  products={products} 
                  featuredProducts={featuredProducts} 
                  onProductSelect={handleProductSelect} 
                  onCategorySelect={(category) => handleListFilterSelect({ type: 'category', value: category })}
                  onViewAllKnowledge={handleViewAllKnowledge} 
                  supplementArticles={supplementArticles}
                  nutritionArticles={nutritionArticles}
                  onOpenQuickAddModal={handleOpenQuickAddModal}
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
        orders={orders}
        onUpdateOrderStatus={handleUpdateOrderStatus}
        supplementArticles={supplementArticles}
        nutritionArticles={nutritionArticles}
        onAddArticle={handleAddArticle}
        onUpdateArticle={handleUpdateArticle}
        onDeleteArticle={handleDeleteArticle}
        totalRevenue={totalRevenue}
        productRevenueData={productRevenueData}
        theme={adminTheme}
        setTheme={setAdminTheme}
        brands={brands}
        onAddBrand={handleAddBrand}
        onUpdateBrand={handleUpdateBrand}
        onDeleteBrand={handleDeleteBrand}
        onToggleFeaturedBrand={handleToggleFeaturedBrand}
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
            onCategorySelect={(category) => handleListFilterSelect({ type: 'category', value: category })}
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
            onBrandsPageClick={handleBrandsPageClick}
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
        <QuickAddModal
          isOpen={!!productForQuickAdd}
          onClose={handleCloseQuickAddModal}
          product={productForQuickAdd}
        />
        <Footer onInfoLinkClick={handleInfoLinkClick} />
        <Chatbot />
      </div>
    </CartProvider>
  );
};

export default App;