import React from 'react';
import Link from 'next/link';
import { ChevronRight, Phone, Mail, MapPin, Clock, Headphones } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4">
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <Link href="/" className="hover:text-teal-700">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="font-semibold text-slate-800">Contact Us</span>
        </nav>

        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-200 shadow-xs space-y-8">
          <div className="border-b border-stone-100 pb-6 text-center max-w-xl mx-auto">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center mx-auto mb-3">
              <Headphones className="w-6 h-6" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Customer Support & Inquiries
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Our parenting support team is here to assist with order tracking, product guidance, and returns.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-600">
            <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 space-y-4">
              <h3 className="font-bold text-slate-900 text-sm">Direct Contacts</h3>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-teal-700 flex-shrink-0" />
                <div>
                  <span className="block font-bold text-slate-800">+91 98765 43210</span>
                  <span className="text-[11px] text-slate-500">Mon - Sat: 9:00 AM - 8:00 PM IST</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-teal-700 flex-shrink-0" />
                <div>
                  <span className="block font-bold text-slate-800">support@babbiescare.in</span>
                  <span className="text-[11px] text-slate-500">24-hour turnaround time</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-teal-700 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="block font-bold text-slate-800">Registered Office</span>
                  <span className="text-[11px] text-slate-500">
                    Babbies Care India Pvt. Ltd., Level 5, Platina, Bandra Kurla Complex, Mumbai 400051
                  </span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-teal-50/70 border border-teal-200 space-y-3">
              <h3 className="font-bold text-teal-900 text-sm">Need Rapid Help?</h3>
              <p className="text-xs leading-relaxed text-slate-600">
                You can track your order dispatch status or initiate a 30-day return self-service anytime from our tracking portal.
              </p>
              <Link
                href="/track-order"
                className="inline-block px-5 py-2.5 bg-teal-700 hover:bg-teal-800 text-white rounded-xl font-bold text-xs shadow-sm transition-colors"
              >
                Go to Order Tracker
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

