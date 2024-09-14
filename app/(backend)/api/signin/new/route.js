import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { email, pass } = await req.json();

  const signin = await db.signin.create({
    data: {
      email,
      pass,
    },
  });
  return NextResponse.json({ signin });
}
