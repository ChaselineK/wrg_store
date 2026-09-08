import React from 'react';

export function SkeletonBox({ width = '100%', height = '20px', borderRadius = 'var(--radius-xs)', style = {} }) {
  return (
    <div
      className="skeleton-box"
      style={{
        width,
        height,
        borderRadius,
        ...style
      }}
    />
  );
}

export function HomeSkeleton() {
  return (
    <div style={{ padding: '1.25rem 0 3rem 0', width: '100%' }}>
      <div className="app-container">
        
        {/* Skeleton Hero */}
        <div 
          className="glass-panel"
          style={{
            padding: '2rem',
            borderRadius: 'var(--radius-lg)',
            background: '#ffffff',
            border: '1px solid var(--glass-border-subtle)',
            marginBottom: '2rem'
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '2rem', alignItems: 'center' }}>
            <div>
              <SkeletonBox width="140px" height="26px" borderRadius="999px" style={{ marginBottom: '1rem' }} />
              <SkeletonBox width="85%" height="36px" style={{ marginBottom: '0.5rem' }} />
              <SkeletonBox width="65%" height="36px" style={{ marginBottom: '1rem' }} />
              <SkeletonBox width="95%" height="16px" style={{ marginBottom: '0.4rem' }} />
              <SkeletonBox width="75%" height="16px" style={{ marginBottom: '1.5rem' }} />
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <SkeletonBox width="150px" height="42px" borderRadius="var(--radius-sm)" />
                <SkeletonBox width="150px" height="42px" borderRadius="var(--radius-sm)" />
              </div>
            </div>
            <div>
              <SkeletonBox width="100%" height="240px" borderRadius="var(--radius-md)" />
            </div>
          </div>
        </div>

        {/* Skeleton Section Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div>
            <SkeletonBox width="180px" height="24px" style={{ marginBottom: '0.35rem' }} />
            <SkeletonBox width="260px" height="14px" />
          </div>
          <SkeletonBox width="120px" height="34px" borderRadius="var(--radius-sm)" />
        </div>

        {/* Skeleton Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '1.25rem' }}>
          {[1, 2, 3].map((i) => (
            <div 
              key={i} 
              className="glass-card" 
              style={{ padding: '1rem', background: '#ffffff', borderRadius: 'var(--radius-md)', border: '1px solid var(--glass-border)' }}
            >
              <SkeletonBox width="100%" height="180px" borderRadius="var(--radius-sm)" style={{ marginBottom: '1rem' }} />
              <SkeletonBox width="70%" height="20px" style={{ marginBottom: '0.5rem' }} />
              <SkeletonBox width="90%" height="14px" style={{ marginBottom: '1rem' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <SkeletonBox width="80px" height="24px" />
                <SkeletonBox width="90px" height="34px" borderRadius="var(--radius-xs)" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export function AccountsSkeleton({ viewMode = 'linear' }) {
  const isLinear = viewMode === 'linear';

  return (
    <div style={{ padding: '1.5rem 0 3.5rem 0', width: '100%' }}>
      <div className="app-container">
        
        {/* Header Skeleton */}
        <div style={{ marginBottom: '1.5rem' }}>
          <SkeletonBox width="110px" height="30px" borderRadius="var(--radius-sm)" style={{ marginBottom: '0.85rem' }} />
          <SkeletonBox width="240px" height="28px" style={{ marginBottom: '0.35rem' }} />
          <SkeletonBox width="340px" height="15px" />
        </div>

        {/* Filter Bar Skeleton */}
        <div className="glass-panel" style={{ padding: '1rem', background: '#ffffff', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
            <SkeletonBox width="220px" height="36px" borderRadius="var(--radius-full)" />
            <SkeletonBox width="140px" height="36px" borderRadius="var(--radius-sm)" />
            <SkeletonBox width="80px" height="36px" borderRadius="var(--radius-sm)" />
          </div>
        </div>

        {/* Accounts Stack Skeleton */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="glass-card"
              style={{
                display: 'flex',
                flexDirection: isLinear ? 'row' : 'column',
                padding: isLinear ? '0.75rem' : '1rem',
                gap: '1rem',
                background: '#ffffff',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--glass-border)'
              }}
            >
              <SkeletonBox 
                width={isLinear ? '160px' : '100%'} 
                height={isLinear ? '120px' : '180px'} 
                borderRadius="var(--radius-sm)" 
              />
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <SkeletonBox width="60%" height="22px" style={{ marginBottom: '0.5rem' }} />
                <SkeletonBox width="85%" height="14px" style={{ marginBottom: '0.75rem' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                  <SkeletonBox width="90px" height="26px" />
                  <SkeletonBox width="110px" height="36px" borderRadius="var(--radius-xs)" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export function CurrenciesSkeleton() {
  return (
    <div style={{ padding: '1.5rem 0 3.5rem 0', width: '100%' }}>
      <div className="app-container">
        
        {/* Header Skeleton */}
        <div style={{ marginBottom: '1.5rem' }}>
          <SkeletonBox width="110px" height="30px" borderRadius="var(--radius-sm)" style={{ marginBottom: '0.85rem' }} />
          <SkeletonBox width="280px" height="28px" style={{ marginBottom: '0.35rem' }} />
          <SkeletonBox width="380px" height="15px" />
        </div>

        {/* Currency Products Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: '1.5rem' }}>
          {[1, 2].map((i) => (
            <div 
              key={i} 
              className="glass-panel" 
              style={{ padding: '1.5rem', background: '#ffffff', borderRadius: 'var(--radius-md)', border: '1px solid var(--glass-border)' }}
            >
              <SkeletonBox width="100%" height="180px" borderRadius="var(--radius-sm)" style={{ marginBottom: '1.25rem' }} />
              <SkeletonBox width="60%" height="22px" style={{ marginBottom: '0.5rem' }} />
              <SkeletonBox width="80%" height="14px" style={{ marginBottom: '1.25rem' }} />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem', marginBottom: '1rem' }}>
                {[1, 2, 3, 4].map((j) => (
                  <SkeletonBox key={j} width="100%" height="50px" borderRadius="var(--radius-xs)" />
                ))}
              </div>
              <SkeletonBox width="100%" height="40px" borderRadius="var(--radius-sm)" />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
