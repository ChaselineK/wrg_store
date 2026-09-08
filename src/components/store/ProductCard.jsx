import React from 'react';
import { 
  ShoppingCart, 
  Eye, 
  Trash2, 
  Video
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { formatPrice } from '../../utils/currencyHelper';

export function ProductCard({ product, layout = 'grid' }) {
  const { 
    isAdmin, 
    navigateTo, 
    addToCart, 
    deleteProduct, 
    currency 
  } = useStore();

  const isCurrency = product.type === 'currency';
  const hasAdminDiscount = Boolean(product.discount && product.discount > 0);

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete "${product.title}"?`)) {
      deleteProduct(product.id);
    }
  };

  const isLinear = layout === 'linear';

  return (
    <div 
      className="glass-card product-card-hover"
      style={{
        display: 'flex',
        flexDirection: isLinear ? 'row' : 'column',
        height: '100%',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--glass-border)',
        background: '#ffffff',
        overflow: 'hidden',
        boxSizing: 'border-box',
        transition: 'all 0.2s ease',
        boxShadow: 'var(--glass-shadow)'
      }}
    >
      {/* Card Media Container */}
      <div 
        style={{ 
          position: 'relative', 
          width: isLinear ? '160px' : '100%', 
          minWidth: isLinear ? '140px' : '100%',
          height: isLinear ? 'auto' : '190px', 
          minHeight: isLinear ? '150px' : '190px',
          overflow: 'hidden', 
          cursor: 'pointer', 
          background: '#0f172a',
          flexShrink: 0
        }}
        onClick={() => navigateTo(isCurrency ? 'currency' : 'product-detail', product)}
      >
        <img
          src={product.images?.[0] || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800'}
          alt={product.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.3s ease'
          }}
          className="product-card-img"
        />

        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(15, 23, 42, 0.6) 0%, transparent 60%)',
            pointerEvents: 'none'
          }}
        />

        {/* Badges */}
        <div
          style={{
            position: 'absolute',
            top: '0.5rem',
            left: '0.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.25rem',
            zIndex: 5
          }}
        >
          {hasAdminDiscount && (
            <span 
              style={{ 
                background: '#0066ff', 
                color: '#ffffff', 
                fontSize: '0.7rem', 
                fontWeight: 800, 
                padding: '0.2rem 0.45rem', 
                borderRadius: 'var(--radius-xs)',
                boxShadow: '0 2px 6px rgba(0,102,255,0.3)'
              }}
            >
              -{product.discount}% OFF
            </span>
          )}

          {product.videoUrl && (
            <span
              style={{
                background: 'rgba(15, 23, 42, 0.85)',
                color: '#ffffff',
                fontSize: '0.65rem',
                fontWeight: 600,
                padding: '0.15rem 0.45rem',
                borderRadius: 'var(--radius-xs)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem'
              }}
            >
              <Video size={10} /> Video
            </span>
          )}
        </div>

        {/* Admin Delete Action */}
        {isAdmin && (
          <button
            onClick={handleDelete}
            style={{
              position: 'absolute',
              bottom: '0.5rem',
              right: '0.5rem',
              background: '#dc2626',
              color: '#fff',
              border: 'none',
              borderRadius: 'var(--radius-xs)',
              padding: '0.35rem',
              cursor: 'pointer',
              zIndex: 6
            }}
            title="Delete Listing"
          >
            <Trash2 size={13} />
          </button>
        )}
      </div>

      {/* Card Content: Streamlined description and price only */}
      <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
        
        {/* Vendor attribution - NO ROLES visible to clients */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.75rem' }}>
          <span style={{ color: 'var(--text-muted)' }}>
            Posted by: <strong style={{ color: '#0066ff' }}>{product.vendorName}</strong>
          </span>
          <span style={{ color: '#059669', fontWeight: 600, fontSize: '0.7rem' }}>
            Verified
          </span>
        </div>

        {/* Title */}
        <h3 
          style={{ 
            fontSize: '0.96rem', 
            fontWeight: 800, 
            lineHeight: 1.35, 
            color: 'var(--text-primary)', 
            marginBottom: '0.4rem',
            cursor: 'pointer',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
          onClick={() => navigateTo(isCurrency ? 'currency' : 'product-detail', product)}
        >
          {product.title}
        </h3>

        {/* Description: streamlined strictly as requested */}
        <p 
          style={{ 
            fontSize: '0.82rem', 
            color: 'var(--text-secondary)', 
            lineHeight: 1.45, 
            marginBottom: '0.85rem',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {product.description || product.caption}
        </p>

        {/* Price & Action Row */}
        <div 
          style={{ 
            marginTop: 'auto', 
            paddingTop: '0.65rem', 
            borderTop: '1px solid var(--glass-border-subtle)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            gap: '0.5rem',
            flexWrap: 'wrap'
          }}
        >
          <div>
            <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', display: 'block' }}>Price</span>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0066ff', fontFamily: 'var(--font-mono)' }}>
              {formatPrice(product.price, currency)}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <button
              onClick={() => addToCart(product)}
              className="glass-btn glass-btn-primary"
              style={{ padding: '0.45rem 0.8rem', fontSize: '0.82rem' }}
              title="Add to Cart"
            >
              <ShoppingCart size={13} />
              <span>Add to Cart</span>
            </button>

            <button
              onClick={() => navigateTo(isCurrency ? 'currency' : 'product-detail', product)}
              className="glass-btn glass-btn-secondary"
              style={{ padding: '0.45rem 0.6rem', fontSize: '0.82rem' }}
              title="View Details"
            >
              <Eye size={13} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
