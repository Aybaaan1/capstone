import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function PUT(request, { params }) {
  const { id } = params;
  const { reserveDateTime, returnDateTime, purpose } = await request.json();

  try {
    const updatedReserve = await db.$transaction(async (prisma) => {
      const updatedReserve = await prisma.reserve.update({
        where: { id: Number(id) },
        data: { reserveDateTime, returnDateTime, purpose },
      });
      // Additional operations if needed
      return updatedReserve;
    });
    return NextResponse.json(updatedReserve);
  } catch (error) {
    console.error("Error updating reservation:", error);
    return NextResponse.error();
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
    return NextResponse.error();
  }
}
