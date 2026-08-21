import React from 'react';
import { 
  X, 
  User, 
  Heart, 
  ShoppingBag, 
  DollarSign, 
  LogOut, 
  LogIn
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { GlassButton } from '../ui/GlassButton';
import { CURRENCIES, formatPrice } from '../../utils/currencyHelper';

export function UserProfileModal() {
  const { 
    isProfileOpen, 
    setIsProfileOpen, 
    currentUser, 
    isGuest, 
    isAdmin, 
    orders, 
    favorites, 
    currency, 
    setCurrency, 
    logout, 
    setIsAuthModalOpen,
    setIsFavoritesOpen
  } = useStore();

  if (!isProfileOpen) return null;

  // Filter orders relevant to this customer (by name/username)
  const myOrders = orders.filter(
    o => o.customerName?.toLowerCase() === currentUser?.name?.toLowerCase() ||
         o.customerName?.toLowerCase() === currentUser?.username?.toLowerCase()
  );

  return (
    <div className="glass-modal-backdrop" onClick={() => setIsProfileOpen(false)}>
      <div 
        className="glass-modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '580px' }}
      >
        
        {/* Header */}
        <div 
          style={{ 
            padding: '1rem 1.5rem', 
            borderBottom: '1px solid var(--glass-border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'sticky',
            top: 0,
            background: 'var(--glass-modal)',
            backdropFilter: 'blur(20px)',
            zIndex: 20
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div 
              style={{
                width: '30px',
                height: '30px',
                borderRadius: 'var(--radius-xs)',
                background: 'var(--accent-gradient)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff'
              }}
            >
              <User size={16} color="#ffffff" />
            </div>
            <div>
              <h2 style={{ fontSize: '1.05rem', fontWeight: 700 }}>User Profile</h2>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                Account details and preferences
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsProfileOpen(false)}
            className="glass-panel"
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--text-primary)'
            }}
          >
            <X size={16} color="currentColor" />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* User Info Card */}
          <div 
            className="glass-panel"
            style={{
              padding: '1.25rem',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              background: 'var(--accent-gradient-soft)',
              border: '1px solid var(--glass-border)'
            }}
          >
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid var(--accent-primary)'
              }}
            />

            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{currentUser.name}</h3>
                <span className={`glass-badge ${isAdmin ? 'glass-badge-ruby' : isGuest ? 'glass-badge-amber' : 'glass-badge-emerald'}`}>
                  {isAdmin ? 'Store Admin' : isGuest ? 'Guest Visitor' : 'Verified Gamer'}
                </span>
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                Username: @{currentUser.username}
              </div>
            </div>

            {isGuest && (
              <GlassButton
                variant="primary"
                size="sm"
                icon={LogIn}
                onClick={() => {
                  setIsProfileOpen(false);
                  setIsAuthModalOpen(true);
                }}
              >
                Sign In
              </GlassButton>
            )}
          </div>

          {/* Currency Preference Selector */}
          <div className="glass-panel" style={{ padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.5rem' }}>
              Preferred Display Currency:
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
              {Object.values(CURRENCIES).map((curr) => {
                const isSelected = currency === curr.code;
                return (
                  <button
                    key={curr.code}
                    onClick={() => setCurrency(curr.code)}
                    className="glass-card"
                    style={{
                      padding: '0.6rem',
                      borderRadius: 'var(--radius-xs)',
                      cursor: 'pointer',
                      border: isSelected ? '1.5px solid var(--accent-primary)' : '1px solid var(--glass-border-subtle)',
                      background: isSelected ? 'var(--accent-gradient-soft)' : 'var(--glass-card)',
                      textAlign: 'center'
                    }}
                  >
                    <div style={{ fontWeight: 700, fontSize: '0.88rem', color: isSelected ? 'var(--accent-primary)' : 'var(--text-primary)' }}>
                      {curr.code}
                    </div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                      {curr.symbol}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Wishlist Quick Access */}
          <div 
            className="glass-panel" 
            style={{ 
              padding: '0.85rem 1rem', 
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Heart size={16} color="currentColor" />
              <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>Saved Wishlist Items</span>
            </div>
            <button
              onClick={() => {
                setIsProfileOpen(false);
                setIsFavoritesOpen(true);
              }}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                fontSize: '0.8rem',
                fontWeight: 600
              }}
            >
              View ({favorites.length})
            </button>
          </div>

          {/* Order History Summary */}
          {!isGuest && (
            <div className="glass-panel" style={{ padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.65rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <ShoppingBag size={14} color="currentColor" />
                My Recent Orders ({myOrders.length})
              </h4>

              {myOrders.length === 0 ? (
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textAlign: 'center', padding: '1rem' }}>
                  No order inquiries submitted yet.
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {myOrders.slice(0, 3).map((ord) => (
                    <div
                      key={ord.id}
                      style={{
                        padding: '0.6rem',
                        background: 'var(--glass-card)',
                        borderRadius: 'var(--radius-xs)',
                        border: '1px solid var(--glass-border-subtle)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontSize: '0.78rem'
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 600 }}>#{ord.id}</div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>{ord.productTitle}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontWeight: 600, color: 'var(--accent-primary)' }}>
                          {formatPrice(ord.price, currency)}
                        </div>
                        <span className="glass-badge" style={{ fontSize: '0.62rem' }}>
                          {ord.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Logout Action */}
          {!isGuest && (
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
              <GlassButton
                variant="secondary"
                size="sm"
                icon={LogOut}
                onClick={() => {
                  logout();
                  setIsProfileOpen(false);
                }}
              >
                Sign Out
              </GlassButton>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
