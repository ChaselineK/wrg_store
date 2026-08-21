import React from 'react';
import { X, Heart, MessageSquare, Trash2, Eye } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { GlassButton } from '../ui/GlassButton';

export function FavoritesModal() {
  const { 
    isFavoritesOpen, 
    setIsFavoritesOpen, 
    favorites, 
    products, 
    toggleFavorite,
    openCheckout,
    setActiveDetailProduct
  } = useStore();

  if (!isFavoritesOpen) return null;

  const favoriteProducts = products.filter(p => favorites.includes(p.id));

  return (
    <div className="glass-modal-backdrop" onClick={() => setIsFavoritesOpen(false)}>
      <div 
        className="glass-modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '640px' }}
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
              <Heart size={16} fill="currentColor" />
            </div>
            <div>
              <h2 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Saved Wishlist</h2>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                {favoriteProducts.length} items saved
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsFavoritesOpen(false)}
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
            <X size={16} />
          </button>
        </div>

        {/* List */}
        <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {favoriteProducts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--text-muted)' }}>
              You haven't saved any accounts yet. Click the heart icon on any listing to save it.
            </div>
          ) : (
            favoriteProducts.map((prod) => (
              <div 
                key={prod.id}
                className="glass-card"
                style={{
                  padding: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '0.75rem',
                  borderRadius: 'var(--radius-sm)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <img
                    src={prod.images[0]}
                    alt={prod.title}
                    style={{ width: '50px', height: '50px', borderRadius: 'var(--radius-xs)', objectFit: 'cover' }}
                  />
                  <div>
                    <span className="glass-badge glass-badge-ruby" style={{ fontSize: '0.62rem' }}>
                      {prod.gameName}
                    </span>
                    <div style={{ fontWeight: 600, fontSize: '0.85rem', maxWidth: '240px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {prod.title}
                    </div>
                    <div style={{ fontWeight: 700, color: 'var(--accent-primary)', fontSize: '0.88rem' }}>
                      ${Number(prod.price).toFixed(2)}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <button
                    onClick={() => {
                      setActiveDetailProduct(prod);
                      setIsFavoritesOpen(false);
                    }}
                    className="glass-panel"
                    style={{ width: '30px', height: '30px', borderRadius: 'var(--radius-xs)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                    title="View Details"
                  >
                    <Eye size={14} />
                  </button>

                  <GlassButton
                    variant="whatsapp"
                    size="sm"
                    icon={MessageSquare}
                    onClick={() => {
                      openCheckout(prod);
                      setIsFavoritesOpen(false);
                    }}
                  >
                    Buy
                  </GlassButton>

                  <button
                    onClick={() => toggleFavorite(prod.id)}
                    className="glass-panel"
                    style={{ width: '30px', height: '30px', borderRadius: 'var(--radius-xs)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#ef4444' }}
                    title="Remove"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
