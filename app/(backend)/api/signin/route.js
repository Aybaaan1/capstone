import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  const signin = await db.signin.findMany();

  return NextResponse.json({ signin });
}
