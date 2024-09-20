import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function PUT(request, { params }) {
  const { id } = params;
  const { name, patience, dateTime, gcash, proof, status } =
    await request.json();

  const updatedAssistance = await db.assistance.update({
    where: { id: Number(id) },
    data: { name, patience, dateTime, gcash, proof, status },
  });

  return NextResponse.json(updatedAssistance);
}

export async function DELETE(request, { params }) {
  const { id } = params;

  await db.assistance.delete({
    where: { id: Number(id) },
  });

  return NextResponse.json({ message: "Assistance deleted" });
}