import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function PUT(request, { params }) {
  const { id } = params; // Get the dynamic ID from the URL parameters
  const { status } = await request.json(); // Extract the new status from the request body

  try {
    const updatedItem = await db.item.update({
      where: { id: parseInt(id) }, // Make sure this matches your DB schema
      data: { status }, // Update the status of the item in the DB
    });
    return NextResponse.json(updatedItem, { status: 200 }); // Return the updated item as response
  } catch (error) {
    console.error("Error updating item status:", error);
    return NextResponse.json(
      { error: "Failed to update item status" },
      { status: 500 } // Return error response if something goes wrong
    );
  }
}
export async function DELETE(request, { params }) {
  const { id } = params;

  await db.item.delete({
    where: { id: Number(id) },
  });

  return NextResponse.json({ message: "Item deleted" });
}
