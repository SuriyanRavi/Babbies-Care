import React from 'react';
import { Truck, RotateCcw, ShieldCheck, Headphones } from 'lucide-react';

export function BenefitsStrip() {
  const benefits = [
    {
      icon: Truck,
      title: 'Free Shipping Over ₹999',
      subtitle: 'Fast delivery across India with live tracking',
    },
    {
      icon: RotateCcw,
      title: '30 Days Easy Returns',
      subtitle: 'Hassle-free money-back guarantee on all items',
    },
    {
      icon: ShieldCheck,
      title: '100% Safe & Secure Payment',
      subtitle: 'Encrypted via Razorpay, UPI, & NetBanking',
    },
    {
      icon: Headphones,
      title: '24/7 Dedicated Support',
      subtitle: 'Expert parental assistance via phone & chat',
    },
  ];

  return (
    <section className="bg-teal-700 text-white py-8 border-y border-teal-800">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {benefits.map((b, idx) => {
          const Icon = b.icon;
          return (
            <div key={idx} className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-2xl bg-teal-800/80 group-hover:bg-amber-400 group-hover:text-slate-900 text-amber-300 flex items-center justify-center flex-shrink-0 transition-colors shadow-sm">
                <Icon className="w-6 h-6 stroke-[2]" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white tracking-tight">{b.title}</h4>
                <p className="text-xs text-teal-100/80 mt-0.5 leading-snug">{b.subtitle}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

