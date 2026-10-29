'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles } from 'lucide-react';
import { MILESTONES } from '@/lib/catalog-data';

export function MilestoneSection() {
  return (
    <section id="milestones" className="py-12 bg-[#FAF8F5] border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-800 uppercase tracking-wider bg-teal-100/60 px-3 py-1 rounded-full mb-2">
            <Sparkles className="w-3.5 h-3.5 text-teal-700" />
            <span>Developmental Stages</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Prepare for <span className="text-teal-700">baby milestones</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Pediatrician-aligned gear and essentials curated for each key phase of your child&apos;s growth.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MILESTONES.map((m) => (
            <Link
              key={m.id}
              href={`/categories/${m.categorySlug}`}
              className="group bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-card-hover hover:border-teal-300 transition-all duration-300 flex flex-col"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
                <Image
                  src={m.imageUrl}
                  alt={m.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-2 left-2 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-lg">
                  {m.ageRange}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                    {m.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                    {m.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-teal-700 group-hover:text-teal-900">
                  <span>Explore Essentials</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

