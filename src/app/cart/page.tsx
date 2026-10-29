'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  Tag,
  CheckCircle2,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/formatters';

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotalPaise, itemCount } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);

  const freeShippingThresholdPaise = 99900;
  const isFreeShipping = subtotalPaise >= freeShippingThresholdPaise;
  const shippingPaise = isFreeShipping || items.length === 0 ? 0 : 9900;

  // Coupon evaluation
  let discountPaise = 0;
  if (appliedCoupon === 'BABY10') {
    discountPaise = Math.round(subtotalPaise * 0.1);
  } else if (appliedCoupon === 'BABY15') {
    discountPaise = Math.round(subtotalPaise * 0.15);
  }

  const grandTotalPaise = Math.max(0, subtotalPaise - discountPaise + shippingPaise);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError(null);
    const code = couponCode.trim().toUpperCase();

    if (code === 'BABY10' || code === 'BABY15') {
      setAppliedCoupon(code);
      setCouponCode('');
    } else {
      setCouponError('Invalid coupon code. Try BABY10 or BABY15');
    }
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <Link href="/" className="hover:text-teal-700">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="font-semibold text-slate-800">Shopping Cart</span>
        </nav>

        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-8">
          Your Shopping Cart ({itemCount} items)
        </h1>

        {items.length === 0 ? (
          <div className="bg-white rounded-3xl border border-stone-200 p-12 text-center max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-slate-800">Your cart is currently empty</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
              Add some gentle baby care essentials or infant formula to get started.
            </p>
            <Link
              href="/categories"
              className="mt-6 inline-block px-6 py-3 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-bold transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Cart Items Table */}
            <div className="lg:col-span-8 bg-white rounded-3xl border border-stone-200 p-6 shadow-xs divide-y divide-stone-100">
              {items.map((item) => (
                <div key={`${item.productId}-${item.variantId || 'default'}`} className="py-4 first:pt-0 last:pb-0 flex gap-4 sm:gap-6">
                  <div className="relative w-20 sm:w-24 h-20 sm:h-24 rounded-2xl bg-stone-50 border border-stone-200 overflow-hidden flex-shrink-0">
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h3 className="text-sm sm:text-base font-bold text-slate-900">
                          {item.name}
                        </h3>
                        <span className="text-xs text-slate-400 font-mono mt-0.5 block">
                          SKU: {item.sku}
                        </span>
                      </div>

                      <button
                        onClick={() => removeItem(item.productId, item.variantId)}
                        className="text-slate-400 hover:text-red-500 p-1 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-stone-300 rounded-xl bg-stone-50">
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1, item.variantId)}
                          className="p-1.5 hover:bg-stone-200 text-slate-600 rounded-l-xl transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-10 text-center text-xs font-bold text-slate-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1, item.variantId)}
                          disabled={item.quantity >= item.stockQuantity}
                          className="p-1.5 hover:bg-stone-200 text-slate-600 rounded-r-xl disabled:opacity-30 transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-base font-black text-slate-900">
                          {formatPrice(item.pricePaise * item.quantity)}
                        </span>
                        {item.quantity > 1 && (
                          <span className="block text-[11px] text-slate-400">
                            {formatPrice(item.pricePaise)} each
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary Box */}
            <div className="lg:col-span-4 bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-6">
              <h2 className="text-base font-black text-slate-900 tracking-tight pb-3 border-b border-stone-100">
                Order Summary
              </h2>

              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="space-y-2">
                <label className="text-xs font-bold text-slate-700 block">
                  Promotional Coupon Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="e.g. BABY10"
                    className="flex-1 bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs uppercase font-mono font-bold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-stone-900 hover:bg-black text-white text-xs font-bold rounded-xl transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {appliedCoupon && (
                  <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold mt-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Coupon <strong>{appliedCoupon}</strong> applied!</span>
                  </div>
                )}
                {couponError && (
                  <p className="text-xs text-red-500 font-medium">{couponError}</p>
                )}
              </form>

              {/* Breakdown */}
              <div className="space-y-2.5 text-xs text-slate-600 pt-3 border-t border-stone-100">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-slate-900">{formatPrice(subtotalPaise)}</span>
                </div>

                {discountPaise > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Discount ({appliedCoupon})</span>
                    <span>-{formatPrice(discountPaise)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Standard Shipping</span>
                  {shippingPaise === 0 ? (
                    <span className="text-teal-700 font-bold">FREE</span>
                  ) : (
                    <span className="font-bold text-slate-900">{formatPrice(shippingPaise)}</span>
                  )}
                </div>

                <div className="flex justify-between text-slate-400 text-[11px]">
                  <span>Estimated GST (Inclusive)</span>
                  <span>Included</span>
                </div>

                <div className="pt-3 border-t border-stone-200 flex justify-between items-baseline text-base font-black text-slate-900">
                  <span>Grand Total</span>
                  <span className="text-xl text-teal-800">{formatPrice(grandTotalPaise)}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <Link
                href="/checkout"
                className="w-full py-3.5 px-6 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 group"
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 pt-2">
                <ShieldCheck className="w-4 h-4 text-teal-600" />
                <span>256-Bit SSL Razorpay Encryption</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

