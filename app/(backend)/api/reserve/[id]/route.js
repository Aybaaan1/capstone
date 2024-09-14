import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function PUT(request, { params }) {
  const { id } = params;
  const { reserveDateTime, returnDateTime, purpose } = await request.json();

  const updatedReserve = await db.reserve.update({
    where: { id: Number(id) },
    data: { reserveDateTime, returnDateTime, purpose },
  });

  return NextResponse.json(updatedReserve);
}

export async function DELETE(request, { params }) {
  const { id } = params;

  await db.reserve.delete({
    where: { id: Number(id) },
  });

  return NextResponse.json({ message: "Reserve deleted" });
}
