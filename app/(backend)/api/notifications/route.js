import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  const notifications = await db.notification.findMany();
  return NextResponse.json(notifications);
}

export async function POST(request) {
  const { reason } = await request.json();
  console.log("Received reason:", reason); // Log the reason to see if it's coming through

  const newNotification = await db.notification.create({
    data: { reason },
  });

  return NextResponse.json(newNotification);
}
