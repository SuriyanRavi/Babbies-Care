import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { BenefitsStrip } from '@/components/layout/BenefitsStrip';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Babbies Care — India’s Trusted Baby Care & Nursery Store',
  description:
    'Shop genuine infant formulas, certified strollers, convertible cribs, organic cotton baby clothing, and baby-proofing essentials across India.',
  keywords: [
    'baby products India',
    'infant formula',
    'baby strollers',
    'cribs',
    'baby clothes',
    'diapers online',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} font-sans flex flex-col min-h-screen`}>
        <CartProvider>
          <WishlistProvider>
            <AnnouncementBar />
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <BenefitsStrip />
            <SiteFooter />
            <CartDrawer />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}

