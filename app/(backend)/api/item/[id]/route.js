import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function PUT(request, { params }) {
  const { id } = params;
  const { name, place, dateTime, image, type, status } = await request.json();

  const updatedItem = await db.item.update({
    where: { id: Number(id) },
    data: { name, place, dateTime, image, type, status },
  });

  return NextResponse.json(updatedItem);
}

export async function DELETE(request, { params }) {
  const { id } = params;

  await db.item.delete({
    where: { id: Number(id) },
  });

  return NextResponse.json({ message: "Item deleted" });
}
