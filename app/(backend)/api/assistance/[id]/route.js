import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function PUT(request, { params }) {
  const { id } = params;
  const { status, reason } = await request.json();

  try {
    const updatedAssistance = await db.assistance.update({
      where: { id: Number(id) },
      data: { status, reason },
    });

    return NextResponse.json(updatedAssistance);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update assistance" },
      { status: 500 }
    );
  }
}
export async function DELETE(request, { params }) {
  const { id } = params;

  try {
    await db.assistance.delete({
      where: { id: Number(id) }, // Ensure the ID is treated as a number
    });
    return NextResponse.json({
      message: "Assistance record deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting assistance record:", error);
    return NextResponse.error(); // Return an error response
  }
}
