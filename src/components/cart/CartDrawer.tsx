'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/formatters';

export function CartDrawer() {
  const { items, isCartOpen, setIsCartOpen, removeItem, updateQuantity, subtotalPaise, itemCount } =
    useCart();

  if (!isCartOpen) return null;

  const freeShippingThresholdPaise = 99900;
  const isFreeShipping = subtotalPaise >= freeShippingThresholdPaise;
  const remainingForFreeShipping = freeShippingThresholdPaise - subtotalPaise;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-teal-50/50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-teal-700" />
              <h2 className="text-lg font-bold text-slate-800">Your Shopping Cart</h2>
              <span className="text-xs bg-teal-700 text-white font-semibold px-2 py-0.5 rounded-full">
                {itemCount}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress */}
          <div className="px-6 py-3 bg-teal-50 border-b border-teal-100">
            {isFreeShipping ? (
              <p className="text-xs font-semibold text-teal-800 flex items-center gap-1.5">
                🎉 Congratulations! You unlocked <span className="underline">FREE Standard Delivery</span>!
              </p>
            ) : (
              <div>
                <p className="text-xs text-slate-600 mb-1.5">
                  Add <span className="font-bold text-teal-800">{formatPrice(remainingForFreeShipping)}</span> more for <span className="font-semibold text-teal-700">FREE Delivery</span>
                </p>
                <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-teal-600 h-1.5 rounded-full transition-all duration-300"
                    style={{
                      width: `${Math.min(100, (subtotalPaise / freeShippingThresholdPaise) * 100)}%`,
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-slate-100">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-semibold text-slate-800 mb-1">Your cart is empty</h3>
                <p className="text-xs text-slate-500 max-w-xs mb-6">
                  Explore our certified baby products, formula, strollers, and nursery furniture.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-5 py-2.5 bg-teal-700 text-white rounded-xl text-sm font-semibold hover:bg-teal-800 transition-colors"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={`${item.productId}-${item.variantId || 'default'}`} className="py-4 flex gap-4">
                  <div className="w-20 h-20 relative rounded-lg border border-slate-100 overflow-hidden flex-shrink-0 bg-slate-50">
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="text-sm font-medium text-slate-800 line-clamp-2 leading-tight">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeItem(item.productId, item.variantId)}
                          className="text-slate-400 hover:text-red-500 transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      {item.variantName && (
                        <p className="text-xs text-slate-500 mt-0.5">{item.variantName}</p>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                        <button
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity - 1, item.variantId)
                          }
                          className="p-1 hover:bg-slate-100 text-slate-600 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2.5 py-0.5 text-xs font-semibold text-slate-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity + 1, item.variantId)
                          }
                          disabled={item.quantity >= item.stockQuantity}
                          className="p-1 hover:bg-slate-100 text-slate-600 disabled:opacity-30 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-sm font-bold text-slate-900">
                          {formatPrice(item.pricePaise * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="p-6 border-t border-slate-100 bg-slate-50/80">
              <div className="flex items-center justify-between text-sm mb-1 text-slate-600">
                <span>Subtotal</span>
                <span className="text-lg font-bold text-slate-900">
                  {formatPrice(subtotalPaise)}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mb-4">
                Taxes and shipping calculated at checkout.
              </p>

              <Link
                href="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-teal-700 hover:bg-teal-800 text-white font-semibold rounded-xl text-sm shadow-md transition-all group"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <button
                onClick={() => setIsCartOpen(false)}
                className="w-full mt-2.5 py-2 text-center text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors"
              >
                Continue Browsing
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

