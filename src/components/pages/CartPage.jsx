import React from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../../context/StoreContext';
import { 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  ArrowLeft,
  ShieldCheck
} from 'lucide-react';
import { formatPrice } from '../../utils/currencyHelper';
import { triggerCartHaptic } from '../../utils/haptics';

export function CartPage() {
  const { 
    cartItems, 
    updateCartQuantity, 
    removeFromCart, 
    clearCart, 
    cartTotal, 
    currency, 
    navigateTo 
  } = useStore();

  const handleQtyChange = (cartItemId, newQty) => {
    triggerCartHaptic();
    updateCartQuantity(cartItemId, newQty);
  };

  const handleRemove = (cartItemId) => {
    triggerCartHaptic();
    removeFromCart(cartItemId);
  };

  return (
    <div style={{ padding: '1.5rem 0 3.5rem 0' }}>
      <div className="app-container">
        
        {/* Page Header */}
        <div style={{ marginBottom: '1.5rem' }}>
          <button
            onClick={() => navigateTo('home')}
            className="glass-btn glass-btn-secondary"
            style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem', marginBottom: '0.85rem' }}
          >
            <ArrowLeft size={14} /> Continue Browsing
          </button>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: 'var(--radius-sm)', background: '#eff6ff', color: '#0066ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ShoppingCart size={20} />
              </div>
              <div>
                <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  Shopping <span style={{ color: '#0066ff' }}>Cart</span>
                </h1>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  {cartItems.length} item(s) selected
                </span>
              </div>
            </div>

            {cartItems.length > 0 && (
              <button
                onClick={clearCart}
                className="glass-btn glass-btn-secondary"
                style={{ fontSize: '0.78rem', color: '#dc2626' }}
              >
                <Trash2 size={13} /> Clear Cart
              </button>
            )}
          </div>
        </div>

        {cartItems.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '2rem', alignItems: 'flex-start' }}>
            
            {/* Left: Cart Items List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {cartItems.map((item) => (
                <div
                  key={item.cartItemId}
                  className="glass-panel"
                  style={{
                    padding: '1rem',
                    borderRadius: 'var(--radius-sm)',
                    background: '#ffffff',
                    border: '1px solid var(--glass-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    flexWrap: 'wrap'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{ width: '64px', height: '64px', borderRadius: 'var(--radius-xs)', objectFit: 'cover', background: '#0f172a' }}
                    />
                    <div>
                      <span style={{ fontSize: '0.7rem', color: '#0066ff', fontWeight: 700, textTransform: 'uppercase' }}>
                        {item.type === 'currency' ? 'In-Game Currency' : 'Account Listing'}
                      </span>
                      <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', maxWidth: '320px', lineHeight: 1.3 }}>
                        {item.title}
                      </h3>
                      {item.selectedPackage && (
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          Package: <strong>{item.selectedPackage.name} ({item.selectedPackage.amount})</strong>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Quantity & Unit Price */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    {item.type === 'currency' ? (
                      <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--glass-border-subtle)', borderRadius: 'var(--radius-xs)', background: 'var(--bg-tertiary)' }}>
                        <button
                          onClick={() => handleQtyChange(item.cartItemId, item.quantity - 1)}
                          style={{ background: 'none', border: 'none', padding: '0.35rem 0.55rem', cursor: 'pointer', color: 'var(--text-secondary)' }}
                        >
                          <Minus size={12} />
                        </button>
                        <span style={{ fontSize: '0.85rem', fontWeight: 700, padding: '0 0.4rem', minWidth: '20px', textAlign: 'center' }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQtyChange(item.cartItemId, item.quantity + 1)}
                          style={{ background: 'none', border: 'none', padding: '0.35rem 0.55rem', cursor: 'pointer', color: 'var(--text-secondary)' }}
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    ) : (
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Qty: 1</span>
                    )}

                    <div style={{ textAlign: 'right', minWidth: '85px' }}>
                      <span style={{ fontSize: '1rem', fontWeight: 800, color: '#0066ff', fontFamily: 'var(--font-mono)' }}>
                        {formatPrice(item.price * item.quantity, currency)}
                      </span>
                    </div>

                    <button
                      onClick={() => handleRemove(item.cartItemId)}
                      style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '0.35rem' }}
                      title="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                </div>
              ))}
            </div>

            {/* Right: Order Summary & Checkout Prompt */}
            <div 
              className="glass-panel"
              style={{
                padding: '1.5rem',
                borderRadius: 'var(--radius-md)',
                background: '#ffffff',
                border: '1px solid var(--glass-border)'
              }}
            >
              <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1rem' }}>
                Order Summary
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.25rem', fontSize: '0.88rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                  <span>Subtotal:</span>
                  <span style={{ fontWeight: 600 }}>{formatPrice(cartTotal, currency)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                  <span>WhatsApp Escrow Fee:</span>
                  <span style={{ color: '#059669', fontWeight: 700 }}>FREE ($0.00)</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                  <span>Handover Time:</span>
                  <span style={{ fontWeight: 700, color: '#0066ff' }}>&lt;1hr Guaranteed</span>
                </div>
                <div style={{ borderTop: '1px solid var(--glass-border-subtle)', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <strong style={{ fontSize: '1rem', color: 'var(--text-primary)' }}>Estimated Total:</strong>
                  <strong style={{ fontSize: '1.5rem', color: '#0066ff', fontFamily: 'var(--font-mono)' }}>
                    {formatPrice(cartTotal, currency)}
                  </strong>
                </div>
              </div>

              {/* Vendor Selection Note */}
              <div 
                style={{ 
                  padding: '0.75rem', 
                  borderRadius: 'var(--radius-xs)', 
                  background: '#eff6ff', 
                  color: '#0052cc', 
                  fontSize: '0.78rem', 
                  lineHeight: 1.4,
                  marginBottom: '1.25rem',
                  border: '1px solid #bfdbfe'
                }}
              >
                <div style={{ fontWeight: 700, marginBottom: '0.2rem' }}>Next Step: Choose Your Seller</div>
                You will choose which of our 3 verified representatives (RetiredTT, Rex, or GR 007) will handle your order handover on WhatsApp.
              </div>

              <button
                onClick={() => navigateTo('checkout')}
                className="glass-btn glass-btn-primary"
                style={{ width: '100%', padding: '0.85rem', fontSize: '0.95rem' }}
              >
                <span>Proceed to Choose Seller</span>
                <ArrowRight size={16} />
              </button>
            </div>

          </div>
        ) : (
          /* Empty Cart State */
          <div 
            className="glass-panel"
            style={{
              padding: '4rem 1.5rem',
              textAlign: 'center',
              background: '#ffffff',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--glass-border-subtle)'
            }}
          >
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#eff6ff', color: '#0066ff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
              <ShoppingCart size={28} />
            </div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              Your cart is currently empty
            </h2>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', maxWidth: '400px', margin: '0 auto 1.5rem auto' }}>
              Explore our verified Call of Duty: Mobile accounts or direct COD Points currency packs.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => navigateTo('accounts')}
                className="glass-btn glass-btn-primary"
              >
                Browse Accounts
              </button>
              <button
                onClick={() => navigateTo('currency')}
                className="glass-btn glass-btn-secondary"
              >
                Browse Currencies
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
