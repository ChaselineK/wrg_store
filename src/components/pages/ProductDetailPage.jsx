import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../../context/StoreContext';
import { 
  ArrowLeft, 
  ShoppingCart, 
  ShieldCheck, 
  MessageSquare, 
  Play
} from 'lucide-react';
import { formatPrice } from '../../utils/currencyHelper';

export function ProductDetailPage() {
  const { 
    selectedProduct: product, 
    navigateTo, 
    addToCart, 
    currency, 
    admins 
  } = useStore();

  const [activeTab, setActiveTab] = useState('photos');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

  if (!product) {
    return (
      <div className="app-container" style={{ padding: '3rem 1rem', textAlign: 'center' }}>
        <h2>Listing not found</h2>
        <button onClick={() => navigateTo('accounts')} className="glass-btn glass-btn-primary" style={{ marginTop: '1rem' }}>
          Back to Listings
        </button>
      </div>
    );
  }

  const isCurrency = product.type === 'currency';
  const vendor = admins.find((a) => a.id === product.vendorId) || admins[0];

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleBuyNow = () => {
    addToCart(product);
    navigateTo('checkout');
  };

  const handleDirectContactVendor = () => {
    const text = encodeURIComponent(
      `Hello ${vendor.name}, I am interested in your Call of Duty: Mobile listing: "${product.title}" (Price: $${product.price}). Can we proceed with WhatsApp handover?`
    );
    window.open(`https://wa.me/${vendor.whatsapp.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
  };

  return (
    <div style={{ padding: '1.5rem 0 3.5rem 0' }}>
      <div className="app-container" style={{ maxWidth: '980px' }}>
        
        {/* Navigation Back Button */}
        <div style={{ marginBottom: '1.25rem' }}>
          <button
            onClick={() => navigateTo(isCurrency ? 'currency' : 'accounts')}
            className="glass-btn glass-btn-secondary"
            style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}
          >
            <ArrowLeft size={14} /> Back to {isCurrency ? 'Currencies' : 'Accounts'}
          </button>
        </div>

        {/* Main Card Container */}
        <div 
          className="glass-panel"
          style={{
            padding: '2rem',
            background: '#ffffff',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--glass-border)',
            boxShadow: 'var(--glass-shadow-md)'
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))', gap: '2rem' }}>
            
            {/* Left Column: Media */}
            <div>
              <div 
                style={{ 
                  position: 'relative', 
                  height: '320px', 
                  borderRadius: 'var(--radius-md)', 
                  overflow: 'hidden', 
                  background: '#0f172a',
                  border: '1px solid var(--glass-border)',
                  marginBottom: '0.75rem'
                }}
              >
                {activeTab === 'photos' ? (
                  <img
                    src={product.images?.[selectedPhotoIndex] || product.images?.[0]}
                    alt={product.title}
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                ) : (
                  <video
                    src={product.videoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'}
                    autoPlay
                    loop
                    controls
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                )}

                <div 
                  style={{ 
                    position: 'absolute', 
                    bottom: '0.75rem', 
                    left: '0.75rem', 
                    background: 'rgba(15, 23, 42, 0.85)', 
                    color: '#ffffff',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    padding: '0.25rem 0.6rem',
                    borderRadius: 'var(--radius-xs)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem'
                  }}
                >
                  <ShieldCheck size={14} color="#0066ff" />
                  Handover: &lt;1hr
                </div>
              </div>

              {/* Media Switcher */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <button
                  onClick={() => setActiveTab('photos')}
                  className={`glass-btn ${activeTab === 'photos' ? 'glass-btn-primary' : 'glass-btn-secondary'}`}
                  style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem' }}
                >
                  Photos ({product.images?.length || 1})
                </button>

                {product.videoUrl && (
                  <button
                    onClick={() => setActiveTab('video')}
                    className={`glass-btn ${activeTab === 'video' ? 'glass-btn-primary' : 'glass-btn-secondary'}`}
                    style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem' }}
                  >
                    <Play size={11} /> Gameplay Video
                  </button>
                )}
              </div>

              {activeTab === 'photos' && product.images && product.images.length > 1 && (
                <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto' }}>
                  {product.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt=""
                      onClick={() => setSelectedPhotoIndex(idx)}
                      style={{
                        width: '64px',
                        height: '50px',
                        objectFit: 'cover',
                        borderRadius: 'var(--radius-xs)',
                        cursor: 'pointer',
                        border: selectedPhotoIndex === idx ? '2px solid #0066ff' : '1px solid var(--glass-border-subtle)'
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Right Column: Title, Description & Price */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              
              {/* Vendor attribution - NO ROLES visible to clients */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Posted by: <strong style={{ color: '#0066ff' }}>{vendor.name}</strong>
                </span>
                <span style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 600 }}>
                  Verified Listing
                </span>
              </div>

              <h1 style={{ fontSize: '1.5rem', fontWeight: 800, lineHeight: 1.3, color: 'var(--text-primary)', marginBottom: '0.85rem' }}>
                {product.title}
              </h1>

              {/* Price Box */}
              <div 
                style={{
                  padding: '1rem',
                  borderRadius: 'var(--radius-sm)',
                  background: '#eff6ff',
                  border: '1px solid #bfdbfe',
                  marginBottom: '1.25rem'
                }}
              >
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.15rem' }}>
                  Listing Price ({currency}):
                </div>
                <div style={{ fontSize: '1.9rem', fontWeight: 800, color: '#0066ff', fontFamily: 'var(--font-mono)' }}>
                  {formatPrice(product.price, currency)}
                </div>
              </div>

              {/* Description - Streamlined strictly as requested */}
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                  Account Description:
                </h3>
                <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                  {product.description || product.caption}
                </p>
              </div>

              {/* Direct WhatsApp Contact with Vendor */}
              <div style={{ marginBottom: '1.5rem', padding: '0.85rem', borderRadius: 'var(--radius-xs)', background: 'var(--bg-tertiary)', border: '1px solid var(--glass-border-subtle)' }}>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                  Have questions about this account? Contact <strong>{vendor.name}</strong> directly:
                </div>
                <button
                  onClick={handleDirectContactVendor}
                  className="glass-btn glass-btn-whatsapp"
                  style={{ width: '100%', fontSize: '0.85rem', padding: '0.55rem' }}
                >
                  <MessageSquare size={14} /> Chat with {vendor.name} on WhatsApp
                </button>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: 'auto' }}>
                <button
                  onClick={handleAddToCart}
                  className="glass-btn glass-btn-secondary"
                  style={{ flex: 1, padding: '0.75rem', fontSize: '0.92rem' }}
                >
                  <ShoppingCart size={16} /> Add to Cart
                </button>

                <button
                  onClick={handleBuyNow}
                  className="glass-btn glass-btn-primary"
                  style={{ flex: 1.2, padding: '0.75rem', fontSize: '0.92rem' }}
                >
                  Proceed to Checkout
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
