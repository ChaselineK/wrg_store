import React from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../../context/StoreContext';
import { Users, ShieldCheck, MessageSquare, Clock, ArrowLeft, ArrowRight } from 'lucide-react';

export function VendorsPage() {
  const { admins, navigateTo } = useStore();

  const handleWhatsAppContact = (admin) => {
    const text = encodeURIComponent(
      `Hello ${admin.name}, I am contacting you from the WRG Store. I would like to inquire about your Call of Duty: Mobile listings.`
    );
    window.open(`https://wa.me/${admin.whatsapp.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
  };

  return (
    <div style={{ padding: '1.5rem 0 3.5rem 0' }}>
      <div className="app-container">
        
        {/* Page Header */}
        <div style={{ marginBottom: '2rem' }}>
          <button
            onClick={() => navigateTo('home')}
            className="glass-btn glass-btn-secondary"
            style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem', marginBottom: '0.85rem' }}
          >
            <ArrowLeft size={14} /> Back to Home
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: 'var(--radius-sm)', background: '#eff6ff', color: '#0066ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Users size={20} />
            </div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Verified <span style={{ color: '#0066ff' }}>Vendors & Administrators</span>
            </h1>
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
            Meet our 3 verified representatives. Orders and transfers are handled manually on WhatsApp with guaranteed &lt;1hr handover.
          </p>
        </div>

        {/* Vendors Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
          {admins.map((vendor) => {
            const isSuperAdmin = vendor.role === 'super_admin';

            return (
              <div
                key={vendor.id}
                className="glass-panel"
                style={{
                  padding: '1.5rem',
                  borderRadius: 'var(--radius-md)',
                  background: '#ffffff',
                  border: isSuperAdmin ? '2px solid #0066ff' : '1px solid var(--glass-border)',
                  boxShadow: 'var(--glass-shadow)',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative'
                }}
              >
                {/* Top Badge */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span
                    style={{
                      background: '#eff6ff',
                      color: '#0052cc',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      padding: '0.25rem 0.65rem',
                      borderRadius: 'var(--radius-full)',
                      border: '1px solid #bfdbfe'
                    }}
                  >
                    Verified Vendor
                  </span>

                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Clock size={12} /> {vendor.responseTime}
                  </span>
                </div>

                {/* Avatar & Name */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1rem' }}>
                  <img
                    src={vendor.avatar}
                    alt={vendor.name}
                    style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #0066ff' }}
                  />
                  <div>
                    <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                      {vendor.name}
                    </h2>
                    <div style={{ fontSize: '0.78rem', color: '#0066ff', fontWeight: 600 }}>
                      {vendor.specialty}
                    </div>
                  </div>
                </div>

                {/* Selling Scope Box */}
                <div 
                  style={{ 
                    padding: '0.75rem', 
                    borderRadius: 'var(--radius-xs)', 
                    background: 'var(--bg-tertiary)', 
                    fontSize: '0.8rem', 
                    marginBottom: '1rem',
                    border: '1px solid var(--glass-border-subtle)'
                  }}
                >
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.72rem', marginBottom: '0.15rem' }}>Listing Scope:</div>
                  <strong style={{ color: 'var(--text-primary)' }}>{vendor.sellsDescription}</strong>
                </div>

                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.55, marginBottom: '1.25rem', flex: 1 }}>
                  {vendor.bio}
                </p>

                {/* Direct WhatsApp Action Button */}
                <button
                  onClick={() => handleWhatsAppContact(vendor)}
                  className="glass-btn glass-btn-whatsapp"
                  style={{ width: '100%', padding: '0.65rem', fontSize: '0.88rem' }}
                >
                  <MessageSquare size={16} /> WhatsApp ({vendor.whatsapp})
                </button>
              </div>
            );
          })}
        </div>

        {/* Call of Duty Mobile Catalog Shortcut */}
        <div 
          className="glass-panel"
          style={{
            padding: '1.75rem',
            borderRadius: 'var(--radius-md)',
            background: '#eff6ff',
            border: '1px solid #bfdbfe',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem'
          }}
        >
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0052cc', marginBottom: '0.25rem' }}>
              Ready to view listings from our vendors?
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Check out all available Call of Duty: Mobile accounts and direct COD Points currency packs.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.6rem' }}>
            <button
              onClick={() => navigateTo('accounts')}
              className="glass-btn glass-btn-primary"
            >
              Account listings <ArrowRight size={14} />
            </button>
            <button
              onClick={() => navigateTo('currency')}
              className="glass-btn glass-btn-secondary"
            >
              In-game currencies <ArrowRight size={14} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
