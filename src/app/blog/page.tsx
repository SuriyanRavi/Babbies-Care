import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Calendar, Clock, BookOpen, ArrowRight } from 'lucide-react';
import { ARTICLES } from '@/lib/catalog-data';
import { formatDate } from '@/lib/formatters';

export default function BlogIndexPage() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4">
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <Link href="/" className="hover:text-teal-700">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="font-semibold text-slate-800">Pediatric Care Blog</span>
        </nav>

        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-200/80 shadow-xs mb-10 text-center max-w-2xl mx-auto">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center mx-auto mb-3">
            <BookOpen className="w-6 h-6" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Pediatric Guidance & Parenting Insights
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Evidence-based recommendations on infant nutrition, safe sleep, baby milestones, and developmental essentials.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ARTICLES.map((art) => (
            <article
              key={art.id}
              className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-card-hover hover:border-teal-300 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                  <Image
                    src={art.imageUrl}
                    alt={art.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-teal-800 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow">
                    {art.category}
                  </span>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-slate-400 mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(art.publishedAt)}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {art.readTimeMinutes} min read
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors leading-snug">
                    {art.title}
                  </h3>

                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-600">By {art.author}</span>
                <span className="text-teal-700 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Read More <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

