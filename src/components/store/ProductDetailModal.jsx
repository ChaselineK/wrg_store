import React, { useState } from 'react';
import { 
  X, 
  MessageSquare, 
  ShieldCheck, 
  Zap, 
  Heart, 
  Video, 
  Image as ImageIcon, 
  UserCheck, 
  Edit3, 
  Trash2,
  ChevronLeft,
  ChevronRight,
  Info
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { GlassButton } from '../ui/GlassButton';
import { Badge } from '../ui/Badge';
import { VideoPlayer } from '../ui/VideoPlayer';
import { formatPrice } from '../../utils/currencyHelper';

export function ProductDetailModal() {
  const { 
    activeDetailProduct: product, 
    setActiveDetailProduct, 
    openCheckout, 
    isAdmin, 
    openProductForm, 
    deleteProduct,
    toggleFavorite,
    isFavorite,
    currency
  } = useStore();

  const [activeMediaTab, setActiveMediaTab] = useState('photos');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [selectedPackage, setSelectedPackage] = useState(null);

  if (!product) return null;

  const isFav = isFavorite(product.id);
  const isCurrency = product.type === 'currency';

  const discountPercent = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const handleOrder = () => {
    openCheckout({
      ...product,
      selectedPackage: isCurrency ? (selectedPackage || product.packages?.[0]) : null
    });
    setActiveDetailProduct(null);
  };

  const currentPrice = isCurrency && selectedPackage ? selectedPackage.price : product.price;

  return (
    <div className="glass-modal-backdrop" onClick={() => setActiveDetailProduct(null)}>
      <div 
        className="glass-modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '920px' }}
      >
        
        {/* Modal Header */}
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span className="glass-badge">
              {product.gameName}
            </span>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              ID: #{product.id.slice(-6).toUpperCase()}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <button
              onClick={() => toggleFavorite(product.id)}
              className="glass-panel"
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'currentColor'
              }}
              title="Save to Wishlist"
            >
              <Heart size={14} color="currentColor" fill={isFav ? 'currentColor' : 'none'} />
            </button>

            {isAdmin && (
              <>
                <button
                  onClick={() => {
                    openProductForm(product);
                    setActiveDetailProduct(null);
                  }}
                  className="glass-panel"
                  style={{
                    padding: '0.35rem 0.65rem',
                    borderRadius: 'var(--radius-xs)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    cursor: 'pointer',
                    fontSize: '0.75rem',
                    color: 'var(--text-primary)'
                  }}
                >
                  <Edit3 size={12} color="currentColor" /> Edit
                </button>

                <button
                  onClick={() => {
                    if (window.confirm(`Delete listing "${product.title}"?`)) {
                      deleteProduct(product.id);
                    }
                  }}
                  className="glass-panel"
                  style={{
                    padding: '0.35rem 0.65rem',
                    borderRadius: 'var(--radius-xs)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    cursor: 'pointer',
                    fontSize: '0.75rem',
                    color: 'var(--text-primary)'
                  }}
                >
                  <Trash2 size={12} color="currentColor" /> Delete
                </button>
              </>
            )}

            <button
              onClick={() => setActiveDetailProduct(null)}
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
        </div>

        {/* Modal Body */}
        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            
            {/* Left Column: Media */}
            <div>
              <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '0.65rem' }}>
                <button
                  onClick={() => setActiveMediaTab('photos')}
                  className={`glass-btn ${activeMediaTab === 'photos' ? 'glass-btn-primary' : 'glass-btn-secondary'}`}
                  style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem' }}
                >
                  <ImageIcon size={13} color="currentColor" /> Photo Gallery ({product.images?.length || 1})
                </button>

                {product.videoUrl && (
                  <button
                    onClick={() => setActiveMediaTab('video')}
                    className={`glass-btn ${activeMediaTab === 'video' ? 'glass-btn-primary' : 'glass-btn-secondary'}`}
                    style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem' }}
                  >
                    <Video size={13} color="currentColor" /> Video Showcase
                  </button>
                )}
              </div>

              {activeMediaTab === 'photos' ? (
                <div>
                  <div
                    style={{
                      position: 'relative',
                      height: '280px',
                      borderRadius: 'var(--radius-md)',
                      overflow: 'hidden',
                      border: '1px solid var(--glass-border-subtle)',
                      background: '#000',
                      marginBottom: '0.6rem'
                    }}
                  >
                    <img
                      src={product.images[selectedPhotoIndex] || product.images[0]}
                      alt={`${product.title} preview`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />

                    {product.images?.length > 1 && (
                      <>
                        <button
                          onClick={() => setSelectedPhotoIndex(prev => (prev === 0 ? product.images.length - 1 : prev - 1))}
                          style={{
                            position: 'absolute',
                            left: '0.4rem',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'rgba(0,0,0,0.6)',
                            border: 'none',
                            borderRadius: '50%',
                            width: '30px',
                            height: '30px',
                            color: '#fff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer'
                          }}
                        >
                          <ChevronLeft size={18} color="#fff" />
                        </button>
                        <button
                          onClick={() => setSelectedPhotoIndex(prev => (prev === product.images.length - 1 ? 0 : prev + 1))}
                          style={{
                            position: 'absolute',
                            right: '0.4rem',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'rgba(0,0,0,0.6)',
                            border: 'none',
                            borderRadius: '50%',
                            width: '30px',
                            height: '30px',
                            color: '#fff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer'
                          }}
                        >
                          <ChevronRight size={18} color="#fff" />
                        </button>
                      </>
                    )}
                  </div>

                  {product.images?.length > 1 && (
                    <div style={{ display: 'flex', gap: '0.4rem', overflowX: 'auto', paddingBottom: '0.2rem' }}>
                      {product.images.map((img, idx) => (
                        <div
                          key={idx}
                          onClick={() => setSelectedPhotoIndex(idx)}
                          style={{
                            width: '56px',
                            height: '44px',
                            borderRadius: 'var(--radius-xs)',
                            overflow: 'hidden',
                            cursor: 'pointer',
                            border: selectedPhotoIndex === idx ? '2px solid var(--accent-primary)' : '1px solid var(--glass-border-subtle)',
                            opacity: selectedPhotoIndex === idx ? 1 : 0.6,
                            flexShrink: 0
                          }}
                        >
                          <img src={img} alt="thumb" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <VideoPlayer url={product.videoUrl} title={product.title} />
              )}
            </div>

            {/* Right Column: Key Details */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '0.6rem' }}>
                <span className="glass-badge">
                  <ShieldCheck size={11} color="currentColor" /> Anti-Rollback Warranty
                </span>
                {product.isInstantDelivery && (
                  <span className="glass-badge">
                    <Zap size={11} color="currentColor" /> Instant Handover
                  </span>
                )}
              </div>

              <h1 style={{ fontSize: '1.25rem', fontWeight: 700, lineHeight: 1.3, marginBottom: '0.85rem' }}>
                {product.title}
              </h1>

              {/* Price Box */}
              <div 
                className="glass-panel"
                style={{
                  padding: '1rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--accent-gradient-soft)',
                  border: '1px solid var(--glass-border)',
                  marginBottom: '1rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                      Price ({currency})
                    </span>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                      <span style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--accent-primary)', fontFamily: 'var(--font-heading)' }}>
                        {formatPrice(currentPrice, currency)}
                      </span>
                      {discountPercent && (
                        <span className="glass-badge" style={{ background: 'var(--accent-primary)', color: '#fff' }}>
                          Save {discountPercent}%
                        </span>
                      )}
                    </div>
                  </div>

                  <span className="glass-badge" style={{ padding: '0.3rem 0.65rem' }}>
                    Available
                  </span>
                </div>
              </div>

              {/* Currency Package Selector (If Currency) */}
              {isCurrency && product.packages && (
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-primary)' }}>
                    Select Package Tier:
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.4rem' }}>
                    {product.packages.map((pkg, idx) => {
                      const isSelected = selectedPackage ? selectedPackage.name === pkg.name : idx === 0;
                      return (
                        <div
                          key={idx}
                          onClick={() => setSelectedPackage(pkg)}
                          className="glass-card"
                          style={{
                            padding: '0.65rem',
                            cursor: 'pointer',
                            borderRadius: 'var(--radius-xs)',
                            border: isSelected ? '1.5px solid var(--accent-primary)' : '1px solid var(--glass-border-subtle)',
                            background: isSelected ? 'var(--accent-gradient-soft)' : 'var(--glass-card)'
                          }}
                        >
                          <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>{pkg.name}</div>
                          <div style={{ color: 'var(--accent-primary)', fontWeight: 600, fontSize: '0.82rem' }}>
                            {pkg.amount}
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                            <span>{formatPrice(pkg.price, currency)}</span>
                            {pkg.bonus && <span>{pkg.bonus}</span>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Purchase Action Button */}
              <div style={{ marginTop: 'auto' }}>
                <GlassButton
                  variant="whatsapp"
                  size="lg"
                  icon={MessageSquare}
                  fullWidth
                  onClick={handleOrder}
                  style={{ fontSize: '0.95rem', padding: '0.85rem' }}
                >
                  Order via WhatsApp (Choose Admin)
                </GlassButton>

                <div 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    gap: '0.4rem', 
                    marginTop: '0.6rem',
                    fontSize: '0.75rem',
                    color: 'var(--text-muted)'
                  }}
                >
                  <ShieldCheck size={12} color="currentColor" />
                  <span>Choose from 3 verified admins: Rex, RetiredonTT, GR 007</span>
                </div>
              </div>

            </div>

          </div>

          {/* Account Specifications Grid */}
          {!isCurrency && product.specs && (
            <div 
              className="glass-panel"
              style={{
                padding: '1.25rem',
                borderRadius: 'var(--radius-md)',
                background: 'var(--glass-bg)'
              }}
            >
              <h3 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <UserCheck size={16} color="currentColor" />
                Account Attributes & Specifications
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
                {Object.entries(product.specs).map(([key, val]) => (
                  <div 
                    key={key}
                    style={{
                      padding: '0.65rem 0.75rem',
                      background: 'var(--glass-card)',
                      borderRadius: 'var(--radius-xs)',
                      border: '1px solid var(--glass-border-subtle)'
                    }}
                  >
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'capitalize' }}>
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </div>
                    <div style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--text-primary)', marginTop: '0.15rem' }}>
                      {String(val)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Captions */}
          {product.caption && (
            <div 
              className="glass-panel"
              style={{
                padding: '1.25rem',
                borderRadius: 'var(--radius-md)',
                background: 'var(--glass-bg)'
              }}
            >
              <h3 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Info size={16} color="currentColor" />
                Listing Details & Inventory
              </h3>

              <div 
                style={{ 
                  fontSize: '0.85rem', 
                  lineHeight: 1.6, 
                  color: 'var(--text-secondary)',
                  whiteSpace: 'pre-line' 
                }}
              >
                {product.caption}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
