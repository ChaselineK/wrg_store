import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PRODUCTS } from '../data/initialProducts';
import { INITIAL_ADMINS } from '../data/initialAdmins';
import { CATEGORIES as INITIAL_CATEGORIES } from '../data/gamesConfig';

const StoreContext = createContext();

const STORAGE_KEYS = {
  PRODUCTS: 'nexus_products_v2',
  ADMINS: 'nexus_admins_v2',
  ORDERS: 'nexus_orders_v2',
  FAVORITES: 'nexus_favorites_v2',
  USER: 'nexus_current_user_v2',
  REGISTERED_USERS: 'nexus_users_db_v2',
  CURRENCY: 'nexus_currency_v2',
  CATEGORIES: 'nexus_categories_v2'
};

const GUEST_USER = {
  id: 'usr_guest',
  username: 'Guest',
  name: 'Guest Visitor',
  role: 'guest',
  isGuest: true,
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'
};

export function StoreProvider({ children }) {
  // 1. Initial Page Skeleton Loading Simulation
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, []);

  // 2. Multi-Currency (USD, TZS, NGN)
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

  // 3. Registered Users Database
  const [registeredUsers, setRegisteredUsers] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.REGISTERED_USERS);
      return saved ? JSON.parse(saved) : [
        {
          username: 'gamer1',
          password: 'password123',
          name: 'Pro Gamer',
          role: 'user',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'
        }
      ];
    } catch {
      return [];
    }
  });

  // 4. Current User Session (Default is Guest)
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USER);
      return saved ? JSON.parse(saved) : GUEST_USER;
    } catch {
      return GUEST_USER;
    }
  });

  // 5. Products Catalog
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  // 6. 3 Verified Admins
  const [admins, setAdmins] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ADMINS);
      return saved ? JSON.parse(saved) : INITIAL_ADMINS;
    } catch {
      return INITIAL_ADMINS;
    }
  });

  // 7. Orders & Sales Tracker
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
      return saved ? JSON.parse(saved) : [
        {
          id: 'NX-4821-INIT',
          productId: 'prod_1',
          productTitle: 'Valorant Radiant / Immortal 3 Stacked',
          price: 189.99,
          customerName: 'Juma Hassan',
          adminId: 'admin_rex',
          adminName: 'Richkid Rex',
          adminPhone: '+255740866470',
          status: 'Paid / Completed',
          createdAt: new Date(Date.now() - 3600000 * 20).toISOString()
        },
        {
          id: 'NX-9102-INIT',
          productId: 'prod_8',
          productTitle: 'Fortnite V-Bucks Direct Top-Up (Mega Pack)',
          price: 69.99,
          customerName: 'Kelvin Mwamba',
          adminId: 'admin_tt',
          adminName: 'RetiredonTT',
          adminPhone: '+255682850544',
          status: 'Paid / Completed',
          createdAt: new Date(Date.now() - 3600000 * 10).toISOString()
        }
      ];
    } catch {
      return [];
    }
  });

  // 8. Categories
  const [activeCategories, setActiveCategories] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
      return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
    } catch {
      return INITIAL_CATEGORIES;
    }
  });

  // 9. Favorites
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      return saved ? JSON.parse(saved) : ['prod_1'];
    } catch {
      return [];
    }
  });

  // UI Modal States - Initially Open Auth Modal by default on site visit!
  const [activeDetailProduct, setActiveDetailProduct] = useState(null);
  const [checkoutProduct, setCheckoutProduct] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(true); // Initially displays the login interface on access
  const [isProductFormOpen, setIsProductFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isAdminManagerOpen, setIsAdminManagerOpen] = useState(false);
  const [isOrdersLogOpen, setIsOrdersLogOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ADMINS, JSON.stringify(admins));
  }, [admins]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.REGISTERED_USERS, JSON.stringify(registeredUsers));
  }, [registeredUsers]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(activeCategories));
  }, [activeCategories]);

  // Auth Operations (Username & Password Only)
  const loginWithCredentials = (username, password) => {
    const cleanUser = username.trim().toLowerCase();

    // 1. Check if it's one of the 3 Admins
    const matchedAdmin = admins.find(
      a => a.username.toLowerCase() === cleanUser && a.password === password
    );

    if (matchedAdmin) {
      const adminSession = {
        id: matchedAdmin.id,
        username: matchedAdmin.username,
        name: matchedAdmin.name,
        role: 'admin',
        adminId: matchedAdmin.id,
        whatsapp: matchedAdmin.whatsapp,
        avatar: matchedAdmin.avatar,
        isGuest: false
      };
      setCurrentUser(adminSession);
      setIsAuthModalOpen(false);
      return { success: true, user: adminSession };
    }

    // 2. Check registered normal users
    const matchedUser = registeredUsers.find(
      u => u.username.toLowerCase() === cleanUser && u.password === password
    );

    if (matchedUser) {
      const userSession = {
        id: `usr_${cleanUser}`,
        username: matchedUser.username,
        name: matchedUser.name || matchedUser.username,
        role: 'user',
        avatar: matchedUser.avatar || GUEST_USER.avatar,
        isGuest: false
      };
      setCurrentUser(userSession);
      setIsAuthModalOpen(false);
      return { success: true, user: userSession };
    }

    return { success: false, message: 'Invalid username or password.' };
  };

  const registerUser = (username, password, displayName) => {
    const cleanUser = username.trim().toLowerCase();

    const adminExists = admins.some(a => a.username.toLowerCase() === cleanUser);
    const userExists = registeredUsers.some(u => u.username.toLowerCase() === cleanUser);

    if (adminExists || userExists) {
      return { success: false, message: 'Username is already taken.' };
    }

    const newUser = {
      username: cleanUser,
      password,
      name: displayName?.trim() || cleanUser,
      role: 'user',
      avatar: `https://images.unsplash.com/photo-${1534528741775 + Math.floor(Math.random() * 500)}?w=150`
    };

    setRegisteredUsers(prev => [...prev, newUser]);

    const session = {
      id: `usr_${cleanUser}`,
      username: newUser.username,
      name: newUser.name,
      role: 'user',
      avatar: newUser.avatar,
      isGuest: false
    };

    setCurrentUser(session);
    setIsAuthModalOpen(false);
    return { success: true, user: session };
  };

  const continueAsGuest = () => {
    setCurrentUser(GUEST_USER);
    setIsAuthModalOpen(false);
  };

  const logout = () => {
    setCurrentUser(GUEST_USER);
    setIsAuthModalOpen(true); // Show login screen on sign out
  };

  // Category customization / removal
  const removeCategory = (categoryId) => {
    if (activeCategories.length <= 1) {
      alert('At least one category must remain active.');
      return;
    }
    setActiveCategories(prev => prev.filter(c => c.id !== categoryId));
  };

  const resetCategories = () => {
    setActiveCategories(INITIAL_CATEGORIES);
  };

  // Orders & Sales Management
  const addOrder = (order) => {
    setOrders(prev => [order, ...prev]);
  };

  const markOrderAsPaid = (orderId) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        return {
          ...o,
          status: 'Paid / Completed',
          paidAt: new Date().toISOString()
        };
      }
      return o;
    }));
  };

  const updateOrderStatus = (orderId, status) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
  };

  // Metrics Calculations (Global vs Admin Specific)
  const totalStoreSalesUSD = orders
    .filter(o => o.status === 'Paid / Completed')
    .reduce((sum, o) => sum + (Number(o.price) || 0), 0);

  const totalStoreOrdersCount = orders.length;
  const totalPaidOrdersCount = orders.filter(o => o.status === 'Paid / Completed').length;

  const getAdminSales = (adminId) => {
    const adminOrders = orders.filter(o => o.adminId === adminId);
    const paidAdminOrders = adminOrders.filter(o => o.status === 'Paid / Completed');
    const salesUSD = paidAdminOrders.reduce((sum, o) => sum + (Number(o.price) || 0), 0);
    return {
      adminOrders,
      paidCount: paidAdminOrders.length,
      totalCount: adminOrders.length,
      salesUSD
    };
  };

  // Products CRUD
  const addProduct = (newProduct) => {
    const item = {
      ...newProduct,
      id: `prod_${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    setProducts(prev => [item, ...prev]);
    return item;
  };

  const updateProduct = (id, updatedData) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updatedData, updatedAt: new Date().toISOString() } : p));
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    if (activeDetailProduct?.id === id) {
      setActiveDetailProduct(null);
    }
  };

  const resetToSampleData = () => {
    setProducts(INITIAL_PRODUCTS);
    setAdmins(INITIAL_ADMINS);
    setActiveCategories(INITIAL_CATEGORIES);
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
    localStorage.setItem(STORAGE_KEYS.ADMINS, JSON.stringify(INITIAL_ADMINS));
  };

  // Admins CRUD
  const updateAdmin = (id, updatedData) => {
    setAdmins(prev => prev.map(a => a.id === id ? { ...a, ...updatedData } : a));
  };

  const addAdmin = (adminData) => {
    const newAdmin = {
      ...adminData,
      id: `admin_${Date.now()}`,
      verified: true
    };
    setAdmins(prev => [...prev, newAdmin]);
  };

  const deleteAdmin = (id) => {
    setAdmins(prev => prev.filter(a => a.id !== id));
  };

  // Favorites
  const toggleFavorite = (productId) => {
    setFavorites(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  const isFavorite = (productId) => favorites.includes(productId);

  const openCheckout = (product) => {
    setCheckoutProduct(product);
  };

  const openProductForm = (productToEdit = null) => {
    setEditingProduct(productToEdit);
    setIsProductFormOpen(true);
  };

  const isGuest = !currentUser || currentUser.role === 'guest' || currentUser.isGuest;
  const isAdmin = currentUser?.role === 'admin';

  return (
    <StoreContext.Provider
      value={{
        isInitialLoading,
        currency,
        setCurrency,
        products,
        admins,
        orders,
        favorites,
        currentUser,
        isGuest,
        isAdmin,
        activeCategories,
        removeCategory,
        resetCategories,
        // Metrics
        totalStoreSalesUSD,
        totalStoreOrdersCount,
        totalPaidOrdersCount,
        getAdminSales,
        markOrderAsPaid,
        updateOrderStatus,
        addOrder,
        // Modals
        activeDetailProduct,
        setActiveDetailProduct,
        checkoutProduct,
        setCheckoutProduct,
        openCheckout,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isProductFormOpen,
        setIsProductFormOpen,
        editingProduct,
        openProductForm,
        isAdminManagerOpen,
        setIsAdminManagerOpen,
        isOrdersLogOpen,
        setIsOrdersLogOpen,
        isFavoritesOpen,
        setIsFavoritesOpen,
        isProfileOpen,
        setIsProfileOpen,
        // Product Actions
        addProduct,
        updateProduct,
        deleteProduct,
        resetToSampleData,
        // Admin Actions
        updateAdmin,
        addAdmin,
        deleteAdmin,
        // Favorites
        toggleFavorite,
        isFavorite,
        // Auth
        loginWithCredentials,
        registerUser,
        continueAsGuest,
        logout
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
