import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Zap, ArrowRight, CreditCard } from 'lucide-react';

export function TrustPaymentBanner() {
  return (
    <section className="py-6 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-gradient-to-r from-teal-800 via-teal-700 to-teal-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md border border-teal-600/40">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 bg-amber-400 text-slate-950 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5 fill-slate-950" />
              <span>Instant & Secure Checkout</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight">
              Pay via UPI, Cards, NetBanking or 0% EMI with Razorpay
            </h3>
            <p className="text-xs text-teal-100 max-w-xl">
              Enjoy 100% buyer protection, 256-bit bank-grade encryption, and seamless refunds on all orders across India.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <Link
              href="/#recommended"
              className="inline-flex items-center gap-2 bg-white text-teal-800 hover:bg-amber-300 hover:text-slate-900 font-bold text-xs sm:text-sm px-6 py-3 rounded-full shadow-md transition-colors"
            >
              <span>Shop Collection</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

