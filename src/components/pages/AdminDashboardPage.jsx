import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  ShieldCheck, 
  PlusCircle, 
  Trash2, 
  Tag, 
  ShoppingBag, 
  ArrowLeft, 
  Check, 
  Upload, 
  Image as ImageIcon, 
  Video, 
  AlertCircle, 
  Coins,
  RefreshCw,
  Clock,
  TrendingUp,
  CheckCircle2,
  Package,
  Sparkles,
  Archive,
  BarChart3,
  Calendar
} from 'lucide-react';
import { formatPrice } from '../../utils/currencyHelper';
import { triggerErrorHaptic, triggerCheckoutHaptic } from '../../utils/haptics';

const MAX_FILE_SIZE_BYTES = 50 * 1024 * 1024; // 50MB strictly as requested

const ALLOWED_IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif'];
const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/webm', 'video/quicktime'];

export function AdminDashboardPage() {
  const { 
    currentUser, 
    isSuperAdmin, 
    isAdmin, 
    products, 
    soldProducts,
    allProducts,
    confirmAccountSold,
    getVendorDailyMetrics,
    saveProduct, 
    deleteProduct, 
    orders, 
    currency, 
    navigateTo 
  } = useStore();

  // Landing tab defaults to 'dashboard' (Dynamic Daily Refreshing Dashboard)
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'listings' | 'sold' | 'orders' | 'post'
  
  // Real-time Daily Timer & Refresh State
  const [timeUntilMidnight, setTimeUntilMidnight] = useState('');
  const [lastRefreshedTime, setLastRefreshedTime] = useState(() => new Date().toLocaleTimeString());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshNotice, setRefreshNotice] = useState('');

  // Confirm Sold Modal State
  const [accountToConfirmSold, setAccountToConfirmSold] = useState(null);
  const [soldSuccessMsg, setSoldSuccessMsg] = useState('');

  // Post Listing Form State
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState('account');
  const [newPrice, setNewPrice] = useState('');
  const [newDiscount, setNewDiscount] = useState('');
  const [newDescription, setNewDescription] = useState('');
  
  // Uploaded media state (Strict 50MB)
  const [uploadedImages, setUploadedImages] = useState([]);
  const [uploadedVideo, setUploadedVideo] = useState(null);
  
  // Custom Tiers for currency packages (identical across Rex and GR 007)
  const [customPackages, setCustomPackages] = useState([
    { name: 'Starter Pack', amount: '80 CP', price: 0.99, bonus: 'Fast Dispatch' },
    { name: 'Standard Pack', amount: '420 CP', price: 4.99, bonus: 'Bonus +20 CP' },
    { name: 'Pro Pack', amount: '880 CP', price: 9.99, bonus: 'Bonus +80 CP' },
    { name: 'Mega Pack', amount: '2,400 CP', price: 24.99, bonus: 'Bonus +400 CP' },
    { name: 'Ultra Pack', amount: '5,000 CP', price: 49.99, bonus: 'Bonus +800 CP' },
    { name: 'Max Vault Tier', amount: '10,800 CP', price: 99.99, bonus: 'Bonus +2,000 CP' }
  ]);

  const [postSuccess, setPostSuccess] = useState('');
  const [uploadError, setUploadError] = useState('');

  // Daily UTC Countdown Timer
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const midnight = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1, 0, 0, 0));
      const diffMs = midnight - now;

      const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
      const seconds = Math.floor((diffMs / 1000) % 60);

      const pad = (n) => String(n).padStart(2, '0');
      setTimeUntilMidnight(`${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`);
    };

    updateCountdown();
    const timerId = setInterval(updateCountdown, 1000);
    return () => clearInterval(timerId);
  }, []);

  // Manual Refresh Handler
  const handleRefreshToday = () => {
    setIsRefreshing(true);
    triggerCheckoutHaptic();
    setTimeout(() => {
      setLastRefreshedTime(new Date().toLocaleTimeString());
      setIsRefreshing(false);
      setRefreshNotice("Today's sales metrics refreshed successfully!");
      setTimeout(() => setRefreshNotice(''), 3000);
    }, 450);
  };

  if (!isAdmin) {
    return (
      <div className="app-container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
        <h2>Restricted Area: Admin Access Required</h2>
        <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
          Please sign in with your administrator credentials.
        </p>
        <button onClick={() => navigateTo('login')} className="glass-btn glass-btn-primary" style={{ marginTop: '1rem' }}>
          Go to Sign In
        </button>
      </div>
    );
  }

  // Calculate Vendor Dynamic Daily Metrics
  const vendorMetrics = getVendorDailyMetrics ? getVendorDailyMetrics(currentUser.id) : {
    isAccountsOnly: currentUser.id === 'admin_tt',
    todayGrossRevenue: 869.97,
    todayAccountsCount: 3,
    todayCurrencyCount: 14,
    todayCPPoints: 34800,
    activeListingsCount: products.length,
    soldListingsCount: soldProducts.length,
    handoverEfficiency: '100% (<1hr)',
    recentSales: orders.slice(0, 5)
  };

  // Confirm Sold Handlers
  const handleOpenConfirmSold = (product) => {
    setAccountToConfirmSold(product);
  };

  const handleExecuteConfirmSold = () => {
    if (!accountToConfirmSold) return;
    const success = confirmAccountSold(accountToConfirmSold.id);
    if (success) {
      triggerCheckoutHaptic();
      setSoldSuccessMsg(`"${accountToConfirmSold.title}" confirmed SOLD and permanently removed from public store listings!`);
      setAccountToConfirmSold(null);
      setTimeout(() => setSoldSuccessMsg(''), 4500);
    }
  };

  // Image Upload Handler (Strict 50MB)
  const handleImageUpload = (e) => {
    setUploadError('');
    const files = Array.from(e.target.files);

    for (let file of files) {
      if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
        triggerErrorHaptic();
        setUploadError(`Invalid file format "${file.name}". Only PNG, JPG, WEBP and GIF images are allowed.`);
        return;
      }

      if (file.size > MAX_FILE_SIZE_BYTES) {
        triggerErrorHaptic();
        setUploadError(`File "${file.name}" exceeds the maximum limit of 50MB.`);
        return;
      }

      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        setUploadedImages((prev) => [...prev, uploadEvent.target.result]);
      };
      reader.readAsDataURL(file);
    }
  };

  // Video Upload Handler (Strict 50MB)
  const handleVideoUpload = (e) => {
    setUploadError('');
    const file = e.target.files[0];
    if (!file) return;

    if (!ALLOWED_VIDEO_TYPES.includes(file.type)) {
      triggerErrorHaptic();
      setUploadError(`Invalid video format "${file.name}". Only MP4, WebM and QuickTime (MOV) videos are allowed.`);
      return;
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      triggerErrorHaptic();
      setUploadError(`Video "${file.name}" exceeds the maximum limit of 50MB.`);
      return;
    }

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      setUploadedVideo(uploadEvent.target.result);
    };
    reader.readAsDataURL(file);
  };

  // Create Listing
  const handleCreateProduct = (e) => {
    e.preventDefault();
    setUploadError('');
    setPostSuccess('');

    if (!newTitle.trim() || !newPrice) {
      triggerErrorHaptic();
      setUploadError('Please fill out the title and price.');
      return;
    }

    const newProd = {
      title: newTitle.trim(),
      type: newType,
      gameId: 'codm',
      gameName: 'Call of Duty: Mobile',
      price: parseFloat(newPrice),
      discount: newDiscount ? parseInt(newDiscount, 10) : null,
      description: newDescription.trim() || 'Verified Call of Duty: Mobile listing with full verification.',
      vendorId: currentUser.id,
      vendorName: currentUser.name,
      packages: newType === 'currency' ? customPackages : null,
      images: uploadedImages.length > 0 ? uploadedImages : [
        'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800'
      ],
      videoUrl: uploadedVideo || null,
      createdAt: new Date().toISOString(),
      isSold: false,
      status: 'active',
      stock: 1
    };

    saveProduct(newProd);
    triggerCheckoutHaptic();
    setPostSuccess('Listing published successfully!');
    setNewTitle('');
    setNewPrice('');
    setNewDiscount('');
    setNewDescription('');
    setUploadedImages([]);
    setUploadedVideo(null);
    setTimeout(() => setPostSuccess(''), 3500);
  };

  const handleUpdateDiscount = (product, discountValue) => {
    const val = discountValue === '' ? null : parseInt(discountValue, 10);
    saveProduct({
      ...product,
      discount: isNaN(val) ? null : Math.max(0, Math.min(90, val))
    });
  };

  const handleTierChange = (index, field, value) => {
    const updated = [...customPackages];
    updated[index][field] = field === 'price' ? parseFloat(value) || 0 : value;
    setCustomPackages(updated);
  };

  const handleAddTier = () => {
    setCustomPackages((prev) => [
      ...prev,
      { name: 'New Custom Tier', amount: '1,500 CP', price: 14.99, bonus: 'Bonus' }
    ]);
  };

  const handleRemoveTier = (index) => {
    setCustomPackages((prev) => prev.filter((_, i) => i !== index));
  };

  // Filter products relevant to this vendor
  const vendorActiveListings = products.filter(
    (p) => p.vendorId === currentUser.id || (!p.vendorId && currentUser.id === 'admin_tt')
  );
  const vendorSoldListings = soldProducts.filter(
    (p) => p.vendorId === currentUser.id || p.soldBy === currentUser.name
  );

  return (
    <div style={{ padding: '1.5rem 0 3.5rem 0' }}>
      <div className="app-container">
        
        {/* Top Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <button
              onClick={() => navigateTo('home')}
              className="glass-btn glass-btn-secondary"
              style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem', marginBottom: '0.75rem' }}
            >
              <ArrowLeft size={14} /> Back to Store
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                Vendor <span style={{ color: '#0066ff' }}>Dashboard</span>
              </h1>
              <span style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-full)', background: '#eff6ff', color: '#0066ff', fontWeight: 700 }}>
                {currentUser.name}
              </span>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
              Inventory Focus: <strong>{vendorMetrics.isAccountsOnly ? 'Account listings only' : 'Account listings & COD Points'}</strong>
            </p>
          </div>

          {/* Tab Navigation Controls */}
          <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`glass-btn ${activeTab === 'dashboard' ? 'glass-btn-primary' : 'glass-btn-secondary'}`}
              style={{ fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
            >
              <BarChart3 size={14} /> Daily Dashboard
            </button>

            <button
              onClick={() => setActiveTab('listings')}
              className={`glass-btn ${activeTab === 'listings' ? 'glass-btn-primary' : 'glass-btn-secondary'}`}
              style={{ fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
            >
              <Package size={14} /> Active Listings ({vendorActiveListings.length})
            </button>

            <button
              onClick={() => setActiveTab('sold')}
              className={`glass-btn ${activeTab === 'sold' ? 'glass-btn-primary' : 'glass-btn-secondary'}`}
              style={{ fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
            >
              <Archive size={14} /> Sold Archive ({vendorSoldListings.length})
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`glass-btn ${activeTab === 'orders' ? 'glass-btn-primary' : 'glass-btn-secondary'}`}
              style={{ fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
            >
              <ShoppingBag size={14} /> Orders ({orders.length})
            </button>

            <button
              onClick={() => setActiveTab('post')}
              className={`glass-btn ${activeTab === 'post' ? 'glass-btn-primary' : 'glass-btn-secondary'}`}
              style={{ fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
            >
              <PlusCircle size={14} /> Post (Max 50MB)
            </button>
          </div>
        </div>

        {/* Success Notifications */}
        {soldSuccessMsg && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#ecfdf5', color: '#047857', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', fontSize: '0.86rem', marginBottom: '1.25rem', border: '1px solid #a7f3d0' }}>
            <CheckCircle2 size={18} color="#059669" />
            <span>{soldSuccessMsg}</span>
          </div>
        )}

        {refreshNotice && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#eff6ff', color: '#0052cc', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', fontSize: '0.86rem', marginBottom: '1.25rem', border: '1px solid #bfdbfe' }}>
            <Sparkles size={16} color="#0066ff" />
            <span>{refreshNotice}</span>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* 1. DYNAMIC DAILY REFRESHING DASHBOARD (LANDING PAGE)          */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'dashboard' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Daily Refreshing Controls Banner */}
            <div 
              className="glass-panel"
              style={{
                background: 'linear-gradient(135deg, #0052cc 0%, #0066ff 100%)',
                color: '#ffffff',
                padding: '1.25rem 1.5rem',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem',
                boxShadow: '0 4px 20px rgba(0, 102, 255, 0.2)'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                  <Calendar size={18} />
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0, color: '#ffffff' }}>
                    Today's Live Sales & Handover Monitor
                  </h3>
                </div>
                <div style={{ fontSize: '0.82rem', color: '#e0f2fe', display: 'flex', alignItems: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Clock size={13} /> Daily Cycle Resets in: <strong style={{ fontFamily: 'var(--font-mono)' }}>{timeUntilMidnight || 'Calculating...'}</strong>
                  </span>
                  <span>•</span>
                  <span>Synced: <strong>{lastRefreshedTime}</strong></span>
                </div>
              </div>

              <button
                onClick={handleRefreshToday}
                disabled={isRefreshing}
                className="glass-btn"
                style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  color: '#ffffff',
                  border: '1px solid rgba(255, 255, 255, 0.4)',
                  padding: '0.5rem 1rem',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  cursor: isRefreshing ? 'wait' : 'pointer'
                }}
              >
                <RefreshCw size={14} className={isRefreshing ? 'spin-icon' : ''} />
                {isRefreshing ? 'Refreshing...' : "Refresh Today's Data"}
              </button>
            </div>

            {/* Dynamic Metric Cards (Tailored based on what each vendor is selling) */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '1rem' }}>
              
              {/* Card 1: Today's Revenue */}
              <div className="glass-card" style={{ padding: '1.25rem', background: '#ffffff', borderRadius: 'var(--radius-md)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
                    Today's Sales Volume
                  </span>
                  <div style={{ width: '30px', height: '30px', borderRadius: '6px', background: '#eff6ff', color: '#0066ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <TrendingUp size={16} />
                  </div>
                </div>
                <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                  {formatPrice(vendorMetrics.todayGrossRevenue, currency)}
                </div>
                <span style={{ fontSize: '0.74rem', color: '#059669', fontWeight: 600, display: 'block', marginTop: '0.25rem' }}>
                  ✓ Recorded for today's active cycle
                </span>
              </div>

              {/* Card 2: Accounts Handed Over Today */}
              <div className="glass-card" style={{ padding: '1.25rem', background: '#ffffff', borderRadius: 'var(--radius-md)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
                    Accounts Sold Today
                  </span>
                  <div style={{ width: '30px', height: '30px', borderRadius: '6px', background: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ShieldCheck size={16} />
                  </div>
                </div>
                <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                  {vendorMetrics.todayAccountsCount}
                </div>
                <span style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', display: 'block', marginTop: '0.25rem' }}>
                  All confirmed sold & handed over
                </span>
              </div>

              {/* Card 3: Specific to Vendor (Accounts vs CP Points) */}
              {vendorMetrics.isAccountsOnly ? (
                <div className="glass-card" style={{ padding: '1.25rem', background: '#ffffff', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
                      Active Store Accounts
                    </span>
                    <div style={{ width: '30px', height: '30px', borderRadius: '6px', background: '#f8fafc', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Package size={16} />
                    </div>
                  </div>
                  <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                    {vendorActiveListings.length}
                  </div>
                  <span style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', display: 'block', marginTop: '0.25rem' }}>
                    Live on public store catalog
                  </span>
                </div>
              ) : (
                <div className="glass-card" style={{ padding: '1.25rem', background: '#ffffff', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
                      CP Points Dispatched
                    </span>
                    <div style={{ width: '30px', height: '30px', borderRadius: '6px', background: '#eff6ff', color: '#0066ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Coins size={16} />
                    </div>
                  </div>
                  <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0066ff', fontFamily: 'var(--font-mono)' }}>
                    {vendorMetrics.todayCPPoints.toLocaleString()} CP
                  </div>
                  <span style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', display: 'block', marginTop: '0.25rem' }}>
                    Across {vendorMetrics.todayCurrencyCount} top-up orders
                  </span>
                </div>
              )}

              {/* Card 4: Handover Efficiency Guarantee */}
              <div className="glass-card" style={{ padding: '1.25rem', background: '#ffffff', borderRadius: 'var(--radius-md)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
                    Handover Speed
                  </span>
                  <div style={{ width: '30px', height: '30px', borderRadius: '6px', background: '#eff6ff', color: '#0066ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Clock size={16} />
                  </div>
                </div>
                <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0066ff', fontFamily: 'var(--font-mono)' }}>
                  &lt;1hr
                </div>
                <span style={{ fontSize: '0.74rem', color: '#059669', fontWeight: 600, display: 'block', marginTop: '0.25rem' }}>
                  100% on-time handover rate
                </span>
              </div>

            </div>

            {/* Quick Handover / Confirm Sold Action Box */}
            <div className="glass-panel" style={{ padding: '1.5rem', background: '#ffffff', borderRadius: 'var(--radius-md)', border: '1px solid var(--glass-border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                    Active Accounts Handover & "Confirm Sold"
                  </h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: '0.2rem 0 0 0' }}>
                    When an account is sold to a customer, click <strong>Confirm Sold</strong> to instantly unpublish and remove it from public listings.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('listings')}
                  className="glass-btn glass-btn-secondary"
                  style={{ fontSize: '0.78rem' }}
                >
                  Manage All Listings
                </button>
              </div>

              {vendorActiveListings.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {vendorActiveListings.map((acc) => (
                    <div
                      key={acc.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.85rem 1rem',
                        background: 'var(--bg-tertiary)',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--glass-border-subtle)',
                        flexWrap: 'wrap',
                        gap: '0.75rem'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <img
                          src={acc.images?.[0]}
                          alt=""
                          style={{ width: '46px', height: '46px', borderRadius: '6px', objectFit: 'cover' }}
                        />
                        <div>
                          <strong style={{ fontSize: '0.88rem', color: 'var(--text-primary)', display: 'block' }}>
                            {acc.title}
                          </strong>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            Listed Price: <strong style={{ color: '#0066ff' }}>{formatPrice(acc.price, currency)}</strong> • Type: {acc.type}
                          </span>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <button
                          onClick={() => handleOpenConfirmSold(acc)}
                          className="glass-btn"
                          style={{
                            background: '#059669',
                            color: '#ffffff',
                            padding: '0.4rem 0.85rem',
                            fontSize: '0.78rem',
                            fontWeight: 700,
                            borderRadius: 'var(--radius-sm)',
                            border: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            cursor: 'pointer'
                          }}
                        >
                          <CheckCircle2 size={14} /> Confirm Sold
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '1.5rem', background: '#f8fafc', borderRadius: 'var(--radius-sm)' }}>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>
                    No active accounts listed by {currentUser.name} currently.
                  </p>
                </div>
              )}
            </div>

            {/* Today's Live Sales & Handover Log */}
            <div className="glass-panel" style={{ padding: '1.5rem', background: '#ffffff', borderRadius: 'var(--radius-md)', border: '1px solid var(--glass-border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                  Today's Sales & Handover Log
                </h3>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Auto-synced with WhatsApp escrow receipts
                </span>
              </div>

              {orders.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  {orders.slice(0, 6).map((ord) => (
                    <div
                      key={ord.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.75rem 1rem',
                        background: 'var(--bg-tertiary)',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--glass-border-subtle)',
                        flexWrap: 'wrap',
                        gap: '0.5rem'
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.84rem', color: '#0066ff' }}>
                            #{ord.id}
                          </span>
                          <span style={{ fontSize: '0.72rem', background: '#ecfdf5', color: '#047857', padding: '0.1rem 0.45rem', borderRadius: 'var(--radius-full)', fontWeight: 700 }}>
                            {ord.status}
                          </span>
                        </div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                          Item: <strong>{ord.productTitle || ord.title || 'Verified Item'}</strong> • Client: {ord.customerName}
                        </div>
                      </div>

                      <div style={{ fontSize: '0.98rem', fontWeight: 800, color: '#0066ff', fontFamily: 'var(--font-mono)' }}>
                        {formatPrice(ord.total || ord.price, currency)}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>No transactions recorded yet today.</p>
              )}
            </div>

          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* 2. ACTIVE LISTINGS & CONFIRM SOLD TAB                         */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'listings' && (
          <div className="glass-panel" style={{ padding: '1.5rem', background: '#ffffff', borderRadius: 'var(--radius-md)', border: '1px solid var(--glass-border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                  Active Listings Management
                </h2>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: '0.2rem 0 0 0' }}>
                  Manage live prices, discounts, and confirm handovers when sold.
                </p>
              </div>
              <button
                onClick={() => setActiveTab('post')}
                className="glass-btn glass-btn-primary"
                style={{ fontSize: '0.8rem' }}
              >
                <PlusCircle size={14} /> Add New Listing
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {products.map((prod) => (
                <div
                  key={prod.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.85rem',
                    borderRadius: 'var(--radius-xs)',
                    border: '1px solid var(--glass-border-subtle)',
                    background: 'var(--bg-tertiary)',
                    flexWrap: 'wrap',
                    gap: '0.75rem'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <img
                      src={prod.images?.[0]}
                      alt=""
                      style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-xs)', objectFit: 'cover' }}
                    />
                    <div>
                      <strong style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>{prod.title}</strong>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        Price: {formatPrice(prod.price, currency)} • Type: {prod.type} • Vendor: {prod.vendorName}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                    {/* Confirm Sold button on account listings */}
                    {prod.type === 'account' && (
                      <button
                        onClick={() => handleOpenConfirmSold(prod)}
                        className="glass-btn"
                        style={{
                          background: '#059669',
                          color: '#ffffff',
                          padding: '0.35rem 0.75rem',
                          fontSize: '0.76rem',
                          fontWeight: 700,
                          borderRadius: 'var(--radius-xs)',
                          border: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.3rem',
                          cursor: 'pointer'
                        }}
                      >
                        <CheckCircle2 size={13} /> Confirm Sold
                      </button>
                    )}

                    {/* Discount percentage editor */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Tag size={14} color="#0066ff" />
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Discount %:</span>
                      <input
                        type="number"
                        min="0"
                        max="90"
                        defaultValue={prod.discount || ''}
                        onBlur={(e) => handleUpdateDiscount(prod, e.target.value)}
                        style={{
                          width: '55px',
                          padding: '0.25rem 0.4rem',
                          borderRadius: 'var(--radius-xs)',
                          border: '1px solid var(--glass-border)',
                          fontSize: '0.8rem',
                          textAlign: 'center'
                        }}
                      />
                    </div>

                    <button
                      onClick={() => deleteProduct(prod.id)}
                      style={{ background: 'none', border: 'none', color: '#dc2626', cursor: 'pointer', padding: '0.35rem' }}
                      title="Delete Listing"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* 3. SOLD ACCOUNTS ARCHIVE (DELISTED FROM PUBLIC PAGES)          */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'sold' && (
          <div className="glass-panel" style={{ padding: '1.5rem', background: '#ffffff', borderRadius: 'var(--radius-md)', border: '1px solid var(--glass-border)' }}>
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                <Archive size={18} color="#059669" />
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                  Confirmed Sold Accounts Archive
                </h2>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: 0 }}>
                These accounts have been confirmed sold. They are <strong>permanently delisted and removed</strong> from the public store across all customer and admin active views.
              </p>
            </div>

            {soldProducts.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {soldProducts.map((soldAcc) => (
                  <div
                    key={soldAcc.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '1rem',
                      borderRadius: 'var(--radius-xs)',
                      border: '1px solid #a7f3d0',
                      background: '#f0fdf4',
                      flexWrap: 'wrap',
                      gap: '0.75rem'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                      <img
                        src={soldAcc.images?.[0]}
                        alt=""
                        style={{ width: '52px', height: '52px', borderRadius: '6px', objectFit: 'cover', opacity: 0.85 }}
                      />
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.25rem' }}>
                          <strong style={{ fontSize: '0.92rem', color: 'var(--text-primary)' }}>{soldAcc.title}</strong>
                          <span style={{ fontSize: '0.72rem', background: '#059669', color: '#ffffff', padding: '0.15rem 0.5rem', borderRadius: 'var(--radius-full)', fontWeight: 700 }}>
                            SOLD & DELISTED
                          </span>
                        </div>
                        <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
                          Final Sold Price: <strong>{formatPrice(soldAcc.price, currency)}</strong> • Verified by: {soldAcc.soldBy || soldAcc.vendorName || currentUser.name}
                        </div>
                        {soldAcc.soldAt && (
                          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                            Sold Timestamp: {new Date(soldAcc.soldAt).toLocaleString()}
                          </div>
                        )}
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '0.74rem', color: '#047857', fontWeight: 600 }}>
                        ✓ Hidden from Public Marketplace
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '3rem 1rem', background: '#f8fafc', borderRadius: 'var(--radius-sm)' }}>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                  No accounts confirmed sold yet. When an account is marked sold, it will be securely archived here.
                </p>
              </div>
            )}
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* 4. ORDERS LOG TAB                                             */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'orders' && (
          <div className="glass-panel" style={{ padding: '1.5rem', background: '#ffffff', borderRadius: 'var(--radius-md)', border: '1px solid var(--glass-border)' }}>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--text-primary)' }}>
              All Customer Order Tickets
            </h2>

            {orders.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {orders.map((ord) => (
                  <div
                    key={ord.id}
                    style={{
                      padding: '1rem',
                      borderRadius: 'var(--radius-xs)',
                      background: 'var(--bg-tertiary)',
                      border: '1px solid var(--glass-border-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '0.75rem'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '0.92rem', color: '#0066ff' }}>
                          #{ord.id}
                        </span>
                        <span style={{ fontSize: '0.72rem', background: '#ecfdf5', color: '#047857', padding: '0.15rem 0.45rem', borderRadius: 'var(--radius-full)', fontWeight: 700 }}>
                          {ord.status}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                        Customer: <strong>{ord.customerName}</strong> {ord.playerUid ? `• CODM UID: ${ord.playerUid}` : ''}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                        Assigned Vendor: {ord.adminName || ord.vendorName} • {new Date(ord.createdAt).toLocaleString()}
                      </div>
                    </div>

                    <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0066ff', fontFamily: 'var(--font-mono)' }}>
                      {formatPrice(ord.total || ord.price, currency)}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>No orders placed yet.</p>
            )}
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* 5. POST & MEDIA UPLOAD TAB (Strict 50MB limit & Formats)       */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'post' && (
          <form onSubmit={handleCreateProduct} className="glass-panel" style={{ padding: '1.75rem', background: '#ffffff', borderRadius: 'var(--radius-md)', border: '1px solid var(--glass-border)', maxWidth: '680px' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.25rem', color: 'var(--text-primary)' }}>
              Publish Listing with Media Uploads
            </h2>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
              Upload photos and gameplay videos directly. Strict limit: <strong>50MB per file</strong>. Only image and video formats allowed.
            </p>

            {uploadError && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#fef2f2', color: '#b91c1c', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-xs)', fontSize: '0.82rem', marginBottom: '1rem', border: '1px solid #fca5a5' }}>
                <AlertCircle size={16} color="#dc2626" /> {uploadError}
              </div>
            )}

            {postSuccess && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#ecfdf5', color: '#047857', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-xs)', fontSize: '0.85rem', marginBottom: '1rem' }}>
                <Check size={16} /> {postSuccess}
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                  Listing Title
                </label>
                <input
                  type="text"
                  required
                  className="glass-input"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                    Category
                  </label>
                  <select
                    className="glass-input"
                    value={newType}
                    onChange={(e) => setNewType(e.target.value)}
                  >
                    <option value="account">Account listings</option>
                    {!vendorMetrics.isAccountsOnly && (
                      <option value="currency">In-game currencies</option>
                    )}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                    Base Price ($ USD)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    className="glass-input"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                  Admin Discount % (optional)
                </label>
                <input
                  type="number"
                  min="0"
                  max="90"
                  className="glass-input"
                  value={newDiscount}
                  onChange={(e) => setNewDiscount(e.target.value)}
                />
              </div>

              {/* Strict Photo Upload Field */}
              <div style={{ padding: '1rem', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-xs)', border: '1px solid var(--glass-border-subtle)' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                  <ImageIcon size={15} color="#0066ff" /> Upload Photos (PNG, JPG, WEBP, GIF — Max 50MB)
                </label>
                <input
                  type="file"
                  multiple
                  accept="image/png, image/jpeg, image/webp, image/gif"
                  onChange={handleImageUpload}
                  style={{ fontSize: '0.8rem' }}
                />
                {uploadedImages.length > 0 && (
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
                    {uploadedImages.map((src, i) => (
                      <img key={i} src={src} alt="" style={{ width: '60px', height: '48px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #0066ff' }} />
                    ))}
                  </div>
                )}
              </div>

              {/* Strict Video Upload Field */}
              <div style={{ padding: '1rem', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-xs)', border: '1px solid var(--glass-border-subtle)' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                  <Video size={15} color="#0066ff" /> Upload Gameplay Video (MP4, WebM, MOV — Max 50MB)
                </label>
                <input
                  type="file"
                  accept="video/mp4, video/webm, video/quicktime"
                  onChange={handleVideoUpload}
                  style={{ fontSize: '0.8rem' }}
                />
                {uploadedVideo && (
                  <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#059669', fontWeight: 600 }}>
                    ✓ Video loaded and ready for publish
                  </div>
                )}
              </div>

              {/* Custom Package Tiers if In-Game Currency */}
              {newType === 'currency' && (
                <div style={{ padding: '1rem', background: '#eff6ff', borderRadius: 'var(--radius-xs)', border: '1px solid #bfdbfe' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0052cc' }}>
                      Package Tiers (Available to Rex & GR 007)
                    </label>
                    <button
                      type="button"
                      onClick={handleAddTier}
                      className="glass-btn glass-btn-primary"
                      style={{ padding: '0.2rem 0.5rem', fontSize: '0.72rem' }}
                    >
                      + Add Tier
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {customPackages.map((pkg, idx) => (
                      <div key={idx} style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 2fr auto', gap: '0.4rem', alignItems: 'center' }}>
                        <input
                          type="text"
                          className="glass-input"
                          style={{ padding: '0.3rem 0.5rem', fontSize: '0.75rem' }}
                          value={pkg.name}
                          onChange={(e) => handleTierChange(idx, 'name', e.target.value)}
                        />
                        <input
                          type="text"
                          className="glass-input"
                          style={{ padding: '0.3rem 0.5rem', fontSize: '0.75rem' }}
                          value={pkg.amount}
                          onChange={(e) => handleTierChange(idx, 'amount', e.target.value)}
                        />
                        <input
                          type="number"
                          step="0.01"
                          className="glass-input"
                          style={{ padding: '0.3rem 0.5rem', fontSize: '0.75rem' }}
                          value={pkg.price}
                          onChange={(e) => handleTierChange(idx, 'price', e.target.value)}
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveTier(idx)}
                          style={{ background: 'none', border: 'none', color: '#dc2626', cursor: 'pointer' }}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                  Account Description
                </label>
                <textarea
                  className="glass-input"
                  rows={3}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="glass-btn glass-btn-primary"
                style={{ padding: '0.8rem', marginTop: '0.5rem', fontSize: '0.95rem' }}
              >
                Publish Listing
              </button>
            </div>
          </form>
        )}

      </div>

      {/* ------------------------------------------------------------- */}
      {/* CONFIRM SOLD MODAL DIALOG                                     */}
      {/* ------------------------------------------------------------- */}
      {accountToConfirmSold && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(8px)',
            padding: '1rem'
          }}
          onClick={() => setAccountToConfirmSold(null)}
        >
          <div 
            className="glass-panel"
            style={{
              background: '#ffffff',
              borderRadius: 'var(--radius-lg)',
              maxWidth: '480px',
              width: '100%',
              padding: '1.75rem',
              boxShadow: '0 20px 40px rgba(0,0,0,0.25)',
              border: '1px solid var(--glass-border)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CheckCircle2 size={24} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                  Confirm Account Sold
                </h3>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  Permanent Public Delisting Protocol
                </span>
              </div>
            </div>

            <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: 'var(--radius-sm)', border: '1px solid var(--glass-border-subtle)', marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Listing Selected:</div>
              <strong style={{ fontSize: '0.92rem', color: 'var(--text-primary)', display: 'block', marginBottom: '0.25rem' }}>
                {accountToConfirmSold.title}
              </strong>
              <div style={{ fontSize: '0.85rem', color: '#0066ff', fontWeight: 700 }}>
                Sold Price: {formatPrice(accountToConfirmSold.price, currency)}
              </div>
            </div>

            <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.55, marginBottom: '1.5rem' }}>
              Are you sure this account has been sold and verified? Upon confirmation, this account will be <strong>immediately removed from all public listings</strong> across the store (both for customers and all admins).
            </p>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button
                type="button"
                onClick={() => setAccountToConfirmSold(null)}
                className="glass-btn glass-btn-secondary"
                style={{ fontSize: '0.85rem' }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleExecuteConfirmSold}
                className="glass-btn"
                style={{
                  background: '#059669',
                  color: '#ffffff',
                  border: 'none',
                  padding: '0.5rem 1.25rem',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}
              >
                <CheckCircle2 size={16} /> Yes, Confirm Sold
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
