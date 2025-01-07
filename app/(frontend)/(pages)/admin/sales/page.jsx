"use client";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const SalesPage = () => {
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await fetch("/api/sales");
        const data = await response.json();
        if (Array.isArray(data)) {
          setSalesData(data);
        } else {
          console.error("Invalid data format received:", data);
        }
      } catch (error) {
        console.error("Error fetching sales data:", error);
      }
    };

    fetchSalesData();
  }, []);

  const labels = salesData.length > 0 ? salesData.map((item) => item.name) : [];
  const sales = salesData.length > 0 ? salesData.map((item) => item.sales) : [];
  const stocks =
    salesData.length > 0 ? salesData.map((item) => item.stocks) : [];
  const income =
    salesData.length > 0 ? salesData.map((item) => item.income) : [];

  const chartData = {
    labels,
    datasets: [
      {
        label: "Sales Quantity",
        data: sales,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
      {
        label: "Stock Quantity",
        data: stocks,
        borderColor: "rgba(153, 102, 255, 1)",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        fill: true,
      },
      {
        label: "Income",
        data: income,
        borderColor: "rgba(255, 159, 64, 1)",
        backgroundColor: "rgba(255, 159, 64, 0.2)",
        fill: true,
      },
    ],
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <nav className="w-64 bg-[rgb(255,211,70)] text-black p-6">
        <div className="logo mb-10">
          <h1 className="text-3xl font-bold tracking-wide">SSG CONNECT</h1>
        </div>
        <ul className="space-y-4">
          <li>
            <a
              href="/admin"
              className="block py-2 px-4 rounded-md hover:bg-gray-700 hover:text-white"
            >
              Users
            </a>
          </li>
          <li>
            <button
              onClick={() => {}}
              className="block w-full text-left py-2 px-4 rounded-md hover:bg-gray-700 hover:text-white"
            >
              Purchase
            </button>
          </li>
          <li>
            <a
              href="/admin/lostfound"
              className="block py-2 px-4 rounded-md hover:bg-gray-700 hover:text-white"
            >
              Lost & Found
            </a>
          </li>
          <li>
            <a
              href="/admin/sales"
              className="block py-2 px-4 rounded-md bg-gray-900 text-white"
            >
              Sales
            </a>
          </li>
        </ul>
      </nav>

      <main className="flex-1 p-10 bg-white">
        <header className="flex justify-between mb-8">
          <h2 className="text-3xl font-semibold text-black">Sales Report</h2>
        </header>

        <div className="chart-container">
          {salesData.length > 0 ? (
            <Line data={chartData} />
          ) : (
            <p>Loading sales data...</p>
          )}
        </div>

        <div className="mt-8">
          <h2 className="text-xl">Sales and Income Details</h2>
          <table className="table-auto w-full mt-4">
            <thead>
              <tr>
                <th className="px-4 py-2">Item</th>
                <th className="px-4 py-2">Sales Quantity</th>
                <th className="px-4 py-2">Stock Quantity</th>
                <th className="px-4 py-2">Income</th>
              </tr>
            </thead>
            <tbody>
              {salesData.map((item) => (
                <tr key={item.id}>
                  <td className="px-4 py-2">{item.name}</td>
                  <td className="px-4 py-2">{item.sales}</td>
                  <td className="px-4 py-2">{item.stocks}</td>
                  <td className="px-4 py-2">${item.income}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default SalesPage;
