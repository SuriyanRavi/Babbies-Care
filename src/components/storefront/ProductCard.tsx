'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Star, ShoppingBag, Check } from 'lucide-react';
import { Product } from '@/types';
import { formatPrice, calculateDiscountPercent } from '@/lib/formatters';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const [addedAnimation, setAddedAnimation] = React.useState(false);

  const discountPercent = calculateDiscountPercent(
    product.pricePaise,
    product.compareAtPricePaise
  );

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const isFavorited = isWishlisted(product.id);
  const purchasesCount = (product.reviewCount * 14 + 120).toLocaleString('en-US');

  return (
    <div className="group relative bg-white border border-slate-200/90 rounded-2xl p-3.5 sm:p-4 hover:shadow-card-hover hover:border-teal-300 transition-all duration-300 flex flex-col justify-between h-full">
      {/* Top: Product Title & Star Ratings (Centered) */}
      <div>
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-xs font-semibold text-slate-800 text-center line-clamp-2 hover:text-teal-700 transition-colors leading-snug min-h-[32px]">
            {product.name}
          </h3>
        </Link>

        {/* Rating Stars */}
        <div className="flex items-center justify-center gap-1 mt-1 text-amber-400 text-[10px]">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${
                  i < Math.floor(product.rating)
                    ? 'fill-amber-400 stroke-amber-400'
                    : 'fill-slate-200 stroke-slate-200'
                }`}
              />
            ))}
          </div>
          <span className="text-slate-400 font-normal">({product.reviewCount})</span>
        </div>
      </div>

      {/* Center: Image with optional badges & dots */}
      <div className="relative my-2 sm:my-3">
        {/* Optional Badge */}
        {product.stockQuantity <= 0 ? (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10 bg-black text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider whitespace-nowrap">
            OUT OF STOCK
          </div>
        ) : product.badge ? (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10 bg-black text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider whitespace-nowrap">
            {product.badge}
          </div>
        ) : null}

        <Link
          href={`/products/${product.slug}`}
          className="block relative aspect-square w-full overflow-hidden"
        >
          <Image
            src={product.primaryImage}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
          />
        </Link>

        {/* Quick Add To Cart on Hover / Added feedback */}
        <button
          onClick={handleAddToCart}
          disabled={product.stockQuantity <= 0}
          className={`absolute bottom-1 right-1 z-10 p-1.5 rounded-full shadow-sm transition-all opacity-0 group-hover:opacity-100 ${
            addedAnimation
              ? 'bg-emerald-600 text-white opacity-100'
              : 'bg-teal-700 hover:bg-teal-800 text-white'
          }`}
          title="Add to Cart"
          aria-label="Add to Cart"
        >
          {addedAnimation ? (
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          ) : (
            <ShoppingBag className="w-3.5 h-3.5" />
          )}
        </button>
      </div>

      {/* Bottom: Price row & Purchases / Wishlist row */}
      <div className="pt-2 border-t border-slate-100/80">
        {/* Price Line */}
        <div className="flex items-center flex-wrap gap-1.5 mb-1.5">
          <span
            className={`text-sm sm:text-base font-bold tracking-tight ${
              discountPercent ? 'text-red-500' : 'text-slate-900'
            }`}
          >
            {formatPrice(product.pricePaise)}
          </span>
          {product.compareAtPricePaise && (
            <span className="text-xs text-slate-400 line-through">
              {formatPrice(product.compareAtPricePaise)}
            </span>
          )}
          {discountPercent && (
            <span className="bg-[#FF4D30] text-white font-bold text-[9px] px-1.5 py-0.5 rounded uppercase">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Footer Row: Purchases & Wishlist Heart */}
        <div className="flex items-center justify-between text-[11px] text-slate-400">
          <span>{purchasesCount} Purchases</span>
          <button
            onClick={handleWishlistToggle}
            className="p-1 hover:text-rose-500 transition-colors focus:outline-none"
            aria-label="Toggle wishlist"
          >
            <Heart
              className={`w-3.5 h-3.5 ${
                isFavorited ? 'fill-rose-500 stroke-rose-500 text-rose-500' : 'stroke-slate-300 text-slate-300'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
