import React from 'react';
import Link from 'next/link';
import {
  ChevronRight,
  Droplets,
  Utensils,
  Bed,
  Compass,
  Milk,
  Shirt,
  ShieldCheck,
  Smile,
} from 'lucide-react';
import { DiaperIcon } from '@/components/ui/DiaperIcon';
import { TeetherIcon } from '@/components/ui/TeetherIcon';
import { CATEGORIES } from '@/lib/catalog-data';

const CAT_ICONS: Record<string, React.ElementType> = {
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

export default function CategoriesPage() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <Link href="/" className="hover:text-teal-700">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="font-semibold text-slate-800">All Categories</span>
        </nav>

        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs mb-8">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full">
              Full Taxonomy
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
              Browse Baby Care Categories
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
              Explore authentic baby food formulas, strollers, car seats, certified organic cotton clothing, nursery furniture, and child-proofing essentials.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat) => {
            const Icon = CAT_ICONS[cat.slug] || DiaperIcon;
            return (
              <Link
                key={cat.id}
                href={`/categories/${cat.slug}`}
                className="group bg-white rounded-2xl border border-stone-200 p-6 hover:shadow-card-hover hover:border-teal-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 stroke-[1.8]" />
                    </div>
                    <span className="text-xs font-semibold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full">
                      {cat.itemCount} items
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors mb-1.5">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-teal-700 group-hover:translate-x-1 transition-transform">
                  <span>View Products</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

