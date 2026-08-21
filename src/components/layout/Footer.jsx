import React from 'react';
import { Gamepad2, ShieldCheck, MessageSquare } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export function Footer() {
  const { admins, resetToSampleData } = useStore();

  return (
    <footer 
      style={{
        marginTop: '3rem',
        borderTop: '1px solid var(--glass-border-subtle)',
        background: 'var(--glass-nav)',
        backdropFilter: 'blur(16px)',
        padding: '2.5rem 0 1.5rem 0',
        width: '100%',
        boxSizing: 'border-box'
      }}
    >
      <div className="app-container">
        
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem',
            width: '100%',
            boxSizing: 'border-box'
          }}
        >
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem' }}>
              <div 
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: 'var(--radius-xs)',
                  background: 'var(--accent-gradient)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff'
                }}
              >
                <Gamepad2 size={18} color="#ffffff" />
              </div>
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.1rem' }}>
                WRG <span className="text-gradient">STORE</span>
              </span>
            </div>

            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.55, marginBottom: '0.85rem' }}>
              Marketplace for high-tier gaming accounts and direct in-game currency. Multi-Admin WhatsApp escrow protection.
            </p>

            <span className="glass-badge glass-badge-emerald" style={{ fontSize: '0.72rem' }}>
              <ShieldCheck size={12} color="currentColor" /> Anti-Rollback Warranty
            </span>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 style={{ fontSize: '0.88rem', fontWeight: 600, marginBottom: '0.75rem' }}>
              Marketplace
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              <li><a href="#marketplace-catalog">Valorant Accounts</a></li>
              <li><a href="#marketplace-catalog">Fortnite Accounts</a></li>
              <li><a href="#marketplace-catalog">GTA V & FiveM</a></li>
              <li><a href="#marketplace-catalog">Roblox & Robux</a></li>
              <li><a href="#marketplace-catalog">Genshin Impact</a></li>
            </ul>
          </div>

          {/* Escrow Admins */}
          <div>
            <h4 style={{ fontSize: '0.88rem', fontWeight: 600, marginBottom: '0.75rem' }}>
              WhatsApp Escrow Team
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              {admins.map((adm) => (
                <li key={adm.id} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <MessageSquare size={11} color="currentColor" />
                  <span>{adm.name}</span>
                  <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>({adm.whatsapp})</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Guarantee & Reset */}
          <div>
            <h4 style={{ fontSize: '0.88rem', fontWeight: 600, marginBottom: '0.75rem' }}>
              Escrow Security
            </h4>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.45, marginBottom: '0.85rem' }}>
              Transactions are manually overseen by our verified administrators on WhatsApp to ensure account security.
            </p>

            <button
              onClick={resetToSampleData}
              style={{
                background: 'transparent',
                border: '1px dashed var(--glass-border)',
                padding: '0.35rem 0.7rem',
                borderRadius: 'var(--radius-xs)',
                fontSize: '0.72rem',
                color: 'var(--text-muted)',
                cursor: 'pointer'
              }}
            >
              Reset Sample Catalog
            </button>
          </div>

        </div>

        {/* Copyright */}
        <div 
          style={{
            borderTop: '1px solid var(--glass-border-subtle)',
            paddingTop: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            flexWrap: 'wrap',
            gap: '0.75rem'
          }}
        >
          <div>
            © 2026 WRG Store. All rights reserved.
          </div>

          <div>
            Liquid Glass Escrow Architecture
          </div>
        </div>

      </div>
    </footer>
  );
}
