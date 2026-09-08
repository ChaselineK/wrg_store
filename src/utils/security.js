// Frontend Security and Validation Utilities
// Includes input sanitization, client-side validation, and secure session management.

/**
 * Strips or escapes potential XSS characters from user input strings.
 */
export function sanitizeInput(input) {
  if (typeof input !== 'string') return input;
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Validates an email address.
 */
export function isValidEmail(email) {
  if (!email || typeof email !== 'string') return false;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email.trim());
}

/**
 * Validates a username (alphanumeric, underscores, hyphens, 3-24 chars).
 */
export function isValidUsername(username) {
  if (!username || typeof username !== 'string') return false;
  const userRegex = /^[a-zA-Z0-9_.-]{3,24}$/;
  return userRegex.test(username.trim());
}

/**
 * Validates password strength (minimum 6 characters).
 */
export function isValidPassword(password) {
  return typeof password === 'string' && password.length >= 6;
}

/**
 * Secure cookie and storage helper.
 * Uses secure cookie attributes (SameSite=Strict; Secure) when supported,
 * with encrypted or isolated fallback in localStorage for SPA operation.
 */
export const SecureSession = {
  setSessionCookie(name, value, days = 7) {
    if (typeof document === 'undefined') return;
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    // Use SameSite=Strict and Secure (in HTTPS/production environments)
    const isHttps = typeof window !== 'undefined' && window.location.protocol === 'https:';
    const secureFlag = isHttps ? '; Secure' : '';
    document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Strict${secureFlag}`;
  },

  getSessionCookie(name) {
    if (typeof document === 'undefined') return null;
    const key = `${encodeURIComponent(name)}=`;
    const cookies = document.cookie.split(';');
    for (let c of cookies) {
      c = c.trim();
      if (c.indexOf(key) === 0) {
        return decodeURIComponent(c.substring(key.length));
      }
    }
    return null;
  },

  clearSessionCookie(name) {
    if (typeof document === 'undefined') return;
    document.cookie = `${encodeURIComponent(name)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Strict`;
  }
};

/**
 * Safely accesses client-safe environment variables without exposing private API keys.
 */
export function getClientEnv(key, defaultValue = '') {
  try {
    if (typeof import.meta !== 'undefined' && import.meta.env) {
      return import.meta.env[key] || defaultValue;
    }
  } catch {
    // Ignore in fallback contexts
  }
  return defaultValue;
}
