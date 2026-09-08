import React from 'react';
import { 
  ShieldCheck, 
  Coins, 
  ArrowUpDown,
  Search
} from 'lucide-react';
import { CATEGORIES } from '../../data/gamesConfig';

export function FilterBar({
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
  totalResults
}) {
  return (
    <div style={{ marginBottom: '1.5rem' }}>
      
      {/* Category Tabs: Strictly 2 categories as requested */}
      <div 
        className="glass-panel" 
        style={{ 
          padding: '0.65rem 1rem', 
          borderRadius: 'var(--radius-md)', 
          background: '#ffffff',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.75rem',
          border: '1px solid var(--glass-border-subtle)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`glass-btn ${isActive ? 'glass-btn-primary' : 'glass-btn-secondary'}`}
                style={{
                  padding: '0.5rem 1rem',
                  fontSize: '0.85rem',
                  borderRadius: 'var(--radius-sm)'
                }}
              >
                {cat.id === 'account' ? <ShieldCheck size={15} /> : <Coins size={15} />}
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Results Counter & Sort */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            Showing <strong>{totalResults}</strong> listings
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <ArrowUpDown size={13} color="var(--text-muted)" />
            <select
              className="glass-input"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: '0.35rem 0.65rem',
                fontSize: '0.8rem',
                borderRadius: 'var(--radius-xs)',
                width: 'auto',
                cursor: 'pointer',
                background: 'var(--bg-tertiary)'
              }}
            >
              <option value="featured">Hot Deals First</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="newest">Recently Added</option>
            </select>
          </div>
        </div>
      </div>

    </div>
  );
}
