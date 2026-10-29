'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  CheckCircle2,
  Package,
  Truck,
  ArrowRight,
  ShieldCheck,
  Calendar,
} from 'lucide-react';

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('orderNumber') || 'BC-2026-849201';
  const token = searchParams.get('token');

  return (
    <div className="bg-white rounded-3xl border border-stone-200/90 shadow-sm p-8 sm:p-10 text-center">
      {/* Success Check Icon */}
      <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4 border border-emerald-100 shadow-xs">
        <CheckCircle2 className="w-9 h-9 stroke-[2.2]" />
      </div>

      <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full">
        Payment Verified
      </span>

      <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-3">
        Thank you for your order!
      </h1>

      <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-md mx-auto">
        Your payment has been safely processed via Razorpay. A confirmation email and tracking link have been dispatched.
      </p>

      {/* Order Details Badge */}
      <div className="my-6 p-4 rounded-2xl bg-stone-50 border border-stone-200 text-left space-y-2 text-xs">
        <div className="flex justify-between items-center">
          <span className="text-slate-500">Order Reference:</span>
          <span className="font-mono font-bold text-slate-900 text-sm">
            #{orderNumber}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-500">Estimated Delivery:</span>
          <span className="font-bold text-slate-800 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-teal-600" />
            Within 2-4 Business Days
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-500">Carrier Partner:</span>
          <span className="font-semibold text-slate-800">BlueDart Priority Express</span>
        </div>
      </div>

      {/* Action CTAs */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
        <Link
          href="/track-order"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold rounded-xl shadow-md transition-colors"
        >
          <Truck className="w-4 h-4" />
          <span>Track Shipment Status</span>
        </Link>

        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-stone-100 hover:bg-stone-200 text-slate-800 text-xs font-bold rounded-xl transition-colors"
        >
          <span>Continue Shopping</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="mt-8 pt-6 border-t border-stone-100 flex items-center justify-center gap-2 text-[11px] text-slate-400">
        <ShieldCheck className="w-4 h-4 text-teal-600" />
        <span>100% Doctor-Verified Baby Products Guarantee</span>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen py-12">
      <div className="max-w-2xl mx-auto px-4">
        <Suspense
          fallback={
            <div className="p-12 text-center text-sm font-semibold text-slate-600">
              Loading order confirmation...
            </div>
          }
        >
          <OrderSuccessContent />
        </Suspense>
      </div>
    </div>
  );
}
