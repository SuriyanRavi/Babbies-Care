'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound, useParams } from 'next/navigation';
import {
  ChevronRight,
  Star,
  Heart,
  ShoppingBag,
  Plus,
  Minus,
  Truck,
  RotateCcw,
  ShieldCheck,
  Check,
  Share2,
} from 'lucide-react';
import { PRODUCTS } from '@/lib/catalog-data';
import { formatPrice, calculateDiscountPercent } from '@/lib/formatters';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { ProductCard } from '@/components/storefront/ProductCard';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const product = PRODUCTS.find((p) => p.slug === slug);
  const { addItem } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();

  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'safety' | 'reviews'>('details');
  const [isAdded, setIsAdded] = useState(false);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-slate-800">Product Not Found</h2>
        <p className="text-xs text-slate-500 mt-2">
          The requested product may have been archived or moved.
        </p>
        <Link
          href="/"
          className="mt-4 inline-block px-5 py-2.5 bg-teal-700 text-white rounded-xl text-xs font-bold"
        >
          Return to Storefront
        </Link>
      </div>
    );
  }

  const discountPercent = calculateDiscountPercent(
    product.pricePaise,
    product.compareAtPricePaise
  );
  const isFavorited = isWishlisted(product.id);

  const handleAddToCart = () => {
    addItem(product, undefined, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const relatedProducts = PRODUCTS.filter(
    (p) => p.categorySlug === product.categorySlug && p.id !== product.id
  ).slice(0, 4);

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-6">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6 flex-wrap">
          <Link href="/" className="hover:text-teal-700">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <Link href={`/categories/${product.categorySlug}`} className="hover:text-teal-700">
            {product.categorySlug?.replace(/-/g, ' ')}
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="font-semibold text-slate-800 truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Product Details Card */}
        <div className="bg-white rounded-3xl border border-stone-200/90 shadow-sm p-6 sm:p-8 lg:p-10 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left: Images Gallery */}
            <div className="lg:col-span-6 space-y-4">
              {/* Main Image Frame */}
              <div className="relative aspect-square w-full rounded-2xl bg-stone-50 border border-stone-200 overflow-hidden">
                <Image
                  src={product.images[selectedImageIndex]?.imageUrl || product.primaryImage}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain p-6"
                />

                {discountPercent && (
                  <span className="absolute top-4 left-4 bg-red-500 text-white font-extrabold text-xs px-3 py-1 rounded-full shadow-sm">
                    -{discountPercent}% OFF
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {product.images.map((img, idx) => (
                    <button
                      key={img.id}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 bg-stone-50 transition-all ${
                        selectedImageIndex === idx
                          ? 'border-teal-700 shadow-xs'
                          : 'border-stone-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <Image
                        src={img.imageUrl}
                        alt={img.altText}
                        fill
                        className="object-contain p-2"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Info & Actions */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
              <div>
                {/* Brand & SKU */}
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-bold text-teal-700 uppercase tracking-wider">
                    {product.brandName || 'Babbies Care'}
                  </span>
                  <span className="text-slate-400 font-mono">SKU: {product.sku}</span>
                </div>

                {/* Title */}
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 leading-snug">
                  {product.name}
                </h1>

                {/* Rating & Reviews */}
                <div className="flex items-center gap-3 mt-3">
                  <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200 text-amber-700 text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                    <span>{product.rating}</span>
                  </div>
                  <span className="text-xs text-slate-500">
                    Based on {product.reviewCount} verified parent reviews
                  </span>
                </div>

                {/* Price Display */}
                <div className="mt-4 p-4 rounded-2xl bg-teal-50/60 border border-teal-100 flex items-baseline gap-3">
                  <span className="text-3xl font-black text-teal-900">
                    {formatPrice(product.pricePaise)}
                  </span>
                  {product.compareAtPricePaise && (
                    <span className="text-base text-slate-400 line-through">
                      {formatPrice(product.compareAtPricePaise)}
                    </span>
                  )}
                  {discountPercent && (
                    <span className="text-xs font-bold text-red-600 bg-red-100 px-2.5 py-0.5 rounded-full">
                      You Save {formatPrice(product.compareAtPricePaise! - product.pricePaise)}
                    </span>
                  )}
                </div>

                {/* Short Description */}
                {product.shortDescription && (
                  <p className="text-xs sm:text-sm text-slate-600 mt-4 leading-relaxed">
                    {product.shortDescription}
                  </p>
                )}

                {/* Stock Indicator */}
                <div className="mt-4 flex items-center gap-2">
                  <div
                    className={`w-2.5 h-2.5 rounded-full ${
                      product.stockQuantity > 0 ? 'bg-emerald-500' : 'bg-red-500'
                    }`}
                  />
                  <span className="text-xs font-bold text-slate-700">
                    {product.stockQuantity > 5
                      ? 'In Stock & Ready to Dispatch'
                      : product.stockQuantity > 0
                      ? `Hurry, only ${product.stockQuantity} left in stock!`
                      : 'Currently Out of Stock'}
                  </span>
                </div>
              </div>

              {/* Purchase Controls */}
              <div className="space-y-4 pt-4 border-t border-stone-100">
                <div className="flex items-center gap-4">
                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-stone-300 rounded-xl bg-white p-1">
                    <button
                      onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                      className="p-2 hover:bg-stone-100 text-slate-600 rounded-lg transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center text-sm font-bold text-slate-900">
                      {quantity}
                    </span>
                    <button
                      onClick={() =>
                        setQuantity((prev) => Math.min(product.stockQuantity, prev + 1))
                      }
                      disabled={quantity >= product.stockQuantity}
                      className="p-2 hover:bg-stone-100 text-slate-600 rounded-lg disabled:opacity-30 transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={handleAddToCart}
                    disabled={product.stockQuantity <= 0}
                    className={`flex-1 py-3.5 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all ${
                      product.stockQuantity <= 0
                        ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                        : isAdded
                        ? 'bg-emerald-600 text-white'
                        : 'bg-teal-700 hover:bg-teal-800 text-white'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-4 h-4 stroke-[3]" />
                        <span>Added to Cart!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add {quantity} to Cart</span>
                      </>
                    )}
                  </button>

                  {/* Wishlist Button */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className={`p-3.5 rounded-xl border transition-all ${
                      isFavorited
                        ? 'bg-rose-50 border-rose-200 text-rose-500'
                        : 'border-stone-300 hover:border-rose-400 text-slate-400 hover:text-rose-500'
                    }`}
                    aria-label="Wishlist"
                  >
                    <Heart
                      className={`w-5 h-5 ${isFavorited ? 'fill-rose-500 stroke-rose-500' : ''}`}
                    />
                  </button>
                </div>

                {/* Trust Badges Bar */}
                <div className="grid grid-cols-2 gap-3 pt-3">
                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-stone-50 border border-stone-200/70 text-xs text-slate-600">
                    <Truck className="w-4 h-4 text-teal-700 flex-shrink-0" />
                    <span>Free Shipping on orders above ₹999</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-stone-50 border border-stone-200/70 text-xs text-slate-600">
                    <RotateCcw className="w-4 h-4 text-teal-700 flex-shrink-0" />
                    <span>30-Day Easy Returns Guarantee</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Accordion / Tabs: Description, Specs, Safety, Reviews */}
          <div className="mt-12 pt-8 border-t border-stone-200">
            <div className="flex items-center gap-4 border-b border-stone-200 pb-3 overflow-x-auto no-scrollbar">
              <button
                onClick={() => setActiveTab('details')}
                className={`pb-2 text-sm font-bold tracking-tight transition-colors ${
                  activeTab === 'details'
                    ? 'text-teal-700 border-b-2 border-teal-700'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Product Details
              </button>
              <button
                onClick={() => setActiveTab('specs')}
                className={`pb-2 text-sm font-bold tracking-tight transition-colors ${
                  activeTab === 'specs'
                    ? 'text-teal-700 border-b-2 border-teal-700'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Specifications
              </button>
              <button
                onClick={() => setActiveTab('safety')}
                className={`pb-2 text-sm font-bold tracking-tight transition-colors ${
                  activeTab === 'safety'
                    ? 'text-teal-700 border-b-2 border-teal-700'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Pediatric Safety
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`pb-2 text-sm font-bold tracking-tight transition-colors ${
                  activeTab === 'reviews'
                    ? 'text-teal-700 border-b-2 border-teal-700'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Reviews ({product.reviewCount})
              </button>
            </div>

            <div className="py-6 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
              {activeTab === 'details' && (
                <div className="space-y-4">
                  <p>{product.description}</p>
                  <p>
                    All Babbies Care products undergo batch safety testing and comply strictly with
                    Bureau of Indian Standards (BIS) and pediatric health guidelines.
                  </p>
                </div>
              )}

              {activeTab === 'specs' && (
                <div className="divide-y divide-stone-100">
                  {product.specifications ? (
                    Object.entries(product.specifications).map(([key, val]) => (
                      <div key={key} className="py-2.5 flex justify-between">
                        <span className="font-semibold text-slate-700">{key}</span>
                        <span className="text-slate-600">{val}</span>
                      </div>
                    ))
                  ) : (
                    <div className="py-2.5 flex justify-between">
                      <span className="font-semibold text-slate-700">Origin</span>
                      <span className="text-slate-600">India</span>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'safety' && (
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-amber-900">
                    <ShieldCheck className="w-4 h-4 text-amber-600" />
                    <span>Important Safety Notice</span>
                  </div>
                  <p className="text-xs">
                    {product.safetyInfo ||
                      'Always supervise infants during feeding and gear use. Keep packaging and plastic wrap away from babies to prevent suffocation risk.'}
                  </p>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-black text-slate-900">
                        {product.rating} / 5.0
                      </span>
                      <p className="text-xs text-slate-500">
                        Overall satisfaction score from verified buyers
                      </p>
                    </div>
                    <button className="px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-bold transition-colors">
                      Write a Review
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-black text-slate-900 mb-6">
              You Might Also <span className="text-teal-700">Need</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

