import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { INITIAL_PRODUCTS } from '../data/initialProducts';
import { INITIAL_ADMINS } from '../data/initialAdmins';
import { CATEGORIES as INITIAL_CATEGORIES } from '../data/gamesConfig';
import { triggerCartHaptic } from '../utils/haptics';
import { SecureSession, sanitizeInput, isValidEmail, isValidUsername } from '../utils/security';

const StoreContext = createContext();

const STORAGE_KEYS = {
  PRODUCTS: 'wrg_products_v3',
  ADMINS: 'wrg_admins_v3',
  ORDERS: 'wrg_orders_v3',
  CART: 'wrg_cart_v3',
  USER: 'wrg_current_user_v3',
  REGISTERED_USERS: 'wrg_users_db_v3',
  CURRENCY: 'wrg_currency_v3',
};

const GUEST_USER = {
  id: 'usr_guest',
  username: 'Guest',
  name: 'Guest Customer',
  role: 'guest',
  isGuest: true,
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'
};

export function StoreProvider({ children }) {
  // Page Navigation State - Customer sees login page first upon accessing URL
  const [currentPage, setCurrentPageState] = useState('login');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const navigateTo = (page, product = null) => {
    if (product) {
      setSelectedProduct(product);
    }
    setCurrentPageState(page);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  // Multi-Currency (USD, TZS, NGN)
  const [currency, setCurrencyState] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.CURRENCY) || 'USD';
    } catch {
      return 'USD';
    }
  });

  const setCurrency = (c) => {
    setCurrencyState(c);
    localStorage.setItem(STORAGE_KEYS.CURRENCY, c);
  };

  // Cart State
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CART);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, selectedPackage = null) => {
    triggerCartHaptic();
    const isCurrency = product.type === 'currency';
    const pkg = selectedPackage || (isCurrency ? product.packages?.[0] : null);
    const itemPrice = isCurrency && pkg ? pkg.price : product.price;
    const cartItemId = `${product.id}_${pkg ? pkg.name.replace(/\s+/g, '_') : 'std'}`;

    setCartItems((prev) => {
      const existing = prev.find((item) => item.cartItemId === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          cartItemId,
          productId: product.id,
          title: product.title,
          gameName: product.gameName || 'Call of Duty: Mobile',
          type: product.type,
          price: itemPrice,
          image: product.images?.[0] || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800',
          selectedPackage: pkg,
          vendorId: product.vendorId || 'admin_tt',
          vendorName: product.vendorName || 'RetiredTT',
          quantity: 1
        }
      ];
    });
  };

  const removeFromCart = (cartItemId) => {
    setCartItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const updateCartQuantity = (cartItemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Registered Users Database (support both email & username)
  const [registeredUsers, setRegisteredUsers] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.REGISTERED_USERS);
      return saved ? JSON.parse(saved) : [
        {
          username: 'codm_pro',
          email: 'player@wrgstore.com',
          password: 'password123',
          name: 'CODM Master Player',
          role: 'user',
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'
        }
      ];
    } catch {
      return [];
    }
  });

  // Current User Session
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USER);
      return saved ? JSON.parse(saved) : GUEST_USER;
    } catch {
      return GUEST_USER;
    }
  });

  // Master Products Catalog (including sold items for history)
  const [allProducts, setAllProducts] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  // Publicly visible active listings - SOLD items automatically excluded across all customer pages & active admin views
  const products = allProducts.filter((p) => !p.isSold && p.status !== 'sold');
  const soldProducts = allProducts.filter((p) => p.isSold || p.status === 'sold');

  // 3 Verified Admins & Vendors
  const [admins, setAdmins] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ADMINS);
      return saved ? JSON.parse(saved) : INITIAL_ADMINS;
    } catch {
      return INITIAL_ADMINS;
    }
  });

  // Orders History
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
      return saved ? JSON.parse(saved) : [
        {
          id: 'WRG-7821-INIT',
          productId: 'codm_acc_01',
          productTitle: 'CODM Mythic Siren + M13 Morningstar Max Level',
          price: 289.99,
          customerName: 'Amani COD',
          adminId: 'admin_tt',
          adminName: 'RetiredTT',
          adminPhone: '+255682850544',
          status: 'Order Delivered / Verified',
          createdAt: new Date(Date.now() - 3600000 * 18).toISOString()
        }
      ];
    } catch {
      return [];
    }
  });

  // Categories (Strictly 2 categories)
  const activeCategories = INITIAL_CATEGORIES;

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(allProducts));
  }, [allProducts]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ADMINS, JSON.stringify(admins));
  }, [admins]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.REGISTERED_USERS, JSON.stringify(registeredUsers));
  }, [registeredUsers]);

  // Single Login Function: strictly Username and Password (email not allowed for login)
  const loginWithCredentials = (username, password) => {
    const cleanUser = sanitizeInput(username.trim().toLowerCase());

    // 1. Match with 3 Vendors / Admins (RetiredTT, Rex, GR 007) by username only
    const matchedAdmin = admins.find((a) => {
      const matchUser = a.username.toLowerCase() === cleanUser;
      return matchUser && a.password === password;
    });

    if (matchedAdmin) {
      const adminSession = {
        id: matchedAdmin.id,
        username: matchedAdmin.username,
        email: matchedAdmin.email,
        name: matchedAdmin.name,
        role: matchedAdmin.role, // 'super_admin' or 'admin'
        roleTitle: matchedAdmin.roleTitle,
        adminId: matchedAdmin.id,
        whatsapp: matchedAdmin.whatsapp,
        avatar: matchedAdmin.avatar,
        sells: matchedAdmin.sells,
        isGuest: false
      };
      setCurrentUser(adminSession);
      SecureSession.setSessionCookie('wrg_session', adminSession.id);
      return { success: true, user: adminSession };
    }

    // 2. Match registered customer accounts by username only
    const matchedUser = registeredUsers.find((u) => {
      const matchUser = u.username.toLowerCase() === cleanUser;
      return matchUser && u.password === password;
    });

    if (matchedUser) {
      const userSession = {
        id: `usr_${matchedUser.username}`,
        username: matchedUser.username,
        email: matchedUser.email,
        name: matchedUser.name || matchedUser.username,
        role: 'user',
        avatar: matchedUser.avatar || GUEST_USER.avatar,
        isGuest: false
      };
      setCurrentUser(userSession);
      SecureSession.setSessionCookie('wrg_session', userSession.id);
      return { success: true, user: userSession };
    }

    return { success: false, message: 'Invalid username or password.' };
  };

  const registerUser = (username, email, password, displayName) => {
    const cleanUser = sanitizeInput(username.trim().toLowerCase());
    const cleanEmail = sanitizeInput(email.trim().toLowerCase());

    if (!isValidUsername(cleanUser)) {
      return { success: false, message: 'Username must be 3-24 alphanumeric characters.' };
    }
    if (!isValidEmail(cleanEmail)) {
      return { success: false, message: 'Please provide a valid email address.' };
    }
    if (!password || password.length < 6) {
      return { success: false, message: 'Password must be at least 6 characters.' };
    }

    const adminExists = admins.some(
      (a) => a.username.toLowerCase() === cleanUser || (a.email && a.email.toLowerCase() === cleanEmail)
    );
    const userExists = registeredUsers.some(
      (u) => u.username.toLowerCase() === cleanUser || (u.email && u.email.toLowerCase() === cleanEmail)
    );

    if (adminExists || userExists) {
      return { success: false, message: 'Username or email is already registered.' };
    }

    const newUser = {
      username: cleanUser,
      email: cleanEmail,
      password,
      name: sanitizeInput(displayName?.trim() || cleanUser),
      role: 'user',
      avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150`
    };

    setRegisteredUsers((prev) => [...prev, newUser]);
    const session = {
      id: `usr_${cleanUser}`,
      username: cleanUser,
      email: cleanEmail,
      name: newUser.name,
      role: 'user',
      avatar: newUser.avatar,
      isGuest: false
    };
    setCurrentUser(session);
    SecureSession.setSessionCookie('wrg_session', session.id);
    return { success: true, user: session };
  };

  const logout = useCallback(() => {
    setCurrentUser(GUEST_USER);
    SecureSession.clearSessionCookie('wrg_session');
    navigateTo('home');
  }, []);

  // --------------------------------------------------------------------------
  // INACTIVITY LOGOUT TIMEOUT (5 Minutes of Inactivity -> Auto Logout)
  // --------------------------------------------------------------------------
  const INACTIVITY_TIMEOUT_MS = 5 * 60 * 1000; // 5 minutes

  useEffect(() => {
    // Only track inactivity for logged-in users (not guests)
    if (!currentUser || currentUser.isGuest) return;

    let timeoutId = null;

    const performInactivityLogout = () => {
      logout();
    };

    const resetInactivityTimer = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(performInactivityLogout, INACTIVITY_TIMEOUT_MS);
    };

    // Arm initial 5-minute inactivity timer
    resetInactivityTimer();

    // User interaction events that reset the 5-minute countdown
    const activityEvents = [
      'mousedown',
      'mousemove',
      'keydown',
      'scroll',
      'touchstart',
      'click',
      'wheel'
    ];

    // Throttle activity checks to once every 2 seconds for peak performance
    let lastActivity = Date.now();
    const handleActivity = () => {
      const now = Date.now();
      if (now - lastActivity > 2000) {
        lastActivity = now;
        resetInactivityTimer();
      }
    };

    activityEvents.forEach((event) => {
      window.addEventListener(event, handleActivity, { passive: true });
    });

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      activityEvents.forEach((event) => {
        window.removeEventListener(event, handleActivity);
      });
    };
  }, [currentUser, logout]);

  // Vendor eligibility checker for cart items
  const getEligibleVendorsForCart = (items = cartItems) => {
    const hasCurrency = items.some((item) => item.type === 'currency');

    return admins.map((admin) => {
      // RetiredTT sells accounts only! If cart has currency, RetiredTT is ineligible
      const isEligible = hasCurrency ? admin.sells.includes('currency') : true;
      const restrictionReason = hasCurrency && !admin.sells.includes('currency')
        ? 'RetiredTT handles Account listings only. Choose Rex or GR 007 for currency top-ups.'
        : null;

      return {
        ...admin,
        isEligible,
        restrictionReason
      };
    });
  };

  // Product Management (Admin/Super Admin)
  const saveProduct = (productData) => {
    if (productData.id) {
      setAllProducts((prev) => prev.map((p) => (p.id === productData.id ? productData : p)));
    } else {
      const newProd = {
        ...productData,
        id: `prod_${Date.now()}`,
        isSold: false,
        status: 'active',
        createdAt: new Date().toISOString()
      };
      setAllProducts((prev) => [newProd, ...prev]);
    }
  };

  const deleteProduct = (id) => {
    setAllProducts((prev) => prev.filter((p) => p.id !== id));
    setCartItems((prev) => prev.filter((item) => item.productId !== id));
  };

  // Vendor Action: Confirm Account Sold -> Instantly removes from public listing across all customer & admin views
  const confirmAccountSold = (productId) => {
    const targetProduct = allProducts.find((p) => p.id === productId);
    if (!targetProduct) return false;

    const soldTimestamp = new Date().toISOString();
    const vendorName = currentUser?.name || targetProduct.vendorName || 'RetiredTT';
    const vendorId = currentUser?.id || targetProduct.vendorId || 'admin_tt';

    setAllProducts((prev) =>
      prev.map((p) =>
        p.id === productId
          ? {
              ...p,
              isSold: true,
              status: 'sold',
              soldAt: soldTimestamp,
              soldBy: vendorName
            }
          : p
      )
    );

    // Remove from cart if any client had this in cart
    setCartItems((prev) => prev.filter((item) => item.productId !== productId));

    // Record into orders history as confirmed sold
    const soldOrder = {
      id: `WRG-SOLD-${Date.now().toString().slice(-6)}`,
      productId: targetProduct.id,
      productTitle: targetProduct.title,
      price: targetProduct.price,
      customerName: 'Verified Client Handover',
      adminId: vendorId,
      adminName: vendorName,
      adminPhone: currentUser?.whatsapp || '+255682850544',
      status: 'Sold & Handed Over',
      type: 'account',
      createdAt: soldTimestamp
    };
    setOrders((prev) => [soldOrder, ...prev]);

    return true;
  };

  // Dynamic Daily Refreshing Metrics for a specific vendor based on what each sells
  const getVendorDailyMetrics = (vendorId) => {
    const vendor = admins.find((a) => a.id === vendorId) || admins[0];
    const isAccountsOnly = !vendor.sells.includes('currency');

    // Vendor's active and sold accounts
    const vendorActiveAccounts = products.filter(
      (p) => p.type === 'account' && (p.vendorId === vendor.id || (!p.vendorId && vendor.id === 'admin_tt'))
    );
    const vendorSoldAccounts = soldProducts.filter(
      (p) => p.type === 'account' && (p.vendorId === vendor.id || p.soldBy === vendor.name)
    );

    // Filter vendor orders
    const vendorOrders = orders.filter(
      (o) => o.adminId === vendor.id || o.adminName === vendor.name
    );

    const todayAccountSales = vendorOrders.filter((o) => o.type === 'account' || o.productId?.includes('acc') || o.status?.includes('Sold'));
    const todayCurrencySales = vendorOrders.filter((o) => o.type === 'currency' || o.productId?.includes('curr'));

    const baseDailyAccounts = vendor.id === 'admin_tt' ? 3 : 2;
    const baseDailyCurrencyOrders = isAccountsOnly ? 0 : (vendor.id === 'admin_rex' ? 14 : 18);
    const baseDailyCPPoints = isAccountsOnly ? 0 : (vendor.id === 'admin_rex' ? 34800 : 48200);

    const totalAccountsSoldToday = Math.max(todayAccountSales.length, baseDailyAccounts) + vendorSoldAccounts.length;
    const totalCurrencyDispatchedToday = Math.max(todayCurrencySales.length, baseDailyCurrencyOrders);

    const dailyAccountRevenue = totalAccountsSoldToday * 275.50;
    const dailyCurrencyRevenue = isAccountsOnly ? 0 : totalCurrencyDispatchedToday * 38.50;
    const todayGrossRevenue = dailyAccountRevenue + dailyCurrencyRevenue;

    return {
      vendor,
      isAccountsOnly,
      todayGrossRevenue,
      todayAccountsCount: totalAccountsSoldToday,
      todayCurrencyCount: totalCurrencyDispatchedToday,
      todayCPPoints: baseDailyCPPoints,
      activeListingsCount: vendorActiveAccounts.length,
      soldListingsCount: vendorSoldAccounts.length,
      handoverEfficiency: '100% (<1hr)',
      recentSales: vendorOrders.slice(0, 10)
    };
  };

  const addOrder = (order) => {
    setOrders((prev) => [order, ...prev]);
  };

  const resetToSampleData = () => {
    setAllProducts(INITIAL_PRODUCTS);
    setAdmins(INITIAL_ADMINS);
    setCartItems([]);
    localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
    localStorage.removeItem(STORAGE_KEYS.ADMINS);
    localStorage.removeItem(STORAGE_KEYS.CART);
  };

  const isSuperAdmin = currentUser?.role === 'super_admin';
  const isAdmin = currentUser?.role === 'admin' || isSuperAdmin;

  return (
    <StoreContext.Provider
      value={{
        currentPage,
        setCurrentPage: setCurrentPageState,
        navigateTo,
        selectedProduct,
        setSelectedProduct,
        currency,
        setCurrency,
        cartItems,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotal,
        cartCount,
        currentUser,
        loginWithCredentials,
        registerUser,
        logout,
        isAdmin,
        isSuperAdmin,
        products,
        allProducts,
        soldProducts,
        confirmAccountSold,
        getVendorDailyMetrics,
        saveProduct,
        deleteProduct,
        admins,
        getEligibleVendorsForCart,
        orders,
        addOrder,
        activeCategories,
        resetToSampleData
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
