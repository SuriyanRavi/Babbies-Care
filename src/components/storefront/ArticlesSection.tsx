'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const FEATURED_ARTICLE = {
  id: 'babies-in-winter',
  title: 'Babies in Winter: How to protect your newborn in cold weather',
  timeAgo: '45 Minutes ago',
  category: 'Experience',
  imageUrl: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=800&auto=format&fit=crop&q=80',
  slug: 'babies-in-winter-protect-newborn',
};

const SIDE_ARTICLES_ROW_1 = [
  {
    id: 'omicron-in-kids',
    title: "Omicron in Kids: Here's what parents should know",
    timeAgo: '49 Minutes ago',
    category: 'Experience',
    imageUrl: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=300&auto=format&fit=crop&q=80',
    slug: 'omicron-in-kids-parents-guide',
  },
  {
    id: 'insight-into-dadliness',
    title: 'Insight into dadliness',
    timeAgo: '2 Days ago',
    category: 'Infant',
    imageUrl: 'https://images.unsplash.com/photo-1544126592-807ade215a0b?w=300&auto=format&fit=crop&q=80',
    slug: 'insight-into-dadliness-fatherhood',
  },
];

const SIDE_ARTICLES_ROW_2 = [
  {
    id: 'january-babies',
    title: 'Fun facts about January Babies',
    timeAgo: '1 Day ago',
    category: 'Life Style',
    imageUrl: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=300&auto=format&fit=crop&q=80',
    slug: 'fun-facts-about-january-babies',
  },
  {
    id: 'revamp-nursery',
    title: 'Your handy guide to revamp the nursery',
    timeAgo: '2 Days ago',
    category: 'Pregnancy & Postpartum',
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&auto=format&fit=crop&q=80',
    slug: 'guide-to-revamp-nursery-crib',
  },
];

export function ArticlesSection() {
  return (
    <section id="articles" className="py-10 md:py-12 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            <span className="text-teal-700">What&apos;s New</span> Today
          </h2>

          <Link
            href="/blog"
            className="text-xs text-slate-400 hover:text-teal-700 font-medium transition-colors"
          >
            See More Articles
          </Link>
        </div>

        {/* 2-Column Layout Matching Reference */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left: Large Featured Article Card */}
          <div className="lg:col-span-4 xl:col-span-4">
            <Link
              href={`/blog#${FEATURED_ARTICLE.slug}`}
              className="relative block rounded-2xl overflow-hidden min-h-[260px] sm:min-h-[290px] h-full group shadow-2xs hover:shadow-card-hover transition-all"
            >
              <Image
                src={FEATURED_ARTICLE.imageUrl}
                alt={FEATURED_ARTICLE.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent flex flex-col justify-end p-5">
                <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-amber-200 transition-colors leading-snug">
                  {FEATURED_ARTICLE.title}
                </h3>
                <p className="text-[11px] text-white/80 mt-1.5 font-medium">
                  {FEATURED_ARTICLE.timeAgo} in{' '}
                  <span className="text-teal-300 font-semibold">{FEATURED_ARTICLE.category}</span>
                </p>
              </div>
            </Link>
          </div>

          {/* Right: 2x2 Grid of Articles with divider */}
          <div className="lg:col-span-8 xl:col-span-8 flex flex-col justify-between">
            {/* Top Row: 2 Articles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SIDE_ARTICLES_ROW_1.map((article) => (
                <Link
                  key={article.id}
                  href={`/blog#${article.slug}`}
                  className="flex items-center gap-3.5 group p-1.5 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  <div className="relative w-24 h-20 sm:w-28 sm:h-20 rounded-xl overflow-hidden flex-shrink-0 bg-slate-100 shadow-2xs">
                    <Image
                      src={article.imageUrl}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-teal-700 transition-colors leading-snug line-clamp-2">
                      {article.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-1 font-medium">
                      {article.timeAgo} in{' '}
                      <span className="text-slate-600 font-semibold">{article.category}</span>
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            {/* Divider Line */}
            <div className="border-b border-slate-200/80 my-3 hidden sm:block" />

            {/* Bottom Row: 2 Articles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SIDE_ARTICLES_ROW_2.map((article) => (
                <Link
                  key={article.id}
                  href={`/blog#${article.slug}`}
                  className="flex items-center gap-3.5 group p-1.5 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  <div className="relative w-24 h-20 sm:w-28 sm:h-20 rounded-xl overflow-hidden flex-shrink-0 bg-slate-100 shadow-2xs">
                    <Image
                      src={article.imageUrl}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-teal-700 transition-colors leading-snug line-clamp-2">
                      {article.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-1 font-medium">
                      {article.timeAgo} in{' '}
                      <span className="text-slate-600 font-semibold">{article.category}</span>
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
