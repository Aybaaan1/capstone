import db from "@/lib/db";
import { user } from "@nextui-org/react";
import { NextResponse } from "next/server";

export async function GET(req) {
  const user = await db.user.findMany({});

  return NextResponse.json({ user });
}
