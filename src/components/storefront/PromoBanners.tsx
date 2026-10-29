'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles } from 'lucide-react';

export function PromoBanners() {
  return (
    <section className="py-6 md:py-8 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Banner 1: Baby Clothes Set */}
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-800 to-slate-900 text-white p-6 sm:p-8 flex items-center justify-between shadow-sm min-h-[220px]">
            <div className="relative z-10 max-w-xs space-y-3">
              <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-amber-300 bg-white/10 px-2.5 py-1 rounded-full">
                <Sparkles className="w-3 h-3" />
                Featured Collection
              </span>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight">
                From ₹2,499 <br />
                <span className="text-teal-300 text-lg sm:text-xl font-medium">
                  Organic Baby Clothes Set
                </span>
              </h3>
              <p className="text-xs text-slate-300">
                100% GOTS certified cotton with gentle flat seams.
              </p>
              <Link
                href="/categories/baby-clothes"
                className="inline-flex items-center gap-1.5 bg-amber-400 hover:bg-amber-500 text-slate-950 text-xs font-bold px-4 py-2 rounded-full transition-colors"
              >
                <span>Shop Clothes</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="relative w-36 sm:w-48 h-36 sm:h-48 flex-shrink-0">
              <Image
                src="https://images.unsplash.com/photo-1522771930-78848d9293e8?w=500&auto=format&fit=crop&q=80"
                alt="Baby Clothes Set"
                fill
                className="object-cover rounded-2xl shadow-md rotate-3 hover:rotate-0 transition-transform duration-300"
              />
            </div>
          </div>

          {/* Banner 2: Diapers Promo */}
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#F4EFE6] to-[#EAE2D5] text-stone-900 p-6 sm:p-8 flex items-center justify-between shadow-sm min-h-[220px] border border-stone-300/60">
            <div className="relative z-10 max-w-xs space-y-3">
              <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-teal-800 bg-teal-100/80 px-2.5 py-1 rounded-full">
                Value Pack Savings
              </span>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-stone-900 leading-tight">
                10% OFF <br />
                <span className="text-teal-700 text-lg sm:text-xl font-semibold">
                  For Bamboo Diapers
                </span>
              </h3>
              <p className="text-xs text-stone-600">
                12-hour leak lock core with chemical-free wetness guard.
              </p>
              <Link
                href="/categories/diapering-wipes"
                className="inline-flex items-center gap-1.5 bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold px-4 py-2 rounded-full transition-colors"
              >
                <span>Shop Diapers</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="relative w-36 sm:w-48 h-36 sm:h-48 flex-shrink-0">
              <Image
                src="/images/organic-bamboo-diapers-box.jpg"
                alt="Organic Bamboo Diaper Box"
                fill
                className="object-contain rounded-2xl shadow-md p-1 bg-white/60 -rotate-3 hover:rotate-0 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

