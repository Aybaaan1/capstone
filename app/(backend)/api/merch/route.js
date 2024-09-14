import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  const merch = await db.merch.findMany();
  return NextResponse.json(merch);
}

export async function POST(request) {
  const { name, price, stocks, type, image } = await request.json();

  const newMerch = await db.merch.create({
    data: { name, price, stocks, type, image },
  });

  return NextResponse.json(newMerch);
}
