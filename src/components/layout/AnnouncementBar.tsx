import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';

export function AnnouncementBar() {
  return (
    <div className="bg-[#FFDA55] text-slate-900 px-4 py-2 text-xs md:text-sm font-medium border-b border-amber-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="hidden sm:flex items-center gap-2">
          <span className="inline-flex items-center gap-1 font-bold tracking-wide uppercase text-[11px] bg-slate-900 text-white px-2 py-0.5 rounded-full">
            <Sparkles className="w-3 h-3 text-amber-300" />
            Limited Offer
          </span>
          <span className="text-slate-800">
            Convertible Cribs & Nursery Furniture <strong>10% OFF</strong>
          </span>
        </div>

        <div className="flex-1 sm:flex-none flex items-center justify-center sm:justify-end gap-3 mx-auto sm:mx-0">
          <span className="text-slate-800 text-xs">
            Use Code: <span className="font-mono font-bold bg-white/70 px-1.5 py-0.5 rounded border border-amber-400">BABY10</span>
          </span>
          <Link
            href="/categories/nursery-furniture"
            className="inline-flex items-center gap-1 bg-teal-800 hover:bg-teal-900 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm transition-colors"
          >
            <span>Shop Now</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}

