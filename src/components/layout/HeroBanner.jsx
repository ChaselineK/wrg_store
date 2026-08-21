import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Zap, 
  MessageSquare, 
  Trophy, 
  Play, 
  Gamepad
} from 'lucide-react';
import { GlassButton } from '../ui/GlassButton';
import { useStore } from '../../context/StoreContext';
import { formatPrice } from '../../utils/currencyHelper';

export function HeroBanner({ onSelectCategory, onSelectGame }) {
  const { openCheckout, products, currency } = useStore();
  const featuredProduct = products.find(p => p.isHot) || products[0];
  const [isPlayingTrailer, setIsPlayingTrailer] = useState(false);

  return (
    <section style={{ padding: '1.75rem 0 1rem 0', position: 'relative' }}>
      <div className="app-container">
        
        {/* Main Hero Liquid Glass Card */}
        <div 
          className="glass-panel" 
          style={{ 
            padding: '2.5rem 2rem', 
            borderRadius: 'var(--radius-lg)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div 
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '50%',
              height: '100%',
              backgroundImage: 'radial-gradient(circle at 70% 30%, rgba(229,56,59,0.1) 0%, transparent 70%)',
              pointerEvents: 'none'
            }}
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', alignItems: 'center', position: 'relative', zIndex: 2 }}>
            
            {/* Left Column */}
            <div>
              
              <div 
                className="glass-badge" 
                style={{ marginBottom: '1rem', padding: '0.25rem 0.65rem' }}
              >
                <ShieldCheck size={13} color="currentColor" />
                <span>Verified Gaming Marketplace</span>
              </div>

              <h1 style={{ fontSize: 'clamp(1.85rem, 4vw, 2.85rem)', fontWeight: 800, lineHeight: 1.15, marginBottom: '0.85rem', letterSpacing: '-0.02em' }}>
                Level Up Your Game with <span className="serif-subheading" style={{ color: 'var(--accent-primary)', fontWeight: 400 }}>Verified</span> Accounts & Currency
              </h1>

              <p className="serif-subheading" style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1.5rem', maxWidth: '520px' }}>
                Full gameplay video verification, instant transfer warranty, and direct escrow contact via WhatsApp with our 3 verified representatives.
              </p>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <GlassButton
                  variant="primary"
                  size="md"
                  icon={Zap}
                  onClick={() => {
                    const catalog = document.getElementById('marketplace-catalog');
                    if (catalog) catalog.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Explore Catalog
                </GlassButton>

                <GlassButton
                  variant="secondary"
                  size="md"
                  icon={MessageSquare}
                  onClick={() => {
                    const adminSection = document.getElementById('verified-admins-section');
                    if (adminSection) adminSection.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Meet Our 3 Admins
                </GlassButton>
              </div>

              {/* Quick Game Tags */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Popular:</span>
                {['cod', 'valorant', 'fortnite', 'roblox', 'gta5'].map((gameId) => {
                  const names = { cod: 'Call of Duty', valorant: 'Valorant', fortnite: 'Fortnite', roblox: 'Roblox', gta5: 'GTA V' };
                  return (
                    <button
                      key={gameId}
                      onClick={() => onSelectGame(gameId)}
                      className="glass-btn glass-btn-secondary"
                      style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem', borderRadius: 'var(--radius-full)' }}
                    >
                      {names[gameId]}
                    </button>
                  );
                })}
              </div>

            </div>

            {/* Right Column: Media Showcase */}
            {featuredProduct && (
              <div style={{ width: '100%', maxWidth: '440px', justifySelf: 'center' }}>
                <div 
                  className="glass-card"
                  style={{
                    padding: '1.25rem',
                    border: '1px solid var(--glass-border)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                    <span className="glass-badge" style={{ fontSize: '0.7rem' }}>
                      Spotlight Listing
                    </span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Gamepad size={12} color="currentColor" /> Instant Delivery
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
                      background: '#000'
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
                            background: 'linear-gradient(to top, rgba(10,11,14,0.85) 0%, transparent 60%)',
                            display: 'flex',
                            alignItems: 'flex-end',
                            justifyContent: 'space-between',
                            padding: '0.75rem'
                          }}
                        >
                          <div>
                            <span style={{ fontSize: '0.7rem', color: '#ffffff', textTransform: 'uppercase', fontWeight: 600 }}>
                              {featuredProduct.gameName}
                            </span>
                            <div style={{ fontSize: '0.9rem', color: '#fff', fontWeight: 600 }}>
                              {featuredProduct.specs?.rank || 'Full Access'}
                            </div>
                          </div>

                          <button
                            onClick={() => setIsPlayingTrailer(true)}
                            className="glass-panel"
                            style={{
                              padding: '0.35rem 0.65rem',
                              borderRadius: 'var(--radius-full)',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.3rem',
                              color: '#fff',
                              background: 'rgba(0,0,0,0.65)',
                              border: '1px solid rgba(255,255,255,0.2)',
                              cursor: 'pointer',
                              fontSize: '0.72rem'
                            }}
                          >
                            <Play size={10} color="#fff" fill="#fff" /> Play Video
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

                  <h3 style={{ fontSize: '0.92rem', fontWeight: 600, marginBottom: '0.4rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {featuredProduct.title}
                  </h3>

                  {/* Multi-Currency Price Bar */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.75rem', paddingTop: '0.65rem', borderTop: '1px solid var(--glass-border-subtle)' }}>
                    <div>
                      <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', display: 'block' }}>Direct Price ({currency})</span>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.35rem' }}>
                        <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--accent-primary)', fontFamily: 'var(--font-heading)' }}>
                          {formatPrice(featuredProduct.price, currency)}
                        </span>
                      </div>
                    </div>

                    <GlassButton
                      variant="whatsapp"
                      size="sm"
                      icon={MessageSquare}
                      onClick={() => openCheckout(featuredProduct)}
                    >
                      Buy Now
                    </GlassButton>
                  </div>

                </div>
              </div>
            )}

          </div>

          {/* Bottom Metrics (Monochrome Icons) */}
          <div 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', 
              gap: '1rem', 
              marginTop: '2rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid var(--glass-border-subtle)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <ShieldCheck size={18} color="currentColor" />
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>100% Anti-Rollback</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Verified creation receipts</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Zap size={18} color="currentColor" />
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>Instant Handover</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Avg under 2 minutes</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <MessageSquare size={18} color="currentColor" />
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>3 Dedicated Admins</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Rex, RetiredonTT, GR 007</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Trophy size={18} color="currentColor" />
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>Multi-Currency Ready</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>USD, TZS, Naira (NGN)</div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
