import { NextResponse } from "next/server";
import db from "@/lib/db"; // Adjust the import path as necessary

export async function PUT(req, { params }) {
  try {
    const { id } = params; // Extracting `id` from the URL params
    const { status } = await req.json();

    // Input validation
    if (!id || typeof status !== "string") {
      throw new Error(
        "Invalid input: 'id' and 'status' are required, and 'status' must be a string"
      );
    }

    // Updating reservation status
    const updatedReserve = await db.Reserve.update({
      where: { id: parseInt(id) }, // Ensure `id` is parsed to an integer if necessary
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
