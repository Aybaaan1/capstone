import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { email, name, age } = await req.json();

  const user = await db.user.create({
    data: {
      email,
      name,
      age,
    },
  });
  return NextResponse.json({ user });
}
