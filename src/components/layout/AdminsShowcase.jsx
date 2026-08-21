import React from 'react';
import { 
  ShieldCheck, 
  MessageSquare, 
  Star, 
  Clock, 
  Plus
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { GlassButton } from '../ui/GlassButton';

export function AdminsShowcase() {
  const { admins, isAdmin, setIsAdminManagerOpen } = useStore();

  return (
    <section id="verified-admins-section" style={{ padding: '2.5rem 0 1.5rem 0', position: 'relative' }}>
      <div className="app-container">
        
        {/* Section Header */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <div className="glass-badge" style={{ marginBottom: '0.4rem' }}>
              <ShieldCheck size={12} color="currentColor" /> Escrow Representatives
            </div>
            <h2 style={{ fontSize: '1.65rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
              Verified <span className="text-gradient">WhatsApp Admins</span>
            </h2>
            <p className="serif-subheading" style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '0.2rem' }}>
              Choose from our 3 dedicated representatives for instant WhatsApp transfers.
            </p>
          </div>

          {isAdmin && (
            <GlassButton
              variant="secondary"
              size="sm"
              icon={Plus}
              onClick={() => setIsAdminManagerOpen(true)}
            >
              Manage Admins
            </GlassButton>
          )}
        </div>

        {/* Admins Grid */}
        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '1rem' 
          }}
        >
          {admins.map((admin) => (
            <div 
              key={admin.id}
              className="glass-card"
              style={{
                padding: '1.25rem',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                border: '1px solid var(--glass-border-subtle)'
              }}
            >
              {/* Top Row: Avatar & Status */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <div style={{ position: 'relative' }}>
                  <img
                    src={admin.avatar}
                    alt={admin.name}
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '1.5px solid var(--glass-border)'
                    }}
                  />
                  <span
                    className="badge-dot badge-dot-green"
                    style={{
                      position: 'absolute',
                      bottom: '1px',
                      right: '1px',
                      border: '2px solid var(--bg-main)'
                    }}
                  />
                </div>

                <div>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 600 }}>{admin.name}</h3>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                    {admin.role}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '1px' }}>
                    <Star size={11} color="currentColor" fill="currentColor" />
                    <strong>{admin.rating}</strong> ({admin.reviewsCount || 200}+ reviews)
                  </div>
                </div>
              </div>

              {/* Specialty & Bio */}
              <div style={{ marginBottom: '1rem', flex: 1 }}>
                <div 
                  className="glass-panel" 
                  style={{ 
                    padding: '0.45rem 0.65rem', 
                    borderRadius: 'var(--radius-xs)', 
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    color: 'var(--text-primary)',
                    background: 'var(--accent-gradient-soft)',
                    marginBottom: '0.5rem'
                  }}
                >
                  {admin.specialty}
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                  {admin.bio}
                </p>
              </div>

              {/* Status / Response Time */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.72rem', marginBottom: '0.75rem', borderTop: '1px solid var(--glass-border-subtle)', paddingTop: '0.6rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--text-secondary)' }}>
                  <Clock size={11} color="currentColor" /> {admin.responseTime}
                </span>
                <span style={{ color: 'var(--text-muted)' }}>
                  {admin.languages || 'English, Swahili'}
                </span>
              </div>

              {/* WhatsApp Direct Chat Button */}
              <a
                href={`https://wa.me/${admin.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${admin.name}, I am contacting you from WRG Store regarding an account purchase.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-btn glass-btn-whatsapp"
                style={{ padding: '0.55rem', fontSize: '0.8rem', width: '100%', textDecoration: 'none' }}
              >
                <MessageSquare size={14} color="#ffffff" />
                WhatsApp: {admin.whatsapp}
              </a>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
