import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { amount, packageName } = await req.json();

    if (!amount || amount < 100) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    // In production, use the razorpay npm package:
    // const Razorpay = require("razorpay");
    // const instance = new Razorpay({
    //   key_id: process.env.RAZORPAY_KEY_ID,   // REPLACE WITH LIVE KEY
    //   key_secret: process.env.RAZORPAY_SECRET, // REPLACE WITH LIVE SECRET
    // });
    // const order = await instance.orders.create({
    //   amount: amount * 100, // in paise
    //   currency: "INR",
    //   receipt: `trippy_${Date.now()}`,
    //   notes: { packageName },
    // });
    // return NextResponse.json(order);

    // TEST MODE: Return a mock order ID for development
    const mockOrderId = `order_test_${Math.random().toString(36).substring(2, 15)}`;
    return NextResponse.json({
      id: mockOrderId,
      amount: amount * 100,
      currency: "INR",
      status: "created",
      receipt: `trippy_${Date.now()}`,
      notes: { packageName },
    });
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
