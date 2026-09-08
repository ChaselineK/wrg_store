import React from 'react';
import { Gamepad2, ShieldCheck, MessageSquare, PhoneCall } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export function Footer() {
  const { admins, navigateTo, resetToSampleData } = useStore();

  return (
    <footer 
      style={{
        marginTop: '3.5rem',
        borderTop: '1px solid var(--glass-border-subtle)',
        background: 'var(--bg-secondary)',
        padding: '2.5rem 0 1.75rem 0',
        width: '100%',
        boxSizing: 'border-box'
      }}
    >
      <div className="app-container">
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
            gap: '2rem',
            marginBottom: '2rem',
            width: '100%',
            boxSizing: 'border-box'
          }}
        >
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <div 
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: 'var(--radius-xs)',
                  background: '#0066ff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff'
                }}
              >
                <Gamepad2 size={18} />
              </div>
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.15rem' }}>
                WRG <span style={{ color: '#0066ff' }}>STORE</span>
              </span>
            </div>

            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.55, marginBottom: '0.85rem' }}>
              Dedicated Call of Duty: Mobile marketplace for verified Mythic accounts and direct CP points credit via WhatsApp handover.
            </p>

            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', color: '#0066ff', fontWeight: 600 }}>
              <ShieldCheck size={14} /> Handover Window: &lt;1hr
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 style={{ fontSize: '0.88rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
              Categories
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              <li>
                <button 
                  onClick={() => navigateTo('accounts')} 
                  style={{ background: 'none', border: 'none', padding: 0, color: 'inherit', cursor: 'pointer', textAlign: 'left' }}
                >
                  Account listings (CODM)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('currency')} 
                  style={{ background: 'none', border: 'none', padding: 0, color: 'inherit', cursor: 'pointer', textAlign: 'left' }}
                >
                  In-game currencies (COD Points)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('vendors')} 
                  style={{ background: 'none', border: 'none', padding: 0, color: 'inherit', cursor: 'pointer', textAlign: 'left' }}
                >
                  Verified Vendors & Admins
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('cart')} 
                  style={{ background: 'none', border: 'none', padding: 0, color: 'inherit', cursor: 'pointer', textAlign: 'left' }}
                >
                  Shopping Cart & Checkout
                </button>
              </li>
            </ul>
          </div>

          {/* 3 Dedicated Vendors - No Roles Visible to Clients */}
          <div>
            <h4 style={{ fontSize: '0.88rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
              Verified Vendors
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              {admins.map((adm) => (
                <li key={adm.id} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <MessageSquare size={12} color="#0066ff" />
                  <strong style={{ color: 'var(--text-primary)' }}>{adm.name}</strong>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Assurance & Security */}
          <div>
            <h4 style={{ fontSize: '0.88rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
              Security & Policies
            </h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '0.75rem' }}>
              Zero-leak protection for customer in-game & social logins. Handover guaranteed &lt;1hr.
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              <li>
                <button 
                  onClick={() => navigateTo('terms')} 
                  style={{ background: 'none', border: 'none', padding: 0, color: '#0066ff', fontWeight: 600, cursor: 'pointer', textAlign: 'left' }}
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('privacy')} 
                  style={{ background: 'none', border: 'none', padding: 0, color: '#0066ff', fontWeight: 600, cursor: 'pointer', textAlign: 'left' }}
                >
                  Privacy & Account Security
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Links & Centered Copyright Notice */}
        <div 
          style={{
            borderTop: '1px solid var(--glass-border-subtle)',
            paddingTop: '1.25rem',
            textAlign: 'center',
            fontSize: '0.78rem',
            color: 'var(--text-muted)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button 
              onClick={() => navigateTo('terms')} 
              style={{ background: 'none', border: 'none', padding: 0, color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.78rem' }}
            >
              Terms & Conditions
            </button>
            <span>•</span>
            <button 
              onClick={() => navigateTo('privacy')} 
              style={{ background: 'none', border: 'none', padding: 0, color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.78rem' }}
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button 
              onClick={() => navigateTo('vendors')} 
              style={{ background: 'none', border: 'none', padding: 0, color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.78rem' }}
            >
              Verified Vendors
            </button>
          </div>
          <div>© 2026 WRG Store. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}
