import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function PUT(request, { params }) {
  const { id } = params;
  const { status, proof } = await request.json();

  const updatedOrder = await db.order.update({
    where: { id: Number(id) },
    data: { status, proof },
  });

  return NextResponse.json(updatedOrder);
}

export async function DELETE(request, { params }) {
  const { id } = params;

  await db.order.delete({
    where: { id: Number(id) },
  });

  return NextResponse.json({ message: "Order deleted" });
}
