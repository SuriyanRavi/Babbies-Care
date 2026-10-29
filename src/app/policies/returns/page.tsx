import React from 'react';
import Link from 'next/link';
import { ChevronRight, RotateCcw, AlertCircle } from 'lucide-react';

export default function ReturnsPolicyPage() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4">
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <Link href="/" className="hover:text-teal-700">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="font-semibold text-slate-800">Returns & Refunds</span>
        </nav>

        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-200 shadow-xs space-y-6 text-slate-700 text-xs sm:text-sm leading-relaxed">
          <div className="border-b border-stone-100 pb-4">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Returns, Refunds & Cancellation Policy
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Last Updated: January 2026 • 30-Day Money-Back Guarantee
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-base font-bold text-slate-900">1. 30-Day Easy Returns</h2>
            <p>
              We want parents to shop with complete peace of mind. Non-perishable baby gear, strollers, high chairs, and unused unwashed baby clothes can be returned within 30 days of delivery in their original packaging.
            </p>

            <h2 className="text-base font-bold text-slate-900">2. Non-Returnable Hygiene Items</h2>
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900">
              <p className="text-xs">
                For infant health and safety, opened infant formulas, opened diaper packs, unsealed pacifiers, and breast pump accessories cannot be returned once their tamper-evident seal is broken, unless arrived damaged or defective.
              </p>
            </div>

            <h2 className="text-base font-bold text-slate-900">3. Rapid Refund Processing</h2>
            <p>
              Once your return arrives and passes inspection at our fulfilment centre, your full refund is initiated within 48 hours directly to your original payment source (UPI, Card, or NetBanking account) via Razorpay.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

