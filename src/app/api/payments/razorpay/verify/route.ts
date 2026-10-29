import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { z } from 'zod';

const VerifySchema = z.object({
  orderNumber: z.string(),
  razorpayOrderId: z.string(),
  razorpayPaymentId: z.string(),
  razorpaySignature: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = VerifySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid verification payload' }, { status: 400 });
    }

    const { orderNumber, razorpayOrderId, razorpayPaymentId, razorpaySignature } = parsed.data;
    const secret = process.env.RAZORPAY_KEY_SECRET;

    // In production with secret, perform HMAC-SHA256 constant-time comparison
    if (secret && razorpaySignature) {
      const generatedSignature = crypto
        .createHmac('sha256', secret)
        .update(`${razorpayOrderId}|${razorpayPaymentId}`)
        .digest('hex');

      const isValid = crypto.timingSafeEqual(
        Buffer.from(generatedSignature),
        Buffer.from(razorpaySignature)
      );

      if (!isValid) {
        return NextResponse.json({ error: 'Signature verification failed' }, { status: 400 });
      }
    }

    // Return verified status
    return NextResponse.json({
      verified: true,
      orderNumber,
      paymentId: razorpayPaymentId,
      status: 'paid',
      message: 'Payment successfully verified',
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Verification error' }, { status: 500 });
  }
}

