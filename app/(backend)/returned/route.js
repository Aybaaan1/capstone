import { NextResponse } from "next/server";
import db from "@/lib/db"; // Adjust the path if necessary

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const returnedItems = await db.Reservation.findMany({
        where: { status: "returned" },
      });

      res.status(200).json(returnedItems);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to fetch returned items", error });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowedss`);
  }
}
