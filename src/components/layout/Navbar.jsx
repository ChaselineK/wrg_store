import React, { useState } from 'react';
import { 
  Gamepad2, 
  Search, 
  User, 
  ShoppingCart, 
  Home,
  ShieldCheck,
  Coins,
  Users
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export function Navbar({ searchQuery, setSearchQuery }) {
  const { 
    currentPage, 
    navigateTo, 
    currentUser, 
    cartCount 
  } = useStore();

  return (
    <header className="glass-navbar">
      <div 
        className="app-container navbar-container" 
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          minHeight: '64px', 
          padding: '0.6rem 1rem', 
          gap: '1rem',
          position: 'relative'
        }}
      >
        {/* Brand Logo - Centered on Mobile, Left-aligned on Desktop */}
        <div 
          className="navbar-brand-wrapper"
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.65rem', 
            cursor: 'pointer', 
            flexShrink: 0 
          }}
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
              boxShadow: '0 2px 8px rgba(0, 102, 255, 0.3)',
              flexShrink: 0
            }}
          >
            <Gamepad2 size={22} color="#ffffff" />
          </div>
          <div className="navbar-brand-text">
            <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.02em', color: 'var(--text-primary)', lineHeight: 1.15 }}>
              WRG <span style={{ color: '#0066ff' }}>STORE</span>
            </div>
            <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', display: 'block', letterSpacing: '0.04em', textTransform: 'uppercase', fontWeight: 600 }}>
              Your Verified Marketplace
            </span>
          </div>
        </div>

        {/* Center: Desktop Navigation Links (Desktop Only) */}
        <nav className="desktop-nav-links hide-on-mobile" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
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

        {/* Right Controls: Search, Cart, Profile (Desktop Only - Mobile Uses Bottom Nav) */}
        <div className="hide-on-mobile" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          
          {/* Quick Search */}
          {setSearchQuery && (
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
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

          {/* Desktop Cart Button */}
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

          {/* Desktop Profile Icon -> Directly Navigates to Profile Page */}
          <button
            onClick={() => {
              if (currentUser?.isGuest) {
                navigateTo('login');
              } else {
                navigateTo('profile');
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
            title={currentUser?.isGuest ? 'Log In / Register' : `${currentUser.name} - Open Profile`}
          >
            <User size={16} />
          </button>

        </div>
      </div>
    </header>
  );
}
