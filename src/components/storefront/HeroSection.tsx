import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export function HeroSection() {
  return (
    <section className="bg-[#F0E7D9] w-full border-b border-stone-200/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6">
        <Link
          href="/products/nutril-7-in-1-baby-formula-400g"
          className="block w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 overflow-hidden transition-opacity hover:opacity-95"
          aria-label="Shop Bobolax Nutri 7-In-1 Base On Formula 400g"
        >
          <div className="relative w-full aspect-[1024/245]">
            <Image
              src="/images/hero-banner.png"
              alt="Bobolax Nutri 7-In-1 Base On Formula 400g"
              fill
              priority
              className="object-contain select-none"
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 100vw, 1280px"
            />
          </div>
        </Link>
      </div>
    </section>
  );
}
