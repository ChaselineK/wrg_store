import React, { useState } from 'react';
import { 
  Heart, 
  Video, 
  Zap, 
  MessageSquare, 
  Eye, 
  Edit3, 
  Trash2, 
  Coins
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { GlassButton } from '../ui/GlassButton';
import { Badge } from '../ui/Badge';
import { formatPrice } from '../../utils/currencyHelper';

export function ProductCard({ product }) {
  const { 
    isAdmin, 
    openCheckout, 
    setActiveDetailProduct, 
    openProductForm, 
    deleteProduct, 
    toggleFavorite, 
    isFavorite,
    currency 
  } = useStore();

  const [isHovered, setIsHovered] = useState(false);
  const isFav = isFavorite(product.id);
  const isCurrency = product.type === 'currency';

  const discountPercent = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete "${product.title}"?`)) {
      deleteProduct(product.id);
    }
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    openProductForm(product);
  };

  return (
    <div 
      className="glass-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        borderRadius: 'var(--radius-md)',
        border: isHovered ? '1px solid var(--glass-border-hover)' : '1px solid var(--glass-border-subtle)',
        transition: 'transform var(--transition-normal), border-color var(--transition-normal)'
      }}
    >
      {/* Card Media Container */}
      <div 
        style={{ position: 'relative', width: '100%', height: '190px', overflow: 'hidden', cursor: 'pointer' }}
        onClick={() => setActiveDetailProduct(product)}
      >
        <img
          src={product.images[0] || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800'}
          alt={product.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: isHovered ? 'scale(1.03)' : 'scale(1)',
            transition: 'transform 0.3s ease'
          }}
        />

        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(10,11,14,0.85) 0%, transparent 55%)',
            pointerEvents: 'none'
          }}
        />

        {/* Top Badges */}
        <div
          style={{
            position: 'absolute',
            top: '0.65rem',
            left: '0.65rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.3rem',
            zIndex: 5
          }}
        >
          {product.isInstantDelivery && (
            <span className="glass-badge" style={{ background: 'rgba(0,0,0,0.65)', color: '#fff' }}>
              <Zap size={10} color="#fff" /> Instant
            </span>
          )}

          {discountPercent && (
            <span className="glass-badge" style={{ background: 'var(--accent-primary)', color: '#fff' }}>
              -{discountPercent}%
            </span>
          )}

          {product.videoUrl && (
            <span
              className="glass-badge"
              style={{ background: 'rgba(0,0,0,0.65)', color: '#fff', borderColor: 'rgba(255,255,255,0.15)' }}
            >
              <Video size={10} color="#fff" /> Video
            </span>
          )}
        </div>

        {/* Wishlist & Admin Actions */}
        <div
          style={{
            position: 'absolute',
            top: '0.65rem',
            right: '0.65rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.35rem',
            zIndex: 5
          }}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(product.id);
            }}
            className="glass-panel"
            style={{
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 'none',
              cursor: 'pointer',
              color: isFav ? 'var(--accent-primary)' : '#fff',
              background: 'rgba(0,0,0,0.5)'
            }}
            title={isFav ? 'Remove from favorites' : 'Save to wishlist'}
          >
            <Heart size={14} color="currentColor" fill={isFav ? 'currentColor' : 'none'} />
          </button>

          {isAdmin && (
            <>
              <button
                onClick={handleEdit}
                className="glass-panel"
                style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#fff',
                  background: 'rgba(0,0,0,0.65)'
                }}
                title="Edit Listing"
              >
                <Edit3 size={12} color="#fff" />
              </button>

              <button
                onClick={handleDelete}
                className="glass-panel"
                style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#fff',
                  background: 'rgba(220, 38, 38, 0.8)'
                }}
                title="Delete Listing"
              >
                <Trash2 size={12} color="#fff" />
              </button>
            </>
          )}
        </div>

        {/* Bottom Game Label */}
        <div
          style={{
            position: 'absolute',
            bottom: '0.5rem',
            left: '0.65rem',
            right: '0.65rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            color: '#fff',
            fontSize: '0.72rem'
          }}
        >
          <span style={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#ffffff' }}>
            {product.gameName}
          </span>
          <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.68rem' }}>
            {product.region?.split('(')[0] || 'Global'}
          </span>
        </div>
      </div>

      {/* Product Content Body */}
      <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
        
        <h3
          onClick={() => setActiveDetailProduct(product)}
          style={{
            fontSize: '0.92rem',
            fontWeight: 600,
            lineHeight: 1.35,
            marginBottom: '0.6rem',
            cursor: 'pointer',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            height: '2.5rem'
          }}
          title={product.title}
        >
          {product.title}
        </h3>

        {/* Specs Summary */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', marginBottom: '0.85rem', minHeight: '40px' }}>
          {isCurrency ? (
            <>
              <span className="glass-badge" style={{ fontSize: '0.68rem' }}>
                <Coins size={10} color="currentColor" /> {product.packages?.length || 4} Packages
              </span>
              <span className="glass-badge" style={{ fontSize: '0.68rem' }}>
                Direct Top-Up
              </span>
            </>
          ) : (
            <>
              {product.specs?.rank && (
                <span className="glass-badge" style={{ fontSize: '0.68rem' }}>
                  {product.specs.rank}
                </span>
              )}
              {product.specs?.skinsCount && (
                <span className="glass-badge" style={{ fontSize: '0.68rem' }}>
                  {product.specs.skinsCount}
                </span>
              )}
              {product.specs?.level && (
                <span className="glass-badge" style={{ fontSize: '0.68rem' }}>
                  Lvl {product.specs.level}
                </span>
              )}
            </>
          )}
        </div>

        {/* Footer: Multi-Currency Price & WhatsApp Action */}
        <div
          style={{
            marginTop: 'auto',
            paddingTop: '0.65rem',
            borderTop: '1px solid var(--glass-border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.5rem'
          }}
        >
          <div>
            <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', display: 'block' }}>
              {isCurrency ? 'From' : 'Price'}
            </span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.3rem' }}>
              <span style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--accent-primary)', fontFamily: 'var(--font-heading)' }}>
                {formatPrice(product.price, currency)}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <button
              onClick={() => setActiveDetailProduct(product)}
              className="glass-panel"
              style={{
                width: '32px',
                height: '32px',
                borderRadius: 'var(--radius-xs)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'var(--text-primary)'
              }}
              title="Inspect details"
            >
              <Eye size={14} color="currentColor" />
            </button>

            <GlassButton
              variant="whatsapp"
              size="sm"
              icon={MessageSquare}
              onClick={() => openCheckout(product)}
            >
              Buy
            </GlassButton>
          </div>

        </div>

      </div>
    </div>
  );
}
