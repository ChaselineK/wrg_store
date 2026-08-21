/**
 * WhatsApp Message Generator & URL Formatter
 */

export function generateTicketId() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let result = 'WRG-';
  for (let i = 0; i < 4; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `${result}-${Math.floor(10 + Math.random() * 90)}`;
}

export function createWhatsAppOrderMessage({
  ticketId,
  product,
  selectedPackage = null,
  playerInfo = '',
  customer = {},
  selectedAdmin = {},
  customNotes = ''
}) {
  const isCurrency = product.type === 'currency';
  const effectivePrice = selectedPackage ? selectedPackage.price : product.price;
  const packageLabel = selectedPackage ? ` (${selectedPackage.name} - ${selectedPackage.amount})` : '';

  const lines = [
    `ORDER INQUIRY - WRG STORE`,
    `--------------------------------`,
    `Ticket ID: #${ticketId}`,
    `Date: ${new Date().toLocaleDateString()}`,
    `--------------------------------`,
    `ITEM DETAILS:`,
    `• Product: ${product.title}${packageLabel}`,
    `• Game: ${product.gameName || product.game}`,
    `• Type: ${isCurrency ? 'In-Game Currency Top-Up' : 'Gaming Account'}`,
    `• Price: $${Number(effectivePrice).toFixed(2)} USD`,
    `• Region/Platform: ${product.region || 'Global'} / ${product.platform || 'Multi-platform'}`,
  ];

  if (!isCurrency && product.specs) {
    if (product.specs.rank) lines.push(`• Rank: ${product.specs.rank}`);
    if (product.specs.skinsCount) lines.push(`• Skins: ${product.specs.skinsCount}`);
    if (product.specs.level) lines.push(`• Level: ${product.specs.level}`);
  }

  lines.push(`--------------------------------`);
  lines.push(`CUSTOMER INFORMATION:`);
  lines.push(`• Name/Tag: ${customer.name || 'Anonymous Buyer'}`);

  if (playerInfo) {
    lines.push(`• Player ID / Riot Tag: ${playerInfo}`);
  }

  lines.push(`• Assigned Admin: ${selectedAdmin.name || 'Store Support'}`);

  if (customNotes) {
    lines.push(`• Buyer Note: ${customNotes}`);
  }

  lines.push(`--------------------------------`);
  lines.push(`Please confirm account availability, payment methods, and escrow delivery steps. Thank you!`);

  return lines.join('\n');
}

export function buildWhatsAppUrls(phoneNumber, message) {
  const cleanPhone = phoneNumber.replace(/[^0-9]/g, '');
  const encodedMsg = encodeURIComponent(message);
  
  return {
    mobileUrl: `https://wa.me/${cleanPhone}?text=${encodedMsg}`,
    webUrl: `https://web.whatsapp.com/send?phone=${cleanPhone}&text=${encodedMsg}`,
    universalUrl: `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodedMsg}`
  };
}
