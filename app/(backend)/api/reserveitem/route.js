import { NextResponse } from "next/server";
import db from "@/lib/db"; // Ensure this path is correct

export async function GET(request) {
  try {
    // Fetch all items from the ItemReservation model
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

export async function POST(request) {
  try {
    const body = await request.json();
    console.log("Received body:", body); // Log the request body

    const { type, status, image } = body;

    // Validate required fields
    if (!type || !status || !image) {
      return NextResponse.json(
        { error: "Missing required fields: type, status, or image" },
        { status: 400 }
      );
    }

    // Create a new reservation item in the ItemReservation model
    const newItem = await db.itemReservation.create({
      data: {
        type,
        status,
        image,
      },
    });

    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    console.error("Error adding item:", error); // Log the error details
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message }, // Include error details
      { status: 500 }
    );
  }
}
