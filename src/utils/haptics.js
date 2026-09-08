// Mobile Haptic Feedback Utility
// Provides tactile feedback during user interactions like adding to cart and checkout.

export function triggerCartHaptic() {
  if (typeof window !== 'undefined' && 'vibrate' in navigator) {
    try {
      // Subtle single vibration for adding to cart
      navigator.vibrate(18);
    } catch {
      // Ignore if vibration is restricted by browser policy
    }
  }
}

export function triggerCheckoutHaptic() {
  if (typeof window !== 'undefined' && 'vibrate' in navigator) {
    try {
      // Confirmative double pulse vibration for order checkout
      navigator.vibrate([30, 45, 30]);
    } catch {
      // Ignore if vibration is restricted by browser policy
    }
  }
}

export function triggerErrorHaptic() {
  if (typeof window !== 'undefined' && 'vibrate' in navigator) {
    try {
      // Warning vibration
      navigator.vibrate([50, 60, 50]);
    } catch {
      // Ignore
    }
  }
}
