import { NextResponse } from "next/server";
import db from "@/lib/db";

// Fetch all notifications
export async function GET() {
  const notifications = await db.notification.findMany();
  return NextResponse.json(notifications);
}

// Create a new notification
export async function POST(request) {
  const { reason } = await request.json();
  console.log("Received reason:", reason); // Log the reason to see if it's coming through

  const newNotification = await db.notification.create({
    data: { reason },
  });

  return NextResponse.json(newNotification);
}
