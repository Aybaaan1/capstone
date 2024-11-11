import { NextResponse } from "next/server";
import db from "@/lib/db";

export default async function handler(req, res) {
  const { reservationId } = req.query;

  if (req.method === "PUT") {
    const { status } = req.body; // Ensure the body is parsed correctly

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    try {
      const updatedReservation = await db.Reservation.update({
        where: { id: reservationId },
        data: { status }, // Update the status accordingly
      });

      res.status(200).json(updatedReservation);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to update reservation status", error });
    }
  } else {
    res.setHeader("Allow", ["PUT"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
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
