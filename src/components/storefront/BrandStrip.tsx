import React from 'react';
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';
import { BRANDS } from '@/lib/catalog-data';

export function BrandStrip() {
  return (
    <section className="py-6 sm:py-7 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
            <span>Authorized Retail Partner</span>
          </div>
          <h3 className="text-sm sm:text-base font-bold text-slate-800 tracking-tight mt-1">
            Mentioned brands on <span className="text-teal-700">Babbies Care</span>
          </h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
          {BRANDS.map((brand) => (
            <Link
              key={brand.id}
              href={`/search?q=${encodeURIComponent(brand.name)}`}
              className="bg-white border border-slate-200/90 rounded-xl px-3 py-2 sm:px-4 h-10 sm:h-11 flex items-center justify-center text-center font-bold text-slate-700 hover:text-teal-700 hover:border-teal-400 hover:shadow-xs transition-all text-xs sm:text-sm shadow-2xs"
            >
              <span>{brand.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

