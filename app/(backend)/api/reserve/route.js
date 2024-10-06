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

export async function POST(request) {
  const { itemId, userId, reserveDateTime, returnDateTime, purpose } =
    await request.json();

  // Convert to Date objects to ensure valid ISO-8601 format
  const reserveDate = new Date(reserveDateTime);
  const returnDate = new Date(returnDateTime);

  // Validate dates
  if (isNaN(reserveDate) || isNaN(returnDate)) {
    return NextResponse.json({ error: "Invalid date format" }, { status: 400 });
  }

  // Prepare the data for Prisma
  const reservationData = {
    itemId,
    userId,
    reserveDateTime: reserveDate, // Use the Date object
    returnDateTime: returnDate, // Use the Date object
    purpose,
  };

  try {
    const reservation = await prisma.reserve.create({
      data: reservationData,
    });
    return NextResponse.json(reservation, { status: 201 });
  } catch (error) {
    console.error("Error creating reservation:", error);
    return NextResponse.json(
      { error: "Error creating reservation" },
      { status: 500 }
    );
  }
}
