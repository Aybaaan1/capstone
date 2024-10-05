import { NextResponse } from "next/server";
import db from "@/lib/db"; // Adjust the path if necessary

export async function GET(request) {
  try {
    // Fetch reservations with related item and user information
    const reservations = await db.reserve.findMany({
      include: {
        item: true, // Include related ItemReservation data
        user: true, // Include related User data
      },
    });

    return NextResponse.json(reservations, { status: 200 });
  } catch (error) {
    console.error("Error fetching reservations:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { itemId, userId, reserveDateTime, returnDateTime, purpose } =
      await request.json();

    // Validate inputs
    if (!itemId || !userId || !reserveDateTime || !returnDateTime || !purpose) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    // Create a new reservation
    const newReservation = await db.reserve.create({
      data: {
        itemId,
        userId,
        reserveDateTime,
        returnDateTime,
        purpose,
      },
    });

    return NextResponse.json(newReservation, { status: 201 });
  } catch (error) {
    console.error("Error creating reservation:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
