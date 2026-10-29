'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Search,
  User,
  Heart,
  ShoppingBag,
  Menu,
  ChevronDown,
  Baby,
  Check,
  LayoutGrid,
  Droplets,
  Utensils,
  Bed,
  Compass,
  Milk,
  Shirt,
  ShieldCheck,
  Smile,
  Sparkles,
} from 'lucide-react';
import { DiaperIcon } from '@/components/ui/DiaperIcon';
import { TeetherIcon } from '@/components/ui/TeetherIcon';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { formatPrice } from '@/lib/formatters';
import { CATEGORIES } from '@/lib/catalog-data';

const DROPDOWN_ICONS: Record<string, React.ElementType> = {
  all: LayoutGrid,
  'diapering-wipes': DiaperIcon,
  'bath-skincare': Droplets,
  'baby-food-formula': Utensils,
  'nursery-furniture': Bed,
  'strollers-travel': Compass,
  'feeding-nursing': Milk,
  'baby-clothes': Shirt,
  'health-safety': ShieldCheck,
  'toys-learning': Smile,
  'teethers-pacifiers': TeetherIcon,
};

interface SiteHeaderProps {
  onOpenMobileMenu?: () => void;
}

export function SiteHeader({ onOpenMobileMenu }: SiteHeaderProps) {
  const router = useRouter();
  const { itemCount, subtotalPaise, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCategoryDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const params = new URLSearchParams();
    params.set('q', searchQuery.trim());
    if (selectedCategory !== 'all') {
      params.set('category', selectedCategory);
    }
    router.push(`/search?${params.toString()}`);
  };

  const selectedCatObj = CATEGORIES.find((c) => c.slug === selectedCategory);
  const selectedLabel = selectedCategory === 'all' ? 'All Categories' : selectedCatObj?.name || 'All Categories';
  const SelectedIcon = DROPDOWN_ICONS[selectedCategory] || LayoutGrid;

  return (
    <header className="bg-teal-700 text-white shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between gap-4 md:gap-8">
          {/* Mobile Menu Button & Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenMobileMenu}
              className="lg:hidden p-1.5 rounded-lg text-teal-100 hover:text-white hover:bg-teal-600 focus:outline-none"
              aria-label="Open mobile menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-white text-teal-700 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                <Baby className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl md:text-2xl font-black tracking-tight text-white flex items-center gap-1">
                  Babbies<span className="text-amber-300">Care</span>
                </span>
                <span className="text-[10px] text-teal-100 font-medium tracking-wider uppercase -mt-1 hidden sm:block">
                  Pure Care for Little Ones
                </span>
              </div>
            </Link>
          </div>

          {/* Central Search Bar */}
          <div className="flex-1 max-w-2xl hidden md:block">
            <form
              onSubmit={handleSearchSubmit}
              className="flex items-center bg-white rounded-full p-1 pl-3 shadow-inner text-slate-800 focus-within:ring-2 focus-within:ring-amber-300 transition-all relative"
            >
              {/* Modern Category Dropdown inside search */}
              <div ref={dropdownRef} className="relative flex items-center border-r border-slate-200 pr-2 mr-2">
                <button
                  type="button"
                  onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                  className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-slate-700 hover:text-teal-700 hover:bg-slate-50 rounded-full transition-colors focus:outline-none"
                >
                  <SelectedIcon className="w-3.5 h-3.5 text-teal-700 flex-shrink-0" />
                  <span className="truncate max-w-[110px] text-left">{selectedLabel}</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                      isCategoryDropdownOpen ? 'rotate-180 text-teal-700' : ''
                    }`}
                  />
                </button>

                {/* Floating Modern Dropdown Menu */}
                {isCategoryDropdownOpen && (
                  <div className="absolute top-full left-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl border border-slate-200/90 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150 max-h-80 overflow-y-auto overflow-x-hidden [scrollbar-width:thin] [scrollbar-color:#CBD5E1_transparent]">
                    <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 flex items-center justify-between">
                      <span>Select Category</span>
                      <span className="text-teal-700 font-semibold">{CATEGORIES.length + 1} options</span>
                    </div>

                    {/* All Categories Option */}
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCategory('all');
                        setIsCategoryDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium transition-colors text-left ${
                        selectedCategory === 'all'
                          ? 'bg-teal-50 text-teal-800 font-bold'
                          : 'text-slate-700 hover:bg-slate-50 hover:text-teal-700'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0 flex-1 pr-1">
                        <div className="w-6 h-6 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center flex-shrink-0">
                          <LayoutGrid className="w-3.5 h-3.5" />
                        </div>
                        <span className="truncate">All Categories</span>
                      </div>
                      {selectedCategory === 'all' && (
                        <Check className="w-4 h-4 text-teal-700 flex-shrink-0" />
                      )}
                    </button>

                    {/* Category List */}
                    {CATEGORIES.map((cat) => {
                      const CatIcon = DROPDOWN_ICONS[cat.slug] || Sparkles;
                      const isSelected = selectedCategory === cat.slug;

                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => {
                            setSelectedCategory(cat.slug);
                            setIsCategoryDropdownOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium transition-colors text-left ${
                            isSelected
                              ? 'bg-teal-50 text-teal-800 font-bold'
                              : 'text-slate-700 hover:bg-slate-50 hover:text-teal-700'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0 flex-1 pr-1">
                            <div className="w-6 h-6 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center flex-shrink-0">
                              <CatIcon className="w-3.5 h-3.5" />
                            </div>
                            <span className="truncate">{cat.name}</span>
                          </div>
                          {isSelected && (
                            <Check className="w-4 h-4 text-teal-700 flex-shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Text Input */}
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for baby food, strollers, wipes, diapers..."
                className="w-full text-xs md:text-sm bg-transparent focus:outline-none text-slate-800 placeholder:text-slate-400 px-1"
              />

              {/* Submit Button */}
              <button
                type="submit"
                className="bg-amber-400 hover:bg-amber-500 text-slate-900 rounded-full p-2.5 font-bold transition-colors ml-2 shadow-sm"
                aria-label="Search"
              >
                <Search className="w-4 h-4 stroke-[2.5]" />
              </button>
            </form>
          </div>

          {/* User Utilities: Account, Wishlist, Cart */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Account Link */}
            <Link
              href="/account"
              className="flex items-center gap-2 p-2 rounded-xl text-teal-100 hover:text-white hover:bg-teal-600/60 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-teal-800/80 flex items-center justify-center text-teal-200">
                <User className="w-4 h-4" />
              </div>
              <div className="hidden xl:flex flex-col text-left">
                <span className="text-[11px] text-teal-200 leading-tight">Welcome</span>
                <span className="text-xs font-bold leading-tight">My Account</span>
              </div>
            </Link>

            {/* Wishlist Link */}
            <Link
              href="/account/wishlist"
              className="relative p-2 rounded-xl text-teal-100 hover:text-white hover:bg-teal-600/60 transition-colors"
              aria-label={`Wishlist with ${wishlistCount} items`}
            >
              <Heart className="w-5 h-5 stroke-[2]" />
              {wishlistCount > 0 && (
                <span className="absolute 1 top-1 right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2.5 bg-teal-800/90 hover:bg-teal-900 text-white p-2 sm:px-3 sm:py-2 rounded-xl border border-teal-600/50 shadow-sm transition-all"
              aria-label={`Cart with ${itemCount} items`}
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 stroke-[2] text-amber-300" />
                {itemCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-amber-400 text-slate-900 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow">
                    {itemCount}
                  </span>
                )}
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-[10px] text-teal-200 font-medium leading-none">Cart</span>
                <span className="text-xs font-bold leading-tight text-white mt-0.5">
                  {formatPrice(subtotalPaise)}
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar Row */}
        <div className="mt-3 md:hidden">
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center bg-white rounded-full p-1 pl-4 shadow-sm text-slate-800"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full text-xs bg-transparent focus:outline-none text-slate-800 placeholder:text-slate-400"
            />
            <button
              type="submit"
              className="bg-amber-400 hover:bg-amber-500 text-slate-900 rounded-full p-2 font-bold transition-colors ml-1"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}

