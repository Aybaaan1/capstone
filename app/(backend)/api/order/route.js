import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(request) {
  try {
    const { cartItems, userId, proof, status } = await request.json();

    // Validate input
    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      return NextResponse.json(
        { error: "Cart items are required." },
        { status: 400 }
      );
    }

    if (!userId || !proof || !status) {
      return NextResponse.json(
        { error: "Missing required fields: userId, proof, or status." },
        { status: 400 }
      );
    }

    // Create orders for each item in cartItems
    const createdOrders = [];
    for (const item of cartItems) {
      const { merchId, quantity, size } = item;

      // Validate each item's fields
      if (!merchId || !quantity || size === null) {
        return NextResponse.json(
          { error: "Each cart item must have merchId, quantity, and size." },
          { status: 400 }
        );
      }

      const order = await db.order.create({
        data: {
          merchId,
          quantity,
          size,
          userId,
          proof,
          status,
        },
      });

      createdOrders.push(order);
    }

    return NextResponse.json(
      { message: "Orders created successfully.", createdOrders },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing order:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
export async function GET(request) {
  try {
    const orders = await db.order.findMany({
      include: {
        merch: {
          // Assuming "merch" is a relation in the "order" model
          select: {
            name: true,
            price: true,
            image: true,
          },
        },
      },
    });

    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
