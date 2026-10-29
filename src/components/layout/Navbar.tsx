'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Menu,
  ChevronDown,
  Flame,
  PhoneCall,
  Percent,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import { CATEGORIES } from '@/lib/catalog-data';

export function Navbar() {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  return (
    <nav className="bg-teal-800 text-teal-50 text-xs border-t border-teal-600/30 hidden md:block">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        {/* Left Side: All Categories Button & Nav Links */}
        <div className="flex items-center gap-1 lg:gap-2">
          {/* All Categories Mega Trigger */}
          <div className="relative">
            <button
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              className="flex items-center gap-2.5 bg-teal-900 hover:bg-teal-950 text-white font-bold px-4 py-3 tracking-wide transition-colors"
            >
              <Menu className="w-4 h-4 text-amber-300" />
              <span className="uppercase text-xs tracking-wider">All Categories</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  isCategoryOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {isCategoryOpen && (
              <div
                className="absolute top-full left-0 w-64 bg-white text-slate-800 shadow-2xl rounded-b-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                onMouseLeave={() => setIsCategoryOpen(false)}
              >
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/categories/${cat.slug}`}
                    onClick={() => setIsCategoryOpen(false)}
                    className="flex items-center justify-between px-4 py-2.5 hover:bg-teal-50 hover:text-teal-700 transition-colors text-xs font-medium"
                  >
                    <span>{cat.name}</span>
                    {cat.itemCount && (
                      <span className="text-[10px] text-slate-400 font-normal">
                        ({cat.itemCount})
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Quick Nav Links */}
          <div className="flex items-center space-x-1 lg:space-x-3 pl-2">
            <Link
              href="/#recommended"
              className="flex items-center gap-1 px-2.5 py-3 hover:text-white hover:bg-teal-700/50 rounded-md font-semibold text-amber-300 transition-colors"
            >
              <Flame className="w-3.5 h-3.5 text-amber-300" />
              <span>Hot Deals</span>
            </Link>

            <Link
              href="/#clearance"
              className="flex items-center gap-1 px-2.5 py-3 hover:text-white hover:bg-teal-700/50 rounded-md font-medium text-rose-300 transition-colors"
            >
              <Percent className="w-3.5 h-3.5" />
              <span>Clearance</span>
            </Link>

            <Link
              href="/categories/strollers-travel"
              className="px-2.5 py-3 hover:text-white hover:bg-teal-700/50 rounded-md font-medium text-teal-100 transition-colors"
            >
              Strollers & Travel
            </Link>

            <Link
              href="/categories/feeding-nursing"
              className="px-2.5 py-3 hover:text-white hover:bg-teal-700/50 rounded-md font-medium text-teal-100 transition-colors"
            >
              Feeding & Nursing
            </Link>

            <Link
              href="/categories/nursery-furniture"
              className="px-2.5 py-3 hover:text-white hover:bg-teal-700/50 rounded-md font-medium text-teal-100 transition-colors"
            >
              Nursery Furniture
            </Link>

            <Link
              href="/#milestones"
              className="flex items-center gap-1 px-2.5 py-3 hover:text-white hover:bg-teal-700/50 rounded-md font-medium text-teal-100 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-teal-300" />
              <span>Baby Milestones</span>
            </Link>

            <Link
              href="/track-order"
              className="px-2.5 py-3 hover:text-white hover:bg-teal-700/50 rounded-md font-medium text-teal-100 transition-colors"
            >
              Track Order
            </Link>
          </div>
        </div>

        {/* Right Side: Support Phone & Currency */}
        <div className="flex items-center gap-4 text-[11px] text-teal-200">
          <div className="flex items-center gap-1.5">
            <PhoneCall className="w-3.5 h-3.5 text-amber-300" />
            <span className="hidden xl:inline">Support:</span>
            <span className="font-bold text-white tracking-wide">+91 98765 43210</span>
          </div>

          <div className="h-4 w-px bg-teal-600/50" />

          <div className="flex items-center gap-1 text-white font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-300" />
            <span>100% Certified</span>
          </div>

          <div className="h-4 w-px bg-teal-600/50" />

          <div className="flex items-center gap-1 text-white font-bold bg-teal-900/60 px-2 py-1 rounded">
            <span>INR (₹)</span>
          </div>
        </div>
      </div>
    </nav>
  );
}

