import React, { useState, useEffect, useRef } from 'react';
import { 
  Home, 
  Store, 
  ClipboardList, 
  User, 
  LayoutDashboard 
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export function MobileBottomNav() {
  const { 
    currentPage, 
    navigateTo, 
    isAdmin, 
    currentUser,
    cartCount 
  } = useStore();

  const [isVisible, setIsVisible] = useState(true);
  const lastScrollYRef = useRef(0);

  // Ensure bottom navigation is immediately visible whenever navigating between pages
  useEffect(() => {
    setIsVisible(true);
    lastScrollYRef.current = window.scrollY || 0;
  }, [currentPage]);

  // Disappearing Telegram liquid bottom navigation on scroll down, reappearing on scroll up
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY || 0;
          const delta = currentScrollY - lastScrollYRef.current;

          // Always visible near the top or when reaching the bottom of the page
          const isNearTop = currentScrollY <= 40;
          const isNearBottom = window.innerHeight + currentScrollY >= document.documentElement.scrollHeight - 60;

          if (isNearTop || isNearBottom) {
            setIsVisible(true);
          } else if (delta > 15 && currentScrollY > 80) {
            // Smoothly disappear on deliberate downward scroll
            setIsVisible(false);
          } else if (delta < -10) {
            // Smoothly glide back up on upward scroll
            setIsVisible(true);
          }

          lastScrollYRef.current = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation items based on role
  const navItems = isAdmin ? [
    {
      id: 'admin',
      label: 'Dashboard',
      icon: LayoutDashboard,
      isActive: currentPage === 'admin',
      onClick: () => navigateTo('admin')
    },
    {
      id: 'accounts',
      label: 'Shop',
      icon: Store,
      isActive: currentPage === 'accounts' || currentPage === 'product-detail' || currentPage === 'currency',
      onClick: () => navigateTo('accounts')
    },
    {
      id: 'cart',
      label: 'Orders',
      icon: ClipboardList,
      badge: cartCount > 0 ? cartCount : null,
      isActive: currentPage === 'cart' || currentPage === 'checkout',
      onClick: () => navigateTo('cart')
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: User,
      isActive: currentPage === 'profile',
      onClick: () => navigateTo('profile')
    }
  ] : [
    {
      id: 'home',
      label: 'Home',
      icon: Home,
      isActive: currentPage === 'home',
      onClick: () => navigateTo('home')
    },
    {
      id: 'shop',
      label: 'Shop',
      icon: Store,
      isActive: currentPage === 'accounts' || currentPage === 'product-detail' || currentPage === 'currency',
      onClick: () => navigateTo('accounts')
    },
    {
      id: 'orders',
      label: 'Orders',
      icon: ClipboardList,
      badge: cartCount > 0 ? cartCount : null,
      isActive: currentPage === 'cart' || currentPage === 'checkout',
      onClick: () => navigateTo('cart')
    },
    {
      id: 'profile',
      label: currentUser?.isGuest ? 'Login' : 'Profile',
      icon: User,
      isActive: currentPage === 'profile' || currentPage === 'login',
      onClick: () => navigateTo(currentUser?.isGuest ? 'login' : 'profile')
    }
  ];

  return (
    <nav
      className="telegram-bottom-nav"
      aria-label="Bottom Navigation Dock"
      style={{
        position: 'fixed',
        bottom: '14px',
        left: '14px',
        right: '14px',
        maxWidth: '430px',
        margin: '0 auto',
        zIndex: 9999,
        borderRadius: '26px',
        background: 'rgba(255, 255, 255, 0.82)',
        backdropFilter: 'blur(28px) saturate(190%)',
        WebkitBackdropFilter: 'blur(28px) saturate(190%)',
        border: '1px solid rgba(255, 255, 255, 0.85)',
        boxShadow: '0 14px 34px -4px rgba(0, 102, 255, 0.16), 0 6px 20px -2px rgba(15, 23, 42, 0.10), inset 0 1.5px 1px 0 rgba(255, 255, 255, 0.95), inset 0 -1px 2px 0 rgba(0, 102, 255, 0.04)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: '6px 10px calc(6px + env(safe-area-inset-bottom, 0px)) 10px',
        transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(140%) scale(0.95)',
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? 'auto' : 'none',
        transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.28s ease',
        boxSizing: 'border-box'
      }}
    >
      {navItems.map((item) => {
        const IconComponent = item.icon;
        const active = item.isActive;

        return (
          <button
            key={item.id}
            onClick={item.onClick}
            type="button"
            aria-label={item.label}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '3px 0',
              position: 'relative',
              outline: 'none',
              WebkitTapHighlightColor: 'transparent',
              userSelect: 'none',
              transition: 'transform 0.15s ease'
            }}
          >
            {/* Telegram Liquid Capsule around Icon */}
            <div
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '4px 14px',
                borderRadius: '16px',
                background: active ? 'rgba(0, 102, 255, 0.12)' : 'transparent',
                transform: active ? 'scale(1.05)' : 'scale(1)',
                boxShadow: active ? '0 2px 8px rgba(0, 102, 255, 0.12), inset 0 1px 0.5px rgba(255, 255, 255, 0.6)' : 'none',
                transition: 'background 0.25s cubic-bezier(0.16, 1, 0.3, 1), transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease'
              }}
            >
              <IconComponent 
                size={21} 
                strokeWidth={active ? 2.4 : 1.8} 
                color={active ? '#0066ff' : '#64748b'}
                style={{
                  transition: 'color 0.2s ease, stroke-width 0.2s ease'
                }}
              />
              {item.badge && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-3px',
                    right: '4px',
                    background: '#0066ff',
                    color: '#ffffff',
                    fontSize: '0.62rem',
                    fontWeight: 800,
                    padding: '1px 5px',
                    borderRadius: '10px',
                    minWidth: '15px',
                    lineHeight: '1.2',
                    textAlign: 'center',
                    boxShadow: '0 2px 6px rgba(0, 102, 255, 0.4)'
                  }}
                >
                  {item.badge}
                </span>
              )}
            </div>

            {/* Micro Typography Label */}
            <span
              style={{
                fontSize: '0.66rem',
                fontWeight: active ? 700 : 500,
                marginTop: '3px',
                color: active ? '#0066ff' : '#64748b',
                letterSpacing: '0.015em',
                transition: 'color 0.2s ease'
              }}
            >
              {item.label}
            </span>

            {/* Telegram Liquid Active Dot Indicator */}
            {active && (
              <span
                style={{
                  width: '4px',
                  height: '4px',
                  borderRadius: '50%',
                  background: '#0066ff',
                  marginTop: '2px',
                  boxShadow: '0 0 6px rgba(0, 102, 255, 0.8)',
                  transition: 'all 0.2s ease'
                }}
              />
            )}
          </button>
        );
      })}
    </nav>
  );
}
