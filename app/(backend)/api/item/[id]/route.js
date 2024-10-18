import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function PUT(request, { params }) {
  const { id } = params;
  const { status } = await request.json();

  const updatedItemOrder = await db.item.update({
    where: { id: Number(id) },
    data: { status },
  });

  return NextResponse.json(updatedOrder);
}

export async function DELETE(request, { params }) {
  const { id } = params;

  await db.item.delete({
    where: { id: Number(id) },
  });

  return NextResponse.json({ message: "Item deleted" });
}
