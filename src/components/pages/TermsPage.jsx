import React from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  ShieldCheck, 
  FileText, 
  Lock, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowLeft, 
  Clock, 
  UserCheck,
  Scale
} from 'lucide-react';

export function TermsPage() {
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
            <Scale size={14} /> Official Customer Agreement & Security Charter
          </div>
          <h1 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
            Terms & <span style={{ color: '#0066ff' }}>Conditions</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
            Effective Date: January 1, 2026 | Last Updated: September 2026. These Terms govern all transactions, account handovers, and in-game currency deliveries conducted through WRG Store and its 3 verified vendor representatives.
          </p>
        </div>

        {/* Highlight Guarantee Box */}
        <div 
          className="glass-panel"
          style={{
            background: 'linear-gradient(135deg, #eff6ff 0%, #ffffff 100%)',
            border: '1.5px solid #0066ff',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem 1.5rem',
            marginBottom: '2rem',
            boxShadow: '0 4px 16px rgba(0, 102, 255, 0.08)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.45rem' }}>
            <ShieldCheck size={20} color="#0066ff" />
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0052cc', margin: 0 }}>
              Zero-Leak Escrow & Handover Guarantee
            </h3>
          </div>
          <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6 }}>
            All customer social logins (Facebook, Apple ID, Google) and game credentials (CODM UID, Activision ID) provided during purchase are strictly protected under end-to-end encryption protocols and non-disclosure obligations. Handover completion window is guaranteed at <strong>&lt;1 hour</strong>.
          </p>
        </div>

        {/* Section Blocks */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          
          {/* Section 1 */}
          <div className="glass-card" style={{ padding: '1.5rem', borderRadius: 'var(--radius-md)', background: '#ffffff' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <Lock size={18} color="#0066ff" />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                1. Protection of In-Game & Social Account Credentials
              </h3>
            </div>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '0.75rem' }}>
              WRG Store operates under a strict Zero-Leak covenant regarding customer data. When you submit your Call of Duty: Mobile UID, Activision credentials, or linked social media logins (Facebook, Apple ID, Google Play) for order fulfillment:
            </p>
            <ul style={{ paddingLeft: '1.25rem', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.7, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <li><strong>Temporary Purpose Only:</strong> Credentials are used exclusively for direct in-game currency dispatch or account handover.</li>
              <li><strong>Zero Persistent Storage:</strong> No customer passwords or sensitive authentication tokens are ever stored on public databases or shared with third parties.</li>
              <li><strong>Immediate Session Purge:</strong> Once verification is confirmed by the buyer, the session data is scrubbed and permanently cleared.</li>
              <li><strong>Mandatory Password Reset Guidance:</strong> Buyers of accounts are required to change linked emails and passwords immediately upon receiving credentials.</li>
            </ul>
          </div>

          {/* Section 2 */}
          <div className="glass-card" style={{ padding: '1.5rem', borderRadius: 'var(--radius-md)', background: '#ffffff' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <UserCheck size={18} color="#0066ff" />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                2. Verified Vendor Representatives & Accountability
              </h3>
            </div>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '0.75rem' }}>
              All transactions are strictly assigned to our 3 vetted marketplace representatives: <strong>RetiredTT</strong>, <strong>Rex</strong>, and <strong>GR 007</strong>.
            </p>
            <ul style={{ paddingLeft: '1.25rem', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.7, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <li><strong>RetiredTT</strong> specializes exclusively in verified Call of Duty: Mobile account handovers.</li>
              <li><strong>Rex</strong> and <strong>GR 007</strong> fulfill both account handovers and direct COD Points (CP) in-game currencies.</li>
              <li>Each representative is personally bonded by WRG Store’s security protocol. Any unauthorized disclosure of customer data results in immediate revocation and platform blacklisting.</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="glass-card" style={{ padding: '1.5rem', borderRadius: 'var(--radius-md)', background: '#ffffff' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <Clock size={18} color="#0066ff" />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                3. Guaranteed &lt;1 Hour Handover Window
              </h3>
            </div>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Upon receipt of payment confirmation and generating your digital invoice, our representative contacts you directly via WhatsApp within minutes. The full inspection, credentials transfer, or CP top-up verification will not exceed 1 hour. If unexpected game maintenance occurs, the representative remains in direct communication until resolved.
            </p>
          </div>

          {/* Section 4 */}
          <div className="glass-card" style={{ padding: '1.5rem', borderRadius: 'var(--radius-md)', background: '#ffffff' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <CheckCircle2 size={18} color="#0066ff" />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                4. Listing Delisting & "Confirm Sold" Policy
              </h3>
            </div>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              To protect customers against duplicate transactions, once an account is sold, the vendor immediately triggers <strong>Confirm Sold</strong>. This permanently removes the account from all public catalog listings, search indexes, and customer-facing pages across WRG Store.
            </p>
          </div>

          {/* Section 5 */}
          <div className="glass-card" style={{ padding: '1.5rem', borderRadius: 'var(--radius-md)', background: '#ffffff' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <AlertTriangle size={18} color="#0066ff" />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                5. Refunds & Dispute Resolution
              </h3>
            </div>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              If an account does not match the specifications displayed on WRG Store at the time of delivery, or if currency fails to reflect on the provided UID within the guaranteed window, the customer is entitled to a full replacement or prompt refund processed through the presiding vendor representative.
            </p>
          </div>

        </div>

        {/* Bottom Contact / Privacy CTA */}
        <div style={{ marginTop: '2.5rem', textAlign: 'center', padding: '1.5rem', background: '#f8fafc', borderRadius: 'var(--radius-md)', border: '1px solid var(--glass-border-subtle)' }}>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            Have questions about how your account credentials are kept secure?
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => navigateTo('privacy')}
              className="glass-btn glass-btn-primary"
              style={{ fontSize: '0.85rem' }}
            >
              Read Privacy Policy
            </button>
            <button
              onClick={() => navigateTo('vendors')}
              className="glass-btn glass-btn-secondary"
              style={{ fontSize: '0.85rem' }}
            >
              Contact Verified Representatives
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
