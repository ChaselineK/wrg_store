import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../../context/StoreContext';
import { FilterBar } from '../store/FilterBar';
import { Coins, ArrowLeft, X, ShoppingCart, Check, Info } from 'lucide-react';
import { formatPrice } from '../../utils/currencyHelper';
import { CurrenciesSkeleton } from '../ui/Skeleton';

export function CurrenciesPage() {
  const { products, navigateTo, addToCart, currency } = useStore();
  const [sortBy, setSortBy] = useState('featured');
  const [selectedPackIndex, setSelectedPackIndex] = useState({});
  const [modalProduct, setModalProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const currencyListings = products.filter((item) => item.type === 'currency');

  if (isLoading) {
    return <CurrenciesSkeleton />;
  }

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
            <ArrowLeft size={14} /> Back to Home
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: 'var(--radius-sm)', background: '#eff6ff', color: '#0066ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Coins size={20} />
            </div>
            <div>
              <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                Call of Duty: Mobile <span style={{ color: '#0066ff' }}>In-Game Currencies</span>
              </h1>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Direct COD Points (CP) packages with identical standardized tiers from Rex and GR 007. Handover &lt;1hr.
              </p>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <FilterBar
          selectedCategory="currency"
          setSelectedCategory={(cat) => {
            if (cat === 'account') navigateTo('accounts');
          }}
          sortBy={sortBy}
          setSortBy={setSortBy}
          totalResults={currencyListings.length}
        />

        {/* Currency Package Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {currencyListings.map((prod) => {
            const currentPkgIdx = selectedPackIndex[prod.id] || 0;
            const activePackage = prod.packages?.[currentPkgIdx] || prod.packages?.[0];

            return (
              <div
                key={prod.id}
                className="glass-panel"
                style={{
                  padding: '1.5rem',
                  borderRadius: 'var(--radius-md)',
                  background: '#ffffff',
                  border: '1px solid var(--glass-border)',
                  boxShadow: 'var(--glass-shadow)'
                }}
              >
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'flex-start' }}>
                  
                  {/* Thumbnail & Vendor Name (No roles) */}
                  <div style={{ width: '100%', maxWidth: '240px' }}>
                    <img
                      src={prod.images?.[0]}
                      alt={prod.title}
                      style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: 'var(--radius-sm)', marginBottom: '0.75rem', background: '#0f172a' }}
                    />
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                      Posted by: <strong style={{ color: '#0066ff' }}>{prod.vendorName}</strong>
                    </div>
                  </div>

                  {/* Right Details */}
                  <div style={{ flex: 1, minWidth: '280px' }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                      {prod.title}
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1rem' }}>
                      {prod.description || prod.caption}
                    </p>

                    {/* Tier Selector */}
                    <div style={{ marginBottom: '1.25rem' }}>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                        Select CP Package Tier:
                      </label>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.5rem' }}>
                        {prod.packages?.map((pkg, idx) => {
                          const isSelected = currentPkgIdx === idx;
                          return (
                            <button
                              key={idx}
                              onClick={() => setSelectedPackIndex({ ...selectedPackIndex, [prod.id]: idx })}
                              style={{
                                padding: '0.65rem',
                                borderRadius: 'var(--radius-xs)',
                                border: isSelected ? '2px solid #0066ff' : '1px solid var(--glass-border-subtle)',
                                background: isSelected ? '#eff6ff' : '#ffffff',
                                cursor: 'pointer',
                                textAlign: 'left',
                                transition: 'all 0.15s ease'
                              }}
                            >
                              <div style={{ fontWeight: 800, fontSize: '0.9rem', color: isSelected ? '#0066ff' : 'var(--text-primary)' }}>
                                {pkg.amount}
                              </div>
                              <div style={{ fontSize: '0.78rem', fontWeight: 600, color: '#0066ff', marginTop: '0.15rem' }}>
                                {formatPrice(pkg.price, currency)}
                              </div>
                              {pkg.bonus && (
                                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                                  {pkg.bonus}
                                </div>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Price and Action Buttons */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--glass-border-subtle)', paddingTop: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                      <div>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Selected Tier Price:</span>
                        <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0066ff', fontFamily: 'var(--font-mono)' }}>
                          {formatPrice(activePackage?.price || prod.price, currency)}
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                          className="glass-btn glass-btn-primary"
                          onClick={() => addToCart(prod, activePackage)}
                          style={{ padding: '0.6rem 1.25rem' }}
                        >
                          <ShoppingCart size={15} /> Add to Cart
                        </button>

                        {/* Trigger Centered Modal as requested */}
                        <button
                          className="glass-btn glass-btn-secondary"
                          onClick={() => setModalProduct({ product: prod, package: activePackage })}
                          style={{ padding: '0.6rem 1rem' }}
                        >
                          <Info size={14} /> Details
                        </button>
                      </div>
                    </div>

                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Centered Modal with Blurred Background as strictly requested */}
        <AnimatePresence>
          {modalProduct && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalProduct(null)}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(15, 23, 42, 0.65)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                zIndex: 1000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1rem'
              }}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                style={{
                  background: '#ffffff',
                  borderRadius: 'var(--radius-lg)',
                  maxWidth: '520px',
                  width: '100%',
                  padding: '2rem',
                  position: 'relative',
                  border: '1px solid var(--glass-border)',
                  boxShadow: 'var(--glass-shadow-modal)'
                }}
              >
                {/* Close Button */}
                <button
                  onClick={() => setModalProduct(null)}
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    background: 'var(--bg-tertiary)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: 'var(--text-primary)'
                  }}
                >
                  <X size={16} />
                </button>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: 'var(--radius-xs)', background: '#eff6ff', color: '#0066ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Coins size={18} />
                  </div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0066ff', textTransform: 'uppercase' }}>
                    In-Game Currency Package
                  </span>
                </div>

                <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.4rem', lineHeight: 1.3 }}>
                  {modalProduct.product.title}
                </h2>

                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                  Vendor: <strong style={{ color: '#0066ff' }}>{modalProduct.product.vendorName}</strong>
                </div>

                {/* Short Description */}
                <div style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: 'var(--radius-xs)', marginBottom: '1.25rem', border: '1px solid var(--glass-border-subtle)' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                    Short Description:
                  </div>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-primary)', lineHeight: 1.55 }}>
                    {modalProduct.product.description || modalProduct.product.caption}
                  </p>
                </div>

                {/* Selected Tier Preview */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', padding: '0.75rem', background: '#eff6ff', borderRadius: 'var(--radius-xs)', border: '1px solid #bfdbfe' }}>
                  <div>
                    <span style={{ fontSize: '0.72rem', color: '#0052cc', display: 'block' }}>Active Package:</span>
                    <strong style={{ fontSize: '0.95rem', color: '#0052cc' }}>
                      {modalProduct.package?.name} ({modalProduct.package?.amount})
                    </strong>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '0.72rem', color: '#0052cc', display: 'block' }}>Price:</span>
                    <strong style={{ fontSize: '1.25rem', color: '#0066ff', fontFamily: 'var(--font-mono)' }}>
                      {formatPrice(modalProduct.package?.price || modalProduct.product.price, currency)}
                    </strong>
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button
                    onClick={() => {
                      addToCart(modalProduct.product, modalProduct.package);
                      setModalProduct(null);
                    }}
                    className="glass-btn glass-btn-primary"
                    style={{ flex: 1, padding: '0.75rem' }}
                  >
                    <ShoppingCart size={16} /> Add to Cart
                  </button>

                  <button
                    onClick={() => setModalProduct(null)}
                    className="glass-btn glass-btn-secondary"
                    style={{ padding: '0.75rem 1rem' }}
                  >
                    Close
                  </button>
                </div>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
