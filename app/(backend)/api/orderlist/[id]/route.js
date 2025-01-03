import { NextResponse } from "next/server";
import db from "@/lib/db"; // Adjust the import path as necessary

export async function PUT(req, { params }) {
  try {
    const { id } = params; // Extract 'id' from URL params
    const { status } = await req.json(); // Extract 'status' from the body of the request

    // Validate inputs
    if (!id || typeof status !== "string") {
      throw new Error(
        "Invalid input: 'id' and 'status' are required, and 'status' must be a string"
      );
    }

    // Update the order in the database
    const updatedOrder = await db.Order.update({
      where: { id: parseInt(id) }, // Ensure 'id' is an integer if necessary
      data: { status },
    });

    return NextResponse.json(updatedOrder);
  } catch (error) {
    console.error("Error updating order status:", error.message);
    return new Response(
      JSON.stringify({
        message: "Failed to update order status",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}
