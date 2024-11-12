import { NextResponse } from "next/server";
import db from "@/lib/db"; // Adjust the path if necessary

export async function GET(request) {
  try {
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

export async function POST(req) {
  try {
    const { itemId, userId, reserveDateTime, returnDateTime, purpose, status } =
      await req.json(); // Parse incoming request body

    // Validate if all required fields are provided
    if (!itemId || !userId || !reserveDateTime || !returnDateTime || !purpose) {
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        { status: 400 }
      );
    }

    // Parse the date fields
    const reserveDate = new Date(reserveDateTime);
    const returnDate = new Date(returnDateTime);

    // Optional: Log the date values to verify
    console.log("Reserve Date:", reserveDate);
    console.log("Return Date:", returnDate);

    // Use the status from the request body or set a default value (e.g., 'pending')
    const reservationStatus = status || "pending"; // Default to "pending" if no status is provided

    // Create reservation using Prisma
    const reservation = await prisma.reserve.create({
      data: {
        itemId,
        userId,
        reserveDateTime: reserveDate,
        returnDateTime: returnDate,
        purpose,
        status: reservationStatus, // Add the status field
      },
    });

    // Return success response with reservation data
    return new Response(JSON.stringify(reservation), { status: 201 });
  } catch (error) {
    console.error("Error creating reservation:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Error creating reservation" }),
      { status: 500 }
    );
  }
}
