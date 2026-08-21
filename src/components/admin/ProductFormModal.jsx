import React, { useState, useEffect } from 'react';
import { 
  X, 
  Plus, 
  Trash2, 
  Save, 
  Gamepad2, 
  DollarSign, 
  Image as ImageIcon,
  ShieldCheck,
  Video,
  Coins,
  Sparkles,
  Layers
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { GlassButton } from '../ui/GlassButton';
import { GAMES_LIST, PLATFORMS, REGIONS } from '../../data/gamesConfig';
import { VideoPlayer } from '../ui/VideoPlayer';

export function ProductFormModal() {
  const { 
    isProductFormOpen, 
    setIsProductFormOpen, 
    editingProduct, 
    addProduct, 
    updateProduct 
  } = useStore();

  const isEditing = !!editingProduct;

  const [formData, setFormData] = useState({
    type: 'account',
    title: '',
    game: 'valorant',
    gameName: 'Valorant',
    platform: 'PC (Windows / Steam / Riot)',
    region: 'North America (NA)',
    price: '',
    originalPrice: '',
    currency: 'USD',
    isHot: true,
    isInstantDelivery: true,
    isFullAccess: true,
    videoUrl: '',
    images: ['https://images.unsplash.com/photo-1542751371-adc38448a05e?w=900&auto=format&fit=crop&q=80'],
    caption: '',
    specs: {
      rank: 'Immortal 3',
      level: 150,
      skinsCount: '45 Skins',
      emailChangeable: 'Instant Transfer',
      warranty: 'Lifetime Warranty'
    },
    packages: [
      { name: 'Starter Pack', amount: '2,500 Points', price: 19.99, bonus: '+200 Bonus' },
      { name: 'Elite Pack', amount: '5,500 Points', price: 39.99, bonus: '+600 Bonus' },
      { name: 'Vault Pack', amount: '12,000 Points', price: 79.99, bonus: '+1,500 Bonus' }
    ]
  });

  const [newImageUrl, setNewImageUrl] = useState('');
  const [newPkgName, setNewPkgName] = useState('');
  const [newPkgAmount, setNewPkgAmount] = useState('');
  const [newPkgPrice, setNewPkgPrice] = useState('');
  const [newPkgBonus, setNewPkgBonus] = useState('');

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        ...editingProduct,
        price: String(editingProduct.price || ''),
        originalPrice: String(editingProduct.originalPrice || ''),
        specs: editingProduct.specs || {},
        images: editingProduct.images?.length ? editingProduct.images : [''],
        packages: editingProduct.packages || []
      });
    } else {
      setFormData({
        type: 'account',
        title: '',
        game: 'valorant',
        gameName: 'Valorant',
        platform: 'PC (Windows / Steam / Riot)',
        region: 'North America (NA)',
        price: '',
        originalPrice: '',
        currency: 'USD',
        isHot: false,
        isInstantDelivery: true,
        isFullAccess: true,
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        images: ['https://images.unsplash.com/photo-1542751371-adc38448a05e?w=900&auto=format&fit=crop&q=80'],
        caption: `Verified gaming account with clean history.\n- Full email domain transfer.\n- Immediate delivery via WhatsApp escrow.`,
        specs: {
          rank: 'Immortal 3',
          level: 150,
          skinsCount: '45 Skins',
          emailChangeable: 'Instant Transfer',
          warranty: 'Lifetime Warranty'
        },
        packages: [
          { name: 'Starter Pack', amount: '2,000 Points', price: 18.00, bonus: '+100 Bonus' },
          { name: 'Popular Pack', amount: '5,000 Points', price: 42.00, bonus: '+500 Bonus' }
        ]
      });
    }
  }, [editingProduct, isProductFormOpen]);

  if (!isProductFormOpen) return null;

  const handleGameChange = (gameId) => {
    const found = GAMES_LIST.find(g => g.id === gameId);
    setFormData(prev => ({
      ...prev,
      game: gameId,
      gameName: found ? found.name : gameId
    }));
  };

  const handleAddImage = () => {
    if (newImageUrl.trim()) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, newImageUrl.trim()]
      }));
      setNewImageUrl('');
    }
  };

  const handleRemoveImage = (idx) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== idx)
    }));
  };

  const handleAddPackage = () => {
    if (newPkgName.trim() && newPkgPrice) {
      setFormData(prev => ({
        ...prev,
        packages: [
          ...(prev.packages || []),
          {
            name: newPkgName.trim(),
            amount: newPkgAmount.trim() || newPkgName.trim(),
            price: Number(newPkgPrice),
            bonus: newPkgBonus.trim() || ''
          }
        ]
      }));
      setNewPkgName('');
      setNewPkgAmount('');
      setNewPkgPrice('');
      setNewPkgBonus('');
    }
  };

  const handleRemovePackage = (idx) => {
    setFormData(prev => ({
      ...prev,
      packages: prev.packages.filter((_, i) => i !== idx)
    }));
  };

  const handleSpecChange = (key, value) => {
    setFormData(prev => ({
      ...prev,
      specs: {
        ...prev.specs,
        [key]: value
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.price) {
      alert('Please provide a title and price.');
      return;
    }

    const payload = {
      ...formData,
      price: Number(formData.price),
      originalPrice: formData.originalPrice ? Number(formData.originalPrice) : null,
      images: formData.images.filter(img => img.trim() !== '')
    };

    if (isEditing) {
      updateProduct(editingProduct.id, payload);
    } else {
      addProduct(payload);
    }

    setIsProductFormOpen(false);
  };

  return (
    <div className="glass-modal-backdrop" onClick={() => setIsProductFormOpen(false)}>
      <div 
        className="glass-modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '880px', maxHeight: '92vh' }}
      >
        
        {/* Modal Header */}
        <div 
          style={{ 
            padding: '1rem 1.5rem', 
            borderBottom: '1px solid var(--glass-border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'sticky',
            top: 0,
            background: 'var(--glass-modal)',
            backdropFilter: 'blur(20px)',
            zIndex: 20
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div 
              style={{
                width: '32px',
                height: '32px',
                borderRadius: 'var(--radius-xs)',
                background: 'var(--accent-gradient)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff'
              }}
            >
              <Gamepad2 size={18} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 700 }}>
                {isEditing ? 'Modify Store Listing' : 'Post New Account or Currency Listing'}
              </h2>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                {isEditing ? `Editing ID: ${editingProduct.id}` : 'Create a listing with photos, video showcase, and pricing'}
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsProductFormOpen(false)}
            className="glass-panel"
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--text-primary)'
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* Category Switcher */}
          <div className="glass-panel" style={{ padding: '0.85rem', borderRadius: 'var(--radius-sm)' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.4rem' }}>
              Listing Category *
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, type: 'account' }))}
                className={`glass-btn ${formData.type === 'account' ? 'glass-btn-primary' : 'glass-btn-secondary'}`}
                style={{ padding: '0.65rem' }}
              >
                Gaming Account for Sale
              </button>
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, type: 'currency' }))}
                className={`glass-btn ${formData.type === 'currency' ? 'glass-btn-primary' : 'glass-btn-secondary'}`}
                style={{ padding: '0.65rem' }}
              >
                In-Game Currency / Points
              </button>
            </div>
          </div>

          {/* Basic Info */}
          <div className="glass-panel" style={{ padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
            <h3 style={{ fontSize: '0.88rem', fontWeight: 600, marginBottom: '0.75rem' }}>
              Listing Information
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 500, marginBottom: '0.25rem' }}>
                  Title *
                </label>
                <input
                  type="text"
                  required
                  className="glass-input"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 500, marginBottom: '0.25rem' }}>
                    Game Category *
                  </label>
                  <select
                    className="glass-input"
                    value={formData.game}
                    onChange={(e) => handleGameChange(e.target.value)}
                  >
                    {GAMES_LIST.filter(g => g.id !== 'all').map(g => (
                      <option key={g.id} value={g.id}>
                        {g.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 500, marginBottom: '0.25rem' }}>
                    Platform *
                  </label>
                  <select
                    className="glass-input"
                    value={formData.platform}
                    onChange={(e) => setFormData(prev => ({ ...prev, platform: e.target.value }))}
                  >
                    {PLATFORMS.filter(p => p !== 'All Platforms').map(p => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 500, marginBottom: '0.25rem' }}>
                    Region *
                  </label>
                  <select
                    className="glass-input"
                    value={formData.region}
                    onChange={(e) => setFormData(prev => ({ ...prev, region: e.target.value }))}
                  >
                    {REGIONS.filter(r => r !== 'All Regions').map(r => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>
              </div>

            </div>
          </div>

          {/* Pricing */}
          <div className="glass-panel" style={{ padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
            <h3 style={{ fontSize: '0.88rem', fontWeight: 600, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <DollarSign size={15} color="var(--accent-primary)" /> Pricing & Delivery
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 500, marginBottom: '0.25rem' }}>
                  Base Price (USD) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  className="glass-input"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 500, marginBottom: '0.25rem' }}>
                  Original Price (For Discount Strike-through)
                </label>
                <input
                  type="number"
                  step="0.01"
                  className="glass-input"
                  value={formData.originalPrice}
                  onChange={(e) => setFormData(prev => ({ ...prev, originalPrice: e.target.value }))}
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={formData.isInstantDelivery}
                  onChange={(e) => setFormData(prev => ({ ...prev, isInstantDelivery: e.target.checked }))}
                  style={{ accentColor: 'var(--accent-primary)', width: '15px', height: '15px' }}
                />
                Instant Delivery Tag
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={formData.isHot}
                  onChange={(e) => setFormData(prev => ({ ...prev, isHot: e.target.checked }))}
                  style={{ accentColor: 'var(--accent-primary)', width: '15px', height: '15px' }}
                />
                Featured Deal
              </label>
            </div>
          </div>

          {/* Media (Photos & Video Showcase) */}
          <div className="glass-panel" style={{ padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
            <h3 style={{ fontSize: '0.88rem', fontWeight: 600, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <ImageIcon size={15} color="var(--accent-primary)" /> Photo Gallery & Video Showcase
            </h3>

            {/* Photo List */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 500, marginBottom: '0.4rem' }}>
                Screenshot Photos ({formData.images.length}):
              </label>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                {formData.images.map((img, idx) => (
                  <div 
                    key={idx}
                    style={{
                      position: 'relative',
                      width: '90px',
                      height: '65px',
                      borderRadius: 'var(--radius-xs)',
                      overflow: 'hidden',
                      border: '1px solid var(--glass-border)'
                    }}
                  >
                    <img src={img} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      style={{
                        position: 'absolute',
                        top: '2px',
                        right: '2px',
                        background: 'rgba(220, 38, 38, 0.9)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '50%',
                        width: '18px',
                        height: '18px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        fontSize: '0.65rem'
                      }}
                    >
                      ✕
                    </button>
                    {idx === 0 && (
                      <span
                        style={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          background: 'rgba(0,0,0,0.75)',
                          color: '#fff',
                          fontSize: '0.58rem',
                          textAlign: 'center',
                          padding: '1px'
                        }}
                      >
                        Cover
                      </span>
                    )}
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '0.4rem' }}>
                <input
                  type="url"
                  className="glass-input"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                />
                <GlassButton
                  type="button"
                  variant="secondary"
                  size="sm"
                  icon={Plus}
                  onClick={handleAddImage}
                >
                  Add Photo URL
                </GlassButton>
              </div>
            </div>

            {/* Video Showcase URL & Live Video Preview */}
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 500, marginBottom: '0.25rem' }}>
                Gameplay Video Showcase URL (MP4 video link or YouTube embed link)
              </label>
              <input
                type="text"
                className="glass-input"
                value={formData.videoUrl}
                onChange={(e) => setFormData(prev => ({ ...prev, videoUrl: e.target.value }))}
              />

              {formData.videoUrl && (
                <div style={{ marginTop: '0.75rem', maxHeight: '200px', overflow: 'hidden', borderRadius: 'var(--radius-xs)' }}>
                  <VideoPlayer url={formData.videoUrl} title="Live Preview" />
                </div>
              )}
            </div>
          </div>

          {/* Account Attributes (If Account) */}
          {formData.type === 'account' && (
            <div className="glass-panel" style={{ padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
              <h3 style={{ fontSize: '0.88rem', fontWeight: 600, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <ShieldCheck size={15} color="var(--accent-primary)" /> Account Specifications
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 500, marginBottom: '0.25rem' }}>
                    Rank
                  </label>
                  <input
                    type="text"
                    className="glass-input"
                    value={formData.specs?.rank || ''}
                    onChange={(e) => handleSpecChange('rank', e.target.value)}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 500, marginBottom: '0.25rem' }}>
                    Account Level
                  </label>
                  <input
                    type="number"
                    className="glass-input"
                    value={formData.specs?.level || ''}
                    onChange={(e) => handleSpecChange('level', e.target.value)}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 500, marginBottom: '0.25rem' }}>
                    Skins Count
                  </label>
                  <input
                    type="text"
                    className="glass-input"
                    value={formData.specs?.skinsCount || ''}
                    onChange={(e) => handleSpecChange('skinsCount', e.target.value)}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 500, marginBottom: '0.25rem' }}>
                    Email Transfer Status
                  </label>
                  <input
                    type="text"
                    className="glass-input"
                    value={formData.specs?.emailChangeable || ''}
                    onChange={(e) => handleSpecChange('emailChangeable', e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* In-Game Currency Packages Manager (If Currency) */}
          {formData.type === 'currency' && (
            <div className="glass-panel" style={{ padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
              <h3 style={{ fontSize: '0.88rem', fontWeight: 600, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Coins size={15} color="var(--amber-accent)" /> Currency Package Tiers
              </h3>

              {/* Existing Packages */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem', marginBottom: '0.75rem' }}>
                {formData.packages?.map((pkg, idx) => (
                  <div 
                    key={idx}
                    style={{
                      padding: '0.65rem',
                      background: 'var(--glass-card)',
                      borderRadius: 'var(--radius-xs)',
                      border: '1px solid var(--glass-border-subtle)',
                      position: 'relative'
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => handleRemovePackage(idx)}
                      style={{
                        position: 'absolute',
                        top: '4px',
                        right: '4px',
                        background: 'rgba(220, 38, 38, 0.2)',
                        border: 'none',
                        color: '#ef4444',
                        borderRadius: '50%',
                        width: '18px',
                        height: '18px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                      }}
                    >
                      ✕
                    </button>
                    <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{pkg.name}</div>
                    <div style={{ color: 'var(--accent-primary)', fontSize: '0.8rem', fontWeight: 600 }}>{pkg.amount}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>${pkg.price.toFixed(2)} {pkg.bonus && `• ${pkg.bonus}`}</div>
                  </div>
                ))}
              </div>

              {/* Add New Package Form */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.4rem', alignItems: 'end' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-muted)' }}>Pack Name</label>
                  <input
                    type="text"
                    className="glass-input"
                    value={newPkgName}
                    onChange={(e) => setNewPkgName(e.target.value)}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-muted)' }}>Amount</label>
                  <input
                    type="text"
                    className="glass-input"
                    value={newPkgAmount}
                    onChange={(e) => setNewPkgAmount(e.target.value)}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-muted)' }}>Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    className="glass-input"
                    value={newPkgPrice}
                    onChange={(e) => setNewPkgPrice(e.target.value)}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-muted)' }}>Bonus (Opt)</label>
                  <input
                    type="text"
                    className="glass-input"
                    value={newPkgBonus}
                    onChange={(e) => setNewPkgBonus(e.target.value)}
                  />
                </div>
                <GlassButton
                  type="button"
                  variant="secondary"
                  size="sm"
                  icon={Plus}
                  onClick={handleAddPackage}
                >
                  Add Tier
                </GlassButton>
              </div>
            </div>
          )}

          {/* Description */}
          <div className="glass-panel" style={{ padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
              Description & Captions
            </label>
            <textarea
              rows={4}
              className="glass-input"
              value={formData.caption}
              onChange={(e) => setFormData(prev => ({ ...prev, caption: e.target.value }))}
              style={{ resize: 'vertical' }}
            />
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
            <GlassButton
              type="button"
              variant="secondary"
              size="md"
              onClick={() => setIsProductFormOpen(false)}
            >
              Cancel
            </GlassButton>

            <GlassButton
              type="submit"
              variant="primary"
              size="md"
              icon={Save}
            >
              {isEditing ? 'Save Modifications' : 'Publish Listing'}
            </GlassButton>
          </div>

        </form>

      </div>
    </div>
  );
}
