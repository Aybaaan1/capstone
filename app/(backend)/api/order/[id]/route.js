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

  // Update order status to "accepted"
  const updatedOrder = await db.order.update({
    where: { id: Number(id) },
    data: { status },
  });

  // Deduct stock only when the order is accepted
  if (status === "accepted") {
    const orderItems = await db.order.findMany({
      where: { id: Number(id) },
      include: {
        merch: true, // Include merchandise details to update stock
      },
    });

    const transaction = await db.$transaction(async (prisma) => {
      for (const orderItem of orderItems) {
        const merchId = orderItem.merchId;
        const quantity = orderItem.quantity;

        const merch = await prisma.merch.findUnique({
          where: { id: merchId },
        });

        if (!merch) {
          throw new Error(`Merchandise not found for order ID ${id}.`);
        }

        // Check if there is enough stock
        if (merch.stocks < quantity) {
          throw new Error(`Not enough stock for item: ${merch.name}.`);
        }

        // Deduct stock
        await prisma.merch.update({
          where: { id: merchId },
          data: {
            stocks: merch.stocks - quantity,
          },
        });
      }
    });

    return NextResponse.json(updatedOrder, { status: 200 });
  }

  return NextResponse.json(
    { error: "Failed to accept order." },
    { status: 500 }
  );
}

export async function DELETE(request, { params }) {
  const { id } = params;

  await db.order.delete({
    where: { id: Number(id) },
  });

  return NextResponse.json({ message: "Order deleted" });
}
