'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Star, Gift } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { PRODUCTS } from '@/lib/catalog-data';
import { formatPrice } from '@/lib/formatters';
import { useWishlist } from '@/context/WishlistContext';

const NEW_TABS = [
  { id: 'featured', label: 'Featured' },
  { id: 'pregnancy', label: 'Pregnancy & Postpartum' },
  { id: 'milks-foods', label: 'Milks & Foods' },
  { id: 'diapers-wipes', label: 'Diapers & Wipes' },
  { id: 'infant', label: 'Infant' },
  { id: 'strollers', label: 'Strollers' },
  { id: 'baby-out', label: 'Baby Out' },
];

export function NewArrivals() {
  const [activeTab, setActiveTab] = useState('featured');
  const { isWishlisted, toggleWishlist } = useWishlist();

  // Highlight special items for the 2 special promo cards in Column 1
  const strollerProduct =
    PRODUCTS.find((p) => p.slug === 'compact-fold-travel-stroller-lightweight') ||
    PRODUCTS.find((p) => p.slug.includes('stroller')) ||
    PRODUCTS[1];

  const diaperProduct =
    PRODUCTS.find((p) => p.slug === 'organic-bamboo-diapers-monthly-box-pack-of-96') ||
    PRODUCTS[13] ||
    PRODUCTS[0];

  // Map remaining columns to match Figma design
  const row1Col2 = PRODUCTS.find((p) => p.slug === 'dynamic-sports-650et-electric-scooter-yellow') || PRODUCTS[11];
  const row1Col3 = PRODUCTS.find((p) => p.slug === 'cosme-bottle-feeding') || PRODUCTS[12];
  const row1Col4 = PRODUCTS.find((p) => p.slug === 'convertible-high-chair-removable-tray') || PRODUCTS[2];

  const row2Col2 = PRODUCTS.find((p) => p.slug === 'baby-bouncer-chair-soothing-vibrations') || PRODUCTS[1];
  const row2Col3 = PRODUCTS.find((p) => p.slug === 'plant-based-ultra-gentle-baby-wipes') || PRODUCTS[4];
  const row2Col4 = PRODUCTS.find((p) => p.slug === 'food-pocket-for-infant-silicone-bibs') || PRODUCTS[9];

  return (
    <section className="py-10 md:py-12 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            <span className="text-teal-700">New</span> Arrival
          </h2>

          <Link
            href="/search?filter=new"
            className="text-xs text-slate-400 hover:text-teal-700 font-medium transition-colors"
          >
            View All
          </Link>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar">
          {NEW_TABS.map((tab) => {
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-teal-700 text-white font-bold shadow-xs'
                    : 'bg-[#F1F3F5] text-slate-700 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* 2-Rows x 4-Columns Grid Matching Reference Image Exactly */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
          {/* ROW 1 - COL 1: Special Horizontal Card + Gift Promo */}
          <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden hover:shadow-card-hover hover:border-teal-300 transition-all duration-300 flex flex-col justify-between">
            {/* Top Product Half */}
            <div className="p-3.5 flex flex-col justify-between flex-1 relative">
              {/* Badges */}
              <div className="flex items-center gap-1.5 mb-2">
                <span className="bg-black text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  NEW
                </span>
                <span className="bg-black text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  GIFT
                </span>
              </div>

              <div className="grid grid-cols-12 gap-3 items-center">
                {/* Image on Left */}
                <div className="col-span-5 relative aspect-square w-full">
                  <Image
                    src={strollerProduct.primaryImage}
                    alt={strollerProduct.name}
                    fill
                    className="object-contain"
                  />
                </div>

                {/* Details on Right */}
                <div className="col-span-7 flex flex-col justify-between h-full">
                  <Link href={`/products/${strollerProduct.slug}`}>
                    <h3 className="text-xs font-semibold text-slate-800 line-clamp-2 hover:text-teal-700 leading-snug">
                      {strollerProduct.name}
                    </h3>
                  </Link>

                  <div className="flex items-center gap-1 text-amber-400 text-[10px] my-1">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-2.5 h-2.5 fill-amber-400 stroke-amber-400" />
                      ))}
                    </div>
                    <span className="text-slate-400">({strollerProduct.reviewCount})</span>
                  </div>

                  <div className="text-sm font-bold text-slate-900 mt-1">
                    {formatPrice(strollerProduct.pricePaise)}
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2">
                    <span>962 Purchases</span>
                    <button
                      onClick={() => toggleWishlist(strollerProduct.id)}
                      className="p-1 hover:text-rose-500"
                      aria-label="Wishlist"
                    >
                      <Heart
                        className={`w-3.5 h-3.5 ${
                          isWishlisted(strollerProduct.id)
                            ? 'fill-rose-500 text-rose-500'
                            : 'text-slate-300'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Gift Promo Strip */}
            <div className="bg-[#FFF8EE] border-t border-amber-200/60 p-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200/80 flex items-center justify-center flex-shrink-0 shadow-2xs">
                <Gift className="w-5 h-5 text-teal-700" />
              </div>
              <div className="text-[10px] text-slate-700 space-y-0.5 leading-tight">
                <p className="font-semibold text-slate-800">
                  • Buy <span className="text-red-500 font-bold">02</span> boxes get a{' '}
                  <span className="font-bold text-slate-900">Snack Tray</span>
                </p>
                <p className="font-semibold text-slate-800">
                  • Buy <span className="text-red-500 font-bold">04</span> boxes get a{' '}
                  <span className="font-bold text-slate-900">Free Block Toys</span>
                </p>
                <p className="text-[9px] text-slate-400 pt-0.5">
                  Promotion will expire in: 09:00pm, 25/5/2026
                </p>
              </div>
            </div>
          </div>

          {/* ROW 1 - COL 2 */}
          <div>
            <ProductCard product={row1Col2} />
          </div>

          {/* ROW 1 - COL 3 */}
          <div>
            <ProductCard product={row1Col3} />
          </div>

          {/* ROW 1 - COL 4 */}
          <div>
            <ProductCard product={row1Col4} />
          </div>

          {/* ROW 2 - COL 1: Special Horizontal Card + Gift Promo */}
          <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden hover:shadow-card-hover hover:border-teal-300 transition-all duration-300 flex flex-col justify-between">
            {/* Top Product Half */}
            <div className="p-3.5 flex flex-col justify-between flex-1 relative">
              {/* Badges */}
              <div className="flex items-center gap-1.5 mb-2">
                <span className="bg-black text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  NEW
                </span>
                <span className="bg-black text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  GIFT
                </span>
              </div>

              <div className="grid grid-cols-12 gap-3 items-center">
                {/* Image on Left */}
                <div className="col-span-5 relative aspect-square w-full">
                  <Image
                    src={diaperProduct.primaryImage}
                    alt={diaperProduct.name}
                    fill
                    className="object-contain"
                  />
                </div>

                {/* Details on Right */}
                <div className="col-span-7 flex flex-col justify-between h-full">
                  <Link href={`/products/${diaperProduct.slug}`}>
                    <h3 className="text-xs font-semibold text-slate-800 line-clamp-2 hover:text-teal-700 leading-snug">
                      {diaperProduct.name}
                    </h3>
                  </Link>

                  <div className="flex items-center gap-1 text-amber-400 text-[10px] my-1">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-2.5 h-2.5 fill-amber-400 stroke-amber-400" />
                      ))}
                    </div>
                    <span className="text-slate-400">({diaperProduct.reviewCount})</span>
                  </div>

                  <div className="text-sm font-bold text-slate-900 mt-1">
                    {formatPrice(diaperProduct.pricePaise)}
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2">
                    <span>263 Purchases</span>
                    <button
                      onClick={() => toggleWishlist(diaperProduct.id)}
                      className="p-1 hover:text-rose-500"
                      aria-label="Wishlist"
                    >
                      <Heart
                        className={`w-3.5 h-3.5 ${
                          isWishlisted(diaperProduct.id)
                            ? 'fill-rose-500 text-rose-500'
                            : 'text-slate-300'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Gift Promo Strip */}
            <div className="bg-[#FFF8EE] border-t border-amber-200/60 p-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200/80 flex items-center justify-center flex-shrink-0 shadow-2xs">
                <Gift className="w-5 h-5 text-teal-700" />
              </div>
              <div className="text-[10px] text-slate-700 space-y-0.5 leading-tight">
                <p className="font-semibold text-slate-800">
                  • Buy <span className="text-red-500 font-bold">02</span> boxes get a{' '}
                  <span className="font-bold text-slate-900">Free Shipping</span>
                </p>
                <p className="font-semibold text-slate-800">
                  • Pay with <span className="font-bold text-teal-700">Klarna</span>, Price just{' '}
                  <span className="text-red-500 font-bold">₹3,900</span>
                </p>
                <p className="text-[9px] text-slate-400 pt-0.5">
                  Promotion will expire in: 09:00pm, 25/5/2026
                </p>
              </div>
            </div>
          </div>

          {/* ROW 2 - COL 2 */}
          <div>
            <ProductCard product={row2Col2} />
          </div>

          {/* ROW 2 - COL 3 */}
          <div>
            <ProductCard product={row2Col3} />
          </div>

          {/* ROW 2 - COL 4 */}
          <div>
            <ProductCard product={row2Col4} />
          </div>
        </div>
      </div>
    </section>
  );
}
