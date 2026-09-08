import React, { useState } from 'react';
import { 
  ShieldCheck, 
  MessageSquare, 
  Play, 
  ShoppingCart,
  Coins,
  ChevronRight
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { formatPrice } from '../../utils/currencyHelper';

export function HeroBanner() {
  const { products, currency, navigateTo, addToCart } = useStore();
  const featuredProduct = products.find((p) => p.isHot) || products[0];
  const [isPlayingTrailer, setIsPlayingTrailer] = useState(false);

  return (
    <section style={{ padding: '1.25rem 0 1rem 0', position: 'relative', width: '100%', boxSizing: 'border-box' }}>
      <div className="app-container">
        
        {/* Main Hero Card - Clean White & Royal Blue Style */}
        <div 
          className="glass-panel" 
          style={{ 
            padding: 'clamp(1.5rem, 3.5vw, 2.5rem)', 
            borderRadius: 'var(--radius-lg)',
            position: 'relative',
            width: '100%',
            boxSizing: 'border-box',
            background: '#ffffff',
            border: '1px solid var(--glass-border-subtle)',
            boxShadow: 'var(--glass-shadow-md)'
          }}
        >
          <div 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', 
              gap: '2rem', 
              alignItems: 'center', 
              width: '100%', 
              boxSizing: 'border-box' 
            }}
          >
            
            {/* Left Column: Heading & Clean CTAs */}
            <div>
              <div 
                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '0.4rem', 
                  padding: '0.25rem 0.65rem', 
                  borderRadius: 'var(--radius-full)', 
                  background: '#eff6ff', 
                  color: '#0066ff', 
                  fontSize: '0.78rem', 
                  fontWeight: 700, 
                  marginBottom: '1rem',
                  border: '1px solid #bfdbfe'
                }}
              >
                <ShieldCheck size={14} />
                <span>Call of Duty: Mobile Store</span>
              </div>

              <h1 
                style={{ 
                  fontSize: 'clamp(1.8rem, 3.8vw, 2.85rem)', 
                  fontWeight: 800, 
                  lineHeight: 1.18, 
                  marginBottom: '0.85rem', 
                  letterSpacing: '-0.025em',
                  color: 'var(--text-primary)'
                }}
              >
                Verified <span style={{ color: '#0066ff' }}>CODM</span> Accounts & Direct Points
              </h1>

              <p 
                style={{ 
                  fontSize: 'clamp(0.95rem, 1.8vw, 1.05rem)', 
                  color: 'var(--text-secondary)', 
                  lineHeight: 1.55, 
                  marginBottom: '1.5rem', 
                  maxWidth: '520px' 
                }}
              >
                Browse verified Mythic and Legendary Call of Duty: Mobile accounts or reload your COD Points directly with our 3 verified representatives on WhatsApp.
              </p>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <button
                  className="glass-btn glass-btn-primary"
                  onClick={() => navigateTo('accounts')}
                  style={{ fontSize: '0.92rem', padding: '0.7rem 1.4rem' }}
                >
                  <ShieldCheck size={16} />
                  <span>Explore Accounts</span>
                </button>

                <button
                  className="glass-btn glass-btn-secondary"
                  onClick={() => navigateTo('currency')}
                  style={{ fontSize: '0.92rem', padding: '0.7rem 1.4rem' }}
                >
                  <Coins size={16} />
                  <span>In-Game Currencies</span>
                </button>
              </div>

            </div>

            {/* Right Column: Hot Deal Card */}
            {featuredProduct && (
              <div style={{ width: '100%', maxWidth: '420px', justifySelf: 'center', boxSizing: 'border-box' }}>
                <div 
                  className="glass-card"
                  style={{
                    padding: '1.25rem',
                    border: '1px solid var(--glass-border)',
                    width: '100%',
                    boxSizing: 'border-box',
                    background: '#ffffff'
                  }}
                >
                  {/* Top Bar with "Hot deal! 🔥" strictly as requested */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <span 
                      style={{ 
                        fontSize: '0.75rem', 
                        fontWeight: 700, 
                        color: '#0066ff', 
                        background: '#eff6ff', 
                        padding: '0.2rem 0.6rem', 
                        borderRadius: 'var(--radius-full)',
                        border: '1px solid #bfdbfe',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.25rem'
                      }}
                    >
                      Hot deal! 🔥
                    </span>

                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      Handover: &lt;1hr
                    </span>
                  </div>

                  {/* Media Showcase Container */}
                  <div 
                    style={{ 
                      position: 'relative', 
                      borderRadius: 'var(--radius-sm)', 
                      overflow: 'hidden', 
                      height: '190px', 
                      marginBottom: '0.85rem',
                      background: '#0f172a',
                      width: '100%'
                    }}
                  >
                    {!isPlayingTrailer ? (
                      <>
                        <img
                          src={featuredProduct.images[0]}
                          alt={featuredProduct.title}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        <div 
                          style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(to top, rgba(15,23,42,0.85) 0%, transparent 60%)',
                            display: 'flex',
                            alignItems: 'flex-end',
                            justifyContent: 'space-between',
                            padding: '0.75rem'
                          }}
                        >
                          <div>
                            <span style={{ fontSize: '0.7rem', color: '#ffffff', textTransform: 'uppercase', fontWeight: 700 }}>
                              {featuredProduct.gameName}
                            </span>
                            <div style={{ fontSize: '0.88rem', color: '#ffffff', fontWeight: 600 }}>
                              {featuredProduct.specs?.rank || 'Verified Listing'}
                            </div>
                          </div>

                          <button
                            onClick={() => setIsPlayingTrailer(true)}
                            style={{
                              padding: '0.35rem 0.65rem',
                              borderRadius: 'var(--radius-full)',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.3rem',
                              color: '#ffffff',
                              background: 'rgba(0, 102, 255, 0.9)',
                              border: 'none',
                              cursor: 'pointer',
                              fontSize: '0.72rem',
                              fontWeight: 600
                            }}
                          >
                            <Play size={10} fill="#fff" /> Play Video
                          </button>
                        </div>
                      </>
                    ) : (
                      <video
                        src={featuredProduct.videoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'}
                        autoPlay
                        loop
                        controls
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    )}
                  </div>

                  <h3 
                    style={{ 
                      fontSize: '0.92rem', 
                      fontWeight: 700, 
                      marginBottom: '0.4rem', 
                      color: 'var(--text-primary)',
                      whiteSpace: 'nowrap', 
                      overflow: 'hidden', 
                      textOverflow: 'ellipsis',
                      cursor: 'pointer'
                    }}
                    onClick={() => navigateTo('product-detail', featuredProduct)}
                  >
                    {featuredProduct.title}
                  </h3>

                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.65rem' }}>
                    Posted by: <strong style={{ color: '#0066ff' }}>{featuredProduct.vendorName}</strong>
                  </div>

                  {/* Price & Add to Cart Bar */}
                  <div 
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'space-between', 
                      paddingTop: '0.65rem', 
                      borderTop: '1px solid var(--glass-border-subtle)', 
                      gap: '0.5rem' 
                    }}
                  >
                    <div>
                      <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', display: 'block' }}>Direct Price</span>
                      <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0066ff', fontFamily: 'var(--font-mono)' }}>
                        {formatPrice(featuredProduct.price, currency)}
                      </span>
                    </div>

                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                      <button
                        className="glass-btn glass-btn-primary"
                        style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem' }}
                        onClick={() => addToCart(featuredProduct)}
                      >
                        <ShoppingCart size={14} /> Add to Cart
                      </button>

                      <button
                        className="glass-btn glass-btn-secondary"
                        style={{ padding: '0.45rem 0.65rem', fontSize: '0.8rem' }}
                        onClick={() => navigateTo('product-detail', featuredProduct)}
                      >
                        View
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            )}

          </div>

          {/* Bottom Metrics Bar (Removing 100% Anti-Rollback & keeping clean <1hr handover & 3 admins) */}
          <div 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))', 
              gap: '1rem', 
              marginTop: '1.75rem',
              paddingTop: '1.25rem',
              borderTop: '1px solid var(--glass-border-subtle)',
              width: '100%',
              boxSizing: 'border-box'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: 'var(--radius-xs)', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0066ff' }}>
                <ShieldCheck size={18} />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-primary)' }}>Order Handover</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>&lt;1hr Handover</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: 'var(--radius-xs)', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0066ff' }}>
                <MessageSquare size={18} />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-primary)' }}>3 Verified Vendors</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>RetiredTT, Rex, GR 007</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: 'var(--radius-xs)', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0066ff' }}>
                <Coins size={18} />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-primary)' }}>Supported Currencies</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>USD, TZS, NGN</div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
