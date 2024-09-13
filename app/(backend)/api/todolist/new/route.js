import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { type, des } = await req.json();

  const todolist = await db.todolist.create({
    data: {
      type,
      des,
    },
  });
  return NextResponse.json({ todolist });
}
