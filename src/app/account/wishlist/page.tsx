'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, ChevronRight, ShoppingBag } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { PRODUCTS } from '@/lib/catalog-data';
import { ProductCard } from '@/components/storefront/ProductCard';

export default function WishlistPage() {
  const { wishlistIds } = useWishlist();

  const wishlistedProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <Link href="/" className="hover:text-teal-700">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <Link href="/account" className="hover:text-teal-700">
            Account
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="font-semibold text-slate-800">My Wishlist</span>
        </nav>

        {/* Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center">
              <Heart className="w-5 h-5 fill-rose-500" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                My Saved Wishlist
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                {wishlistedProducts.length} items saved for your little one
              </p>
            </div>
          </div>
        </div>

        {wishlistedProducts.length === 0 ? (
          <div className="bg-white rounded-3xl border border-stone-200 p-12 text-center max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-400 flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-slate-800">Your wishlist is empty</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
              Save your favorite strollers, infant formula, cribs, or baby clothes to review later.
            </p>
            <Link
              href="/categories"
              className="mt-6 inline-block px-5 py-2.5 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-bold transition-colors"
            >
              Explore Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {wishlistedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

