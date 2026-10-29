'use client';

import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { PRODUCTS } from '@/lib/catalog-data';

const RECOMMENDED_TABS = [
  { id: 'bestseller', label: 'Best Seller' },
  { id: 'toprated', label: 'Top Rated' },
  { id: 'pregnancy', label: 'Pregnancy & Postpartum' },
  { id: 'milks-foods', label: 'Milks & Foods' },
  { id: 'diapers-wipes', label: 'Diapers & Wipes' },
  { id: 'infant', label: 'Infant' },
  { id: 'strollers', label: 'Strollers' },
  { id: 'baby-out', label: 'Baby Out' },
];

export function RecommendedProducts() {
  const [activeTab, setActiveTab] = useState('bestseller');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const offset = direction === 'left' ? -320 : 320;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const filteredProducts = PRODUCTS.filter((p) => {
    if (activeTab === 'bestseller') return p.badge?.includes('Best Seller') || p.reviewCount >= 40;
    if (activeTab === 'toprated') return p.rating >= 4.8;
    if (activeTab === 'pregnancy') return p.categorySlug === 'bath-skincare' || p.categorySlug === 'health-safety';
    if (activeTab === 'milks-foods') return p.categorySlug === 'baby-food-formula';
    if (activeTab === 'diapers-wipes') return p.categorySlug === 'diapering-wipes';
    if (activeTab === 'infant') return p.categorySlug === 'teethers-pacifiers' || p.categorySlug === 'toys-learning';
    if (activeTab === 'strollers') return p.categorySlug === 'strollers-travel';
    if (activeTab === 'baby-out') return p.categorySlug === 'strollers-travel' || p.categorySlug === 'baby-clothes';
    return true;
  });

  // Fallback to all products if filter returns no items
  const displayProducts = filteredProducts.length > 0 ? filteredProducts : PRODUCTS;

  return (
    <section id="recommended" className="py-10 md:py-12 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4">
        {/* Title Centered */}
        <div className="text-center mb-5">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            <span className="text-teal-700">Recommended</span> by Babbies Care
          </h2>
        </div>

        {/* Filter Pills Centered */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-8">
          {RECOMMENDED_TABS.map((tab) => {
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-teal-700 text-white shadow-xs font-bold'
                    : 'bg-[#F1F3F5] text-slate-700 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
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
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 flex-1 overflow-x-auto lg:overflow-visible no-scrollbar pb-2"
          >
            {displayProducts.slice(0, 5).map((product) => (
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
