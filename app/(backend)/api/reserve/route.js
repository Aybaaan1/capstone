import { NextResponse } from "next/server";
import db from "@/lib/db"; // Ensure this path is correct

export async function GET(request) {
  try {
    const items = await db.item.findMany(); // Fetch all items from the database
    return NextResponse.json(items, { status: 200 });
  } catch (error) {
    console.error("Error fetching items:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
