export type AppRole = 'customer' | 'admin';

export type ProductStatus = 'draft' | 'active' | 'archived';

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

export type PaymentStatus =
  | 'pending'
  | 'authorized'
  | 'paid'
  | 'failed'
  | 'refunded'
  | 'partially_refunded';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  iconName?: string;
  parentId?: string | null;
  sortOrder: number;
  isActive: boolean;
  itemCount?: number;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logoUrl?: string;
  isActive: boolean;
}

export interface ProductVariant {
  id: string;
  productId: string;
  sku: string;
  name: string;
  options: Record<string, string>;
  pricePaise: number;
  compareAtPricePaise?: number | null;
  stockQuantity: number;
  lowStockThreshold: number;
  isActive: boolean;
}

export interface ProductImage {
  id: string;
  productId: string;
  imageUrl: string;
  altText: string;
  sortOrder: number;
  isPrimary: boolean;
}

export interface Product {
  id: string;
  categoryId?: string | null;
  categorySlug?: string;
  brandId?: string | null;
  brandName?: string;
  name: string;
  slug: string;
  sku: string;
  shortDescription?: string;
  description: string;
  status: ProductStatus;
  pricePaise: number;
  compareAtPricePaise?: number | null;
  currency: 'INR';
  rating: number;
  reviewCount: number;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  isFeatured?: boolean;
  isClearance?: boolean;
  badge?: string;
  stockQuantity: number;
  primaryImage: string;
  images: ProductImage[];
  variants?: ProductVariant[];
  safetyInfo?: string;
  specifications?: Record<string, string>;
  createdAt: string;
}

export interface CartItem {
  productId: string;
  variantId?: string;
  sku: string;
  name: string;
  variantName?: string;
  pricePaise: number;
  imageUrl: string;
  quantity: number;
  stockQuantity: number;
}

export interface Coupon {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderPaise: number;
  maxDiscountPaise?: number;
  isActive: boolean;
}

export interface Address {
  id?: string;
  recipientName: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  countryCode: 'IN';
  isDefault?: boolean;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  variantId?: string;
  skuSnapshot: string;
  productNameSnapshot: string;
  variantSnapshot: Record<string, string>;
  unitPricePaise: number;
  quantity: number;
  lineTotalPaise: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId?: string | null;
  guestEmail?: string;
  guestPhone?: string;
  guestTrackingTokenHash?: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  currency: 'INR';
  subtotalPaise: number;
  discountPaise: number;
  shippingPaise: number;
  taxPaise: number;
  totalPaise: number;
  couponId?: string;
  shippingAddress: Address;
  items: OrderItem[];
  trackingNumber?: string;
  carrier?: string;
  trackingUrl?: string;
  createdAt: string;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  title?: string;
  body: string;
  isVerifiedPurchase: boolean;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  author: string;
  publishedAt: string;
  readTimeMinutes: number;
  category: string;
}

