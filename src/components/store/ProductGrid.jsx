import React from 'react';
import { ProductCard } from './ProductCard';
import { Gamepad2, PlusCircle, RefreshCw, Lock, ArrowRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { GlassButton } from '../ui/GlassButton';

export function ProductGrid({ products, onResetFilters }) {
  const { 
    isAdmin, 
    isGuest, 
    openProductForm, 
    resetToSampleData, 
    setIsAuthModalOpen 
  } = useStore();

  if (products.length === 0) {
    return (
      <div 
        className="glass-panel"
        style={{
          padding: '3.5rem 1.5rem',
          textAlign: 'center',
          borderRadius: 'var(--radius-lg)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
          margin: '2rem 0',
          width: '100%',
          boxSizing: 'border-box'
        }}
      >
        <div 
          style={{
            width: '54px',
            height: '54px',
            borderRadius: '50%',
            background: 'var(--accent-gradient-soft)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent-primary)'
          }}
        >
          <Gamepad2 size={28} />
        </div>

        <div>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.35rem' }}>
            No Gaming Listings Found
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', maxWidth: '380px' }}>
            No accounts match your current filters. Try resetting the filters or check another game.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          {onResetFilters && (
            <GlassButton
              variant="secondary"
              size="md"
              icon={RefreshCw}
              onClick={onResetFilters}
            >
              Reset Filters
            </GlassButton>
          )}

          {isAdmin ? (
            <GlassButton
              variant="primary"
              size="md"
              icon={PlusCircle}
              onClick={() => openProductForm(null)}
            >
              Post New Listing
            </GlassButton>
          ) : (
            <GlassButton
              variant="secondary"
              size="md"
              onClick={resetToSampleData}
            >
              Restore Catalog
            </GlassButton>
          )}
        </div>
      </div>
    );
  }

  // If in Guest Mode: Limit visible products to 3 items
  const visibleProducts = isGuest ? products.slice(0, 3) : products;

  return (
    <div style={{ marginBottom: '3rem', width: '100%', boxSizing: 'border-box' }}>
      
      {/* Product Cards Grid - Zero Horizontal Overflow */}
      <div
        className="products-responsive-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
          gap: '1.25rem',
          marginBottom: '2rem',
          width: '100%',
          boxSizing: 'border-box'
        }}
      >
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Guest Locked Banner */}
      {isGuest && products.length > 3 && (
        <div 
          className="glass-panel"
          style={{
            padding: '2.5rem 1.5rem',
            textAlign: 'center',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--accent-primary)',
            background: 'linear-gradient(180deg, var(--glass-bg) 0%, rgba(186, 24, 27, 0.1) 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            width: '100%',
            boxSizing: 'border-box'
          }}
        >
          <div 
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: 'var(--accent-gradient-soft)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-primary)',
              marginBottom: '1rem'
            }}
          >
            <Lock size={24} />
          </div>

          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.4rem' }}>
            Unlock All {products.length}+ Verified Listings
          </h3>

          <p className="serif-subheading" style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', maxWidth: '520px', margin: '0 auto 1.5rem auto', lineHeight: 1.5 }}>
            You are viewing 3 preview listings in Guest Mode. Sign in or create a free account to browse the complete collection of gaming accounts, in-game currency packages, and direct WhatsApp escrow deals.
          </p>

          <GlassButton
            variant="primary"
            size="lg"
            icon={ArrowRight}
            onClick={() => setIsAuthModalOpen(true)}
          >
            Sign In / Register to Unlock All
          </GlassButton>
        </div>
      )}

    </div>
  );
}
