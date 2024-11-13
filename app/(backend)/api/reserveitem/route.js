import { NextResponse } from "next/server";
import db from "@/lib/db"; // Ensure this path is correct

// Fetch all items
export async function GET(request) {
  try {
    const items = await db.itemReservation.findMany();
    return NextResponse.json(items, { status: 200 });
  } catch (error) {
    console.error("Error fetching items:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Create a new item
export async function POST(request) {
  try {
    const body = await request.json();
    const { type, status, image } = body;

    // Validate required fields
    if (!type || !status || !image) {
      return NextResponse.json(
        { error: "Missing required fields: type, status, or image" },
        { status: 400 }
      );
    }

    // Create a new reservation item
    const newItem = await db.itemReservation.create({
      data: { type, status, image },
    });

    return NextResponse.json(
      { id: newItem.id, type: newItem.type, status: newItem.status },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding item:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}

// Update the status of an item (PUT method)
export async function PUT(request) {
  try {
    const { searchParams } = new URL(request.url);
    const itemId = searchParams.get("id"); // Get the item ID from query params
    if (!itemId) {
      return NextResponse.json({ error: "Missing item ID" }, { status: 400 });
    }
    const body = await request.json();
    const { status } = body;
    // Validate that status is provided
    if (!status) {
      return NextResponse.json(
        { error: "Missing required field: status" },
        { status: 400 }
      );
    }
    // Update the item's status in the database
    const updatedItem = await db.itemReservation.update({
      where: { id: parseInt(itemId) }, // Convert the ID to an integer
      data: { status },
    });
    return NextResponse.json(
      {
        id: updatedItem.id,
        type: updatedItem.type,
        status: updatedItem.status,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating item status:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const itemId = searchParams.get("id");

    if (!itemId) {
      return NextResponse.json({ error: "Missing item ID" }, { status: 400 });
    }

    // Delete the item from the database
    await db.itemReservation.delete({
      where: { id: parseInt(itemId) }, // Make sure the ID is converted to an integer
    });

    return NextResponse.json(
      { message: "Item deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting item:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
