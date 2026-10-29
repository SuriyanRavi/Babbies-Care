import React from 'react';
import Link from 'next/link';
import { ChevronRight, HelpCircle } from 'lucide-react';

export default function FAQPage() {
  const faqs = [
    {
      q: 'Are all products sold on Babbies Care 100% authentic?',
      a: 'Yes. We are authorized direct distributors for our featured partner brands: Chicco, Pampers, Mamaearth, and Mothercare. All products come in original manufacturer packaging with valid expiry dates.',
    },
    {
      q: 'How long does delivery take?',
      a: 'Orders are dispatched within 24 hours. Metros (Mumbai, Delhi, Bengaluru, Chennai, Hyderabad, Kolkata) generally receive orders within 2 to 3 business days. Other regions take 3 to 5 business days.',
    },
    {
      q: 'What are the shipping charges?',
      a: 'We offer free delivery on all orders above ₹999 across India. For orders below ₹999, a flat shipping fee of ₹99 is applied.',
    },
    {
      q: 'What payment options do you support?',
      a: 'We support all major payment modes via Razorpay: UPI (Google Pay, PhonePe, Paytm, BHIM), Credit/Debit cards (Visa, MasterCard, RuPay, Maestro), NetBanking from 50+ Indian banks, and 0% EMI on eligible credit cards.',
    },
    {
      q: 'How do I return an item?',
      a: 'Non-perishable baby gear, strollers, and unwashed clothing can be returned within 30 days of delivery. For hygiene reasons, infant formulas and opened diaper packs cannot be returned once unsealed.',
    },
  ];

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4">
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <Link href="/" className="hover:text-teal-700">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="font-semibold text-slate-800">FAQs</span>
        </nav>

        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-200 shadow-xs space-y-6">
          <div className="border-b border-stone-100 pb-6 text-center max-w-xl mx-auto">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center mx-auto mb-3">
              <HelpCircle className="w-6 h-6" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Everything you need to know about shopping, safety certifications, shipping, and returns.
            </p>
          </div>

          <div className="divide-y divide-stone-100 space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="pt-4 first:pt-0">
                <h3 className="text-sm font-bold text-slate-900 mb-1.5">{faq.q}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

