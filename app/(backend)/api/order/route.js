import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  const orders = await db.order.findMany({
    include: { user: true, merch: true },
  });
  return NextResponse.json(orders);
}

export async function POST(request) {
  const { userId, merchId, paymentMode, proof, status } = await request.json();

  const newOrder = await db.order.create({
    data: { userId, merchId, paymentMode, proof, status },
  });

  return NextResponse.json(newOrder);
}
