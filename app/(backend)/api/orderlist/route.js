import { NextResponse } from "next/server";
import db from "@/lib/db"; // Ensure the correct path to your db

// GET: Fetch orders with 'accepted' status
export async function GET() {
  try {
    const orders = await db.Order.findMany({
      where: {
        status: "accepted",
        // Filter orders with 'accepted' status
      },
      include: {
        user: true,
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
    console.error("Error fetching orders list:", error);
    return new Response(
      JSON.stringify({
        message: "Failed to fetch orders list",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}

// POST: Add a new order or update order status
export async function PUT(req) {
  try {
    const { id, status } = await req.json();

    // Input validation
    if (!id || typeof status !== "string") {
      throw new Error(
        "Invalid input: 'id' and 'status' are required, and 'status' must be a string"
      );
    }

    // Updating reservation status
    const updatedReserve = await db.Reserve.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json(updatedReserve);
  } catch (error) {
    console.error("Error updating reservation status:", error.message);
    return new Response(
      JSON.stringify({
        message: "Failed to update reservation status",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}
