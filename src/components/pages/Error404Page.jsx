import React from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../../context/StoreContext';
import { AlertCircle, Home, ShieldCheck, ArrowRight } from 'lucide-react';

export function Error404Page() {
  const { navigateTo } = useStore();

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
          border: '1px solid var(--glass-border)',
          boxShadow: 'var(--glass-shadow-md)'
        }}
      >
        <div style={{ fontSize: '4.5rem', fontWeight: 900, color: '#0066ff', lineHeight: 1, fontFamily: 'var(--font-mono)', marginBottom: '0.5rem' }}>
          404
        </div>

        <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.65rem' }}>
          Page or Listing Not Found
        </h1>

        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.55, marginBottom: '1.75rem' }}>
          The section or account listing you are looking for may have been transferred, sold, or moved by one of our administrators.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => navigateTo('home')}
            className="glass-btn glass-btn-primary"
          >
            <Home size={15} /> Return Home
          </button>

          <button
            onClick={() => navigateTo('accounts')}
            className="glass-btn glass-btn-secondary"
          >
            <ShieldCheck size={15} /> Browse Accounts
          </button>
        </div>
      </div>
    </motion.div>
  );
}
