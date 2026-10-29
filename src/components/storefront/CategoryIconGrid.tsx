'use client';

import React from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Flame,
  Package,
  Droplets,
  Utensils,
  Compass,
  Bed,
  Shirt,
} from 'lucide-react';
import { DiaperIcon } from '@/components/ui/DiaperIcon';
import { TeetherIcon } from '@/components/ui/TeetherIcon';
import { POPULAR_ICON_CATEGORIES } from '@/lib/catalog-data';

const ICON_MAP: Record<string, React.ElementType> = {
  Sparkles,
  Flame,
  Package,
  Droplets,
  Utensils,
  Compass,
  Bed,
  Shirt,
  Diaper: DiaperIcon,
  Teether: TeetherIcon,
  HeartHandshake: TeetherIcon,
};

export function CategoryIconGrid() {
  return (
    <section className="py-8 md:py-10 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-xl sm:text-2xl font-black text-teal-800 tracking-tight">
            Most popular categories for baby products
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Curated baby gear, verified nutrition, and organic everyday essentials
          </p>
        </div>

        {/* 10 Circular Category Items */}
        <div className="flex items-center justify-start lg:justify-between gap-4 sm:gap-6 overflow-x-auto pb-4 no-scrollbar">
          {POPULAR_ICON_CATEGORIES.map((cat, idx) => {
            const Icon = ICON_MAP[cat.icon] || Sparkles;
            const isRedPill = cat.color?.includes('bg-red');
            const isTealPill = cat.color?.includes('bg-teal');

            return (
              <Link
                key={idx}
                href={cat.slug === 'all' ? '/categories' : `/categories/${cat.slug}`}
                className="flex flex-col items-center group flex-shrink-0 min-w-[76px] sm:min-w-[88px]"
              >
                {/* Circle Container */}
                <div
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-sm ${
                    isRedPill
                      ? 'bg-rose-500 text-white shadow-rose-200'
                      : isTealPill
                      ? 'bg-teal-700 text-white shadow-teal-200'
                      : 'bg-teal-50 text-teal-700 group-hover:bg-teal-100 border border-teal-100'
                  }`}
                >
                  <Icon className="w-7 h-7 sm:w-8 sm:h-8 stroke-[1.8]" />
                </div>

                {/* Label */}
                <span className="text-xs font-semibold text-slate-700 group-hover:text-teal-700 text-center mt-2.5 max-w-[80px] sm:max-w-[90px] leading-snug">
                  {cat.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

