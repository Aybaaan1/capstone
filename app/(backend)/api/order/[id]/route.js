import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function PUT(request, { params }) {
  const { id } = params;
  const { status } = await request.json();

  if (status !== "accepted") {
    return NextResponse.json(
      { error: "Order can only be accepted to deduct stock." },
      { status: 400 }
    );
  }

  try {
    // Update order status to "accepted"
    const updatedOrder = await db.order.update({
      where: { id: Number(id) },
      data: { status },
    });

    // Deduct stock and update sales
    if (status === "accepted") {
      const order = await db.order.findUnique({
        where: { id: Number(id) },
        include: {
          merch: true, // Include merchandise details
        },
      });

      if (!order) {
        throw new Error(`Order not found for ID ${id}.`);
      }

      const merchId = order.merchId;
      const quantity = order.quantity;

      const merch = await db.merch.findUnique({
        where: { id: merchId },
      });

      if (!merch) {
        throw new Error(`Merchandise not found for ID ${merchId}.`);
      }

      // Check if there is enough stock
      if (merch.stocks < quantity) {
        throw new Error(`Not enough stock for item: ${merch.name}.`);
      }

      // Update stock and sales
      await db.merch.update({
        where: { id: merchId },
        data: {
          stocks: merch.stocks - quantity,
          sales: (merch.sales || 0) + quantity, // Increment sales by the order quantity
        },
      });
    }

    return NextResponse.json(updatedOrder, { status: 200 });
  } catch (error) {
    console.error("Error accepting order:", error);
    return NextResponse.json(
      { error: error.message || "Failed to accept order." },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  const { id } = params;

  await db.order.delete({
    where: { id: Number(id) },
  });

  return NextResponse.json({ message: "Order deleted" });
}
