import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  ShieldCheck, 
  Gamepad2, 
  Lock, 
  Mail, 
  User, 
  Clock, 
  CheckCircle2, 
  Users, 
  AlertCircle, 
  Check, 
  Eye, 
  EyeOff, 
  ArrowRight,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { isValidEmail, isValidUsername, sanitizeInput } from '../../utils/security';
import { triggerErrorHaptic, triggerCheckoutHaptic } from '../../utils/haptics';

export function LoginPage() {
  const { 
    currentUser, 
    loginWithCredentials, 
    registerUser, 
    logout, 
    navigateTo 
  } = useStore();

  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [showPassword, setShowPassword] = useState(false);
  
  // Interactive horizontal hovering state across full page
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [hoverSide, setHoverSide] = useState(null); // 'left' | 'right' | null

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.min(Math.max(((e.clientX - rect.left) / rect.width) * 100, 0), 100);
    const y = Math.min(Math.max(((e.clientY - rect.top) / rect.height) * 100, 0), 100);
    setMousePos({ x, y });
    setHoverSide(x < 50 ? 'left' : 'right');
  };
  
  // Login fields (zero placeholders, strictly username & password)
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register fields (zero placeholders, gamer tag removed)
  const [regUsername, setRegUsername] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');

  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    const cleanUser = sanitizeInput(loginUsername.trim());
    if (!cleanUser) {
      triggerErrorHaptic();
      setError('Please enter your username.');
      return;
    }
    if (!loginPassword) {
      triggerErrorHaptic();
      setError('Please enter your password.');
      return;
    }

    const res = loginWithCredentials(cleanUser, loginPassword);
    if (!res.success) {
      triggerErrorHaptic();
      setError(res.message || 'Invalid username or password.');
      return;
    }

    triggerCheckoutHaptic();
    setSuccessMsg(`Welcome back, ${res.user.name}!`);
    const targetPage = (res.user.role === 'admin' || res.user.role === 'super_admin') ? 'admin' : 'home';
    setTimeout(() => {
      navigateTo(targetPage);
    }, 450);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setError('');

    const cleanUser = sanitizeInput(regUsername.trim());
    const cleanEmail = sanitizeInput(regEmail.trim());

    if (!isValidUsername(cleanUser)) {
      triggerErrorHaptic();
      setError('Username must be 3-24 characters (letters, numbers, underscores).');
      return;
    }

    if (!isValidEmail(cleanEmail)) {
      triggerErrorHaptic();
      setError('Please provide a valid email address.');
      return;
    }

    if (!regPassword || regPassword.length < 6) {
      triggerErrorHaptic();
      setError('Password must be at least 6 characters.');
      return;
    }

    if (regPassword !== regConfirmPassword) {
      triggerErrorHaptic();
      setError('Passwords do not match.');
      return;
    }

    const res = registerUser(cleanUser, cleanEmail, regPassword, cleanUser);
    if (!res.success) {
      triggerErrorHaptic();
      setError(res.message);
      return;
    }

    triggerCheckoutHaptic();
    setSuccessMsg('Account created successfully!');
    setTimeout(() => {
      navigateTo('home');
    }, 450);
  };

  // If already authenticated and visiting login
  if (!currentUser?.isGuest) {
    return (
      <div style={{ minHeight: '100vh', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem', background: '#f8fafc' }}>
        <div 
          className="glass-panel"
          style={{
            maxWidth: '460px',
            width: '100%',
            padding: '2rem',
            textAlign: 'center',
            background: '#ffffff',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--glass-border)',
            boxShadow: 'var(--glass-shadow-md)'
          }}
        >
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#eff6ff', color: '#0066ff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
            <User size={28} />
          </div>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
            Logged In as {currentUser.name}
          </h2>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            You have an active session in WRG Store.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <button 
              onClick={() => {
                const targetPage = (currentUser.role === 'admin' || currentUser.role === 'super_admin') ? 'admin' : 'home';
                navigateTo(targetPage);
              }} 
              className="glass-btn glass-btn-primary"
              style={{ width: '100%', padding: '0.75rem' }}
            >
              Continue to {isAdmin ? 'Vendor Dashboard' : 'Home'}
            </button>
            <button 
              onClick={() => {
                logout();
                navigateTo('home');
              }}
              style={{
                width: '100%',
                padding: '0.65rem',
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: 'var(--radius-sm)',
                color: '#0f172a',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHoverSide(null)}
      style={{ 
        minHeight: '100vh', 
        width: '100%',
        overflowY: 'auto',
        position: 'relative',
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 450px), 1fr))',
        background: '#f8fafc',
        boxSizing: 'border-box'
      }}
    >
      
      {/* ------------------------------------------------------------------ */}
      {/* HORIZONTAL INTERACTIVE HOVERING EFFECTS ACROSS THE WHOLE PAGE       */}
      {/* ------------------------------------------------------------------ */}
      {/* Whole-page ambient radial spotlight tracking cursor horizontally */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 2,
          background: `radial-gradient(850px circle at ${mousePos.x}% ${mousePos.y}%, rgba(0, 102, 255, 0.08), transparent 70%)`,
          transition: 'background 0.08s ease-out'
        }}
      />

      {/* Horizontal laser/energy tracer tracking cursor X across the screen */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: `linear-gradient(90deg, transparent 0%, transparent ${Math.max(0, mousePos.x - 20)}%, #0066ff ${mousePos.x}%, #93c5fd ${Math.min(100, mousePos.x + 4)}%, transparent ${Math.min(100, mousePos.x + 20)}%, transparent 100%)`,
          pointerEvents: 'none',
          zIndex: 20,
          transition: 'background 0.06s ease-out'
        }}
      />
      
      {/* ------------------------------------------------------------------ */}
      {/* PART 1: LEFT SHOWCASE (Royal Blue & Deep Navy Branding)            */}
      {/* ------------------------------------------------------------------ */}
      <div 
        onMouseEnter={() => setHoverSide('left')}
        style={{
          background: `linear-gradient(${140 + (mousePos.x - 25) * 0.25}deg, #0052cc 0%, #003d99 50%, #0f172a 100%)`,
          color: '#ffffff',
          padding: 'clamp(2rem, 4vw, 3.5rem) clamp(1.5rem, 4vw, 3.5rem)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          boxSizing: 'border-box',
          position: 'relative',
          overflowY: 'auto',
          transition: 'background 0.3s ease'
        }}
      >
        {/* Dynamic horizontal sheen responding to arrow position */}
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            opacity: hoverSide === 'left' ? 0.35 : 0.15,
            background: `radial-gradient(circle at ${mousePos.x * 2}% ${mousePos.y}%, rgba(147, 197, 253, 0.35) 0%, transparent 65%)`,
            transition: 'opacity 0.3s ease'
          }}
        />

        <div style={{ maxWidth: '480px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 3 }}>
          
          {/* Brand Emblem - Center Top (Aligned on same horizontal level) */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '1.75rem' }}>
            <div 
              style={{
                width: '46px',
                height: '46px',
                borderRadius: 'var(--radius-sm)',
                background: '#ffffff',
                color: '#0066ff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.25)',
                flexShrink: 0
              }}
            >
              <Gamepad2 size={28} />
            </div>
            <div>
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.45rem', letterSpacing: '-0.02em', display: 'block', color: '#ffffff' }}>
                WRG <span style={{ color: '#93c5fd' }}>STORE</span>
              </span>
              <span style={{ fontSize: '0.72rem', color: '#e0f2fe', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600 }}>
                Your Verified Marketplace
              </span>
            </div>
          </div>

          {/* Main Showcase Title */}
          <h1 style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.5rem)', fontWeight: 800, lineHeight: 1.2, marginBottom: '0.75rem', color: '#ffffff' }}>
            {mode === 'login' ? 'Welcome to WRG Store' : 'Create Your Account'}
          </h1>
          <p style={{ fontSize: '0.96rem', color: '#cbd5e1', lineHeight: 1.6, marginBottom: '2.25rem' }}>
            Verified Call of Duty: Mobile accounts, COD Points top-ups, and direct WhatsApp handover with our trusted vendors.
          </p>

          {/* Interactive Feature Cards with Smooth Hover Effects */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            
            {/* Feature Card 1 */}
            <div 
              className="login-feature-card"
              style={{
                padding: '0.95rem 1.25rem',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(255, 255, 255, 0.09)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '0.85rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <div 
                  className="login-feature-icon"
                  style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.16)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
                >
                  <ShieldCheck size={22} color="#ffffff" />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#ffffff' }}>Zero-Leak Security Guarantee</div>
                  <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Customer game & social credentials fully protected under escrow protocols</div>
                </div>
              </div>
              <ChevronRight size={18} color="#93c5fd" className="login-feature-arrow" />
            </div>

            {/* Feature Card 2 */}
            <div 
              className="login-feature-card"
              style={{
                padding: '0.95rem 1.25rem',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(255, 255, 255, 0.09)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '0.85rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <div 
                  className="login-feature-icon"
                  style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.16)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
                >
                  <Clock size={22} color="#ffffff" />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#ffffff' }}>Guaranteed &lt;1hr Handover</div>
                  <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Direct verification and credentials dispatch on WhatsApp</div>
                </div>
              </div>
              <ChevronRight size={18} color="#93c5fd" className="login-feature-arrow" />
            </div>

            {/* Feature Card 3 */}
            <div 
              className="login-feature-card"
              style={{
                padding: '0.95rem 1.25rem',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(255, 255, 255, 0.09)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '0.85rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <div 
                  className="login-feature-icon"
                  style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.16)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
                >
                  <Users size={22} color="#ffffff" />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#ffffff' }}>Verified Vendor Representatives</div>
                  <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Dedicated transfers handled by our trusted vendors</div>
                </div>
              </div>
              <ChevronRight size={18} color="#93c5fd" className="login-feature-arrow" />
            </div>

          </div>

        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* PART 2: RIGHT AUTH FORM (Clean White & Slate, Zero Placeholders)   */}
      {/* ------------------------------------------------------------------ */}
      <div 
        onMouseEnter={() => setHoverSide('right')}
        style={{
          padding: 'clamp(2rem, 4vw, 3.5rem) clamp(1.5rem, 4vw, 3.5rem)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          boxSizing: 'border-box',
          background: '#ffffff',
          position: 'relative',
          overflowY: 'auto'
        }}
      >
        {/* Brand Emblem on Top Center Outside the Card */}
        <div 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: '0.75rem', 
            marginBottom: '1.75rem',
            width: '100%',
            maxWidth: '430px'
          }}
        >
          <div 
            style={{
              width: '46px',
              height: '46px',
              borderRadius: 'var(--radius-sm)',
              background: '#0066ff',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 16px rgba(0, 102, 255, 0.25)',
              flexShrink: 0
            }}
          >
            <Gamepad2 size={28} />
          </div>
          <div>
            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.45rem', letterSpacing: '-0.02em', display: 'block', color: 'var(--text-primary)' }}>
              WRG <span style={{ color: '#0066ff' }}>STORE</span>
            </span>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600 }}>
              Your Verified Marketplace
            </span>
          </div>
        </div>

        <div 
          className="glass-panel"
          style={{ 
            maxWidth: '430px', 
            width: '100%',
            padding: '2.25rem',
            background: '#ffffff',
            borderRadius: 'var(--radius-lg)',
            border: hoverSide === 'right' ? '1px solid rgba(0, 102, 255, 0.35)' : '1px solid var(--glass-border)',
            boxShadow: hoverSide === 'right' 
              ? `${-((mousePos.x - 75) / 25) * 8}px 14px 34px rgba(0, 102, 255, 0.13), 0 0 0 1px rgba(0, 102, 255, 0.15)` 
              : '0 10px 30px rgba(0, 102, 255, 0.07)',
            transform: hoverSide === 'right' 
              ? `perspective(1000px) rotateY(${((mousePos.x - 75) / 25) * 2.5}deg) translateY(-2px)` 
              : 'perspective(1000px) rotateY(0deg) translateY(0)',
            transition: 'transform 0.18s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease, border-color 0.25s ease'
          }}
        >
          
          {/* Form Switcher Tabs in White & Royal Blue */}
          <div 
            style={{ 
              display: 'flex', 
              background: '#f1f5f9', 
              borderRadius: 'var(--radius-sm)', 
              padding: '0.25rem', 
              marginBottom: '1.5rem' 
            }}
          >
            <button
              type="button"
              onClick={() => { setMode('login'); setError(''); }}
              style={{
                flex: 1,
                padding: '0.6rem',
                border: 'none',
                borderRadius: 'var(--radius-xs)',
                background: mode === 'login' ? '#0066ff' : 'transparent',
                color: mode === 'login' ? '#ffffff' : 'var(--text-secondary)',
                fontWeight: 700,
                fontSize: '0.88rem',
                cursor: 'pointer',
                transition: 'all 0.18s ease'
              }}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setMode('register'); setError(''); }}
              style={{
                flex: 1,
                padding: '0.6rem',
                border: 'none',
                borderRadius: 'var(--radius-xs)',
                background: mode === 'register' ? '#0066ff' : 'transparent',
                color: mode === 'register' ? '#ffffff' : 'var(--text-secondary)',
                fontWeight: 700,
                fontSize: '0.88rem',
                cursor: 'pointer',
                transition: 'all 0.18s ease'
              }}
            >
              Register
            </button>
          </div>

          {/* Form Header Title */}
          <div style={{ marginBottom: '1.25rem' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 0.3rem 0' }}>
              {mode === 'login' ? 'Sign In to Your Account' : 'Create a New Account'}
            </h2>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: 0 }}>
              {mode === 'login' 
                ? 'Enter your verified credentials to access your listings and orders.' 
                : 'Join WRG Store to order accounts and in-game currencies.'}
            </p>
          </div>

          {/* Feedback Alerts */}
          {error && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#fef2f2', color: '#b91c1c', padding: '0.7rem 0.9rem', borderRadius: 'var(--radius-xs)', fontSize: '0.82rem', marginBottom: '1.25rem', border: '1px solid #fca5a5' }}>
              <AlertCircle size={16} color="#dc2626" />
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#ecfdf5', color: '#047857', padding: '0.7rem 0.9rem', borderRadius: 'var(--radius-xs)', fontSize: '0.85rem', marginBottom: '1.25rem', border: '1px solid #a7f3d0' }}>
              <Check size={16} />
              <span>{successMsg}</span>
            </div>
          )}

          {/* SIGN IN FORM */}
          {mode === 'login' ? (
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                  Username
                </label>
                <div style={{ position: 'relative' }}>
                  <User size={15} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    type="text"
                    required
                    className="glass-input"
                    value={loginUsername}
                    onChange={(e) => setLoginUsername(e.target.value)}
                    style={{ paddingLeft: '2.4rem' }}
                  />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ background: 'transparent', border: 'none', color: '#0066ff', cursor: 'pointer', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 600 }}
                  >
                    {showPassword ? <EyeOff size={13} /> : <Eye size={13} />}
                    <span>{showPassword ? 'Hide' : 'Show'}</span>
                  </button>
                </div>
                <div style={{ position: 'relative' }}>
                  <Lock size={15} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    className="glass-input"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    style={{ paddingLeft: '2.4rem' }}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="glass-btn glass-btn-primary"
                style={{
                  width: '100%',
                  padding: '0.8rem',
                  fontSize: '0.94rem',
                  fontWeight: 700,
                  marginTop: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.45rem'
                }}
              >
                Sign In to Store <ArrowRight size={16} />
              </button>

              <div style={{ textAlign: 'center', marginTop: '0.75rem' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Don't have an account yet?{' '}
                  <button
                    type="button"
                    onClick={() => { setMode('register'); setError(''); }}
                    style={{ background: 'transparent', border: 'none', color: '#0066ff', cursor: 'pointer', fontWeight: 700, fontSize: '0.8rem' }}
                  >
                    Register now
                  </button>
                </span>
              </div>
            </form>
          ) : (
            /* REGISTRATION FORM (Gamer tag removed) */
            <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                  Username
                </label>
                <input
                  type="text"
                  required
                  className="glass-input"
                  value={regUsername}
                  onChange={(e) => setRegUsername(e.target.value)}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  className="glass-input"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                  Password (min 6 characters)
                </label>
                <input
                  type="password"
                  required
                  className="glass-input"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                  Confirm Password
                </label>
                <input
                  type="password"
                  required
                  className="glass-input"
                  value={regConfirmPassword}
                  onChange={(e) => setRegConfirmPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="glass-btn glass-btn-primary"
                style={{
                  width: '100%',
                  padding: '0.8rem',
                  fontSize: '0.94rem',
                  fontWeight: 700,
                  marginTop: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.45rem'
                }}
              >
                Create Account & Enter <ArrowRight size={16} />
              </button>

              <div style={{ textAlign: 'center', marginTop: '0.75rem' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Already registered?{' '}
                  <button
                    type="button"
                    onClick={() => { setMode('login'); setError(''); }}
                    style={{ background: 'transparent', border: 'none', color: '#0066ff', cursor: 'pointer', fontWeight: 700, fontSize: '0.8rem' }}
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
