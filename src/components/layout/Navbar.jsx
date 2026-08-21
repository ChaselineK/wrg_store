import React, { useState } from 'react';
import { 
  Gamepad2, 
  Search, 
  Sun, 
  Moon, 
  Heart, 
  User, 
  PlusCircle, 
  ShoppingBag, 
  DollarSign, 
  ChevronDown,
  Home,
  UserCheck,
  Coins,
  PhoneCall,
  Menu,
  X
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { useTheme } from '../../context/ThemeContext';
import { GlassButton } from '../ui/GlassButton';
import { CURRENCIES } from '../../utils/currencyHelper';

export function Navbar({ searchQuery, setSearchQuery, onNavigateCategory }) {
  const { 
    currentUser, 
    isAdmin, 
    currency, 
    setCurrency, 
    openProductForm, 
    setIsOrdersLogOpen, 
    setIsFavoritesOpen, 
    setIsProfileOpen, 
    favorites, 
    orders 
  } = useStore();

  const { theme, toggleTheme } = useTheme();
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId, category = null) => {
    setIsMobileMenuOpen(false);
    if (category && onNavigateCategory) {
      onNavigateCategory(category);
    }
    if (sectionId === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="glass-navbar" style={{ position: 'sticky', top: 0, zIndex: 100 }}>
      <div 
        className="app-container" 
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          minHeight: '68px', 
          padding: '0.6rem 1rem', 
          gap: '1rem' 
        }}
      >
        
        {/* Left: Brand Logo */}
        <div 
          style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer', flexShrink: 0 }}
          onClick={() => scrollToSection('top', 'all')}
        >
          <div 
            style={{
              width: '38px',
              height: '38px',
              borderRadius: 'var(--radius-xs)',
              background: 'var(--accent-gradient)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff'
            }}
          >
            <Gamepad2 size={22} color="#ffffff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.02em' }}>
                WRG <span className="text-gradient">STORE</span>
              </span>
            </div>
            <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', display: 'block', marginTop: '-2px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Gaming Marketplace
            </span>
          </div>
        </div>

        {/* Center: Desktop Navigation Links (Monochrome Icons) */}
        <nav className="desktop-nav-links" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <button
            onClick={() => scrollToSection('top', 'all')}
            className="nav-link-btn"
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-primary)',
              padding: '0.4rem 0.75rem',
              borderRadius: 'var(--radius-xs)',
              fontSize: '0.88rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              transition: 'all 0.2s ease'
            }}
          >
            <Home size={15} color="currentColor" />
            <span>Home</span>
          </button>

          <button
            onClick={() => scrollToSection('marketplace-catalog', 'account')}
            className="nav-link-btn"
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-primary)',
              padding: '0.4rem 0.75rem',
              borderRadius: 'var(--radius-xs)',
              fontSize: '0.88rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              transition: 'all 0.2s ease'
            }}
          >
            <UserCheck size={15} color="currentColor" />
            <span>Accounts</span>
          </button>

          <button
            onClick={() => scrollToSection('marketplace-catalog', 'currency')}
            className="nav-link-btn"
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-primary)',
              padding: '0.4rem 0.75rem',
              borderRadius: 'var(--radius-xs)',
              fontSize: '0.88rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              transition: 'all 0.2s ease'
            }}
          >
            <Coins size={15} color="currentColor" />
            <span>Currency</span>
          </button>

          <button
            onClick={() => {
              if (isAdmin) {
                setIsOrdersLogOpen(true);
              } else {
                setIsProfileOpen(true);
              }
            }}
            className="nav-link-btn"
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-primary)',
              padding: '0.4rem 0.75rem',
              borderRadius: 'var(--radius-xs)',
              fontSize: '0.88rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              transition: 'all 0.2s ease'
            }}
          >
            <ShoppingBag size={15} color="currentColor" />
            <span>Orders {orders.length > 0 && `(${orders.length})`}</span>
          </button>

          <button
            onClick={() => scrollToSection('verified-admins-section')}
            className="nav-link-btn"
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-primary)',
              padding: '0.4rem 0.75rem',
              borderRadius: 'var(--radius-xs)',
              fontSize: '0.88rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              transition: 'all 0.2s ease'
            }}
          >
            <PhoneCall size={15} color="currentColor" />
            <span>Contacts</span>
          </button>
        </nav>

        {/* Right Controls: Search, Currency, Wishlist, Theme, Profile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          
          {/* Search Box */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }} className="hide-on-mobile">
            <Search 
              size={15} 
              style={{ position: 'absolute', left: '0.75rem', color: 'currentColor', pointerEvents: 'none', opacity: 0.7 }} 
            />
            <input
              type="text"
              className="glass-input"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ paddingLeft: '2.2rem', borderRadius: 'var(--radius-full)', height: '36px', fontSize: '0.82rem', width: '150px' }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: '0.5rem',
                  background: 'transparent',
                  border: 'none',
                  color: 'currentColor',
                  cursor: 'pointer',
                  fontSize: '0.7rem'
                }}
              >
                ✕
              </button>
            )}
          </div>

          {/* Currency Switcher */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)}
              className="glass-panel"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
                padding: '0.35rem 0.6rem',
                borderRadius: 'var(--radius-xs)',
                cursor: 'pointer',
                fontSize: '0.8rem',
                fontWeight: 700,
                color: 'var(--text-primary)'
              }}
              title="Select Currency"
            >
              <DollarSign size={13} color="currentColor" />
              <span>{currency}</span>
              <ChevronDown size={11} color="currentColor" />
            </button>

            {isCurrencyDropdownOpen && (
              <div
                className="glass-panel animate-fade-up"
                style={{
                  position: 'absolute',
                  top: '115%',
                  right: 0,
                  width: '160px',
                  padding: '0.4rem',
                  zIndex: 200,
                  borderRadius: 'var(--radius-sm)',
                  boxShadow: 'var(--glass-shadow-lg)'
                }}
              >
                {Object.values(CURRENCIES).map((c) => (
                  <button
                    key={c.code}
                    onClick={() => {
                      setCurrency(c.code);
                      setIsCurrencyDropdownOpen(false);
                    }}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.45rem 0.65rem',
                      borderRadius: 'var(--radius-xs)',
                      background: currency === c.code ? 'var(--accent-gradient-soft)' : 'transparent',
                      border: 'none',
                      color: currency === c.code ? 'var(--accent-primary)' : 'var(--text-primary)',
                      cursor: 'pointer',
                      fontSize: '0.8rem',
                      fontWeight: currency === c.code ? 700 : 500
                    }}
                  >
                    <span>{c.name}</span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{c.code}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Admin Shortcuts */}
          {isAdmin && (
            <div style={{ display: 'flex', gap: '0.3rem' }} className="hide-on-mobile">
              <GlassButton
                variant="primary"
                size="sm"
                icon={PlusCircle}
                onClick={() => openProductForm(null)}
              >
                Post
              </GlassButton>
            </div>
          )}

          {/* Wishlist */}
          <button
            onClick={() => setIsFavoritesOpen(true)}
            className="glass-panel"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-xs)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'currentColor',
              position: 'relative'
            }}
            title="Saved Wishlist"
          >
            <Heart size={16} color="currentColor" fill={favorites.length > 0 ? 'currentColor' : 'none'} />
            {favorites.length > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '-2px',
                  right: '-2px',
                  background: 'var(--text-primary)',
                  color: 'var(--bg-main)',
                  fontSize: '0.6rem',
                  fontWeight: 700,
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {favorites.length}
              </span>
            )}
          </button>

          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            className="glass-panel"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-xs)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'currentColor'
            }}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? (
              <Sun size={15} color="currentColor" />
            ) : (
              <Moon size={15} color="currentColor" />
            )}
          </button>

          {/* User Profile Avatar */}
          <button
            onClick={() => setIsProfileOpen(true)}
            className="glass-panel"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              border: isAdmin ? '1.5px solid var(--accent-primary)' : '1px solid var(--glass-border-subtle)',
              padding: 0,
              overflow: 'hidden'
            }}
            title="User Profile & Settings"
          >
            {currentUser?.avatar ? (
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <User size={16} color="currentColor" />
            )}
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="glass-panel hide-on-desktop"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-xs)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'currentColor'
            }}
            title="Toggle navigation"
          >
            {isMobileMenuOpen ? <X size={18} color="currentColor" /> : <Menu size={18} color="currentColor" />}
          </button>

        </div>

      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div 
          className="animate-fade-up hide-on-desktop"
          style={{
            background: 'var(--glass-modal)',
            borderTop: '1px solid var(--glass-border-subtle)',
            padding: '1rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            boxShadow: 'var(--glass-shadow-lg)'
          }}
        >
          <div style={{ position: 'relative', marginBottom: '0.5rem' }}>
            <Search size={15} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'currentColor', opacity: 0.7 }} />
            <input
              type="text"
              className="glass-input"
              placeholder="Search marketplace..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ paddingLeft: '2.2rem', width: '100%', height: '38px', fontSize: '0.85rem' }}
            />
          </div>

          <button
            onClick={() => scrollToSection('top', 'all')}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-primary)',
              padding: '0.6rem 0.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              fontSize: '0.92rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            <Home size={17} color="currentColor" />
            <span>Home</span>
          </button>

          <button
            onClick={() => scrollToSection('marketplace-catalog', 'account')}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-primary)',
              padding: '0.6rem 0.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              fontSize: '0.92rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            <UserCheck size={17} color="currentColor" />
            <span>Accounts Marketplace</span>
          </button>

          <button
            onClick={() => scrollToSection('marketplace-catalog', 'currency')}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-primary)',
              padding: '0.6rem 0.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              fontSize: '0.92rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            <Coins size={17} color="currentColor" />
            <span>In-Game Currency</span>
          </button>

          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              if (isAdmin) {
                setIsOrdersLogOpen(true);
              } else {
                setIsProfileOpen(true);
              }
            }}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-primary)',
              padding: '0.6rem 0.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              fontSize: '0.92rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            <ShoppingBag size={17} color="currentColor" />
            <span>Orders & Invoices ({orders.length})</span>
          </button>

          <button
            onClick={() => scrollToSection('verified-admins-section')}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-primary)',
              padding: '0.6rem 0.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              fontSize: '0.92rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            <PhoneCall size={17} color="currentColor" />
            <span>3 Verified Admins & Contacts</span>
          </button>
        </div>
      )}

    </header>
  );
}
