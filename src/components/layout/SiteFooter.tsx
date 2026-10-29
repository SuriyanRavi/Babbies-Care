'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Baby,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  Shield,
  CreditCard,
} from 'lucide-react';
import { CATEGORIES } from '@/lib/catalog-data';

export function SiteFooter() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setIsSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6 pb-12 border-b border-slate-800">
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-teal-500 text-white flex items-center justify-center">
                <Baby className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="text-xl font-black tracking-tight text-white">
                Babbies<span className="text-amber-400">Care</span>
              </span>
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed">
              India&apos;s trusted destination for genuine infant nutrition, safe strollers, organic cotton clothing, and nursery furniture.
            </p>

            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
                <span>Babbies Care India Pvt Ltd, Chennai</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-teal-400 flex-shrink-0" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-teal-400 flex-shrink-0" />
                <span>support@babbiescare.in</span>
              </div>
            </div>
          </div>

          {/* Column 2: Categories */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Categories
            </h4>
            <ul className="space-y-2 text-xs">
              {CATEGORIES.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/categories/${cat.slug}`}
                    className="hover:text-amber-300 transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Customer Care & Policies */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Customer Care
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/track-order" className="hover:text-amber-300 transition-colors">
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link href="/policies/shipping" className="hover:text-amber-300 transition-colors">
                  Shipping & Delivery Policy
                </Link>
              </li>
              <li>
                <Link href="/policies/returns" className="hover:text-amber-300 transition-colors">
                  Returns, Refunds & Cancellations
                </Link>
              </li>
              <li>
                <Link href="/policies/privacy" className="hover:text-amber-300 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/policies/terms" className="hover:text-amber-300 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-amber-300 transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/about" className="hover:text-amber-300 transition-colors">
                  About Babbies Care
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-amber-300 transition-colors">
                  Product Categories
                </Link>
              </li>
              <li>
                <Link href="/#articles" className="hover:text-amber-300 transition-colors">
                  Pediatric Care Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber-300 transition-colors">
                  Contact Our Support
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-teal-400 hover:text-amber-300 transition-colors font-semibold">
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Newsletter */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Subscribe & Get 15% OFF
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Join our parent community for parenting tips, pediatric guides, and secret launch promotions.
            </p>

            {isSubscribed ? (
              <div className="p-3 bg-teal-900/60 border border-teal-600 rounded-xl flex items-center gap-2 text-xs text-teal-200">
                <CheckCircle2 className="w-4 h-4 text-teal-400 flex-shrink-0" />
                <span>Thank you! Welcome coupon code: <strong>BABY15</strong></span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full bg-slate-800 border border-slate-700 rounded-l-xl px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-teal-400"
                  />
                  <button
                    type="submit"
                    className="bg-amber-400 hover:bg-amber-500 text-slate-900 text-xs font-bold px-4 py-2 rounded-r-xl transition-colors"
                  >
                    Subscribe
                  </button>
                </div>
                <p className="text-[10px] text-slate-500">
                  By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
                </p>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Sub-Footer: Payment Badges, Country, Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-slate-400 flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-teal-400" />
              Verified Razorpay Checkout:
            </span>
            <div className="flex items-center gap-2 text-slate-400">
              <span className="px-2 py-0.5 bg-slate-800 border border-slate-700 rounded text-[11px] font-bold text-white">
                UPI
              </span>
              <span className="px-2 py-0.5 bg-slate-800 border border-slate-700 rounded text-[11px] font-bold text-white">
                VISA
              </span>
              <span className="px-2 py-0.5 bg-slate-800 border border-slate-700 rounded text-[11px] font-bold text-white">
                Mastercard
              </span>
              <span className="px-2 py-0.5 bg-slate-800 border border-slate-700 rounded text-[11px] font-bold text-white">
                RuPay
              </span>
              <span className="px-2 py-0.5 bg-slate-800 border border-slate-700 rounded text-[11px] font-bold text-white">
                NetBanking
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-slate-400">Country: <strong>India</strong> (INR ₹)</span>
            <span>&copy; {new Date().getFullYear()} Babbies Care. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

