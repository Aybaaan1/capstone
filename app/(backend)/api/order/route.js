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

    const createdOrders = [];
    const updatedStocks = [];

    // Begin a transaction for consistency
    const transaction = await db.$transaction(async (prisma) => {
      for (const item of cartItems) {
        const { merchId, quantity, size } = item;

        // Validate each item's fields
        if (!merchId || !quantity || size === null) {
          throw new Error(
            "Each cart item must have merchId, quantity, and size."
          );
        }

        // Fetch merchandise to check stock availability
        const merch = await prisma.merch.findUnique({
          where: { id: merchId },
        });

        if (!merch) {
          throw new Error(`Merch item with ID ${merchId} not found.`);
        }

        // Check if stock is 0
        if (merch.stocks === 0) {
          throw new Error(
            `The item "${merch.name}" is out of stock and cannot be ordered.`
          );
        }

        // Check if there is sufficient stock
        if (merch.stocks < quantity) {
          throw new Error(
            `Insufficient stock for item "${merch.name}". Available: ${merch.stocks}, Requested: ${quantity}.`
          );
        }

        // Deduct stocks
        const updatedMerch = await prisma.merch.update({
          where: { id: merchId },
          data: {
            stocks: merch.stocks - quantity,
          },
        });

        // Create order
        const order = await prisma.order.create({
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
        updatedStocks.push({ merchId, remainingStock: updatedMerch.stocks });
      }

      return { createdOrders, updatedStocks };
    });

    return NextResponse.json(
      {
        message: "Orders created successfully.",
        orders: transaction.createdOrders,
        stockUpdates: transaction.updatedStocks,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing order:", error.message);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
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
