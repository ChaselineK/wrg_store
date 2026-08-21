import React, { useState, useMemo } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/layout/Navbar';
import { HeroBanner } from './components/layout/HeroBanner';
import { FilterBar } from './components/store/FilterBar';
import { ProductGrid } from './components/store/ProductGrid';
import { AdminsShowcase } from './components/layout/AdminsShowcase';
import { Footer } from './components/layout/Footer';
import { ProductDetailModal } from './components/store/ProductDetailModal';
import { AdminSelectorModal } from './components/checkout/AdminSelectorModal';
import { ProductFormModal } from './components/admin/ProductFormModal';
import { AdminListManager } from './components/admin/AdminListManager';
import { OrdersTable } from './components/admin/OrdersTable';
import { FavoritesModal } from './components/store/FavoritesModal';
import { AuthModal } from './components/auth/AuthModal';
import { UserProfileModal } from './components/auth/UserProfileModal';
import { SkeletonLoader } from './components/ui/SkeletonLoader';
import { ShieldCheck, PlusCircle, Users, ShoppingBag } from 'lucide-react';

function StoreMain() {
  const { 
    products, 
    isAdmin, 
    isInitialLoading,
    openProductForm, 
    setIsAdminManagerOpen, 
    setIsOrdersLogOpen,
    orders,
    admins,
    currentUser 
  } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedGame, setSelectedGame] = useState('all');
  const [selectedPlatform, setSelectedPlatform] = useState('All Platforms');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState(600);

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesGame = item.gameName?.toLowerCase().includes(q) || item.game?.toLowerCase().includes(q);
        const matchesRank = item.specs?.rank?.toLowerCase().includes(q);
        const matchesCaption = item.caption?.toLowerCase().includes(q);
        if (!matchesTitle && !matchesGame && !matchesRank && !matchesCaption) return false;
      }

      if (selectedCategory !== 'all' && item.type !== selectedCategory) {
        return false;
      }

      if (selectedGame !== 'all' && item.game !== selectedGame) {
        return false;
      }

      if (selectedPlatform !== 'All Platforms') {
        if (!item.platform || !item.platform.includes(selectedPlatform.split(' ')[0])) {
          return false;
        }
      }

      if (item.price > priceRange) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_asc') return a.price - b.price;
      if (sortBy === 'price_desc') return b.price - a.price;
      if (sortBy === 'newest') return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      if (a.isHot && !b.isHot) return -1;
      if (!a.isHot && b.isHot) return 1;
      return 0;
    });
  }, [products, searchQuery, selectedCategory, selectedGame, selectedPlatform, priceRange, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedGame('all');
    setSelectedPlatform('All Platforms');
    setPriceRange(600);
    setSortBy('featured');
  };

  // If initial load, show the liquid glass skeleton screen
  if (isInitialLoading) {
    return (
      <div style={{ position: 'relative', minHeight: '100vh', background: 'var(--bg-main)' }}>
        <div className="liquid-bg-container">
          <div className="liquid-orb liquid-orb-1" />
          <div className="liquid-orb liquid-orb-2" />
        </div>
        <SkeletonLoader />
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Liquid Background Orbs */}
      <div className="liquid-bg-container">
        <div className="liquid-orb liquid-orb-1" />
        <div className="liquid-orb liquid-orb-2" />
        <div className="liquid-orb liquid-orb-3" />
      </div>

      {/* Admin Notice Bar if logged in with Admin credentials */}
      {isAdmin && (
        <div 
          style={{
            background: 'var(--accent-gradient)',
            color: '#ffffff',
            padding: '0.4rem 1rem',
            fontSize: '0.75rem',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.4rem',
            zIndex: 110
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <ShieldCheck size={14} />
            <span>Admin Active: Logged in as {currentUser?.name}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              onClick={() => openProductForm(null)}
              style={{
                background: 'rgba(255,255,255,0.18)',
                border: 'none',
                color: '#fff',
                padding: '0.2rem 0.5rem',
                borderRadius: 'var(--radius-xs)',
                cursor: 'pointer',
                fontSize: '0.72rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem'
              }}
            >
              <PlusCircle size={12} /> Post Listing
            </button>

            <button
              onClick={() => setIsAdminManagerOpen(true)}
              style={{
                background: 'rgba(255,255,255,0.18)',
                border: 'none',
                color: '#fff',
                padding: '0.2rem 0.5rem',
                borderRadius: 'var(--radius-xs)',
                cursor: 'pointer',
                fontSize: '0.72rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem'
              }}
            >
              <Users size={12} /> {admins.length} Admins
            </button>

            <button
              onClick={() => setIsOrdersLogOpen(true)}
              style={{
                background: 'rgba(255,255,255,0.18)',
                border: 'none',
                color: '#fff',
                padding: '0.2rem 0.5rem',
                borderRadius: 'var(--radius-xs)',
                cursor: 'pointer',
                fontSize: '0.72rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem'
              }}
            >
              <ShoppingBag size={12} /> Orders & Sales
            </button>
          </div>
        </div>
      )}

      {/* Navigation */}
      <Navbar 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onNavigateCategory={(cat) => {
          setSelectedCategory(cat);
          const catalog = document.getElementById('marketplace-catalog');
          if (catalog) catalog.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Main Content */}
      <main style={{ flex: 1 }}>
        
        {/* Hero Section */}
        <HeroBanner 
          onSelectCategory={(cat) => setSelectedCategory(cat)}
          onSelectGame={(gameId) => {
            setSelectedGame(gameId);
            const catalog = document.getElementById('marketplace-catalog');
            if (catalog) catalog.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Marketplace Catalog Section */}
        <section style={{ padding: '0.5rem 0 2.5rem 0' }}>
          <div className="app-container">
            
            {/* Filter Bar with category removal */}
            <FilterBar 
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedGame={selectedGame}
              setSelectedGame={setSelectedGame}
              selectedPlatform={selectedPlatform}
              setSelectedPlatform={setSelectedPlatform}
              sortBy={sortBy}
              setSortBy={setSortBy}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              totalResults={filteredProducts.length}
            />

            {/* Products Grid with Guest Mode restrictions */}
            <ProductGrid 
              products={filteredProducts}
              onResetFilters={handleResetFilters}
            />

          </div>
        </section>

        {/* 3 Verified Admins Showcase */}
        <AdminsShowcase />

      </main>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <ProductDetailModal />
      <AdminSelectorModal />
      <ProductFormModal />
      <AdminListManager />
      <OrdersTable />
      <FavoritesModal />
      <AuthModal />
      <UserProfileModal />

    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <StoreProvider>
        <StoreMain />
      </StoreProvider>
    </ThemeProvider>
  );
}
