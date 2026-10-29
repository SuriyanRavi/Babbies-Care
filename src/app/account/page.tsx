'use client';

import React from 'react';
import Link from 'next/link';
import {
  User,
  Package,
  Heart,
  MapPin,
  ShieldCheck,
  ChevronRight,
  LogOut,
} from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';

export default function AccountPage() {
  const { wishlistCount } = useWishlist();

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4">
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <Link href="/" className="hover:text-teal-700">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="font-semibold text-slate-800">My Account</span>
        </nav>

        {/* User Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-xl">
              <User className="w-7 h-7" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full uppercase tracking-wider">
                Parent Member
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                Guest Shopper / Member
              </h1>
              <p className="text-xs text-slate-500">
                Manage your orders, saved addresses, and wishlist
              </p>
            </div>
          </div>
        </div>

        {/* Account Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Link
            href="/track-order"
            className="group bg-white rounded-2xl border border-stone-200 p-6 shadow-xs hover:border-teal-300 hover:shadow-card-hover transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-3">
                <Package className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                Track Orders
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Check dispatch status and past deliveries
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-teal-700">
              <span>View Orders</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            href="/account/wishlist"
            className="group bg-white rounded-2xl border border-stone-200 p-6 shadow-xs hover:border-teal-300 hover:shadow-card-hover transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center mb-3">
                <Heart className="w-5 h-5 fill-rose-500" />
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                My Wishlist
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {wishlistCount} saved baby essentials
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-teal-700">
              <span>View Wishlist</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            href="/policies/shipping"
            className="group bg-white rounded-2xl border border-stone-200 p-6 shadow-xs hover:border-teal-300 hover:shadow-card-hover transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                Safety & Policies
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                30-day money-back guarantee & terms
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-teal-700">
              <span>View Policies</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

