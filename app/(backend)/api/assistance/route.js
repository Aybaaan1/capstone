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

  // Create a Date object from the incoming dateTime
  const assistDate = new Date(dateTime);

  // Check for an invalid date
  if (isNaN(assistDate.getTime())) {
    console.error("Invalid date format:", dateTime);
    return NextResponse.json({ error: "Invalid date format" }, { status: 400 });
  }

  // Prepare data for database insertion
  const assistData = {
    userId,
    name,
    patience, // Keep as 'patience'
    dateTime: assistDate, // Store as a Date object
    gcash,
    proof,
    status,
  };

  try {
    // Insert the data into the database
    const tambayayong = await db.assistance.create({
      data: assistData,
    });
    return NextResponse.json(tambayayong, { status: 201 });
  } catch (error) {
    console.error("Error creating assistance:", error);
    return NextResponse.json(
      { error: "Error creating assistance" },
      { status: 500 }
    );
  }
}
// Prepae the data for Prisma
export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const userId = req.query.userId;

  try {
    // Query to fetch assistances for the specific user
    const assistances = await db.assistance.findMany({
      where: { userId: userId },
    });

    return res.status(200).json(assistances);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to fetch assistance records" });
  }
}
