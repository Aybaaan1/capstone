import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  try {
    // Fetch the merchandise items, including the sales field
    const merchData = await db.merch.findMany({
      where: { type: { in: ["T-shirt", "Lanyards", "Pins", "Stickers"] } },
      select: {
        id: true,
        name: true,
        price: true,
        stocks: true,
        type: true,
        sales: true, // Ensure this is included
      },
    });

    const salesData = merchData.map((item) => ({
      name: item.name,
      type: item.type,
      price: item.price,
      stocks: item.stocks,
      sales: item.sales,
      income: item.price * item.sales, // Calculate total income based on sales
    }));

    return new Response(JSON.stringify(salesData), {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching sales data:", error); // Log error
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
export async function POST(request) {
  try {
    const { saleStatus, itemId, quantity, ...orderDetails } =
      await request.json();

    // Step 1: Update the stock of the merch item in the 'Merch' model
    const updatedMerch = await db.merch.update({
      where: { id: itemId },
      data: {
        stocks: {
          decrement: quantity, // Decrease stock by quantity of the order
        },
      },
    });

    // Step 2: Insert sale data into the 'Order' table
    const order = await db.order.create({
      data: {
        ...orderDetails, // Includes other order details such as user, proof, etc.
        merchId: itemId, // Linking to the merch item
        quantity, // Quantity of the order
        status: saleStatus, // Sale status to track the order status (e.g., 'completed')
      },
    });

    // Step 3: Return the updated merch and order details
    return new Response(JSON.stringify({ updatedMerch, order }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error recording sale:", error);
    return new Response(JSON.stringify({ message: "Failed to record sale" }), {
      status: 500,
    });
  }
}
