import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../../context/StoreContext';
import { ServerCrash, RefreshCw, Home, MessageSquare } from 'lucide-react';

export function Error500Page() {
  const { navigateTo, admins } = useStore();
  const [isRetrying, setIsRetrying] = useState(false);

  const handleRetry = () => {
    setIsRetrying(true);
    setTimeout(() => {
      setIsRetrying(false);
      navigateTo('home');
    }, 800);
  };

  const handleContactSuperAdmin = () => {
    const superAdmin = admins.find((a) => a.role === 'super_admin') || admins[0];
    const text = encodeURIComponent('Hello RetiredTT, I experienced a 500 server error while accessing WRG Store.');
    window.open(`https://wa.me/${superAdmin.whatsapp.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.1 }}
      style={{ padding: '4rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <div 
        className="glass-panel"
        style={{
          maxWidth: '540px',
          width: '100%',
          padding: '2.5rem',
          textAlign: 'center',
          background: '#ffffff',
          borderRadius: 'var(--radius-lg)',
          border: '1.5px solid #f87171',
          boxShadow: 'var(--glass-shadow-md)'
        }}
      >
        <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#fef2f2', color: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
          <ServerCrash size={28} />
        </div>

        <div style={{ fontSize: '3rem', fontWeight: 900, color: '#dc2626', lineHeight: 1, fontFamily: 'var(--font-mono)', marginBottom: '0.5rem' }}>
          500
        </div>

        <h1 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.65rem' }}>
          Internal Server Error
        </h1>

        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.55, marginBottom: '1.75rem' }}>
          Our backend dispatch services encountered an unexpected error. Our system administrators have been notified. Please retry or contact RetiredTT on WhatsApp.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button
            onClick={handleRetry}
            disabled={isRetrying}
            className="glass-btn glass-btn-primary"
            style={{ background: isRetrying ? '#94a3b8' : '#0066ff' }}
          >
            <RefreshCw size={14} className={isRetrying ? 'animate-spin' : ''} />
            <span>{isRetrying ? 'Connecting...' : 'Retry Connection'}</span>
          </button>

          <button
            onClick={handleContactSuperAdmin}
            className="glass-btn glass-btn-whatsapp"
          >
            <MessageSquare size={14} /> Report to RetiredTT
          </button>

          <button
            onClick={() => navigateTo('home')}
            className="glass-btn glass-btn-secondary"
          >
            <Home size={14} /> Home
          </button>
        </div>
      </div>
    </motion.div>
  );
}
