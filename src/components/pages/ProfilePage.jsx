import React from 'react';
import { 
  User, 
  ShieldCheck, 
  ShoppingBag, 
  LogOut, 
  LogIn, 
  LayoutDashboard, 
  Lock, 
  Mail, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { formatPrice } from '../../utils/currencyHelper';

export function ProfilePage() {
  const { 
    currentUser, 
    isAdmin, 
    isSuperAdmin, 
    logout, 
    navigateTo, 
    orders, 
    currency 
  } = useStore();

  const isGuest = currentUser?.isGuest;

  // Filter orders relevant to this user
  const myOrders = orders.filter(
    (o) =>
      o.customerName?.toLowerCase() === currentUser?.name?.toLowerCase() ||
      o.customerName?.toLowerCase() === currentUser?.username?.toLowerCase()
  );

  return (
    <div 
      className="animate-fade-in"
      style={{
        width: '100%',
        minHeight: '80vh',
        padding: 'clamp(1.5rem, 3.5vw, 2.5rem) 1rem 6rem 1rem',
        boxSizing: 'border-box'
      }}
    >
      <div style={{ maxWidth: '640px', margin: '0 auto', width: '100%' }}>
        
        {/* Page Title */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 0.25rem 0' }}>
            My Profile
          </h1>
          <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', margin: 0 }}>
            Manage your account settings, orders, and verified status.
          </p>
        </div>

        {/* User Card */}
        <div 
          className="glass-panel"
          style={{
            padding: '1.5rem',
            borderRadius: 'var(--radius-md)',
            background: '#ffffff',
            border: '1px solid var(--glass-border)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
            marginBottom: '1.25rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <div 
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: '#eff6ff',
                color: '#0066ff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2.5px solid #0066ff',
                flexShrink: 0
              }}
            >
              <User size={32} />
            </div>

            <div style={{ flex: 1, minWidth: '200px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                  {currentUser?.name || 'Guest User'}
                </h2>
                <span 
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    padding: '0.2rem 0.6rem',
                    borderRadius: 'var(--radius-full)',
                    background: isSuperAdmin ? '#eff6ff' : isAdmin ? '#f0fdf4' : isGuest ? '#fef3c7' : '#eff6ff',
                    color: isSuperAdmin ? '#0066ff' : isAdmin ? '#16a34a' : isGuest ? '#d97706' : '#0066ff',
                    border: '1px solid currentColor'
                  }}
                >
                  {isSuperAdmin ? 'Super Admin' : isAdmin ? 'Vendor Admin' : isGuest ? 'Guest Visitor' : 'Verified Gamer'}
                </span>
              </div>

              <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
                Username: <strong style={{ color: 'var(--text-primary)' }}>@{currentUser?.username}</strong>
              </div>
              {currentUser?.email && (
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                  {currentUser.email}
                </div>
              )}
            </div>
          </div>

          {/* If Guest: Prompt Sign In */}
          {isGuest && (
            <div style={{ marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: '1px solid #f1f5f9' }}>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginBottom: '0.85rem' }}>
                Sign in with your verified username to manage order inquiries and access exclusive vendor listings.
              </p>
              <button
                type="button"
                onClick={() => navigateTo('login')}
                className="glass-btn glass-btn-primary"
                style={{ width: '100%', padding: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
              >
                <LogIn size={16} /> Sign In / Register
              </button>
            </div>
          )}
        </div>

        {/* If Admin: Direct Landing/Access to Vendor Dashboard */}
        {isAdmin && (
          <div 
            className="glass-panel"
            style={{
              padding: '1.25rem',
              borderRadius: 'var(--radius-md)',
              background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
              border: '1px solid #bfdbfe',
              marginBottom: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '0.75rem'
            }}
          >
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.98rem', color: '#1e40af', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <LayoutDashboard size={18} /> Vendor Sales Dashboard
              </div>
              <p style={{ fontSize: '0.78rem', color: '#3b82f6', margin: '0.2rem 0 0 0' }}>
                Manage account listings, daily refreshing sales, and sold confirmations.
              </p>
            </div>

            <button
              onClick={() => navigateTo('admin')}
              className="glass-btn glass-btn-primary"
              style={{ padding: '0.55rem 1rem', fontSize: '0.84rem', fontWeight: 700 }}
            >
              Open Dashboard <ArrowRight size={14} />
            </button>
          </div>
        )}

        {/* Security & Account Protection Card */}
        <div 
          className="glass-panel"
          style={{
            padding: '1.25rem',
            borderRadius: 'var(--radius-md)',
            background: '#ffffff',
            border: '1px solid var(--glass-border)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
            marginBottom: '1.25rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.6rem' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#eff6ff', color: '#0066ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShieldCheck size={18} />
            </div>
            <h3 style={{ fontSize: '0.94rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
              Zero-Leak Credential Escrow
            </h3>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
            Your player UID, Activision logins, and social linkages are secured under WRG Escrow Protocols. Accounts are verified directly by trusted vendor representatives with zero third-party disclosure.
          </p>
        </div>

        {/* Order Inquiries Summary */}
        {!isGuest && (
          <div 
            className="glass-panel"
            style={{
              padding: '1.25rem',
              borderRadius: 'var(--radius-md)',
              background: '#ffffff',
              border: '1px solid var(--glass-border)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
              marginBottom: '1.5rem'
            }}
          >
            <h3 style={{ fontSize: '0.94rem', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 0.85rem 0', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <ShoppingBag size={16} color="#0066ff" /> Recent Orders & Inquiries ({myOrders.length})
            </h3>

            {myOrders.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '1rem', color: 'var(--text-muted)', fontSize: '0.82rem' }}>
                No active orders placed yet.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {myOrders.slice(0, 3).map((ord) => (
                  <div 
                    key={ord.id}
                    style={{
                      padding: '0.75rem',
                      borderRadius: 'var(--radius-xs)',
                      background: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: '0.82rem'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>Order #{ord.id}</div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>{ord.productTitle}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: 800, color: '#0066ff' }}>
                        {formatPrice(ord.price, currency)}
                      </div>
                      <span style={{ fontSize: '0.7rem', color: '#16a34a', fontWeight: 600 }}>
                        {ord.status || 'Dispatched'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* LOG OUT BUTTON (Clean, normal, highly visible) */}
        {!isGuest && (
          <div style={{ marginTop: '1rem' }}>
            <button
              type="button"
              onClick={() => {
                logout();
                navigateTo('login');
              }}
              style={{
                width: '100%',
                padding: '0.9rem',
                borderRadius: 'var(--radius-sm)',
                background: '#f8fafc',
                border: '1.5px solid #e2e8f0',
                color: '#0f172a',
                fontSize: '0.92rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                transition: 'all 0.18s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#f1f5f9';
                e.currentTarget.style.borderColor = '#cbd5e1';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#f8fafc';
                e.currentTarget.style.borderColor = '#e2e8f0';
              }}
            >
              <LogOut size={18} color="#dc2626" />
              <span>Log Out</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
