// /api/register.js
import { NextResponse } from "next/server";
import db from "@/lib/db";
import bcrypt from "bcrypt";

export async function POST(request) {
  const { email, idnumber, password, firstname, lastname, program } =
    await request.json();

  const hashedPassword = await bcrypt.hash(password, 10);
  // Check if the email and ID number are in the validatedUsers table
  const userExists = await db.validatedUser.findFirst({
    where: {
      email: email.toLowerCase(),
      idnumber: idnumber,
    },
  });

  if (!userExists) {
    return NextResponse.json(
      {
        message:
          "This email and ID number combination is not valid. Please check the CSV file.",
      },
      { status: 400 }
    );
  }

  try {
    // Proceed with user registration (creating user, hashing password, etc.)
    const user = await db.user.create({
      data: {
        email,
        password: hashedPassword, // Consider hashing the password before saving
        firstname,
        lastname,
        program,
        idnumber,
      },
    });

    return NextResponse.json({ message: "Registration successful!" });
  } catch (error) {
    return NextResponse.json(
      { message: "Error during registration. Please try again." },
      { status: 500 }
    );
  }
}
