import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4">
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <Link href="/" className="hover:text-teal-700">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="font-semibold text-slate-800">Terms & Conditions</span>
        </nav>

        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-200 shadow-xs space-y-6 text-slate-700 text-xs sm:text-sm leading-relaxed">
          <div className="border-b border-stone-100 pb-4">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Terms & Conditions
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Babbies Care India Pvt. Ltd. • Governing Law: Laws of India
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-base font-bold text-slate-900">1. Acceptance of Terms</h2>
            <p>
              By accessing and purchasing from Babbies Care, you agree to comply with and be bound by these terms, our shipping policy, returns policy, and privacy policy.
            </p>

            <h2 className="text-base font-bold text-slate-900">2. Catalog Pricing & Authenticity</h2>
            <p>
              All listed prices are in Indian Rupees (INR) inclusive of applicable GST taxes. We guarantee 100% genuine products sourced directly from authorized brand distributors and manufacturers.
            </p>

            <h2 className="text-base font-bold text-slate-900">3. Pediatric Disclaimer</h2>
            <p>
              Product descriptions and blog articles are for educational informational purposes only. They do not constitute formal medical or pediatric advice. Always consult a qualified pediatrician for individual health questions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

