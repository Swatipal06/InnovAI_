import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { planId, amount, currency = 'INR' } = await req.json();

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (keyId && keySecret) {
      const auth = Buffer.from(`${keyId}:${keySecret}`).toString('base64');
      const res = await fetch('https://api.razorpay.com/v1/orders', {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          amount: amount * 100, // paise
          currency,
          receipt: `rcpt_${planId}_${Date.now()}`
        })
      });

      if (res.ok) {
        const order = await res.json();
        return NextResponse.json({ orderId: order.id, keyId, amount: order.amount, currency: order.currency });
      }
    }

    // Interactive Test Payment fallback
    const mockOrder = {
      orderId: `order_test_${Date.now()}`,
      keyId: keyId || 'rzp_test_InnovAI2026',
      amount: amount * 100,
      currency: currency || 'INR'
    };

    return NextResponse.json(mockOrder);
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}
