import { NextResponse } from 'next/server';
import { PRODUCTS } from '@/lib/catalog-data';
import { z } from 'zod';

const QuoteSchema = z.object({
  items: z.array(
    z.object({
      productId: z.string(),
      variantId: z.string().optional(),
      quantity: z.number().int().positive(),
    })
  ),
  couponCode: z.string().optional(),
  postalCode: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = QuoteSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid request payload', details: parsed.error.issues }, { status: 400 });
    }

    const { items, couponCode } = parsed.data;

    let subtotalPaise = 0;
    const validatedItems = [];

    // Recalculate strictly from server-authoritative catalog prices
    for (const item of items) {
      const product = PRODUCTS.find((p) => p.id === item.productId);
      if (!product) {
        return NextResponse.json({ error: `Product ${item.productId} not found` }, { status: 404 });
      }

      if (product.stockQuantity < item.quantity) {
        return NextResponse.json(
          { error: `Insufficient stock for ${product.name}. Available: ${product.stockQuantity}` },
          { status: 400 }
        );
      }

      const itemTotalPaise = product.pricePaise * item.quantity;
      subtotalPaise += itemTotalPaise;

      validatedItems.push({
        productId: product.id,
        name: product.name,
        sku: product.sku,
        unitPricePaise: product.pricePaise,
        quantity: item.quantity,
        lineTotalPaise: itemTotalPaise,
      });
    }

    // Shipping logic: Free above ₹999
    const freeShippingThresholdPaise = 99900;
    const shippingPaise = subtotalPaise >= freeShippingThresholdPaise || validatedItems.length === 0 ? 0 : 9900;

    // Coupon logic
    let discountPaise = 0;
    if (couponCode === 'BABY10') {
      discountPaise = Math.round(subtotalPaise * 0.1);
    } else if (couponCode === 'BABY15') {
      discountPaise = Math.round(subtotalPaise * 0.15);
    }

    const totalPaise = Math.max(0, subtotalPaise - discountPaise + shippingPaise);

    return NextResponse.json({
      currency: 'INR',
      subtotalPaise,
      discountPaise,
      shippingPaise,
      totalPaise,
      items: validatedItems,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}

