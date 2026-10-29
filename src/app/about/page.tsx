import React from 'react';
import Link from 'next/link';
import { ChevronRight, Baby, Heart, ShieldCheck, Sparkles } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4">
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <Link href="/" className="hover:text-teal-700">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="font-semibold text-slate-800">About Us</span>
        </nav>

        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-200 shadow-xs space-y-8 text-slate-700 text-xs sm:text-sm leading-relaxed">
          <div className="border-b border-stone-100 pb-6 text-center max-w-xl mx-auto">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center mx-auto mb-3">
              <Baby className="w-6 h-6" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              About Babbies Care
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Founded by parents and pediatric specialists to bring certified, toxin-free, authentic infant products to families across India.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div className="p-5 rounded-2xl bg-teal-50/60 border border-teal-100 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-teal-700 text-white flex items-center justify-center font-bold">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">100% Genuine Brands</h3>
              <p className="text-xs text-slate-600">
                Direct authorized sourcing with zero tolerance for counterfeit or expired goods.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
                <Heart className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Safe Materials</h3>
              <p className="text-xs text-slate-600">
                Every bottle, teether, and toy is 100% BPA-free, lead-free, and pediatric tested.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-stone-200 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-slate-800 text-white flex items-center justify-center font-bold">
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Fast Dispatch</h3>
              <p className="text-xs text-slate-600">
                Temperature-controlled warehousing and priority doorstep delivery across India.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

