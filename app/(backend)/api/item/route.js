import { NextResponse } from "next/server";
import db from "@/lib/db";
import { uploadImage } from "/Users/Bernadeth Caballero/Desktop/JOSWA/ssg/lib/imageUpload";

export async function GET() {
  const items = await db.item.findMany({
    include: { user: true },
  });
  return NextResponse.json(items);
}

export async function POST(request) {
  const { userId, name, place, dateTime, type, image, status } =
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
    place, // Include the place of loss/found
    dateTime: assistDate, // Store as a Date object
    type, // Include the type of item (Lost or Found)
    image,
    status,
  };

  try {
    // Insert the data into the database
    const tambayayong = await db.item.create({
      // Ensure you have the correct model here
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
