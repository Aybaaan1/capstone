import { NextResponse } from "next/server";
import db from "@/lib/db";

export const DELETE = async (req, res) => {
  const { id } = req.query;

  try {
    const deletedItem = await db.merch.delete({
      where: { id: parseInt(id) },
    });
    return res.status(200).json(deletedItem);
  } catch (error) {
    return res.status(500).json({ error: "Failed to delete item" });
  }
};
