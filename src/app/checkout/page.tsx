'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  ShieldCheck,
  CreditCard,
  Truck,
  ChevronRight,
  ArrowRight,
  AlertCircle,
  Loader2,
  Lock,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/formatters';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotalPaise, clearCart } = useCart();

  const [formData, setFormData] = useState({
    recipientName: '',
    email: '',
    phone: '',
    line1: '',
    line2: '',
    postalCode: '',
    city: '',
    state: 'Maharashtra',
  });

  const [couponCode, setCouponCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const freeShippingThresholdPaise = 99900;
  const isFreeShipping = subtotalPaise >= freeShippingThresholdPaise;
  const shippingPaise = isFreeShipping || items.length === 0 ? 0 : 9900;

  let discountPaise = 0;
  if (couponCode.toUpperCase() === 'BABY10') {
    discountPaise = Math.round(subtotalPaise * 0.1);
  } else if (couponCode.toUpperCase() === 'BABY15') {
    discountPaise = Math.round(subtotalPaise * 0.15);
  }

  const grandTotalPaise = Math.max(0, subtotalPaise - discountPaise + shippingPaise);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (items.length === 0) {
      setErrorMessage('Your cart is empty');
      return;
    }

    // Validate phone (10 digits starting with 6-9)
    if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      setErrorMessage('Please enter a valid 10-digit Indian mobile number');
      return;
    }

    // Validate PIN code (6 digits)
    if (!/^\d{6}$/.test(formData.postalCode)) {
      setErrorMessage('Please enter a valid 6-digit Indian PIN code');
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Create order on server
      const res = await fetch('/api/checkout/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((i) => ({
            productId: i.productId,
            variantId: i.variantId,
            quantity: i.quantity,
          })),
          shippingAddress: formData,
          couponCode: couponCode.trim().toUpperCase() || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to create order');
      }

      // 2. In test/development environment, simulate instant signature verification
      const verifyRes = await fetch('/api/payments/razorpay/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderNumber: data.orderNumber,
          razorpayOrderId: data.razorpayOrderId,
          razorpayPaymentId: `pay_test_${Math.floor(100000 + Math.random() * 900000)}`,
        }),
      });

      const verifyData = await verifyRes.json();
      if (!verifyRes.ok) {
        throw new Error(verifyData.error || 'Payment verification failed');
      }

      // 3. Clear cart & redirect to order success page
      clearCart();
      router.push(`/order/success?orderNumber=${data.orderNumber}&token=${data.guestToken}`);
    } catch (err: any) {
      setErrorMessage(err.message || 'An error occurred during checkout');
      setIsSubmitting(false);
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
          <Link href="/cart" className="hover:text-teal-700">
            Cart
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="font-semibold text-slate-800">Checkout</span>
        </nav>

        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-8">
          Secure Guest Checkout
        </h1>

        {errorMessage && (
          <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Form: Delivery Address & Customer Details */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-xs">
            <form onSubmit={handleCheckoutSubmit} id="checkout-form" className="space-y-6">
              <div>
                <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Truck className="w-4 h-4 text-teal-700" />
                  <span>1. Contact & Delivery Details</span>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="sm:col-span-2">
                    <label className="block font-semibold text-slate-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      name="recipientName"
                      value={formData.recipientName}
                      onChange={handleInputChange}
                      placeholder="e.g. Priya Sharma"
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="priya@example.com"
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <div className="flex">
                      <span className="bg-stone-200 text-slate-700 font-bold px-3 py-2.5 rounded-l-xl text-xs flex items-center border border-r-0 border-stone-200">
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="9876543210"
                        className="w-full bg-stone-50 border border-stone-200 rounded-r-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-semibold text-slate-700 mb-1">
                      Street Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      name="line1"
                      value={formData.line1}
                      onChange={handleInputChange}
                      placeholder="Flat/House No., Building, Street Name"
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-semibold text-slate-700 mb-1">
                      Apartment / Landmark (Optional)
                    </label>
                    <input
                      type="text"
                      name="line2"
                      value={formData.line2}
                      onChange={handleInputChange}
                      placeholder="Near Apollo Hospital"
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      PIN Code <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      placeholder="400051"
                      maxLength={6}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Mumbai"
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-semibold text-slate-700 mb-1">
                      State <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
                    >
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Delhi">Delhi NCR</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Gujarat">Gujarat</option>
                      <option value="Telangana">Telangana</option>
                      <option value="Uttar Pradesh">Uttar Pradesh</option>
                      <option value="West Bengal">West Bengal</option>
                      <option value="Rajasthan">Rajasthan</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Payment Method Details */}
              <div className="pt-6 border-t border-stone-100">
                <h2 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-teal-700" />
                  <span>2. Payment Option</span>
                </h2>

                <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-teal-700 text-white flex items-center justify-center font-bold text-xs">
                      UPI
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">
                        Razorpay Secure Gateway
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        Google Pay, PhonePe, Paytm, All Major Cards & NetBanking
                      </p>
                    </div>
                  </div>
                  <Lock className="w-4 h-4 text-teal-700" />
                </div>
              </div>
            </form>
          </div>

          {/* Right Summary Sidebar */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-6">
            <h2 className="text-base font-black text-slate-900 tracking-tight pb-3 border-b border-stone-100">
              Review Items ({items.length})
            </h2>

            {/* Items list */}
            <div className="max-h-64 overflow-y-auto divide-y divide-stone-100 pr-2">
              {items.map((item) => (
                <div key={`${item.productId}-${item.variantId || 'default'}`} className="py-3 flex gap-3">
                  <div className="relative w-14 h-14 rounded-lg bg-stone-50 border border-stone-200 overflow-hidden flex-shrink-0">
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-semibold text-slate-800 line-clamp-1">
                      {item.name}
                    </h4>
                    <span className="text-[11px] text-slate-500">Qty: {item.quantity}</span>
                    <span className="block text-xs font-bold text-slate-900 mt-0.5">
                      {formatPrice(item.pricePaise * item.quantity)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Coupon Code Input */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Coupon Code
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="e.g. BABY10"
                  className="flex-1 bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs uppercase font-mono font-bold text-slate-800"
                />
              </div>
            </div>

            {/* Breakdown */}
            <div className="space-y-2 text-xs text-slate-600 pt-3 border-t border-stone-100">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-slate-900">{formatPrice(subtotalPaise)}</span>
              </div>

              {discountPaise > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Discount</span>
                  <span>-{formatPrice(discountPaise)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Shipping</span>
                {shippingPaise === 0 ? (
                  <span className="text-teal-700 font-bold">FREE</span>
                ) : (
                  <span className="font-bold text-slate-900">{formatPrice(shippingPaise)}</span>
                )}
              </div>

              <div className="pt-3 border-t border-stone-200 flex justify-between items-baseline text-base font-black text-slate-900">
                <span>Total Amount</span>
                <span className="text-xl text-teal-800">{formatPrice(grandTotalPaise)}</span>
              </div>
            </div>

            {/* Pay Button */}
            <button
              type="submit"
              form="checkout-form"
              disabled={isSubmitting || items.length === 0}
              className="w-full py-3.5 px-6 bg-teal-700 hover:bg-teal-800 disabled:bg-stone-300 text-white font-bold rounded-xl text-sm shadow-md transition-all flex items-center justify-center gap-2 group cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Processing Payment...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Pay {formatPrice(grandTotalPaise)} via Razorpay</span>
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 pt-1">
              <ShieldCheck className="w-4 h-4 text-teal-600" />
              <span>Certified 256-Bit SSL Razorpay Encryption</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

