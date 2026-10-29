/**
 * Centralized formatting helpers for Babbies Care E-commerce.
 * All monetary amounts are handled in integer paise to avoid floating-point issues.
 */

export function formatPrice(paise: number, includeDecimals = false): string {
  if (isNaN(paise) || paise < 0) {
    return '₹0';
  }

  const rupees = paise / 100;

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: includeDecimals ? 2 : 0,
    minimumFractionDigits: includeDecimals ? 2 : 0,
  }).format(rupees);
}

export function calculateDiscountPercent(
  currentPaise: number,
  compareAtPaise?: number | null
): number | null {
  if (!compareAtPaise || compareAtPaise <= currentPaise) {
    return null;
  }
  const discount = ((compareAtPaise - currentPaise) / compareAtPaise) * 100;
  return Math.round(discount);
}

export function formatDate(dateString: string): string {
  try {
    const d = new Date(dateString);
    return new Intl.DateTimeFormat('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(d);
  } catch {
    return dateString;
  }
}

