'use client';

import React, { useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Search, ChevronRight, PackageX } from 'lucide-react';
import { PRODUCTS } from '@/lib/catalog-data';
import { ProductCard } from '@/components/storefront/ProductCard';

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const categoryFilter = searchParams.get('category') || 'all';

  const results = useMemo(() => {
    if (!query.trim()) return [];

    const q = query.toLowerCase().trim();
    return PRODUCTS.filter((p) => {
      const matchesText =
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.brandName?.toLowerCase().includes(q);

      const matchesCategory =
        categoryFilter === 'all' || p.categorySlug === categoryFilter;

      return matchesText && matchesCategory;
    });
  }, [query, categoryFilter]);

  return (
    <>
      {/* Search Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center">
            <Search className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900">
              Search results for &ldquo;{query}&rdquo;
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Found {results.length} matching products
            </p>
          </div>
        </div>
      </div>

      {/* Results Grid */}
      {results.length === 0 ? (
        <div className="bg-white rounded-3xl border border-stone-200 p-12 text-center max-w-xl mx-auto">
          <div className="w-16 h-16 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto mb-4">
            <PackageX className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-slate-800">No matching baby products found</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Check your spelling or browse our popular categories like Diapering, Formula, Strollers, or Nursery Furniture.
          </p>
          <Link
            href="/categories"
            className="mt-6 inline-block px-5 py-2.5 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-bold transition-colors"
          >
            Browse All Categories
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </>
  );
}

export default function SearchPage() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <Link href="/" className="hover:text-teal-700">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="font-semibold text-slate-800">Search Results</span>
        </nav>

        <Suspense
          fallback={
            <div className="bg-white rounded-3xl p-12 text-center text-sm font-semibold text-slate-500">
              Searching baby products catalog...
            </div>
          }
        >
          <SearchResultsContent />
        </Suspense>
      </div>
    </div>
  );
}
