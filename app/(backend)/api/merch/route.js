import { NextResponse } from "next/server";
import db from "@/lib/db"; // Ensure this path is correct

// Fetch all merchandise
export async function GET(request) {
  try {
    const items = await db.merch.findMany(); // Fetch all merch items from the database
    return NextResponse.json(items, { status: 200 });
  } catch (error) {
    console.error("Error fetching merchandise:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Create new merchandise item
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, price, stocks, type, image } = body;

    // Validate the required fields
    if (!name || !price || !stocks || !type || !image) {
      return NextResponse.json(
        {
          error: "Missing required fields: name, price, stocks, type, or image",
        },
        { status: 400 }
      );
    }

    // Create the new merch item
    const newItem = await db.merch.create({
      data: { name, price, stocks, type, image },
    });

    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    console.error("Error adding merchandise:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Update an item (e.g., toggle availability or update price)
export async function PUT(request) {
  try {
    const { searchParams } = new URL(request.url);
    const itemId = searchParams.get("id"); // Get the item ID from query params
    if (!itemId) {
      return NextResponse.json({ error: "Missing item ID" }, { status: 400 });
    }
    const body = await request.json();
    const { quantity } = body; // Get the quantity from the request body

    // Fetch the merchandise item to check the current stock and sales
    const merch = await db.merch.findUnique({
      where: { id: parseInt(itemId) },
    });

    if (!merch) {
      return NextResponse.json(
        { error: "Merchandise item not found" },
        { status: 404 }
      );
    }

    // Update the sales and stock
    const updatedItem = await db.merch.update({
      where: { id: parseInt(itemId) },
      data: {
        sales: (merch.sales || 0) + quantity, // Increment sales by the order quantity
        stocks: merch.stocks - quantity, // Deduct stock by the order quantity
      },
    });

    return NextResponse.json(updatedItem, { status: 200 });
  } catch (error) {
    console.error("Error updating merchandise:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Delete a merchandise item
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const itemId = searchParams.get("id");

    if (!itemId) {
      return NextResponse.json({ error: "Missing item ID" }, { status: 400 });
    }

    await db.merch.delete({ where: { id: parseInt(itemId) } });

    return NextResponse.json(
      { message: "Item deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting merchandise:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
