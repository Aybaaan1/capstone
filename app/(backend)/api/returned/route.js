import { NextResponse } from "next/server";
import db from "@/lib/db"; // Adjust the import path as necessary

export async function GET() {
  try {
    const returnedItems = await db.Reserve.findMany({
      where: { status: "returned" }, // Adjust condition as per your logic
    });

    return new Response(JSON.stringify(returnedItems), { status: 200 });
  } catch (error) {
    console.error("Error fetching returned items:", error);
    return new Response(
      JSON.stringify({
        message: "Failed to fetch returned items",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}

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
