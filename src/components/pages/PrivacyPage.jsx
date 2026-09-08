import React from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  ShieldCheck, 
  Lock, 
  KeyRound, 
  EyeOff, 
  DatabaseZap, 
  ArrowLeft, 
  CheckCircle,
  FileCheck2,
  ServerOff
} from 'lucide-react';

export function PrivacyPage() {
  const { navigateTo } = useStore();

  return (
    <div style={{ padding: '1.5rem 0 3.5rem 0' }}>
      <div className="app-container" style={{ maxWidth: '860px' }}>
        
        {/* Navigation Back */}
        <button
          onClick={() => navigateTo('home')}
          className="glass-btn glass-btn-secondary"
          style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem', marginBottom: '1.25rem' }}
        >
          <ArrowLeft size={14} /> Back to Store
        </button>

        {/* Page Header */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', padding: '0.25rem 0.65rem', borderRadius: 'var(--radius-full)', background: '#eff6ff', color: '#0066ff', fontSize: '0.78rem', fontWeight: 700, marginBottom: '0.75rem' }}>
            <EyeOff size={14} /> Customer Security & Data Confidentiality Charter
          </div>
          <h1 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
            Privacy & <span style={{ color: '#0066ff' }}>Account Protection Policy</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
            At WRG Store, safeguarding customer confidentiality is paramount. This policy provides our formal guarantee against data leaks, unauthorized sharing, and credential mishandling during Call of Duty: Mobile account handovers and in-game top-ups.
          </p>
        </div>

        {/* Security Shield Banner */}
        <div 
          className="glass-panel"
          style={{
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
            color: '#ffffff',
            borderRadius: 'var(--radius-md)',
            padding: '1.5rem',
            marginBottom: '2rem',
            boxShadow: '0 8px 24px rgba(15, 23, 42, 0.15)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: 'var(--radius-sm)', background: '#0066ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShieldCheck size={22} color="#ffffff" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, margin: 0, color: '#ffffff' }}>
                Zero-Leak Guarantee: Social & In-Game Accounts
              </h3>
              <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                Strict non-disclosure compliance enforced on all 3 verified vendors
              </span>
            </div>
          </div>
          <p style={{ fontSize: '0.86rem', color: '#cbd5e1', margin: 0, lineHeight: 1.6 }}>
            Any personal email, phone number, CODM Player UID, or linked account data (Facebook, Apple ID, Google Play, Activision) shared with WRG Store or our representatives (RetiredTT, Rex, GR 007) is protected by our zero-leak commitment. Under no circumstances is customer data sold, leased, or transmitted to outside third parties.
          </p>
        </div>

        {/* Policy Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          
          {/* Item 1 */}
          <div className="glass-card" style={{ padding: '1.5rem', borderRadius: 'var(--radius-md)', background: '#ffffff' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <KeyRound size={18} color="#0066ff" />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                1. What Information We Receive and How It Is Used
              </h3>
            </div>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '0.75rem' }}>
              Depending on the service you request, only minimal required data is gathered:
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '1rem', marginTop: '0.5rem' }}>
              <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: 'var(--radius-sm)', border: '1px solid var(--glass-border-subtle)' }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                  For In-Game Currencies (COD Points)
                </h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                  <strong>Only your CODM UID & Zone</strong> are required for direct server top-up by Rex or GR 007. We never ask for your game password or social login credentials for currency top-ups.
                </p>
              </div>

              <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: 'var(--radius-sm)', border: '1px solid var(--glass-border-subtle)' }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                  For Account Handover Transfers
                </h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                  When purchasing an account, credentials are exchanged in a private 1-on-1 WhatsApp escrow session. The presiding vendor (RetiredTT, Rex, or GR 007) guides you through email unlinking and immediate password reset.
                </p>
              </div>
            </div>
          </div>

          {/* Item 2 */}
          <div className="glass-card" style={{ padding: '1.5rem', borderRadius: 'var(--radius-md)', background: '#ffffff' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <ServerOff size={18} color="#0066ff" />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                2. No Cloud Storage of Authentication Secrets
              </h3>
            </div>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              WRG Store does not maintain a cloud database of customer passwords, tokens, or payment card details. Transactions are initiated on the website to generate clean invoice receipts, while the handover conversation occurs strictly through end-to-end encrypted direct channels.
            </p>
          </div>

          {/* Item 3 */}
          <div className="glass-card" style={{ padding: '1.5rem', borderRadius: 'var(--radius-md)', background: '#ffffff' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <DatabaseZap size={18} color="#0066ff" />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                3. Post-Delivery Session Scrubbing
              </h3>
            </div>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '0.5rem' }}>
              Once you confirm receipt of your account or COD Points:
            </p>
            <ul style={{ paddingLeft: '1.25rem', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.7, display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <li>Temporary verification screenshots and shared codes are immediately deleted from vendor devices.</li>
              <li>The vendor marks the account as <strong>Confirmed Sold</strong>, immediately unpublishing it from all public and admin catalogs.</li>
              <li>You receive written verification to enable two-factor authentication (2FA) and register your personal recovery email.</li>
            </ul>
          </div>

          {/* Item 4 */}
          <div className="glass-card" style={{ padding: '1.5rem', borderRadius: 'var(--radius-md)', background: '#ffffff' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <FileCheck2 size={18} color="#0066ff" />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                4. Vendor Penalties for Breach of Protocol
              </h3>
            </div>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Any vendor representative who mishandles, leaks, or attempts to reuse customer credentials faces immediate termination, permanent blacklist across all regional gaming marketplaces, and escrow liability forfeiture. WRG Store maintains a zero-tolerance policy against unauthorized data sharing.
            </p>
          </div>

        </div>

        {/* Bottom Callout */}
        <div style={{ marginTop: '2.5rem', textAlign: 'center', padding: '1.5rem', background: '#f8fafc', borderRadius: 'var(--radius-md)', border: '1px solid var(--glass-border-subtle)' }}>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            Need help or want to report a security inquiry?
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => navigateTo('terms')}
              className="glass-btn glass-btn-secondary"
              style={{ fontSize: '0.85rem' }}
            >
              View Terms of Service
            </button>
            <button
              onClick={() => navigateTo('accounts')}
              className="glass-btn glass-btn-primary"
              style={{ fontSize: '0.85rem' }}
            >
              Explore Verified Accounts
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
