import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  try {
    const reserves = await db.reserve.findMany({
      include: { user: true, item: true },
    });
    console.log("Fetched reserves:", reserves); // Debugging log
    return NextResponse.json(reserves);
  } catch (error) {
    console.error("Error fetching reserves:", error); // Debugging log
    return NextResponse.error();
  }
}

export async function POST(request) {
  try {
    const { itemId, userId, reserveDateTime, returnDateTime, purpose } =
      await request.json();
    const newReserve = await db.reserve.create({
      data: { itemId, userId, reserveDateTime, returnDateTime, purpose },
    });
    console.log("Created new reserve:", newReserve); // Debugging log
    return NextResponse.json(newReserve);
  } catch (error) {
    console.error("Error creating reserve:", error); // Debugging log
    return NextResponse.error();
  }
}
