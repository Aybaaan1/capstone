import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function PUT(request, { params }) {
  const { id } = params;
  const { status, proof } = await request.json();

  console.log("Order ID:", id); // Debugging log

  try {
    // Fetch the order
    const order = await db.order.findUnique({ where: { id: Number(id) } });
    if (!order) {
      return NextResponse.json({ error: "Order not found." }, { status: 404 });
    }

    console.log("Order:", order); // Debugging log

    // Check if order status is being set to 'accepted'
    if (status === "accepted") {
      const merch = await db.merch.findUnique({
        where: { id: order.merchId },
      });

      if (!merch) {
        return NextResponse.json(
          { error: "Merchandise not found." },
          { status: 404 }
        );
      }
      if (merch.stocks < order.quantity) {
        return NextResponse.json(
          { error: "Insufficient stock." },
          { status: 400 }
        );
      }

      console.log("Merch:", merch); // Debugging log

      // Deduct stock
      await db.merch.update({
        where: { id: order.merchId },
        data: {
          stocks: merch.stocks - order.quantity,
        },
      });
    }

    // Update the order's status and proof
    const updatedOrder = await db.order.update({
      where: { id: Number(id) },
      data: { status, proof },
    });

    return NextResponse.json(updatedOrder);
  } catch (error) {
    console.error("Error in updating order:", error);
    return NextResponse.json(
      { error: "An error occurred while processing the request." },
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
