import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  const reserves = await db.reserve.findMany({
    include: { user: true, item: true },
  });
  return NextResponse.json(reserves);
}

export async function POST(request) {
  const { itemId, userId, reserveDateTime, returnDateTime, purpose } =
    await request.json();

  const newReserve = await db.reserve.create({
    data: { itemId, userId, reserveDateTime, returnDateTime, purpose },
  });

  return NextResponse.json(newReserve);
}
