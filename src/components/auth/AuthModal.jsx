import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Lock, 
  User, 
  ArrowRight, 
  Gamepad2, 
  Eye, 
  EyeOff, 
  Zap, 
  Globe
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { GlassButton } from '../ui/GlassButton';

export function AuthModal() {
  const { 
    isAuthModalOpen, 
    setIsAuthModalOpen, 
    loginWithCredentials, 
    registerUser, 
    continueAsGuest 
  } = useStore();

  const [isRegisterView, setIsRegisterView] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Mouse tracking state for ambient background spotlight and left/right side depth
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [activeSide, setActiveSide] = useState(null); // 'left' | 'right' | null

  // Login form state
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register form state
  const [regUsername, setRegUsername] = useState('');
  const [regDisplayName, setRegDisplayName] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');

  if (!isAuthModalOpen) return null;

  const handleGlobalMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = Math.round((clientX / innerWidth) * 100);
    const y = Math.round((clientY / innerHeight) * 100);
    setMousePos({ x, y });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (!loginUsername.trim() || !loginPassword) {
      setErrorMessage('Please provide both username and password.');
      return;
    }

    const res = loginWithCredentials(loginUsername, loginPassword);
    if (!res.success) {
      setErrorMessage(res.message);
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!regUsername.trim() || !regPassword) {
      setErrorMessage('Please fill out all required fields.');
      return;
    }

    if (regPassword !== regConfirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    const res = registerUser(regUsername, regPassword, regDisplayName);
    if (!res.success) {
      setErrorMessage(res.message);
    }
  };

  return (
    <div 
      className="animate-fade-in"
      onMouseMove={handleGlobalMouseMove}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 9999,
        background: 'var(--bg-main)',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch'
      }}
    >
      {/* Interactive Cursor Spotlight Glow */}
      <div 
        style={{
          position: 'fixed',
          inset: 0,
          background: `radial-gradient(700px circle at ${mousePos.x}% ${mousePos.y}%, rgba(229, 56, 59, 0.16), transparent 70%)`,
          pointerEvents: 'none',
          zIndex: 1,
          transition: 'background 0.15s ease'
        }}
      />

      {/* Floating Exit Button in Top Right */}
      <button
        onClick={() => setIsAuthModalOpen(false)}
        className="glass-panel"
        style={{
          position: 'fixed',
          top: '1.25rem',
          right: '1.25rem',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: 'var(--text-primary)',
          zIndex: 10000,
          background: 'var(--glass-bg-hover)',
          border: '1px solid var(--glass-border-hover)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
          transition: 'transform 0.25s ease, background 0.25s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1) rotate(90deg)';
          e.currentTarget.style.background = 'var(--accent-primary)';
          e.currentTarget.style.color = '#fff';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
          e.currentTarget.style.background = 'var(--glass-bg-hover)';
          e.currentTarget.style.color = 'var(--text-primary)';
        }}
        title="Exit to store"
      >
        <X size={18} />
      </button>

      {/* LEFT SIDE: Visual Showcase (Smooth side glow without inner card hovering) */}
      <div 
        onMouseEnter={() => setActiveSide('left')}
        onMouseLeave={() => setActiveSide(null)}
        style={{
          height: '100%',
          minHeight: '100vh',
          background: activeSide === 'left'
            ? 'linear-gradient(145deg, rgba(200, 29, 32, 0.98) 0%, rgba(12, 14, 18, 0.99) 100%)'
            : 'linear-gradient(145deg, rgba(186, 24, 27, 0.96) 0%, rgba(10, 11, 14, 0.98) 100%)',
          padding: 'clamp(1.5rem, 3vw, 2.5rem) clamp(1.5rem, 3.5vw, 3rem)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
          overflowY: 'auto',
          boxSizing: 'border-box',
          color: '#ffffff',
          zIndex: 2,
          transition: 'background 0.35s ease'
        }}
      >
        <div style={{ maxWidth: '480px', width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          
          {/* Brand Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', width: 'fit-content' }}>
            <div 
              style={{
                width: '40px',
                height: '40px',
                borderRadius: 'var(--radius-xs)',
                background: '#ffffff',
                color: 'var(--accent-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 16px rgba(0,0,0,0.35)'
              }}
            >
              <Gamepad2 size={24} />
            </div>
            <div>
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.35rem', letterSpacing: '-0.02em', display: 'block' }}>
                WRG STORE
              </span>
              <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.75)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Verified Gaming Accounts & Escrow
              </span>
            </div>
          </div>

          {/* Title & Tagline */}
          <div>
            <h1 style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.1rem)', fontWeight: 800, lineHeight: 1.2, marginBottom: '0.4rem' }}>
              {isRegisterView ? 'Create Your Account' : 'Welcome to WRG Store'}
            </h1>

            <p className="serif-subheading" style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.9)', lineHeight: 1.4, margin: 0 }}>
              Verified gaming accounts, in-game currency top-ups, and direct WhatsApp contact with our 3 verified representatives.
            </p>
          </div>

          {/* Benefit Items (No card hovering) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            
            {/* Item 1: Anti-Rollback */}
            <div 
              style={{
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-sm)',
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.22)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}
            >
              <div 
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <ShieldCheck size={20} color="#fff" />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.88rem' }}>100% Anti-Rollback Security</div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.8)' }}>Full email domain handover and lifetime warranty</div>
              </div>
            </div>

            {/* Item 2: 3 Admins */}
            <div 
              style={{
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-sm)',
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.22)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}
            >
              <div 
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <Zap size={20} color="#fff" />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.88rem' }}>3 Dedicated WhatsApp Admins</div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.8)' }}>Richkid Rex (+255740866470), RetiredonTT & GR 007</div>
              </div>
            </div>

            {/* Item 3: Multi-Currency */}
            <div 
              style={{
                padding: '0.65rem 1rem',
                borderRadius: 'var(--radius-sm)',
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.18)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Globe size={16} color="#fff" />
                <span style={{ fontSize: '0.78rem', fontWeight: 600 }}>Multi-Currency Pricing</span>
              </div>
              <div style={{ display: 'flex', gap: '0.3rem' }}>
                <span className="glass-badge" style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', fontSize: '0.68rem', padding: '0.15rem 0.4rem' }}>USD ($)</span>
                <span className="glass-badge" style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', fontSize: '0.68rem', padding: '0.15rem 0.4rem' }}>TZS</span>
                <span className="glass-badge" style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', fontSize: '0.68rem', padding: '0.15rem 0.4rem' }}>NGN (₦)</span>
              </div>
            </div>

          </div>

          {/* Integrated Compact Guest Action Banner */}
          <div 
            style={{ 
              marginTop: '0.5rem', 
              paddingTop: '0.75rem', 
              borderTop: '1px solid rgba(255,255,255,0.18)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '0.75rem',
              flexWrap: 'wrap'
            }}
          >
            <div>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, display: 'block' }}>
                Want to browse listings first?
              </span>
              <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.75)' }}>
                Explore preview accounts in guest mode
              </span>
            </div>

            <button
              onClick={continueAsGuest}
              style={{
                background: 'rgba(255,255,255,0.2)',
                border: '1px solid rgba(255,255,255,0.45)',
                color: '#ffffff',
                padding: '0.5rem 1.1rem',
                borderRadius: 'var(--radius-xs)',
                cursor: 'pointer',
                fontSize: '0.82rem',
                fontWeight: 700,
                transition: 'background 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#ffffff';
                e.currentTarget.style.color = 'var(--accent-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
                e.currentTarget.style.color = '#ffffff';
              }}
            >
              <span>Visit as Guest</span>
              <ArrowRight size={14} />
            </button>
          </div>

        </div>
      </div>

      {/* RIGHT SIDE: Sliding Sign In / Register Portal (Clean, Static Form Card) */}
      <div 
        onMouseEnter={() => setActiveSide('right')}
        onMouseLeave={() => setActiveSide(null)}
        style={{
          height: '100%',
          minHeight: '100vh',
          background: activeSide === 'right' ? 'var(--glass-bg-hover)' : 'var(--glass-modal)',
          padding: 'clamp(1.5rem, 3vw, 2.5rem) clamp(1.5rem, 3.5vw, 3rem)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
          overflowY: 'auto',
          boxSizing: 'border-box',
          zIndex: 2,
          transition: 'background 0.35s ease'
        }}
      >
        {/* Form Container (Hover effect completely removed) */}
        <div 
          style={{ 
            maxWidth: '420px', 
            width: '100%', 
            margin: '0 auto',
            padding: '2rem',
            borderRadius: 'var(--radius-lg)',
            background: 'var(--glass-card)',
            border: '1px solid var(--glass-border-subtle)',
            boxShadow: 'var(--glass-shadow-lg)'
          }}
        >
          
          {/* Sliding Tabs Switcher */}
          <div 
            className="glass-panel"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              padding: '0.25rem',
              borderRadius: 'var(--radius-sm)',
              marginBottom: '1.5rem',
              border: '1px solid var(--glass-border-subtle)'
            }}
          >
            <button
              type="button"
              onClick={() => {
                setIsRegisterView(false);
                setErrorMessage('');
              }}
              style={{
                padding: '0.6rem',
                borderRadius: 'var(--radius-xs)',
                border: 'none',
                background: !isRegisterView ? 'var(--accent-gradient)' : 'transparent',
                color: !isRegisterView ? '#fff' : 'var(--text-secondary)',
                cursor: 'pointer',
                fontSize: '0.88rem',
                fontWeight: 700,
                transition: 'all 0.25s ease'
              }}
            >
              Sign In
            </button>

            <button
              type="button"
              onClick={() => {
                setIsRegisterView(true);
                setErrorMessage('');
              }}
              style={{
                padding: '0.6rem',
                borderRadius: 'var(--radius-xs)',
                border: 'none',
                background: isRegisterView ? 'var(--accent-gradient)' : 'transparent',
                color: isRegisterView ? '#fff' : 'var(--text-secondary)',
                cursor: 'pointer',
                fontSize: '0.88rem',
                fontWeight: 700,
                transition: 'all 0.25s ease'
              }}
            >
              Register
            </button>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div 
              style={{
                padding: '0.65rem 0.85rem',
                background: 'rgba(220, 38, 38, 0.12)',
                border: '1px solid rgba(220, 38, 38, 0.35)',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--accent-primary)',
                fontSize: '0.8rem',
                marginBottom: '1rem',
                fontWeight: 600
              }}
            >
              {errorMessage}
            </div>
          )}

          {/* Sign In Form */}
          {!isRegisterView ? (
            <form onSubmit={handleLogin} className="animate-slide-right" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--text-secondary)' }}>
                  Username
                </label>
                <input
                  type="text"
                  required
                  className="glass-input"
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  style={{ height: '42px', fontSize: '0.9rem' }}
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.2rem' }}
                  >
                    {showPassword ? <EyeOff size={13} /> : <Eye size={13} />}
                    <span>{showPassword ? 'Hide' : 'Show'}</span>
                  </button>
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="glass-input"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  style={{ height: '42px', fontSize: '0.9rem' }}
                />
              </div>

              <GlassButton
                type="submit"
                variant="primary"
                size="md"
                icon={ArrowRight}
                fullWidth
                style={{ marginTop: '0.35rem', height: '44px', fontSize: '0.92rem', fontWeight: 700 }}
              >
                Sign In to Marketplace
              </GlassButton>

              <div style={{ textAlign: 'center', marginTop: '0.75rem' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setIsRegisterView(true);
                      setErrorMessage('');
                    }}
                    style={{ background: 'transparent', border: 'none', color: 'var(--accent-primary)', cursor: 'pointer', fontWeight: 700, fontSize: '0.78rem' }}
                  >
                    Register now
                  </button>
                </span>
              </div>
            </form>
          ) : (
            /* Register Form */
            <form onSubmit={handleRegister} className="animate-slide-left" style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, marginBottom: '0.3rem', color: 'var(--text-secondary)' }}>
                  Choose Username
                </label>
                <input
                  type="text"
                  required
                  className="glass-input"
                  value={regUsername}
                  onChange={(e) => setRegUsername(e.target.value)}
                  style={{ height: '40px', fontSize: '0.88rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, marginBottom: '0.3rem', color: 'var(--text-secondary)' }}>
                  Display Name (Optional)
                </label>
                <input
                  type="text"
                  className="glass-input"
                  value={regDisplayName}
                  onChange={(e) => setRegDisplayName(e.target.value)}
                  style={{ height: '40px', fontSize: '0.88rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, marginBottom: '0.3rem', color: 'var(--text-secondary)' }}>
                  Password
                </label>
                <input
                  type="password"
                  required
                  className="glass-input"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  style={{ height: '40px', fontSize: '0.88rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, marginBottom: '0.3rem', color: 'var(--text-secondary)' }}>
                  Confirm Password
                </label>
                <input
                  type="password"
                  required
                  className="glass-input"
                  value={regConfirmPassword}
                  onChange={(e) => setRegConfirmPassword(e.target.value)}
                  style={{ height: '40px', fontSize: '0.88rem' }}
                />
              </div>

              <GlassButton
                type="submit"
                variant="primary"
                size="md"
                icon={ArrowRight}
                fullWidth
                style={{ marginTop: '0.35rem', height: '44px', fontSize: '0.92rem', fontWeight: 700 }}
              >
                Create Account & Enter
              </GlassButton>

              <div style={{ textAlign: 'center', marginTop: '0.65rem' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  Already registered?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setIsRegisterView(false);
                      setErrorMessage('');
                    }}
                    style={{ background: 'transparent', border: 'none', color: 'var(--accent-primary)', cursor: 'pointer', fontWeight: 700, fontSize: '0.78rem' }}
                  >
                    Sign In
                  </button>
                </span>
              </div>
            </form>
          )}

        </div>
      </div>

    </div>
  );
}
