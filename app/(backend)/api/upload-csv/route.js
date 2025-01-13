import { parse } from "csv-parse/sync";
import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(request) {
  const formData = await request.formData();
  const file = formData.get("file");

  if (!file || !file.name.endsWith(".csv")) {
    return NextResponse.json(
      { message: "Invalid file format. Please upload a .csv file." },
      { status: 400 }
    );
  }

  const csvText = await file.text();

  try {
    const records = parse(csvText, {
      columns: true, // Treat the first row as headers
      skip_empty_lines: true,
    });

    // Validate CSV data
    if (!records.every((row) => row.email && row.idnumber)) {
      throw new Error(
        "CSV format is invalid. Ensure email and idnumber columns exist."
      );
    }

    const validatedUsers = records.map((row) => ({
      email: row.email.trim().toLowerCase(),
      idnumber: row.idnumber.trim(),
    }));
    // Insert into the database
    await db.validatedUser.createMany({ data: validatedUsers });

    return NextResponse.json({ message: "CSV uploaded successfully." });
  } catch (error) {
    console.error("Error processing CSV:", error);
    return NextResponse.json(
      { message: error.message || "Error processing CSV file." },
      { status: 500 }
    );
  }
}
