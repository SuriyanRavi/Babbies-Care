'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const BEDROOM_ITEMS = [
  {
    name: 'Beach & Water',
    imageUrl: '/images/beach-water-play-center.png',
    slug: 'beach-water-inflatable-play-center',
    categorySlug: 'toys-learning',
  },
  {
    name: 'Trampolines',
    imageUrl: '/images/kids-enclosed-trampoline.png',
    slug: 'kids-enclosed-trampoline-with-slide',
    categorySlug: 'toys-learning',
  },
  {
    name: 'Ride ons',
    imageUrl: '/images/toddler-twist-ride-on-car.png',
    slug: 'toddler-twist-ride-on-swing-car',
    categorySlug: 'toys-learning',
  },
  {
    name: 'Outdoor Games',
    imageUrl: '/images/outdoor-water-blaster-toy.png',
    slug: 'outdoor-water-blaster-toy-gun',
    categorySlug: 'toys-learning',
  },
];

const FEEDING_ITEMS = [
  {
    name: 'Breast Feeding',
    imageUrl: '/images/electric-breast-pump.png',
    slug: 'electric-handsfree-breast-pump-smart-led',
    categorySlug: 'feeding-nursing',
  },
  {
    name: 'Bottle Feeding',
    imageUrl: '/images/anti-colic-feeding-bottles.png',
    slug: 'natural-flow-anticolic-feeding-bottles-set',
    categorySlug: 'feeding-nursing',
  },
  {
    name: 'Bibs',
    imageUrl: '/images/silicone-baby-bibs.png',
    slug: 'waterproof-silicone-weaning-bibs-pack-of-2',
    categorySlug: 'feeding-nursing',
  },
  {
    name: 'Pacifiers',
    imageUrl: '/images/orthodontic-silicone-pacifiers.png',
    slug: 'orthodontic-silicone-soothing-baby-pacifiers',
    categorySlug: 'teethers-pacifiers',
  },
];

export function CuratedEssentials() {
  return (
    <section className="py-10 md:py-12 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Card 1: Bedroom Essentials */}
          <div className="bg-[#EEF7F8] rounded-3xl p-6 sm:p-7 border border-teal-100 flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  <span className="text-teal-700">Bedroom</span> Essentials
                </h3>
                <Link
                  href="/categories/toys-learning"
                  className="text-xs text-slate-400 hover:text-teal-700 font-medium transition-colors"
                >
                  View All
                </Link>
              </div>

              {/* 4 Category Item Thumbnails */}
              <div className="grid grid-cols-4 gap-2 sm:gap-4 mb-6">
                {BEDROOM_ITEMS.map((item, idx) => (
                  <Link
                    key={idx}
                    href={`/products/${item.slug}`}
                    className="flex flex-col items-center group text-center"
                  >
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/90 p-1.5 shadow-2xs group-hover:scale-105 transition-transform flex items-center justify-center overflow-hidden">
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        className="object-contain p-1 rounded-xl"
                      />
                    </div>
                    <span className="text-[11px] sm:text-xs font-bold text-slate-800 mt-2 leading-tight group-hover:text-teal-700 transition-colors">
                      {item.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Bottom 2 Banners */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
              {/* Banner 1: OKO Breeze Baby Carrier */}
              <Link
                href="/products/ergonomic-360-baby-carrier-mesh"
                className="bg-[#4E6272] hover:bg-[#435463] text-white rounded-2xl p-4 flex items-center justify-between overflow-hidden relative min-h-[100px] transition-all group"
              >
                <div className="space-y-1 z-10">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-teal-200">
                    OKO Breeze
                  </p>
                  <p className="text-xs sm:text-sm font-bold text-white leading-tight">
                    Baby Carrier
                  </p>
                  <p className="text-[10px] text-teal-100 font-semibold pt-1">
                    PRICE JUST <span className="text-amber-300 font-bold">₹1,699</span>
                  </p>
                </div>
                <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                  <Image
                    src="https://images.unsplash.com/photo-1544126592-807ade215a0b?w=300&auto=format&fit=crop&q=80"
                    alt="Baby Carrier"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
              </Link>

              {/* Banner 2: Kindergo Uniq Balance Bike */}
              <Link
                href="/categories/toys-learning"
                className="bg-[#788B7B] hover:bg-[#6c7d6f] text-white rounded-2xl p-4 flex items-center justify-between overflow-hidden relative min-h-[100px] transition-all group"
              >
                <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                  <Image
                    src="https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=300&auto=format&fit=crop&q=80"
                    alt="Balance Bike"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="space-y-1 z-10 text-right">
                  <p className="text-xs sm:text-sm font-bold text-white leading-tight">
                    Kindergo Uniq Balance Bike
                  </p>
                  <span className="inline-block text-[10px] font-bold text-amber-200 underline pt-1 group-hover:text-white transition-colors">
                    SHOP NOW
                  </span>
                </div>
              </Link>
            </div>
          </div>

          {/* Card 2: Feeding Essentials */}
          <div className="bg-[#F7F2EB] rounded-3xl p-6 sm:p-7 border border-stone-200 flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  <span className="text-teal-700">Feeding</span> Essentials
                </h3>
                <Link
                  href="/categories/feeding-nursing"
                  className="text-xs text-slate-400 hover:text-teal-700 font-medium transition-colors"
                >
                  View All
                </Link>
              </div>

              {/* 4 Category Item Thumbnails */}
              <div className="grid grid-cols-4 gap-2 sm:gap-4 mb-6">
                {FEEDING_ITEMS.map((item, idx) => (
                  <Link
                    key={idx}
                    href={`/products/${item.slug}`}
                    className="flex flex-col items-center group text-center"
                  >
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/90 p-1.5 shadow-2xs group-hover:scale-105 transition-transform flex items-center justify-center overflow-hidden">
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        className="object-contain p-1 rounded-xl"
                      />
                    </div>
                    <span className="text-[11px] sm:text-xs font-bold text-slate-800 mt-2 leading-tight group-hover:text-teal-700 transition-colors">
                      {item.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Bottom 2 Banners */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
              {/* Banner 1: Baby High Chair */}
              <Link
                href="/products/convertible-high-chair-removable-tray"
                className="bg-[#968579] hover:bg-[#86766b] text-white rounded-2xl p-4 flex items-center justify-between overflow-hidden relative min-h-[100px] transition-all group"
              >
                <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-white/90 p-1">
                  <Image
                    src="/images/convertible-high-chair.jpg"
                    alt="Baby High Chair"
                    fill
                    className="object-contain group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="space-y-1 z-10 text-right">
                  <span className="inline-block bg-white/90 text-stone-800 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase">
                    mum
                  </span>
                  <p className="text-xs sm:text-sm font-bold text-white leading-tight mt-1">
                    Baby High Chair
                  </p>
                </div>
              </Link>

              {/* Banner 2: MEALTIME ESSENTIALS */}
              <Link
                href="/categories/feeding-nursing"
                className="bg-[#5DAAA8] hover:bg-[#509694] text-white rounded-2xl p-4 flex items-center justify-between overflow-hidden relative min-h-[100px] transition-all group"
              >
                <div className="space-y-1 z-10">
                  <p className="text-[10px] font-black uppercase tracking-widest text-teal-100">
                    MEALTIME ESSENTIALS
                  </p>
                  <p className="text-xs text-white/90">
                    Organic bamboo bowls & spoons
                  </p>
                </div>
                <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                  <Image
                    src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&auto=format&fit=crop&q=80"
                    alt="Mealtime Essentials"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
