'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Package,
  TrendingUp,
  AlertTriangle,
  ShoppingBag,
  Plus,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ChevronRight,
} from 'lucide-react';
import { PRODUCTS } from '@/lib/catalog-data';
import { formatPrice } from '@/lib/formatters';

export default function AdminDashboardPage() {
  const [productList, setProductList] = useState(PRODUCTS);
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'coupons'>('overview');

  const totalRevenue = 48290000; // in paise
  const totalOrders = 342;
  const lowStockCount = productList.filter((p) => p.stockQuantity <= 10).length;

  const mockOrders = [
    {
      id: 'ord-1',
      orderNumber: 'BC-2026-8912',
      customer: 'Priya Sharma (Mumbai)',
      totalPaise: 349900,
      paymentStatus: 'paid',
      fulfilmentStatus: 'shipped',
      date: 'Today, 11:20 AM',
    },
    {
      id: 'ord-2',
      orderNumber: 'BC-2026-8911',
      customer: 'Rahul Verma (Bengaluru)',
      totalPaise: 849900,
      paymentStatus: 'paid',
      fulfilmentStatus: 'processing',
      date: 'Today, 10:05 AM',
    },
    {
      id: 'ord-3',
      orderNumber: 'BC-2026-8910',
      customer: 'Ananya Roy (Delhi)',
      totalPaise: 129900,
      paymentStatus: 'paid',
      fulfilmentStatus: 'delivered',
      date: 'Yesterday',
    },
  ];

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-teal-700 uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4 text-teal-700" />
              <span>Admin Operations Console</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Babbies Care Management Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-full">
              Production Safe Mode
            </span>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Total Revenue
              </span>
              <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <h3 className="text-2xl font-black text-slate-900 mt-2">
              {formatPrice(totalRevenue)}
            </h3>
            <span className="text-[11px] text-emerald-600 font-semibold">
              +18.4% from last week
            </span>
          </div>

          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Total Orders
              </span>
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
            </div>
            <h3 className="text-2xl font-black text-slate-900 mt-2">{totalOrders}</h3>
            <span className="text-[11px] text-slate-500 font-medium">98.4% success rate</span>
          </div>

          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Active Catalog
              </span>
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
                <Package className="w-4 h-4" />
              </div>
            </div>
            <h3 className="text-2xl font-black text-slate-900 mt-2">
              {productList.length} SKUs
            </h3>
            <span className="text-[11px] text-teal-700 font-semibold">All Active</span>
          </div>

          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Low Stock Alerts
              </span>
              <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
                <AlertTriangle className="w-4 h-4" />
              </div>
            </div>
            <h3 className="text-2xl font-black text-red-600 mt-2">{lowStockCount}</h3>
            <span className="text-[11px] text-red-500 font-semibold">Requires reordering</span>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex gap-2 border-b border-stone-200 pb-3 mb-6">
          {(['overview', 'products', 'orders', 'coupons'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${
                activeTab === tab
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-stone-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content: Products Manager */}
        {(activeTab === 'overview' || activeTab === 'products') && (
          <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-black text-slate-900">
                Products & Inventory Control
              </h3>
              <span className="text-xs text-slate-500">{productList.length} total products</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-stone-200 text-slate-400 uppercase tracking-wider font-semibold">
                    <th className="py-3 px-2">SKU</th>
                    <th className="py-3 px-2">Product Name</th>
                    <th className="py-3 px-2">Category</th>
                    <th className="py-3 px-2">Price (INR)</th>
                    <th className="py-3 px-2">Stock Qty</th>
                    <th className="py-3 px-2">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 font-medium text-slate-700">
                  {productList.map((p) => (
                    <tr key={p.id} className="hover:bg-stone-50/80">
                      <td className="py-3 px-2 font-mono text-[11px] font-bold text-slate-900">
                        {p.sku}
                      </td>
                      <td className="py-3 px-2 max-w-xs truncate">{p.name}</td>
                      <td className="py-3 px-2 text-slate-500">{p.categorySlug}</td>
                      <td className="py-3 px-2 font-bold text-slate-900">
                        {formatPrice(p.pricePaise)}
                      </td>
                      <td className="py-3 px-2">
                        <span
                          className={`font-bold ${
                            p.stockQuantity <= 5
                              ? 'text-red-600'
                              : p.stockQuantity <= 15
                              ? 'text-amber-600'
                              : 'text-emerald-600'
                          }`}
                        >
                          {p.stockQuantity} units
                        </span>
                      </td>
                      <td className="py-3 px-2">
                        <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          Active
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab Content: Orders Table */}
        {(activeTab === 'overview' || activeTab === 'orders') && (
          <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs mb-8">
            <h3 className="text-base font-black text-slate-900 mb-4">
              Recent Customer Orders
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-stone-200 text-slate-400 uppercase tracking-wider font-semibold">
                    <th className="py-3 px-2">Order #</th>
                    <th className="py-3 px-2">Customer & Destination</th>
                    <th className="py-3 px-2">Amount</th>
                    <th className="py-3 px-2">Payment</th>
                    <th className="py-3 px-2">Fulfilment</th>
                    <th className="py-3 px-2">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 font-medium text-slate-700">
                  {mockOrders.map((o) => (
                    <tr key={o.id} className="hover:bg-stone-50/80">
                      <td className="py-3 px-2 font-mono font-bold text-teal-800">
                        {o.orderNumber}
                      </td>
                      <td className="py-3 px-2">{o.customer}</td>
                      <td className="py-3 px-2 font-bold text-slate-900">
                        {formatPrice(o.totalPaise)}
                      </td>
                      <td className="py-3 px-2">
                        <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full text-[10px] font-bold border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3" />
                          Paid (Razorpay)
                        </span>
                      </td>
                      <td className="py-3 px-2">
                        <span className="text-[11px] font-bold text-slate-800 capitalize">
                          {o.fulfilmentStatus}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-slate-400 text-[11px]">{o.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

