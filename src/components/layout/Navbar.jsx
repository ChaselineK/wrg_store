import React, { useState } from 'react';
import { 
  Gamepad2, 
  Search, 
  User, 
  ShoppingCart, 
  DollarSign, 
  ChevronDown,
  Home,
  ShieldCheck,
  Coins,
  Users,
  Menu,
  X,
  LogOut,
  SlidersHorizontal
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { CURRENCIES } from '../../utils/currencyHelper';

export function Navbar({ searchQuery, setSearchQuery }) {
  const { 
    currentPage, 
    navigateTo, 
    currentUser, 
    isAdmin, 
    isSuperAdmin,
    logout, 
    currency, 
    setCurrency, 
    cartCount 
  } = useStore();

  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  return (
    <header className="glass-navbar">
      <div 
        className="app-container" 
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          minHeight: '64px', 
          padding: '0.6rem 1rem', 
          gap: '1rem' 
        }}
      >
        {/* Left: Brand Logo */}
        <div 
          style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', cursor: 'pointer', flexShrink: 0 }}
          onClick={() => navigateTo('home')}
        >
          <div 
            style={{
              width: '38px',
              height: '38px',
              borderRadius: 'var(--radius-sm)',
              background: '#0066ff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              boxShadow: '0 2px 8px rgba(0, 102, 255, 0.3)'
            }}
          >
            <Gamepad2 size={22} color="#ffffff" />
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
              WRG <span style={{ color: '#0066ff' }}>STORE</span>
            </div>
            <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', display: 'block', marginTop: '-3px', letterSpacing: '0.04em', textTransform: 'uppercase', fontWeight: 600 }}>
              CODM Marketplace
            </span>
          </div>
        </div>

        {/* Center: Desktop Navigation Links (Multi-Page Routing) */}
        <nav className="desktop-nav-links" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <button
            onClick={() => navigateTo('home')}
            className={`nav-link-btn ${currentPage === 'home' ? 'active' : ''}`}
            style={{
              background: currentPage === 'home' ? 'var(--accent-light)' : 'transparent',
              border: 'none',
              color: currentPage === 'home' ? 'var(--accent-primary)' : 'var(--text-secondary)',
              padding: '0.45rem 0.85rem',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.88rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <Home size={15} />
            <span>Home</span>
          </button>

          <button
            onClick={() => navigateTo('accounts')}
            className={`nav-link-btn ${currentPage === 'accounts' ? 'active' : ''}`}
            style={{
              background: currentPage === 'accounts' ? 'var(--accent-light)' : 'transparent',
              border: 'none',
              color: currentPage === 'accounts' ? 'var(--accent-primary)' : 'var(--text-secondary)',
              padding: '0.45rem 0.85rem',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.88rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <ShieldCheck size={15} />
            <span>Account listings</span>
          </button>

          <button
            onClick={() => navigateTo('currency')}
            className={`nav-link-btn ${currentPage === 'currency' ? 'active' : ''}`}
            style={{
              background: currentPage === 'currency' ? 'var(--accent-light)' : 'transparent',
              border: 'none',
              color: currentPage === 'currency' ? 'var(--accent-primary)' : 'var(--text-secondary)',
              padding: '0.45rem 0.85rem',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.88rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <Coins size={15} />
            <span>In-game currencies</span>
          </button>

          <button
            onClick={() => navigateTo('vendors')}
            className={`nav-link-btn ${currentPage === 'vendors' ? 'active' : ''}`}
            style={{
              background: currentPage === 'vendors' ? 'var(--accent-light)' : 'transparent',
              border: 'none',
              color: currentPage === 'vendors' ? 'var(--accent-primary)' : 'var(--text-secondary)',
              padding: '0.45rem 0.85rem',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.88rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <Users size={15} />
            <span>Vendors</span>
          </button>
        </nav>

        {/* Right Controls: Search, Currency, Cart, Simple Profile Icon */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          
          {/* Quick Search */}
          {setSearchQuery && (
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }} className="hide-on-mobile">
              <Search 
                size={14} 
                style={{ position: 'absolute', left: '0.75rem', color: 'var(--text-muted)', pointerEvents: 'none' }} 
              />
              <input
                type="text"
                className="glass-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ 
                  paddingLeft: '2.1rem', 
                  borderRadius: 'var(--radius-full)', 
                  height: '34px', 
                  fontSize: '0.8rem', 
                  width: '140px',
                  background: 'var(--bg-tertiary)'
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{
                    position: 'absolute',
                    right: '0.5rem',
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                    fontSize: '0.7rem'
                  }}
                >
                  ✕
                </button>
              )}
            </div>
          )}

          {/* Currency Switcher */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
              className="glass-btn glass-btn-secondary"
              style={{
                padding: '0.35rem 0.6rem',
                fontSize: '0.78rem',
                height: '36px',
                borderRadius: 'var(--radius-sm)'
              }}
              title="Change Currency"
            >
              <DollarSign size={13} />
              <span>{currency}</span>
              <ChevronDown size={11} />
            </button>

            {isCurrencyOpen && (
              <div
                className="glass-panel"
                style={{
                  position: 'absolute',
                  top: '110%',
                  right: 0,
                  width: '150px',
                  padding: '0.35rem',
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
                      setIsCurrencyOpen(false);
                    }}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.45rem 0.65rem',
                      borderRadius: 'var(--radius-xs)',
                      background: currency === c.code ? 'var(--accent-light)' : 'transparent',
                      border: 'none',
                      color: currency === c.code ? 'var(--accent-primary)' : 'var(--text-primary)',
                      cursor: 'pointer',
                      fontSize: '0.78rem',
                      fontWeight: currency === c.code ? 700 : 500
                    }}
                  >
                    <span>{c.name}</span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>{c.code}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Cart Button with Counter */}
          <button
            onClick={() => navigateTo('cart')}
            className="glass-btn glass-btn-secondary"
            style={{
              height: '36px',
              padding: '0 0.75rem',
              borderRadius: 'var(--radius-sm)',
              position: 'relative',
              borderColor: cartCount > 0 ? '#0066ff' : 'var(--glass-border-subtle)'
            }}
            title="Shopping Cart"
          >
            <ShoppingCart size={16} color={cartCount > 0 ? '#0066ff' : 'currentColor'} />
            <span style={{ fontSize: '0.82rem', fontWeight: 700, marginLeft: '0.15rem' }}>
              Cart
            </span>
            {cartCount > 0 && (
              <span
                style={{
                  background: '#0066ff',
                  color: '#ffffff',
                  fontSize: '0.65rem',
                  fontWeight: 800,
                  padding: '1px 6px',
                  borderRadius: 'var(--radius-full)',
                  marginLeft: '0.25rem'
                }}
              >
                {cartCount}
              </span>
            )}
          </button>

          {/* Simple Profile Icon (Replacing the profile photo on home page as requested) */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => {
                if (currentUser?.isGuest) {
                  navigateTo('login');
                } else {
                  setIsProfileDropdownOpen(!isProfileDropdownOpen);
                }
              }}
              className="glass-btn glass-btn-secondary"
              style={{
                width: '36px',
                height: '36px',
                padding: 0,
                borderRadius: 'var(--radius-sm)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: !currentUser?.isGuest ? '#0066ff' : 'currentColor',
                border: !currentUser?.isGuest ? '1.5px solid #0066ff' : '1px solid var(--glass-border-subtle)'
              }}
              title={currentUser?.isGuest ? 'Log In / Register' : `${currentUser.name} (${currentUser.roleTitle || currentUser.role})`}
            >
              <User size={16} />
            </button>

            {isProfileDropdownOpen && !currentUser?.isGuest && (
              <div
                className="glass-panel"
                style={{
                  position: 'absolute',
                  top: '110%',
                  right: 0,
                  width: '210px',
                  padding: '0.75rem',
                  zIndex: 200,
                  borderRadius: 'var(--radius-sm)',
                  boxShadow: 'var(--glass-shadow-lg)',
                  background: '#ffffff',
                  border: '1px solid var(--glass-border)'
                }}
              >
                {/* Profile Preview */}
                <div style={{ paddingBottom: '0.5rem', borderBottom: '1px solid var(--glass-border-subtle)', marginBottom: '0.5rem' }}>
                  <div style={{ fontWeight: 800, fontSize: '0.88rem', color: 'var(--text-primary)' }}>
                    {currentUser.name}
                  </div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
                    {currentUser.email || currentUser.username}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#0066ff', fontWeight: 600, marginTop: '0.2rem' }}>
                    {isSuperAdmin ? 'Super Admin' : isAdmin ? 'Admin' : 'Verified Customer'}
                  </div>
                </div>

                {isAdmin && (
                  <button
                    onClick={() => {
                      setIsProfileDropdownOpen(false);
                      navigateTo('admin');
                    }}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      padding: '0.45rem 0.5rem',
                      borderRadius: 'var(--radius-xs)',
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--text-primary)',
                      cursor: 'pointer',
                      fontSize: '0.8rem',
                      fontWeight: 500,
                      marginBottom: '0.4rem'
                    }}
                  >
                    <SlidersHorizontal size={13} />
                    <span>Vendor Dashboard</span>
                  </button>
                )}

                {/* Normal, clean logout interface without funky shading or unnecessary icons */}
                <button
                  onClick={() => {
                    setIsProfileDropdownOpen(false);
                    logout();
                    navigateTo('home');
                  }}
                  style={{
                    width: '100%',
                    padding: '0.5rem 0.75rem',
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: 'var(--radius-xs)',
                    color: '#0f172a',
                    cursor: 'pointer',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    textAlign: 'center'
                  }}
                >
                  Log Out
                </button>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="glass-btn glass-btn-secondary hide-on-desktop"
            style={{ width: '36px', height: '36px', padding: 0 }}
            title="Menu"
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>

        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div 
          className="hide-on-desktop"
          style={{
            background: 'var(--bg-secondary)',
            borderTop: '1px solid var(--glass-border-subtle)',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
          }}
        >
          <button
            onClick={() => {
              navigateTo('home');
              setIsMobileMenuOpen(false);
            }}
            className="glass-btn glass-btn-secondary"
            style={{ width: '100%', justifyContent: 'flex-start' }}
          >
            <Home size={16} /> Home
          </button>
          <button
            onClick={() => {
              navigateTo('accounts');
              setIsMobileMenuOpen(false);
            }}
            className="glass-btn glass-btn-secondary"
            style={{ width: '100%', justifyContent: 'flex-start' }}
          >
            <ShieldCheck size={16} /> Account listings
          </button>
          <button
            onClick={() => {
              navigateTo('currency');
              setIsMobileMenuOpen(false);
            }}
            className="glass-btn glass-btn-secondary"
            style={{ width: '100%', justifyContent: 'flex-start' }}
          >
            <Coins size={16} /> In-game currencies
          </button>
          <button
            onClick={() => {
              navigateTo('vendors');
              setIsMobileMenuOpen(false);
            }}
            className="glass-btn glass-btn-secondary"
            style={{ width: '100%', justifyContent: 'flex-start' }}
          >
            <Users size={16} /> Vendors & Admins
          </button>
          <button
            onClick={() => {
              navigateTo('cart');
              setIsMobileMenuOpen(false);
            }}
            className="glass-btn glass-btn-primary"
            style={{ width: '100%', justifyContent: 'flex-start' }}
          >
            <ShoppingCart size={16} /> Cart ({cartCount})
          </button>

          {currentUser?.isGuest ? (
            <button
              onClick={() => {
                navigateTo('login');
                setIsMobileMenuOpen(false);
              }}
              className="glass-btn glass-btn-secondary"
              style={{ width: '100%', justifyContent: 'flex-start' }}
            >
              <User size={16} /> Single Login / Register
            </button>
          ) : (
            <button
              onClick={() => {
                logout();
                setIsMobileMenuOpen(false);
              }}
              className="glass-btn glass-btn-secondary"
              style={{ width: '100%', justifyContent: 'flex-start', color: '#dc2626' }}
            >
              <LogOut size={16} /> Log Out ({currentUser.name})
            </button>
          )}
        </div>
      )}
    </header>
  );
}
