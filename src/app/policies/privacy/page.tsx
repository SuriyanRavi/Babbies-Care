import React from 'react';
import Link from 'next/link';
import { ChevronRight, Shield } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4">
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <Link href="/" className="hover:text-teal-700">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="font-semibold text-slate-800">Privacy Policy</span>
        </nav>

        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-200 shadow-xs space-y-6 text-slate-700 text-xs sm:text-sm leading-relaxed">
          <div className="border-b border-stone-100 pb-4">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Privacy & Data Protection Policy
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Compliant with the Digital Personal Data Protection Act (DPDPA), 2023.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-base font-bold text-slate-900">1. Information We Collect</h2>
            <p>
              We collect only the minimum information necessary to process orders, deliver baby care products, and provide customer support: your name, shipping address, contact email, and phone number.
            </p>

            <h2 className="text-base font-bold text-slate-900">2. Payment Security</h2>
            <p>
              We never store your credit/debit card numbers, UPI PINs, or net banking passwords on our servers. All transactions are securely processed directly by Razorpay, a PCI-DSS Level 1 compliant gateway with 256-bit encryption.
            </p>

            <h2 className="text-base font-bold text-slate-900">3. Zero Data Selling</h2>
            <p>
              We never sell or rent customer data, family details, or browsing habits to third-party data brokers or advertising agencies.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

