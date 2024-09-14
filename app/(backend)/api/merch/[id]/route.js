import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function PUT(request, { params }) {
  const { id } = params;
  const { name, price, stocks, type, image } = await request.json();

  const updatedMerch = await db.merch.update({
    where: { id: Number(id) },
    data: { name, price, stocks, type, image },
  });

  return NextResponse.json(updatedMerch);
}

export async function DELETE(request, { params }) {
  const { id } = params;

  await db.merch.delete({
    where: { id: Number(id) },
  });

  return NextResponse.json({ message: "Merchandise deleted" });
}
