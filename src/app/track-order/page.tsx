'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Truck,
  CheckCircle2,
  Clock,
  Package,
  Search,
  ChevronRight,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [searched, setSearched] = useState(false);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNumber.trim()) return;
    setSearched(true);
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <Link href="/" className="hover:text-teal-700">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="font-semibold text-slate-800">Track Order</span>
        </nav>

        {/* Card Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs mb-8 text-center max-w-xl mx-auto">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center mx-auto mb-3">
            <Truck className="w-6 h-6 stroke-[2]" />
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Track Your Shipment
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Enter your order number from your confirmation email or SMS to view live dispatch milestones.
          </p>

          {/* Form */}
          <form onSubmit={handleTrack} className="mt-6 space-y-3 text-left">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Order Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                placeholder="e.g. BC-2026-8492"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Registered Email or Mobile Number
              </label>
              <input
                type="text"
                value={contactInfo}
                onChange={(e) => setContactInfo(e.target.value)}
                placeholder="e.g. ananya@example.com or 9876543210"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-xl text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              <span>Track Order Status</span>
            </button>
          </form>
        </div>

        {/* Live Timeline Result when searched */}
        {searched && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-stone-100 gap-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full">
                  Verified Shipment
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-2">
                  Order #{orderNumber.toUpperCase()}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Courier Partner: <strong>BlueDart Express</strong> • Tracking ID:{' '}
                  <span className="font-mono font-bold text-teal-800">BD8492109IN</span>
                </p>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-xs text-slate-500 block">Estimated Delivery</span>
                <span className="text-sm font-black text-slate-900">Thursday, 2-3 Business Days</span>
              </div>
            </div>

            {/* Timeline Steps */}
            <div className="py-8 max-w-2xl mx-auto">
              <div className="relative border-l-2 border-teal-600 pl-6 space-y-8 ml-4">
                {/* Step 1 */}
                <div className="relative">
                  <div className="absolute -left-[33px] top-0 w-6 h-6 rounded-full bg-teal-600 text-white flex items-center justify-center shadow-xs">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">Order Confirmed</h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Payment verified via Razorpay 256-bit SSL. Inventory reserved.
                    </p>
                    <span className="text-[10px] text-slate-400 font-medium">10:30 AM • Yesterday</span>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="relative">
                  <div className="absolute -left-[33px] top-0 w-6 h-6 rounded-full bg-teal-600 text-white flex items-center justify-center shadow-xs">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                      Packed & Quality Checked
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Item sanitized, tamper-evident sealed, and boxed in Mumbai Fulfilment Centre.
                    </p>
                    <span className="text-[10px] text-slate-400 font-medium">04:15 PM • Yesterday</span>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="relative">
                  <div className="absolute -left-[33px] top-0 w-6 h-6 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shadow-xs animate-pulse">
                    <Truck className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-teal-800">In Transit</h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Departed sort facility. On schedule for doorstep delivery.
                    </p>
                    <span className="text-[10px] text-amber-600 font-bold">In Progress • Today</span>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="relative opacity-50">
                  <div className="absolute -left-[33px] top-0 w-6 h-6 rounded-full bg-stone-200 text-stone-500 flex items-center justify-center">
                    <Package className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-700">Delivered</h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      OTP verification will be requested upon doorstep arrival.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-between text-xs text-teal-900">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-teal-700" />
                <span>Need help with this order? Our support team is available 24/7.</span>
              </div>
              <Link href="/contact" className="font-bold underline text-teal-800 hover:text-teal-950">
                Contact Support
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

