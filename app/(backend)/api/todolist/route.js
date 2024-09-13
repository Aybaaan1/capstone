import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  const todolist = await db.todolist.findMany();

  return NextResponse.json({ todolist });
}
