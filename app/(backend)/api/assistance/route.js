import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  const assistances = await db.assistance.findMany({
    include: { user: true },
  });
  return NextResponse.json(assistances);
}

export async function POST(request) {
  const { userId, name, patience, dateTime, gcash, proof, status } =
    await request.json();

  const newAssistance = await db.assistance.create({
    data: { userId, name, patience, dateTime, gcash, proof, status },
  });

  return NextResponse.json(newAssistance);
}
