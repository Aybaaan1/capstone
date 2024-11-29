import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("Received data:", body);

    const { userId, cartItems, proof, status } = body;

    if (
      !userId ||
      !cartItems ||
      !Array.isArray(cartItems) ||
      cartItems.length === 0
    ) {
      return NextResponse.json(
        { error: "Invalid request: Missing required fields or cart is empty" },
        { status: 400 }
      );
    }

    const orders = await Promise.all(
      cartItems.map(async (item) => {
        const { merchId, quantity, size } = item;

        if (!merchId || quantity <= 0) {
          throw new Error("Invalid cart item data");
        }

        return await db.order.create({
          data: {
            userId,
            merchId,
            quantity,
            size,
            proof: proof || "",
            status: status || "Pending",
          },
        });
      })
    );

    return NextResponse.json(
      { message: "Orders created successfully", orders },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating order:", error.message);
    return NextResponse.json(
      { error: "Failed to create orders" },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    const orders = await db.order.findMany();
    return NextResponse.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
