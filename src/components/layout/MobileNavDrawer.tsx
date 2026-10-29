'use client';

import React from 'react';
import Link from 'next/link';
import {
  X,
  Baby,
  Flame,
  Percent,
  Truck,
  Heart,
  User,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import { CATEGORIES } from '@/lib/catalog-data';
import { useWishlist } from '@/context/WishlistContext';

interface MobileNavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNavDrawer({ isOpen, onClose }: MobileNavDrawerProps) {
  const { wishlistCount } = useWishlist();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-white shadow-2xl flex flex-col z-50">
        {/* Header */}
        <div className="p-4 bg-teal-700 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-white text-teal-700 flex items-center justify-center font-bold">
              <Baby className="w-5 h-5 stroke-[2.2]" />
            </div>
            <span className="font-bold text-lg">
              Babbies<span className="text-amber-300">Care</span>
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-teal-200 hover:text-white"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Links */}
        <div className="p-3 bg-slate-50 border-b border-slate-100 grid grid-cols-2 gap-2 text-xs font-semibold">
          <Link
            href="/#recommended"
            onClick={onClose}
            className="flex items-center gap-2 p-2 rounded-lg bg-amber-50 text-amber-900 border border-amber-200"
          >
            <Flame className="w-4 h-4 text-amber-500" />
            <span>Hot Deals</span>
          </Link>
          <Link
            href="/#clearance"
            onClick={onClose}
            className="flex items-center gap-2 p-2 rounded-lg bg-rose-50 text-rose-900 border border-rose-200"
          >
            <Percent className="w-4 h-4 text-rose-500" />
            <span>Clearance</span>
          </Link>
        </div>

        {/* Categories List */}
        <div className="flex-1 overflow-y-auto px-4 py-3 divide-y divide-slate-100">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 py-2">
            Categories
          </p>
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/categories/${cat.slug}`}
              onClick={onClose}
              className="flex items-center justify-between py-3 text-sm font-medium text-slate-700 hover:text-teal-700"
            >
              <span>{cat.name}</span>
              <ChevronRight className="w-4 h-4 text-slate-300" />
            </Link>
          ))}
        </div>

        {/* Footer Utilities */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 space-y-2 text-xs">
          <Link
            href="/track-order"
            onClick={onClose}
            className="flex items-center gap-2.5 text-slate-700 hover:text-teal-700 py-1"
          >
            <Truck className="w-4 h-4 text-teal-600" />
            <span>Track Order</span>
          </Link>

          <Link
            href="/account/wishlist"
            onClick={onClose}
            className="flex items-center justify-between text-slate-700 hover:text-teal-700 py-1"
          >
            <div className="flex items-center gap-2.5">
              <Heart className="w-4 h-4 text-rose-500" />
              <span>Wishlist</span>
            </div>
            {wishlistCount > 0 && (
              <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                {wishlistCount}
              </span>
            )}
          </Link>

          <Link
            href="/account"
            onClick={onClose}
            className="flex items-center gap-2.5 text-slate-700 hover:text-teal-700 py-1"
          >
            <User className="w-4 h-4 text-teal-600" />
            <span>My Account / Sign In</span>
          </Link>

          <div className="pt-2 border-t border-slate-200 flex items-center gap-1.5 text-slate-500 text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
            <span>100% Genuine Baby Products</span>
          </div>
        </div>
      </div>
    </div>
  );
}

