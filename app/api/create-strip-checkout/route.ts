import { routes } from "@/src/lib/route/routes";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const POST = async (request: NextRequest) => {
  try {
    const { planType } = await request.json();

    if (!planType) {
      return NextResponse.json(
        { error: "planType is required" },
        { status: 400 }
      );
    }

    const priceId =
      planType === "monthly"
        ? process.env.STRIPE_MONTHLY_PRICE_ID
        : process.env.STRIPE_YEARLY_PRICE_ID;

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${request.headers.get(
        "origin"
      )}/payment-success?planType=${planType}&session_id={CHECKOUT_SESSION_ID}` ,
      cancel_url: `${request.headers.get("origin")}${routes.paymentFailed}`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.log("Stripe Error:", error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
};
