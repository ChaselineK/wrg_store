/**
 * Multi-Currency Utility (USD, TZS, NGN)
 */

export const CURRENCIES = {
  USD: {
    code: 'USD',
    name: 'US Dollar',
    symbol: '$',
    rate: 1.0,
    prefix: true
  },
  TZS: {
    code: 'TZS',
    name: 'Tanzanian Shilling',
    symbol: 'TZS ',
    rate: 2600.0,
    prefix: true
  },
  NGN: {
    code: 'NGN',
    name: 'Nigerian Naira',
    symbol: '₦',
    rate: 1500.0,
    prefix: true
  }
};

export function convertPrice(amountInUSD, targetCurrency = 'USD') {
  const num = Number(amountInUSD) || 0;
  const curr = CURRENCIES[targetCurrency] || CURRENCIES.USD;
  return num * curr.rate;
}

export function formatPrice(amountInUSD, targetCurrency = 'USD') {
  const num = Number(amountInUSD) || 0;
  const curr = CURRENCIES[targetCurrency] || CURRENCIES.USD;
  const converted = num * curr.rate;

  if (targetCurrency === 'USD') {
    return `$${converted.toFixed(2)}`;
  } else if (targetCurrency === 'TZS') {
    return `TZS ${Math.round(converted).toLocaleString('en-US')}`;
  } else if (targetCurrency === 'NGN') {
    return `₦${Math.round(converted).toLocaleString('en-US')}`;
  }

  return `$${converted.toFixed(2)}`;
}
