import React, { useState } from 'react';
import { 
  X, 
  MessageSquare, 
  ShieldCheck, 
  Star, 
  Clock, 
  Check, 
  User, 
  Send, 
  ExternalLink, 
  Copy
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useStore } from '../../context/StoreContext';
import { GlassButton } from '../ui/GlassButton';
import { generateTicketId, createWhatsAppOrderMessage, buildWhatsAppUrls } from '../../utils/whatsappHelper';
import { formatPrice } from '../../utils/currencyHelper';

export function AdminSelectorModal() {
  const { 
    checkoutProduct, 
    setCheckoutProduct, 
    admins, 
    currentUser, 
    addOrder,
    currency 
  } = useStore();

  const [selectedAdminId, setSelectedAdminId] = useState(admins[0]?.id || 'admin_rex');
  const [buyerName, setBuyerName] = useState(currentUser?.name || '');
  const [playerInfo, setPlayerInfo] = useState('');
  const [customNotes, setCustomNotes] = useState('');
  const [completedOrderData, setCompletedOrderData] = useState(null);
  const [isCopied, setIsCopied] = useState(false);

  if (!checkoutProduct) return null;

  const product = checkoutProduct;
  const isCurrency = product.type === 'currency';
  const selectedPackage = product.selectedPackage || (isCurrency ? product.packages?.[0] : null);
  const finalPrice = isCurrency && selectedPackage ? selectedPackage.price : product.price;

  const selectedAdmin = admins.find(a => a.id === selectedAdminId) || admins[0];

  const handlePlaceOrderAndRedirect = (e) => {
    e.preventDefault();

    if (!buyerName.trim()) {
      alert('Please enter your name or gamer tag.');
      return;
    }

    const ticketId = generateTicketId();

    const orderData = {
      id: ticketId,
      productId: product.id,
      productTitle: isCurrency && selectedPackage ? `${product.title} (${selectedPackage.name})` : product.title,
      price: finalPrice,
      customerName: buyerName,
      playerInfo: playerInfo,
      adminId: selectedAdmin.id,
      adminName: selectedAdmin.name,
      adminPhone: selectedAdmin.whatsapp,
      status: 'Pending WhatsApp Confirmation',
      createdAt: new Date().toISOString()
    };

    addOrder(orderData);

    const message = createWhatsAppOrderMessage({
      ticketId,
      product,
      selectedPackage,
      playerInfo,
      customer: { name: buyerName },
      selectedAdmin,
      customNotes
    });

    const urls = buildWhatsAppUrls(selectedAdmin.whatsapp, message);

    try {
      confetti({
        particleCount: 50,
        spread: 50,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }

    setCompletedOrderData({
      order: orderData,
      urls,
      admin: selectedAdmin,
      message
    });

    window.open(urls.mobileUrl, '_blank');
  };

  const handleCopyMessage = () => {
    if (completedOrderData?.message) {
      navigator.clipboard.writeText(completedOrderData.message);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 3000);
    }
  };

  return (
    <div className="glass-modal-backdrop" onClick={() => setCheckoutProduct(null)}>
      <div 
        className="glass-modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '780px' }}
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
                width: '30px',
                height: '30px',
                borderRadius: 'var(--radius-xs)',
                background: 'var(--accent-gradient)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff'
              }}
            >
              <MessageSquare size={16} color="#ffffff" />
            </div>
            <div>
              <h2 style={{ fontSize: '1.05rem', fontWeight: 700 }}>
                {completedOrderData ? 'WhatsApp Order Ticket Ready' : 'WhatsApp Checkout & Admin Selection'}
              </h2>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                {completedOrderData ? 'Invoice generated for direct WhatsApp contact' : 'Choose which of our 3 verified admins handles your order'}
              </span>
            </div>
          </div>

          <button
            onClick={() => setCheckoutProduct(null)}
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
            <X size={16} color="currentColor" />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '1.5rem' }}>
          
          {completedOrderData ? (
            <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              
              {/* Success Banner */}
              <div 
                className="glass-panel"
                style={{
                  padding: '1.25rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--accent-gradient-soft)',
                  border: '1px solid var(--glass-border-hover)',
                  textAlign: 'center'
                }}
              >
                <div 
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    background: 'var(--glass-bg-hover)',
                    color: 'var(--text-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 0.75rem auto',
                    border: '1px solid var(--glass-border)'
                  }}
                >
                  <Check size={26} color="currentColor" />
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                  Order Ticket #{completedOrderData.order.id} Created
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', maxWidth: '480px', margin: '0 auto' }}>
                  Connect with {completedOrderData.admin.name} ({completedOrderData.admin.whatsapp}) on WhatsApp to complete payment and delivery.
                </p>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem' }}>
                <a
                  href={completedOrderData.urls.mobileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-btn glass-btn-whatsapp"
                  style={{ padding: '0.85rem', fontSize: '0.9rem', textDecoration: 'none' }}
                >
                  <MessageSquare size={17} color="#ffffff" />
                  Open in WhatsApp (App)
                </a>

                <a
                  href={completedOrderData.urls.webUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-btn glass-btn-secondary"
                  style={{ padding: '0.85rem', fontSize: '0.88rem', textDecoration: 'none' }}
                >
                  <ExternalLink size={16} color="currentColor" />
                  Open WhatsApp Web (Browser)
                </a>
              </div>

              {/* Pre-Formatted Message Box */}
              <div className="glass-panel" style={{ padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    Order Invoice Details:
                  </span>
                  <button
                    onClick={handleCopyMessage}
                    className="glass-btn glass-btn-secondary"
                    style={{ padding: '0.25rem 0.6rem', fontSize: '0.72rem' }}
                  >
                    {isCopied ? <Check size={12} color="currentColor" /> : <Copy size={12} color="currentColor" />}
                    {isCopied ? 'Copied' : 'Copy Text'}
                  </button>
                </div>

                <pre
                  style={{
                    background: 'var(--input-bg)',
                    padding: '0.85rem',
                    borderRadius: 'var(--radius-xs)',
                    fontSize: '0.78rem',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-body)',
                    whiteSpace: 'pre-wrap',
                    lineHeight: 1.5,
                    border: '1px solid var(--glass-border-subtle)'
                  }}
                >
                  {completedOrderData.message}
                </pre>
              </div>

              {/* Selected Admin Summary */}
              <div 
                className="glass-panel"
                style={{
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-sm)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  background: 'var(--glass-bg)'
                }}
              >
                <img
                  src={completedOrderData.admin.avatar}
                  alt={completedOrderData.admin.name}
                  style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>{completedOrderData.admin.name}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    {completedOrderData.admin.specialty} • WhatsApp: {completedOrderData.admin.whatsapp}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span className="glass-badge" style={{ fontSize: '0.68rem' }}>
                    {completedOrderData.admin.responseTime}
                  </span>
                </div>
              </div>

              <div style={{ textAlign: 'center', marginTop: '0.25rem' }}>
                <GlassButton
                  variant="secondary"
                  size="md"
                  onClick={() => setCheckoutProduct(null)}
                >
                  Return to Store
                </GlassButton>
              </div>

            </div>
          ) : (
            <form onSubmit={handlePlaceOrderAndRedirect} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              
              {/* Item Summary Strip */}
              <div 
                className="glass-panel"
                style={{
                  padding: '0.85rem 1rem',
                  borderRadius: 'var(--radius-sm)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '0.75rem',
                  flexWrap: 'wrap',
                  background: 'var(--accent-gradient-soft)',
                  border: '1px solid var(--glass-border)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    style={{ width: '44px', height: '44px', borderRadius: 'var(--radius-xs)', objectFit: 'cover' }}
                  />
                  <div>
                    <span className="glass-badge" style={{ fontSize: '0.65rem' }}>
                      {product.gameName}
                    </span>
                    <div style={{ fontWeight: 600, fontSize: '0.85rem', maxWidth: '320px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {product.title}
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Total ({currency}):</span>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-primary)', fontFamily: 'var(--font-heading)' }}>
                    {formatPrice(finalPrice, currency)}
                  </div>
                </div>
              </div>

              {/* Admin Selection Grid */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                  <label style={{ fontSize: '0.88rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <ShieldCheck size={16} color="currentColor" />
                    Step 1: Choose Your Admin Representative
                  </label>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    {admins.length} Verified Reps
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '0.6rem' }}>
                  {admins.map((admin) => {
                    const isSelected = selectedAdminId === admin.id;
                    return (
                      <div
                        key={admin.id}
                        onClick={() => setSelectedAdminId(admin.id)}
                        className="glass-card"
                        style={{
                          padding: '0.85rem',
                          borderRadius: 'var(--radius-sm)',
                          cursor: 'pointer',
                          border: isSelected ? '1.5px solid var(--accent-primary)' : '1px solid var(--glass-border-subtle)',
                          background: isSelected ? 'var(--accent-gradient-soft)' : 'var(--glass-card)',
                          position: 'relative'
                        }}
                      >
                        {isSelected && (
                          <span
                            style={{
                              position: 'absolute',
                              top: '0.65rem',
                              right: '0.65rem',
                              width: '18px',
                              height: '18px',
                              borderRadius: '50%',
                              background: 'var(--accent-primary)',
                              color: '#fff',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            <Check size={12} color="#fff" />
                          </span>
                        )}

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.4rem' }}>
                          <img
                            src={admin.avatar}
                            alt={admin.name}
                            style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover' }}
                          />
                          <div>
                            <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{admin.name}</div>
                            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                              {admin.whatsapp}
                            </div>
                          </div>
                        </div>

                        <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', lineHeight: 1.35 }}>
                          {admin.specialty}
                        </p>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)', borderTop: '1px solid var(--glass-border-subtle)', paddingTop: '0.4rem' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                            <Star size={10} color="currentColor" fill="currentColor" /> {admin.rating}
                          </span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                            <Clock size={10} color="currentColor" /> {admin.responseTime}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Buyer Details */}
              <div className="glass-panel" style={{ padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
                <label style={{ fontSize: '0.88rem', fontWeight: 600, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <User size={16} color="currentColor" />
                  Step 2: Enter Delivery Details
                </label>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 500, marginBottom: '0.25rem', color: 'var(--text-secondary)' }}>
                      Your Gamer Tag / Name *
                    </label>
                    <input
                      type="text"
                      required
                      className="glass-input"
                      value={buyerName}
                      onChange={(e) => setBuyerName(e.target.value)}
                    />
                  </div>

                  {isCurrency && (
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 500, marginBottom: '0.25rem', color: 'var(--text-secondary)' }}>
                        Player ID / Riot Tag / Username *
                      </label>
                      <input
                        type="text"
                        className="glass-input"
                        value={playerInfo}
                        onChange={(e) => setPlayerInfo(e.target.value)}
                      />
                    </div>
                  )}
                </div>

                {!isCurrency && (
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 500, marginBottom: '0.25rem', color: 'var(--text-secondary)' }}>
                      Special Delivery Instructions (Optional)
                    </label>
                    <input
                      type="text"
                      className="glass-input"
                      value={customNotes}
                      onChange={(e) => setCustomNotes(e.target.value)}
                    />
                  </div>
                )}

              </div>

              {/* Submit */}
              <div>
                <GlassButton
                  type="submit"
                  variant="whatsapp"
                  size="lg"
                  icon={Send}
                  fullWidth
                  style={{ fontSize: '0.95rem', padding: '0.85rem' }}
                >
                  Connect with {selectedAdmin.name} on WhatsApp
                </GlassButton>

                <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '0.5rem' }}>
                  Direct WhatsApp escrow connection. Safe delivery guaranteed.
                </p>
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
}
