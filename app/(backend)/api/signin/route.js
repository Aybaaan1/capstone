import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const users = await db.user.findMany(); // Fetch all users
    return NextResponse.json({ users });
  } catch (error) {
    console.error("Error fetching user records:", error);
    return NextResponse.json(
      { error: "Failed to fetch user records" },
      { status: 500 }
    );
  }
}
