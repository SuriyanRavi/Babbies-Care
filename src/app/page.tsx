import React from 'react';
import { HeroSection } from '@/components/storefront/HeroSection';
import { CategoryIconGrid } from '@/components/storefront/CategoryIconGrid';
import { PromoBanners } from '@/components/storefront/PromoBanners';
import { RecommendedProducts } from '@/components/storefront/RecommendedProducts';
import { TrustPaymentBanner } from '@/components/storefront/TrustPaymentBanner';
import { ClearanceSection } from '@/components/storefront/ClearanceSection';
import { BrandStrip } from '@/components/storefront/BrandStrip';
import { NewArrivals } from '@/components/storefront/NewArrivals';
import { CuratedEssentials } from '@/components/storefront/CuratedEssentials';
import { ArticlesSection } from '@/components/storefront/ArticlesSection';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 4. Hero Carousel with Category Sidebar */}
      <HeroSection />

      {/* 5. Most Popular Categories 10 Circular Icons */}
      <CategoryIconGrid />

      {/* 6. Promotional Banner Pair */}
      <PromoBanners />

      {/* 7. Recommended Products with Tabs */}
      <RecommendedProducts />

      {/* 8. Payment Trust Banner */}
      <TrustPaymentBanner />

      {/* 10. Clearance Sale Up to 70% Off */}
      <ClearanceSection />

      {/* 11. Authorized Brand Strip */}
      <BrandStrip />

      {/* 12. New Arrivals Grid with Free Gift Spotlight */}
      <NewArrivals />

      {/* 13. Curated Bedroom & Feeding Essentials */}
      <CuratedEssentials />

      {/* 14. What's New / Baby Care Articles */}
      <ArticlesSection />
    </div>
  );
}

