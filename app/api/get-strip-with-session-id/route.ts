import { NextRequest, NextResponse, Stripe } from '@/app/imports';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const POST = async (request: NextRequest) => {
  try {
    const { sessionId } = await request.json();

    if (!sessionId) {
      return NextResponse.json(
        { error: 'sessionId is required' },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['subscription'],
    });

    const subscriptionId =
      typeof session.subscription === 'string'
        ? session.subscription
        : session.subscription?.id;

    return NextResponse.json({
      subscriptionId: subscriptionId || null,
      customerId: session.customer || null,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Stripe error' },
      { status: 400 }
    );
  }
};
