import React from 'react';
import Link from 'next/link';
import { ChevronRight, Truck, Clock, ShieldCheck } from 'lucide-react';

export default function ShippingPolicyPage() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <Link href="/" className="hover:text-teal-700">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="font-semibold text-slate-800">Shipping Policy</span>
        </nav>

        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-200 shadow-xs space-y-6 text-slate-700 text-xs sm:text-sm leading-relaxed">
          <div className="border-b border-stone-100 pb-4">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Shipping & Delivery Policy
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Last Updated: January 2026 • Babbies Care India Pvt. Ltd.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-base font-bold text-slate-900">1. Coverage & Serviceability</h2>
            <p>
              Babbies Care delivers across all serviceable Indian PIN codes via trusted logistics partners including BlueDart, Delhivery, and India Post. We ensure temperature-monitored, hygienic transit for all infant formula, feeding bottles, and baby gear.
            </p>

            <h2 className="text-base font-bold text-slate-900">2. Shipping Charges & Free Delivery</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Free Standard Delivery:</strong> On all orders totaling ₹999 or more across India.</li>
              <li><strong>Standard Shipping:</strong> A flat delivery fee of ₹99 applies on orders under ₹999.</li>
            </ul>

            <h2 className="text-base font-bold text-slate-900">3. Dispatch Timelines & Tracking</h2>
            <p>
              Orders confirmed before 1:00 PM IST on business days are dispatched within 24 hours. Metros typically receive delivery within 2-3 business days; other regions within 3-5 business days. Real-time SMS and email tracking links are generated immediately upon dispatch.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

