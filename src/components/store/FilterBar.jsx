import React from 'react';
import { 
  LayoutGrid, 
  UserCheck, 
  Coins, 
  SlidersHorizontal, 
  ArrowUpDown,
  RotateCcw,
  X
} from 'lucide-react';
import { GAMES_LIST, PLATFORMS } from '../../data/gamesConfig';
import { useStore } from '../../context/StoreContext';
import { formatPrice } from '../../utils/currencyHelper';

export function FilterBar({
  selectedCategory,
  setSelectedCategory,
  selectedGame,
  setSelectedGame,
  selectedPlatform,
  setSelectedPlatform,
  sortBy,
  setSortBy,
  priceRange,
  setPriceRange,
  totalResults
}) {
  const { activeCategories, removeCategory, resetCategories, currency } = useStore();

  return (
    <div id="marketplace-catalog" style={{ marginBottom: '1.5rem' }}>
      
      {/* Category Tabs & Category Removal Options */}
      <div 
        className="glass-panel" 
        style={{ 
          padding: '0.5rem 0.75rem', 
          borderRadius: 'var(--radius-md)', 
          marginBottom: '1rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.75rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
          {activeCategories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <div 
                key={cat.id} 
                style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}
              >
                <button
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`glass-btn ${isActive ? 'glass-btn-primary' : 'glass-btn-secondary'}`}
                  style={{
                    padding: '0.45rem 0.85rem',
                    fontSize: '0.82rem',
                    borderRadius: 'var(--radius-sm)'
                  }}
                >
                  {cat.id === 'all' && <LayoutGrid size={14} color="currentColor" />}
                  {cat.id === 'account' && <UserCheck size={14} color="currentColor" />}
                  {cat.id === 'currency' && <Coins size={14} color="currentColor" />}
                  <span>{cat.name}</span>
                </button>

                {/* Option to remove category */}
                {cat.id !== 'all' && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeCategory(cat.id);
                      if (selectedCategory === cat.id) setSelectedCategory('all');
                    }}
                    style={{
                      background: 'rgba(220, 38, 38, 0.2)',
                      border: 'none',
                      color: 'currentColor',
                      borderRadius: '50%',
                      width: '18px',
                      height: '18px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      fontSize: '0.65rem',
                      marginLeft: '-6px',
                      zIndex: 2
                    }}
                    title={`Remove ${cat.name} category`}
                  >
                    <X size={10} color="currentColor" />
                  </button>
                )}
              </div>
            );
          })}

          {/* Reset Categories if some were removed */}
          {activeCategories.length < 3 && (
            <button
              onClick={resetCategories}
              className="glass-panel"
              style={{
                padding: '0.35rem 0.65rem',
                borderRadius: 'var(--radius-xs)',
                cursor: 'pointer',
                fontSize: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
                color: 'var(--text-primary)',
                background: 'var(--glass-bg)'
              }}
              title="Restore all categories"
            >
              <RotateCcw size={12} color="currentColor" />
              <span>Restore Categories</span>
            </button>
          )}
        </div>

        {/* Results Counter & Sort */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            {totalResults} items found
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <ArrowUpDown size={13} color="currentColor" />
            <select
              className="glass-input"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: '0.35rem 0.65rem',
                fontSize: '0.78rem',
                borderRadius: 'var(--radius-xs)',
                width: 'auto',
                cursor: 'pointer'
              }}
            >
              <option value="featured">Featured Deals</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="newest">Newest Added</option>
            </select>
          </div>
        </div>
      </div>

      {/* Game Selector Chips */}
      <div 
        style={{ 
          display: 'flex', 
          gap: '0.4rem', 
          overflowX: 'auto', 
          paddingBottom: '0.4rem',
          marginBottom: '0.85rem',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none'
        }}
      >
        {GAMES_LIST.map((game) => {
          const isSelected = selectedGame === game.id;
          return (
            <button
              key={game.id}
              onClick={() => setSelectedGame(game.id)}
              className="glass-card"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.4rem 0.85rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.78rem',
                fontWeight: 500,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                background: isSelected ? 'var(--accent-gradient)' : 'var(--glass-card)',
                color: isSelected ? '#ffffff' : 'var(--text-primary)',
                borderColor: isSelected ? 'transparent' : 'var(--glass-border-subtle)',
                transition: 'all var(--transition-fast)'
              }}
            >
              <span>{game.name}</span>
            </button>
          );
        })}
      </div>

      {/* Advanced Filters: Platform & Dynamic Multi-Currency Price Slider */}
      <div 
        className="glass-panel"
        style={{
          padding: '0.6rem 1rem',
          borderRadius: 'var(--radius-sm)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.75rem',
          fontSize: '0.8rem'
        }}
      >
        {/* Platform Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <SlidersHorizontal size={14} color="currentColor" />
          <span style={{ color: 'var(--text-muted)' }}>Platform:</span>
          <select
            className="glass-input"
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
            style={{
              padding: '0.3rem 0.6rem',
              fontSize: '0.78rem',
              borderRadius: 'var(--radius-xs)',
              width: 'auto',
              cursor: 'pointer'
            }}
          >
            {PLATFORMS.map((plat) => (
              <option key={plat} value={plat}>
                {plat}
              </option>
            ))}
          </select>
        </div>

        {/* Dynamic Multi-Currency Max Price Slider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <span style={{ color: 'var(--text-muted)' }}>
            Max Price ({currency}): <strong style={{ color: 'var(--text-primary)', fontWeight: 700 }}>{formatPrice(priceRange, currency)}</strong>
          </span>
          <input
            type="range"
            min="10"
            max="600"
            step="10"
            value={priceRange}
            onChange={(e) => setPriceRange(Number(e.target.value))}
            style={{
              accentColor: 'var(--accent-primary)',
              cursor: 'pointer',
              width: '120px'
            }}
          />
        </div>

        {/* Reset Filter Button */}
        {(selectedGame !== 'all' || selectedCategory !== 'all' || selectedPlatform !== 'All Platforms' || priceRange < 600) && (
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedGame('all');
              setSelectedPlatform('All Platforms');
              setPriceRange(600);
            }}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--accent-primary)',
              fontSize: '0.75rem',
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            Reset Filters
          </button>
        )}
      </div>

    </div>
  );
}
