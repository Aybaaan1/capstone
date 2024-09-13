import { NextResponse } from "next/server";
import db from "@/lib/db";
import bcrypt from "bcrypt";

export async function POST(request) {
  const { email, idnumber, firstname, lastname, program, password } =
    await request.json();

  console.log(email, idnumber, firstname, lastname, program, password);
  const existingUser = await db.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return NextResponse.json({
      status: 400,
      message: "User already exists",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await db.user.create({
    data: {
      email,
      password: hashedPassword,
      idnumber,
      firstname,
      lastname,
      program,
      image: "image",
    },
  });

  return NextResponse.json({
    user,
  });
}
