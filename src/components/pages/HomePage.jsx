import React, { useState, useEffect } from 'react';
import { HeroBanner } from '../layout/HeroBanner';
import { ProductCard } from '../store/ProductCard';
import { useStore } from '../../context/StoreContext';
import { ShieldCheck, Coins, Users, ArrowRight } from 'lucide-react';
import { HomeSkeleton } from '../ui/Skeleton';

export function HomePage() {
  const { products, navigateTo } = useStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const accounts = products.filter((p) => p.type === 'account').slice(0, 3);
  const currencies = products.filter((p) => p.type === 'currency').slice(0, 2);

  if (isLoading) {
    return <HomeSkeleton />;
  }

  return (
    <div>
      {/* Hero Section */}
      <HeroBanner />

      {/* Categories Quick Navigation Strip */}
      <section style={{ padding: '1rem 0 2rem 0' }}>
        <div className="app-container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '1rem' }}>
            
            <div 
              className="glass-card" 
              style={{ 
                padding: '1.5rem', 
                cursor: 'pointer', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                background: '#ffffff',
                border: '1px solid var(--glass-border)'
              }}
              onClick={() => navigateTo('accounts')}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: 'var(--radius-sm)', background: '#eff6ff', color: '#0066ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>Account listings</h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>CODM Mythic & Legendary accounts</p>
                </div>
              </div>
              <ArrowRight size={18} color="#0066ff" />
            </div>

            <div 
              className="glass-card" 
              style={{ 
                padding: '1.5rem', 
                cursor: 'pointer', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                background: '#ffffff',
                border: '1px solid var(--glass-border)'
              }}
              onClick={() => navigateTo('currency')}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: 'var(--radius-sm)', background: '#eff6ff', color: '#0066ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Coins size={24} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>In-game currencies</h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Direct COD Points (CP) Player ID top-ups</p>
                </div>
              </div>
              <ArrowRight size={18} color="#0066ff" />
            </div>

            <div 
              className="glass-card" 
              style={{ 
                padding: '1.5rem', 
                cursor: 'pointer', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                background: '#ffffff',
                border: '1px solid var(--glass-border)'
              }}
              onClick={() => navigateTo('vendors')}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: 'var(--radius-sm)', background: '#eff6ff', color: '#0066ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Users size={24} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>3 Verified Vendors</h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>RetiredTT, Rex & GR 007</p>
                </div>
              </div>
              <ArrowRight size={18} color="#0066ff" />
            </div>

          </div>
        </div>
      </section>

      {/* Featured Accounts Preview */}
      <section style={{ padding: '1rem 0 2.5rem 0' }}>
        <div className="app-container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div>
              <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                Featured <span style={{ color: '#0066ff' }}>Account Listings</span>
              </h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.15rem' }}>
                Full gameplay verification and direct transfer within &lt;1hr
              </p>
            </div>

            <button
              onClick={() => navigateTo('accounts')}
              className="glass-btn glass-btn-primary"
              style={{ fontSize: '0.85rem' }}
            >
              Explore Accounts <ArrowRight size={14} />
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 310px), 1fr))', gap: '1.25rem' }}>
            {accounts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Currencies Preview */}
      <section style={{ padding: '1rem 0 3rem 0', background: 'var(--bg-tertiary)' }}>
        <div className="app-container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div>
              <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                Direct <span style={{ color: '#0066ff' }}>COD Points (CP)</span> Top-Ups
              </h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.15rem' }}>
                Dispatched by Rex and GR 007 using your Player UID & Zone
              </p>
            </div>

            <button
              onClick={() => navigateTo('currency')}
              className="glass-btn glass-btn-secondary"
              style={{ fontSize: '0.85rem' }}
            >
              View All Currency Packs <ArrowRight size={14} />
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 310px), 1fr))', gap: '1.25rem' }}>
            {currencies.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
