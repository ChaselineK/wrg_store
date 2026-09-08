import React, { useState, useMemo, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../store/ProductCard';
import { FilterBar } from '../store/FilterBar';
import { ShieldCheck, Search, ArrowLeft, LayoutList, LayoutGrid } from 'lucide-react';
import { AccountsSkeleton } from '../ui/Skeleton';

export function AccountsPage() {
  const { products, navigateTo } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('linear'); // 'linear' for vertical linear stack or 'grid'
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const accountListings = useMemo(() => {
    return products
      .filter((item) => item.type === 'account')
      .filter((item) => {
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase();
        return (
          item.title.toLowerCase().includes(q) ||
          item.vendorName?.toLowerCase().includes(q) ||
          item.description?.toLowerCase().includes(q) ||
          item.caption?.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => {
        if (sortBy === 'price_asc') return a.price - b.price;
        if (sortBy === 'price_desc') return b.price - a.price;
        if (sortBy === 'newest') return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        if (a.isHot && !b.isHot) return -1;
        if (!a.isHot && b.isHot) return 1;
        return 0;
      });
  }, [products, searchQuery, sortBy]);

  if (isLoading) {
    return <AccountsSkeleton viewMode={viewMode} />;
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

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: 'var(--radius-sm)', background: '#eff6ff', color: '#0066ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ShieldCheck size={20} />
              </div>
              <div>
                <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  Call of Duty: Mobile <span style={{ color: '#0066ff' }}>Account Listings</span>
                </h1>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  Verified Mythic and Legendary CODM accounts with clean credentials and &lt;1hr handover.
                </p>
              </div>
            </div>

            {/* Layout Toggle (Linear vs Grid) */}
            <div style={{ display: 'flex', background: 'var(--bg-tertiary)', padding: '0.2rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--glass-border-subtle)' }}>
              <button
                onClick={() => setViewMode('linear')}
                className="glass-btn"
                style={{
                  padding: '0.35rem 0.65rem',
                  fontSize: '0.78rem',
                  background: viewMode === 'linear' ? '#ffffff' : 'transparent',
                  color: viewMode === 'linear' ? '#0066ff' : 'var(--text-muted)',
                  border: 'none',
                  boxShadow: viewMode === 'linear' ? 'var(--glass-shadow)' : 'none'
                }}
                title="Vertical Linear View"
              >
                <LayoutList size={14} />
                <span className="hide-on-mobile">List</span>
              </button>

              <button
                onClick={() => setViewMode('grid')}
                className="glass-btn"
                style={{
                  padding: '0.35rem 0.65rem',
                  fontSize: '0.78rem',
                  background: viewMode === 'grid' ? '#ffffff' : 'transparent',
                  color: viewMode === 'grid' ? '#0066ff' : 'var(--text-muted)',
                  border: 'none',
                  boxShadow: viewMode === 'grid' ? 'var(--glass-shadow)' : 'none'
                }}
                title="Grid View"
              >
                <LayoutGrid size={14} />
                <span className="hide-on-mobile">Grid</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filter Bar & Category Switch */}
        <FilterBar
          selectedCategory="account"
          setSelectedCategory={(cat) => {
            if (cat === 'currency') navigateTo('currency');
          }}
          sortBy={sortBy}
          setSortBy={setSortBy}
          totalResults={accountListings.length}
        />

        {/* Search Input */}
        <div style={{ marginBottom: '1.5rem', maxWidth: '460px', position: 'relative' }}>
          <Search size={15} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            className="glass-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ paddingLeft: '2.4rem' }}
          />
        </div>

        {/* Product Grid / Vertical Linear View */}
        {accountListings.length > 0 ? (
          <div 
            className={viewMode === 'linear' ? 'accounts-linear-container' : ''}
            style={{ 
              display: 'grid', 
              gridTemplateColumns: viewMode === 'linear' ? '1fr' : 'repeat(auto-fill, minmax(min(100%, 310px), 1fr))', 
              gap: '1rem' 
            }}
          >
            {accountListings.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                layout={viewMode === 'linear' ? 'linear' : 'grid'} 
              />
            ))}
          </div>
        ) : (
          <div className="glass-panel" style={{ padding: '3rem 1.5rem', textAlign: 'center', background: '#ffffff' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
              No accounts found matching your query
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              Try adjusting your search terms or view our in-game currency packages.
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="glass-btn glass-btn-secondary"
            >
              Clear Search
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
