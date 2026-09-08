import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../../context/StoreContext';
import { 
  ShieldCheck, 
  MessageSquare, 
  Check, 
  Copy, 
  ExternalLink, 
  ArrowLeft, 
  AlertCircle,
  Clock,
  Printer,
  ShoppingBag
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { formatPrice } from '../../utils/currencyHelper';
import { triggerCheckoutHaptic, triggerErrorHaptic } from '../../utils/haptics';
import { sanitizeInput } from '../../utils/security';

export function CheckoutPage() {
  const { 
    cartItems, 
    cartTotal, 
    currency, 
    currentUser, 
    admins, 
    getEligibleVendorsForCart, 
    addOrder, 
    clearCart, 
    navigateTo 
  } = useStore();

  const eligibleVendors = getEligibleVendorsForCart(cartItems);

  // Default to first eligible vendor
  const firstEligible = eligibleVendors.find((v) => v.isEligible) || eligibleVendors[0];
  const [selectedVendorId, setSelectedVendorId] = useState(firstEligible?.id || 'admin_rex');

  const [buyerName, setBuyerName] = useState(currentUser?.isGuest ? '' : currentUser?.name || '');
  const [playerUid, setPlayerUid] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  
  // Checkout flow state: 'form' | 'success' | 'failure'
  const [checkoutStatus, setCheckoutStatus] = useState('form');
  const [errorMessage, setErrorMessage] = useState('');
  const [completedOrder, setCompletedOrder] = useState(null);
  const [isCopied, setIsCopied] = useState(false);

  const hasCurrencyItems = cartItems.some((item) => item.type === 'currency');
  const selectedVendor = admins.find((a) => a.id === selectedVendorId) || admins[0];

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    // Client-side Validation
    const cleanName = sanitizeInput(buyerName.trim());
    if (!cleanName) {
      triggerErrorHaptic();
      setErrorMessage('Please enter your Name or In-Game Gamer Tag.');
      setCheckoutStatus('failure');
      return;
    }

    if (hasCurrencyItems && !playerUid.trim()) {
      triggerErrorHaptic();
      setErrorMessage('Please provide your Call of Duty: Mobile Player UID so our vendor can credit your COD Points.');
      setCheckoutStatus('failure');
      return;
    }

    // Verify vendor eligibility
    if (hasCurrencyItems && !selectedVendor.sells.includes('currency')) {
      triggerErrorHaptic();
      setErrorMessage('RetiredTT handles Account listings only. Please select Rex or GR 007 to proceed with currency items.');
      setCheckoutStatus('failure');
      return;
    }

    // Order Placed Successfully
    triggerCheckoutHaptic();

    const ticketId = `WRG-${Math.floor(100000 + Math.random() * 900000)}`;
    const orderTimestamp = new Date();

    const newOrder = {
      id: ticketId,
      items: cartItems,
      total: cartTotal,
      currency,
      customerName: cleanName,
      playerUid: sanitizeInput(playerUid.trim()),
      orderNotes: sanitizeInput(orderNotes.trim()),
      vendorId: selectedVendor.id,
      vendorName: selectedVendor.name,
      vendorPhone: selectedVendor.whatsapp,
      vendorRole: selectedVendor.roleTitle,
      status: 'Pending WhatsApp Confirmation',
      createdAt: orderTimestamp.toISOString()
    };

    addOrder(newOrder);

    // Build structured clean receipt message for WhatsApp
    const lines = [
      `*WRG STORE — OFFICIAL ORDER RECEIPT*`,
      `================================`,
      `*Receipt Ticket:* #${ticketId}`,
      `*Date & Time:* ${orderTimestamp.toLocaleString()}`,
      `*Customer Tag:* ${cleanName}`,
      ...(playerUid.trim() ? [`*CODM Player UID:* ${playerUid.trim()}`] : []),
      `*Assigned Vendor:* ${selectedVendor.name} (${selectedVendor.whatsapp})`,
      `*Handover Window:* <1hr Guaranteed`,
      `--------------------------------`,
      `*ITEMIZED ORDER SUMMARY:*`,
      ...cartItems.map(
        (item, idx) =>
          `${idx + 1}. ${item.title} ${item.selectedPackage ? `(${item.selectedPackage.amount})` : ''} x${item.quantity} — ${formatPrice(item.price * item.quantity, currency)}`
      ),
      `--------------------------------`,
      `*TOTAL DUE:* ${formatPrice(cartTotal, currency)}`,
      `================================`,
      ...(orderNotes.trim() ? [`*Notes:* ${orderNotes.trim()}`, `--------------------------------`] : []),
      `Hello ${selectedVendor.name}, I am ready to complete the payment and receive delivery for Ticket #${ticketId}.`
    ];

    const messageText = lines.join('\n');
    const encodedText = encodeURIComponent(messageText);
    const cleanPhone = selectedVendor.whatsapp.replace(/[^0-9]/g, '');
    const mobileUrl = `https://wa.me/${cleanPhone}?text=${encodedText}`;
    const webUrl = `https://web.whatsapp.com/send?phone=${cleanPhone}&text=${encodedText}`;

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      // Ignore
    }

    setCompletedOrder({
      order: newOrder,
      vendor: selectedVendor,
      receiptText: messageText,
      mobileUrl,
      webUrl
    });

    clearCart();
    setCheckoutStatus('success');
  };

  const handleCopyReceipt = () => {
    if (completedOrder?.receiptText) {
      navigator.clipboard.writeText(completedOrder.receiptText);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    }
  };

  if (cartItems.length === 0 && checkoutStatus === 'form') {
    return (
      <div className="app-container" style={{ padding: '3.5rem 1rem', textAlign: 'center' }}>
        <h2>No items in cart for checkout</h2>
        <button onClick={() => navigateTo('accounts')} className="glass-btn glass-btn-primary" style={{ marginTop: '1rem' }}>
          Explore Listings
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '1.5rem 0 3.5rem 0' }}>
      <div className="app-container" style={{ maxWidth: '840px' }}>
        
        {/* Back Button */}
        <button
          onClick={() => navigateTo('cart')}
          className="glass-btn glass-btn-secondary"
          style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem', marginBottom: '1.25rem' }}
        >
          <ArrowLeft size={14} /> Return to Cart
        </button>

        {/* 1. FAILURE STATE */}
        {checkoutStatus === 'failure' && (
          <div 
            className="glass-panel"
            style={{
              padding: '1.5rem',
              borderRadius: 'var(--radius-md)',
              background: '#fef2f2',
              border: '1.5px solid #f87171',
              marginBottom: '1.5rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.5rem' }}>
              <AlertCircle size={22} color="#dc2626" />
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#991b1b' }}>
                Unable to complete checkout
              </h3>
            </div>
            <p style={{ fontSize: '0.88rem', color: '#b91c1c', marginBottom: '1rem', lineHeight: 1.5 }}>
              {errorMessage}
            </p>
            <button
              onClick={() => setCheckoutStatus('form')}
              className="glass-btn glass-btn-primary"
              style={{ background: '#dc2626', fontSize: '0.82rem', padding: '0.45rem 1rem' }}
            >
              Review & Correct Information
            </button>
          </div>
        )}

        {/* 2. SUCCESS STATE (RECEIPT IN GOOD STYLE) */}
        {checkoutStatus === 'success' && completedOrder && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Top Success Banner */}
            <div 
              className="glass-panel"
              style={{
                padding: '1.5rem',
                borderRadius: 'var(--radius-md)',
                background: '#eff6ff',
                border: '1.5px solid #0066ff',
                textAlign: 'center'
              }}
            >
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#0066ff', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.75rem auto' }}>
                <Check size={26} />
              </div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                Order #{completedOrder.order.id} Ready for WhatsApp
              </h2>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', maxWidth: '520px', margin: '0 auto' }}>
                Your order receipt has been generated. Connect directly with <strong>{completedOrder.vendor.name}</strong> ({completedOrder.vendor.whatsapp}) on WhatsApp for payment and &lt;1hr handover.
              </p>
            </div>

            {/* Direct WhatsApp Action Buttons */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.75rem' }}>
              <a
                href={completedOrder.mobileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-btn glass-btn-whatsapp"
                style={{ padding: '0.85rem', fontSize: '0.92rem', textDecoration: 'none' }}
              >
                <MessageSquare size={18} />
                Open WhatsApp App
              </a>

              <a
                href={completedOrder.webUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-btn glass-btn-secondary"
                style={{ padding: '0.85rem', fontSize: '0.92rem', textDecoration: 'none' }}
              >
                <ExternalLink size={16} />
                Open WhatsApp Web
              </a>
            </div>

            {/* The Receipt in Good Style (Structured Invoice Layout) */}
            <div 
              className="glass-panel"
              style={{
                padding: '2rem',
                borderRadius: 'var(--radius-md)',
                background: '#ffffff',
                border: '1px solid var(--glass-border)',
                boxShadow: 'var(--glass-shadow-md)'
              }}
            >
              {/* Receipt Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid #0066ff', paddingBottom: '1rem', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <div style={{ fontSize: '1.35rem', fontWeight: 900, color: '#0066ff', letterSpacing: '-0.02em', fontFamily: 'var(--font-heading)' }}>
                    WRG STORE OFFICIAL INVOICE
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                    Call of Duty: Mobile Verified Marketplace
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Ticket Reference:</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                    #{completedOrder.order.id}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {new Date(completedOrder.order.createdAt).toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Order Metadata Row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', padding: '1rem', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-xs)', marginBottom: '1.5rem', fontSize: '0.82rem' }}>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block' }}>Customer Tag:</span>
                  <strong style={{ color: 'var(--text-primary)', fontSize: '0.9rem' }}>{completedOrder.order.customerName}</strong>
                </div>

                {completedOrder.order.playerUid && (
                  <div>
                    <span style={{ color: 'var(--text-muted)', display: 'block' }}>CODM Player UID:</span>
                    <strong style={{ color: '#0066ff', fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>{completedOrder.order.playerUid}</strong>
                  </div>
                )}

                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block' }}>Handover Vendor:</span>
                  <strong style={{ color: 'var(--text-primary)' }}>{completedOrder.vendor.name}</strong> ({completedOrder.vendor.whatsapp})
                </div>

                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block' }}>Service Guarantee:</span>
                  <strong style={{ color: '#059669' }}>&lt;1hr Handover</strong>
                </div>
              </div>

              {/* Itemized Table */}
              <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--glass-border-subtle)', textAlign: 'left', color: 'var(--text-muted)' }}>
                      <th style={{ padding: '0.5rem 0' }}>Item Description</th>
                      <th style={{ padding: '0.5rem', textAlign: 'center' }}>Type</th>
                      <th style={{ padding: '0.5rem', textAlign: 'center' }}>Qty</th>
                      <th style={{ padding: '0.5rem', textAlign: 'right' }}>Unit Price</th>
                      <th style={{ padding: '0.5rem 0', textAlign: 'right' }}>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {completedOrder.order.items.map((it) => (
                      <tr key={it.cartItemId} style={{ borderBottom: '1px solid var(--glass-border-subtle)' }}>
                        <td style={{ padding: '0.75rem 0' }}>
                          <strong style={{ color: 'var(--text-primary)' }}>{it.title}</strong>
                          {it.selectedPackage && (
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                              Package: {it.selectedPackage.name} ({it.selectedPackage.amount})
                            </div>
                          )}
                        </td>
                        <td style={{ padding: '0.75rem', textAlign: 'center', textTransform: 'capitalize', color: 'var(--text-muted)' }}>
                          {it.type}
                        </td>
                        <td style={{ padding: '0.75rem', textAlign: 'center', fontWeight: 600 }}>
                          {it.quantity}
                        </td>
                        <td style={{ padding: '0.75rem', textAlign: 'right', fontFamily: 'var(--font-mono)' }}>
                          {formatPrice(it.price, currency)}
                        </td>
                        <td style={{ padding: '0.75rem 0', textAlign: 'right', fontWeight: 700, color: '#0066ff', fontFamily: 'var(--font-mono)' }}>
                          {formatPrice(it.price * it.quantity, currency)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Total & Summary Row */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', borderTop: '2px solid var(--glass-border-subtle)', paddingTop: '1rem' }}>
                <div style={{ minWidth: '220px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                    <span>Subtotal:</span>
                    <span>{formatPrice(completedOrder.order.total, currency)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                    <span>Escrow Verification:</span>
                    <span style={{ color: '#059669' }}>FREE</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: 900, color: '#0066ff', borderTop: '1px solid var(--glass-border-subtle)', paddingTop: '0.5rem' }}>
                    <span>Total Amount:</span>
                    <span style={{ fontFamily: 'var(--font-mono)' }}>{formatPrice(completedOrder.order.total, currency)}</span>
                  </div>
                </div>
              </div>

              {/* Copy Receipt Text Box */}
              <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid var(--glass-border-subtle)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    Pre-formatted WhatsApp Payload:
                  </span>
                  <button
                    onClick={handleCopyReceipt}
                    className="glass-btn glass-btn-secondary"
                    style={{ padding: '0.3rem 0.65rem', fontSize: '0.75rem' }}
                  >
                    {isCopied ? <Check size={12} color="#059669" /> : <Copy size={12} />}
                    <span>{isCopied ? 'Receipt Copied!' : 'Copy Receipt'}</span>
                  </button>
                </div>

                <pre
                  style={{
                    background: 'var(--bg-tertiary)',
                    padding: '0.85rem',
                    borderRadius: 'var(--radius-xs)',
                    fontSize: '0.78rem',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-mono)',
                    whiteSpace: 'pre-wrap',
                    lineHeight: 1.5,
                    border: '1px solid var(--glass-border-subtle)'
                  }}
                >
                  {completedOrder.receiptText}
                </pre>
              </div>

            </div>

            {/* Back to Catalog */}
            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
              <button
                onClick={() => navigateTo('home')}
                className="glass-btn glass-btn-secondary"
              >
                Return to Store Home
              </button>
            </div>

          </div>
        )}

        {/* 3. CHECKOUT FORM WITH VENDOR SELECTION */}
        {checkoutStatus === 'form' && (
          <form onSubmit={handlePlaceOrder} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            <div>
              <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                Complete Your <span style={{ color: '#0066ff' }}>Order</span>
              </h1>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                Select your preferred vendor and enter your handover details.
              </p>
            </div>

            {/* Step 1: Choose Seller / Vendor as strictly required */}
            <div 
              className="glass-panel"
              style={{
                padding: '1.5rem',
                borderRadius: 'var(--radius-md)',
                background: '#ffffff',
                border: '1px solid var(--glass-border)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <h2 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <ShieldCheck size={18} color="#0066ff" />
                  Step 1: Choose Your Seller / Vendor
                </h2>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Handover Window: &lt;1hr
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '0.75rem' }}>
                {eligibleVendors.map((vendor) => {
                  const isSelected = selectedVendorId === vendor.id;
                  const isEligible = vendor.isEligible;

                  return (
                    <div
                      key={vendor.id}
                      onClick={() => {
                        if (isEligible) setSelectedVendorId(vendor.id);
                      }}
                      style={{
                        padding: '1rem',
                        borderRadius: 'var(--radius-sm)',
                        border: isSelected && isEligible ? '2px solid #0066ff' : '1px solid var(--glass-border)',
                        background: !isEligible ? '#f8fafc' : isSelected ? '#eff6ff' : '#ffffff',
                        cursor: isEligible ? 'pointer' : 'not-allowed',
                        opacity: isEligible ? 1 : 0.6,
                        position: 'relative'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.5rem' }}>
                        <img
                          src={vendor.avatar}
                          alt={vendor.name}
                          style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
                        />
                        <div>
                          <strong style={{ fontSize: '0.92rem', color: 'var(--text-primary)' }}>{vendor.name}</strong>
                          <div style={{ fontSize: '0.72rem', color: '#059669', fontWeight: 600 }}>
                            Verified Vendor
                          </div>
                        </div>
                      </div>

                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                        Sells: <strong>{vendor.sellsDescription}</strong>
                      </div>

                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                        Response: {vendor.responseTime}
                      </div>

                      {!isEligible && (
                        <div style={{ fontSize: '0.7rem', color: '#dc2626', marginTop: '0.5rem', fontWeight: 600 }}>
                          {vendor.restrictionReason}
                        </div>
                      )}

                      {isSelected && isEligible && (
                        <div style={{ position: 'absolute', top: '0.65rem', right: '0.65rem', width: '20px', height: '20px', borderRadius: '50%', background: '#0066ff', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Check size={12} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Buyer & CODM Info */}
            <div 
              className="glass-panel"
              style={{
                padding: '1.5rem',
                borderRadius: 'var(--radius-md)',
                background: '#ffffff',
                border: '1px solid var(--glass-border)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}
            >
              <h2 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                Step 2: Customer & Game Details
              </h2>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                  Your Name or Gamer Tag <span style={{ color: '#dc2626' }}>*</span>
                </label>
                <input
                  type="text"
                  required
                  className="glass-input"
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                />
              </div>

              {hasCurrencyItems && (
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                    Call of Duty: Mobile Player UID & Zone <span style={{ color: '#dc2626' }}>*</span>
                  </label>
                  <input
                    type="text"
                    required
                    className="glass-input"
                    value={playerUid}
                    onChange={(e) => setPlayerUid(e.target.value)}
                  />
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.25rem', display: 'block' }}>
                    Found under your CODM Player Profile tab. No passwords needed.
                  </span>
                </div>
              )}

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                  Optional Order Notes
                </label>
                <textarea
                  className="glass-input"
                  rows={2}
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                />
              </div>
            </div>

            {/* Step 3: Confirmation Summary & Submit */}
            <div 
              className="glass-panel"
              style={{
                padding: '1.25rem',
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
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                  Total to Pay on WhatsApp Handover ({currency}):
                </div>
                <div style={{ fontSize: '1.65rem', fontWeight: 900, color: '#0066ff', fontFamily: 'var(--font-mono)' }}>
                  {formatPrice(cartTotal, currency)}
                </div>
              </div>

              <button
                type="submit"
                className="glass-btn glass-btn-primary"
                style={{ padding: '0.85rem 1.75rem', fontSize: '0.95rem' }}
              >
                <MessageSquare size={17} />
                Generate Receipt & Proceed
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
