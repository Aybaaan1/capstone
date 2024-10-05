import { NextResponse } from "next/server";
import db from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "/Users/Bernadeth Caballero/Desktop/JOSWA/ssg/app/(backend)/api/auth/[...nextauth]/route"; // Correct import path

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const userId = session.user.id;

    if (
      !body.itemId ||
      !body.reserveDateTime ||
      !body.returnDateTime ||
      !body.purpose
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newReservation = await db.reserve.create({
      data: {
        itemId: body.itemId,
        userId,
        reserveDateTime: body.reserveDateTime,
        returnDateTime: body.returnDateTime,
        purpose: body.purpose,
      },
    });

    return NextResponse.json(newReservation, { status: 201 });
  } catch (error) {
    console.error("Error creating reservation:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const reservations = await db.reserve.findMany();
    return NextResponse.json(reservations, { status: 200 });
  } catch (error) {
    console.error("Error fetching reservations:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
