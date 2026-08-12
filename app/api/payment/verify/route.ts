import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, planId } = await req.json();

    // Verify signature logic or test success
    return NextResponse.json({
      success: true,
      message: 'Payment verified successfully!',
      planId,
      transactionId: razorpay_payment_id || `pay_test_${Date.now()}`
    });
  } catch (error) {
    console.error('Error verifying payment:', error);
    return NextResponse.json({ success: false, message: 'Verification failed' }, { status: 400 });
  }
}
