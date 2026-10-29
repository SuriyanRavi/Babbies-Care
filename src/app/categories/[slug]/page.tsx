'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { ChevronRight, Filter, SlidersHorizontal, PackageX } from 'lucide-react';
import { CATEGORIES, PRODUCTS } from '@/lib/catalog-data';
import { ProductCard } from '@/components/storefront/ProductCard';

export default function CategoryPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const category = CATEGORIES.find((c) => c.slug === slug);

  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [maxPriceRupees, setMaxPriceRupees] = useState(15000);

  // Filter products by category slug
  const categoryProducts = useMemo(() => {
    let list = PRODUCTS.filter((p) => {
      if (slug === 'all') return true;
      if (slug === 'clearance') return p.isClearance;
      return p.categorySlug === slug;
    });

    if (inStockOnly) {
      list = list.filter((p) => p.stockQuantity > 0);
    }

    list = list.filter((p) => p.pricePaise / 100 <= maxPriceRupees);

    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.pricePaise - b.pricePaise);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.pricePaise - a.pricePaise);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [slug, inStockOnly, maxPriceRupees, sortBy]);

  const categoryTitle = slug === 'all' ? 'All Products' : slug === 'clearance' ? 'Clearance Deals' : category?.name || 'Category';

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-6">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <Link href="/" className="hover:text-teal-700">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <Link href="/categories" className="hover:text-teal-700">
            Categories
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="font-semibold text-slate-800">{categoryTitle}</span>
        </nav>

        {/* Category Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs mb-8">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full">
              Verified Catalog
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
              {categoryTitle}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
              {category?.description ||
                'Explore pediatrician-approved baby essentials with guaranteed authenticity and standard delivery across India.'}
            </p>
          </div>
        </div>

        {/* Main Layout: Sidebar Filters + Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Sidebar Filter */}
          <div className="lg:col-span-3 bg-white rounded-2xl border border-stone-200 p-5 space-y-6 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <span className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <SlidersHorizontal className="w-4 h-4 text-teal-700" />
                Filters
              </span>
              <button
                onClick={() => {
                  setInStockOnly(false);
                  setMaxPriceRupees(15000);
                  setSortBy('featured');
                }}
                className="text-xs text-teal-700 hover:underline font-semibold"
              >
                Reset
              </button>
            </div>

            {/* Price Range Filter */}
            <div>
              <div className="flex justify-between items-center text-xs font-semibold text-slate-700 mb-2">
                <span>Max Price</span>
                <span className="text-teal-800 font-bold">₹{maxPriceRupees.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min={500}
                max={15000}
                step={500}
                value={maxPriceRupees}
                onChange={(e) => setMaxPriceRupees(Number(e.target.value))}
                className="w-full accent-teal-700 cursor-pointer"
              />
            </div>

            {/* Availability */}
            <div className="pt-4 border-t border-stone-100">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700 select-none">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded text-teal-700 focus:ring-teal-500 w-4 h-4"
                />
                <span>In Stock Items Only</span>
              </label>
            </div>

            {/* Quick Categories Navigation */}
            <div className="pt-4 border-t border-stone-100 space-y-1.5">
              <span className="text-xs font-bold text-slate-900 block mb-2">Other Categories</span>
              {CATEGORIES.slice(0, 6).map((c) => (
                <Link
                  key={c.id}
                  href={`/categories/${c.slug}`}
                  className={`block text-xs py-1 transition-colors ${
                    c.slug === slug ? 'font-bold text-teal-700' : 'text-slate-600 hover:text-teal-700'
                  }`}
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Right Product Grid */}
          <div className="lg:col-span-9">
            {/* Top Bar: Count & Sort */}
            <div className="bg-white rounded-2xl border border-stone-200 px-5 py-3 mb-6 flex items-center justify-between shadow-xs">
              <span className="text-xs text-slate-600 font-medium">
                Showing <strong className="text-slate-900">{categoryProducts.length}</strong> products
              </span>

              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-500 hidden sm:inline">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-semibold text-slate-700 focus:outline-none focus:ring-1 focus:ring-teal-500 cursor-pointer"
                >
                  <option value="featured">Featured Deals</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

            {/* Product Cards Grid */}
            {categoryProducts.length === 0 ? (
              <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center">
                <div className="w-16 h-16 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto mb-4">
                  <PackageX className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-slate-800">No products match your criteria</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  Try adjusting your price filter or browsing another category.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {categoryProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

