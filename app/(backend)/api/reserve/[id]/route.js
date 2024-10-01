import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function PUT(request, { params }) {
  const { id } = params;
  const { reserveDateTime, returnDateTime, purpose } = await request.json();

  if (!reserveDateTime || !returnDateTime || !purpose) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }

  try {
    const updatedReserve = await db.reserve.update({
      where: { id: Number(id) },
      data: { reserveDateTime, returnDateTime, purpose },
    });
    return NextResponse.json(updatedReserve);
  } catch (error) {
    console.error("Error updating reservation:", error);
    return NextResponse.json(
      { error: "Failed to update reservation" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  const { id } = params;

  try {
    await db.reserve.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json({ message: "Reserve deleted" });
  } catch (error) {
    console.error("Error deleting reservation:", error);
    return NextResponse.json(
      { error: "Failed to delete reservation" },
      { status: 500 }
    );
  }
}
