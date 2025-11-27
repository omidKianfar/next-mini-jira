import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const POST = async (request: NextRequest) => {
  try {
    const { sessionId } = await request.json();

    if (!sessionId) {
      return NextResponse.json(
        { error: "sessionId is required" },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["subscription"],
    });

    const subscriptionId =
      typeof session.subscription === "string"
        ? session.subscription
        : session.subscription?.id;

    return NextResponse.json({
      subscriptionId: subscriptionId || null,
      customerId: session.customer || null,
    });
  } catch (error: any) {
    console.error("Stripe get-session error:", error);
    return NextResponse.json(
      { error: error.message || "Stripe error" },
      { status: 400 }
    );
  }
};
