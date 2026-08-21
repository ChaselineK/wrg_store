import React from 'react';

export function SkeletonLoader() {
  return (
    <div style={{ minHeight: '100vh', padding: '1rem 0' }} className="animate-fade-in">
      <div className="app-container">
        
        {/* Navbar Skeleton */}
        <div 
          className="glass-panel" 
          style={{ 
            height: '64px', 
            borderRadius: 'var(--radius-lg)', 
            marginBottom: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 1.5rem'
          }}
        >
          <div className="skeleton-box" style={{ width: '140px', height: '28px' }} />
          <div className="skeleton-box" style={{ width: '320px', height: '36px', borderRadius: 'var(--radius-full)' }} />
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <div className="skeleton-box" style={{ width: '36px', height: '36px', borderRadius: '50%' }} />
            <div className="skeleton-box" style={{ width: '36px', height: '36px', borderRadius: '50%' }} />
            <div className="skeleton-box" style={{ width: '80px', height: '36px', borderRadius: 'var(--radius-full)' }} />
          </div>
        </div>

        {/* Hero Banner Skeleton */}
        <div 
          className="glass-panel" 
          style={{ 
            height: '340px', 
            borderRadius: 'var(--radius-lg)', 
            marginBottom: '2rem',
            padding: '2.5rem',
            display: 'grid',
            gridTemplateColumns: '1.5fr 1fr',
            gap: '2rem'
          }}
        >
          <div>
            <div className="skeleton-box" style={{ width: '180px', height: '24px', marginBottom: '1.25rem' }} />
            <div className="skeleton-box" style={{ width: '85%', height: '42px', marginBottom: '0.75rem' }} />
            <div className="skeleton-box" style={{ width: '65%', height: '42px', marginBottom: '1.25rem' }} />
            <div className="skeleton-box" style={{ width: '90%', height: '20px', marginBottom: '1.75rem' }} />
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <div className="skeleton-box" style={{ width: '140px', height: '42px', borderRadius: 'var(--radius-sm)' }} />
              <div className="skeleton-box" style={{ width: '160px', height: '42px', borderRadius: 'var(--radius-sm)' }} />
            </div>
          </div>

          <div className="skeleton-box" style={{ height: '100%', borderRadius: 'var(--radius-md)' }} />
        </div>

        {/* Filters Skeleton */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', overflowX: 'hidden' }}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="skeleton-box" style={{ width: '110px', height: '36px', borderRadius: 'var(--radius-full)', flexShrink: 0 }} />
          ))}
        </div>

        {/* Product Cards Grid Skeleton */}
        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
            gap: '1.5rem' 
          }}
        >
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div 
              key={i} 
              className="glass-card" 
              style={{ height: '360px', padding: '1rem', display: 'flex', flexDirection: 'column' }}
            >
              <div className="skeleton-box" style={{ width: '100%', height: '180px', borderRadius: 'var(--radius-sm)', marginBottom: '1rem' }} />
              <div className="skeleton-box" style={{ width: '80%', height: '20px', marginBottom: '0.75rem' }} />
              <div className="skeleton-box" style={{ width: '50%', height: '16px', marginBottom: '1.5rem' }} />
              <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="skeleton-box" style={{ width: '70px', height: '26px' }} />
                <div className="skeleton-box" style={{ width: '80px', height: '32px', borderRadius: 'var(--radius-xs)' }} />
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
