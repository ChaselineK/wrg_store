const STANDARD_CP_PACKAGES = [
  { name: 'Starter Pack', amount: '80 CP', price: 0.99, bonus: 'Fast Dispatch' },
  { name: 'Standard Pack', amount: '420 CP', price: 4.99, bonus: 'Bonus +20 CP' },
  { name: 'Pro Pack', amount: '880 CP', price: 9.99, bonus: 'Bonus +80 CP' },
  { name: 'Mega Pack', amount: '2,400 CP', price: 24.99, bonus: 'Bonus +400 CP' },
  { name: 'Ultra Pack', amount: '5,000 CP', price: 49.99, bonus: 'Bonus +800 CP' },
  { name: 'Max Vault Tier', amount: '10,800 CP', price: 99.99, bonus: 'Bonus +2,000 CP' }
];

export const INITIAL_PRODUCTS = [
  {
    id: 'codm_acc_01',
    type: 'account',
    title: 'CODM Mythic Siren + M13 Morningstar Max Level',
    game: 'codm',
    gameName: 'Call of Duty: Mobile',
    platform: 'Mobile (iOS / Android / Activision)',
    region: 'Global / Region-Free',
    price: 289.99,
    originalPrice: null,
    discount: null,
    currency: 'USD',
    isHot: true,
    isFullAccess: true,
    vendorId: 'admin_tt',
    vendorName: 'RetiredTT',
    description: 'Clean Activision login account featuring maxed Mythic Siren operator, M13 Morningstar, Kilo Demonsong, and full Damascus camo unlocked with clean domain transfer.',
    caption: 'Clean Activision login account featuring maxed Mythic Siren operator, M13 Morningstar, Kilo Demonsong, and full Damascus camo unlocked with clean domain transfer.',
    images: [
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=900&auto=format&fit=crop&q=80'
    ],
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    createdAt: '2026-09-01T12:00:00Z',
    stock: 1
  },
  {
    id: 'codm_acc_02',
    type: 'account',
    title: 'CODM Mythic Templar Operator + Oden Divine Smite',
    game: 'codm',
    gameName: 'Call of Duty: Mobile',
    platform: 'Mobile (iOS / Android / Activision)',
    region: 'Global / Region-Free',
    price: 199.99,
    originalPrice: null,
    discount: null,
    currency: 'USD',
    isHot: true,
    isFullAccess: true,
    vendorId: 'admin_rex',
    vendorName: 'Rex',
    description: 'High-tier account with rare Mythic Templar operator skin, Oden Divine Smite, 9 Legendary weapons, and platinum camos.',
    caption: 'High-tier account with rare Mythic Templar operator skin, Oden Divine Smite, 9 Legendary weapons, and platinum camos.',
    images: [
      'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=900&auto=format&fit=crop&q=80'
    ],
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    createdAt: '2026-09-03T15:30:00Z',
    stock: 1
  },
  {
    id: 'codm_acc_03',
    type: 'account',
    title: 'CODM OG Season 1 Ghost Skin + AK47 Wrath Black & Gold',
    game: 'codm',
    gameName: 'Call of Duty: Mobile',
    platform: 'Mobile (iOS / Android / Activision)',
    region: 'Global / Region-Free',
    price: 145.00,
    originalPrice: null,
    discount: null,
    currency: 'USD',
    isHot: false,
    isFullAccess: true,
    vendorId: 'admin_gr',
    vendorName: 'GR 007',
    description: 'OG Season 1 collector account from 2019 with classic Ghost character skin, AK47 Wrath Black & Gold, and exclusive battle pass items.',
    caption: 'OG Season 1 collector account from 2019 with classic Ghost character skin, AK47 Wrath Black & Gold, and exclusive battle pass items.',
    images: [
      'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=900&auto=format&fit=crop&q=80'
    ],
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    createdAt: '2026-09-04T09:00:00Z',
    stock: 1
  },
  {
    id: 'codm_curr_01',
    type: 'currency',
    title: 'CODM COD Points (CP) Direct Player ID Top-Up — Rex Tier',
    game: 'codm',
    gameName: 'Call of Duty: Mobile',
    platform: 'Activision Direct ID',
    region: 'Global / Region-Free',
    price: 99.99,
    originalPrice: null,
    discount: null,
    currency: 'USD',
    isHot: true,
    vendorId: 'admin_rex',
    vendorName: 'Rex',
    description: 'Fast and reliable COD Points top-up dispatched directly to your Call of Duty: Mobile account.',
    caption: 'Fast and reliable COD Points top-up dispatched directly to your Call of Duty: Mobile account.',
    packages: [...STANDARD_CP_PACKAGES],
    images: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=900&auto=format&fit=crop&q=80'
    ],
    createdAt: '2026-09-02T10:00:00Z',
    stock: 99
  },
  {
    id: 'codm_curr_02',
    type: 'currency',
    title: 'CODM COD Points (CP) Direct Player ID Top-Up — GR 007 Tier',
    game: 'codm',
    gameName: 'Call of Duty: Mobile',
    platform: 'Activision Direct ID',
    region: 'Global / Region-Free',
    price: 99.99,
    originalPrice: null,
    discount: null,
    currency: 'USD',
    isHot: false,
    vendorId: 'admin_gr',
    vendorName: 'GR 007',
    description: 'Instant COD Points packages dispatched directly to your Call of Duty: Mobile account.',
    caption: 'Instant COD Points packages dispatched directly to your Call of Duty: Mobile account.',
    packages: [...STANDARD_CP_PACKAGES],
    images: [
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=900&auto=format&fit=crop&q=80'
    ],
    createdAt: '2026-09-05T11:00:00Z',
    stock: 99
  }
];
