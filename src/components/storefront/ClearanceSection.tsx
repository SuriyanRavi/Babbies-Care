'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { PRODUCTS } from '@/lib/catalog-data';

export function ClearanceSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const offset = direction === 'left' ? -320 : 320;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const clearanceProducts = PRODUCTS.filter((p) => p.isClearance);
  const displayProducts = clearanceProducts.length > 0 ? clearanceProducts : PRODUCTS;

  return (
    <section id="clearance" className="py-10 md:py-12 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            <span className="text-teal-700">Clearance</span> Sale | Up to 70% OFF
          </h2>

          <Link
            href="/categories/clearance"
            className="text-xs text-slate-400 hover:text-teal-700 font-medium transition-colors"
          >
            View All
          </Link>
        </div>

        {/* Carousel Row with Side Capsules */}
        <div className="relative flex items-center gap-2 sm:gap-3">
          {/* Left Navigation Capsule */}
          <button
            onClick={() => scroll('left')}
            className="hidden md:flex w-6 lg:w-7 h-16 bg-[#F1F3F5] hover:bg-teal-50 text-slate-400 hover:text-teal-700 rounded-full flex-col items-center justify-center flex-shrink-0 transition-colors shadow-2xs"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Cards Grid */}
          <div
            ref={scrollContainerRef}
            className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 flex-1 overflow-x-auto lg:overflow-visible no-scrollbar pb-2"
          >
            {displayProducts.slice(0, 4).map((product) => (
              <div key={product.id} className="min-w-[170px] sm:min-w-0">
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {/* Right Navigation Capsule */}
          <button
            onClick={() => scroll('right')}
            className="hidden md:flex w-6 lg:w-7 h-16 bg-[#F1F3F5] hover:bg-teal-50 text-slate-400 hover:text-teal-700 rounded-full flex-col items-center justify-center flex-shrink-0 transition-colors shadow-2xs"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
