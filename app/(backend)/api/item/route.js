import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  const items = await db.item.findMany({
    include: { user: true },
  });
  return NextResponse.json(items);
}

export async function POST(request) {
  const { userId, name, place, dateTime, image, type, status } =
    await request.json();

  const newItem = await db.item.create({
    data: { userId, name, place, dateTime, image, type, status },
  });

  return NextResponse.json(newItem);
}
