"use client";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const SalesPage = () => {
  const [salesData, setSalesData] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [weeklySales, setWeeklySales] = useState([]);
  const [monthlySales, setMonthlySales] = useState([]);
  const [isPurchaseOpen, setIsPurchaseOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await fetch("/api/sales");
        const data = await response.json();

        if (data?.items) {
          setSalesData(data.items);
          setTotalIncome(data.totalIncome || 0);
          setTotalSales(data.totalSales || 0);

          // Process the weekly and monthly sales data
          processSalesData(data.items);
        } else {
          console.error("Invalid data format received:", data);
        }
      } catch (error) {
        console.error("Error fetching sales data:", error);
      }
    };

    fetchSalesData();
  }, []);

  const processSalesData = (data) => {
    let weekly = [];
    let monthly = [];

    // Example: Suppose data contains fields like "sales", "date" for each item
    data.forEach((item) => {
      const week = getWeekOfYear(item.date); // Function to get the week number
      const month = new Date(item.date).getMonth() + 1; // Month from 1 to 12

      // Aggregate weekly sales
      if (!weekly[week]) {
        weekly[week] = 0;
      }
      weekly[week] += item.sales;

      // Aggregate monthly sales
      if (!monthly[month]) {
        monthly[month] = 0;
      }
      monthly[month] += item.sales;
    });

    // Set the processed weekly and monthly sales data
    setWeeklySales(weekly);
    setMonthlySales(monthly);
  };

  const labels = salesData.map((item) => item.name);
  const sales = salesData.map((item) => item.sales);
  const stocks = salesData.map((item) => item.stocks);
  const income = salesData.map((item) => item.income);

  // Bar chart data structure
  const chartData = {
    labels,
    datasets: [
      {
        label: "Sales Quantity",
        data: sales,
        backgroundColor: "rgba(75, 192, 192, 0.8)",
      },
      {
        label: "Stock Quantity",
        data: stocks,
        backgroundColor: "rgba(153, 102, 255, 0.8)",
      },
      {
        label: "Income",
        data: income,
        backgroundColor: "rgba(255, 159, 64, 0.8)",
      },
      {
        label: "Weekly Sales",
        data: Object.values(weeklySales),
        backgroundColor: "rgba(255, 99, 132, 0.8)",
      },
      {
        label: "Monthly Sales",
        data: Object.values(monthlySales),
        backgroundColor: "rgba(255, 159, 64, 0.5)",
      },
    ],
  };

  // Function to generate CSV file
  const generateCSV = () => {
    let csvContent = "Item, Sales Quantity, Stock Quantity, Income\n";
    salesData.forEach((item) => {
      csvContent += `${item.name}, ${item.sales}, ${
        item.stocks
      }, ${item.income.toFixed(2)}\n`;
    });

    // Adding total income and total sales at the end
    csvContent += `\nTotal Sales, ${totalSales}\n`;
    csvContent += `Total Income, ${totalIncome.toFixed(2)}\n`;

    // Create a downloadable link and trigger a click event
    const link = document.createElement("a");
    link.href = "data:text/csv;charset=utf-8," + encodeURIComponent(csvContent);
    link.target = "_blank";
    link.download = "sales_report.csv";
    link.click();
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <nav className="w-64 bg-[rgb(255,211,70)] text-black p-6 ">
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
              onClick={() => setIsPurchaseOpen(!isPurchaseOpen)} // Toggle the dropdown
              className="block w-full text-left py-2 px-4 rounded-md hover:bg-gray-700 hover:text-white focus:outline-none"
            >
              Purchase
            </button>
            {isPurchaseOpen && ( // Show the dropdown if "isPurchaseOpen" is true
              <ul className="ml-4 space-y-2">
                <li>
                  <a
                    href="/admin/purchase"
                    className="block py-2 px-4 rounded-md hover:bg-gray-700 hover:text-white"
                  >
                    Merchs List
                  </a>
                </li>
                <li>
                  <a
                    href="/admin/orderrequests"
                    className="block py-2 px-4 rounded-md hover:bg-gray-700 hover:text-white"
                  >
                    Order Requests
                  </a>
                </li>
                <li>
                  <a
                    href="/admin/orderslist"
                    className="block py-2 px-4 rounded-md hover:bg-gray-700 hover:text-white"
                  >
                    Orders List
                  </a>
                </li>
                <li>
                  <a
                    href="/admin/sales"
                    className="block py-2 px-4 rounded-md bg-gray-900 text-white"
                  >
                    Sales Report
                  </a>
                </li>
              </ul>
            )}
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
            {/* Reservation Dropdown */}
            <button
              onClick={() => setIsReservationOpen(!isReservationOpen)}
              className="block w-full text-left py-2 px-4 rounded-md hover:bg-gray-700 hover:text-white focus:outline-none"
            >
              Reservation
            </button>
            {isReservationOpen && (
              <ul className="ml-4 space-y-2">
                <li>
                  <a
                    href="/admin/reserveitem"
                    className="block py-2 px-4 rounded-md hover:bg-gray-700 hover:text-white"
                  >
                    Available Items
                  </a>
                </li>
                <li>
                  <a
                    href="/admin/reserve"
                    className="block py-2 px-4 rounded-md hover:bg-gray-700 hover:text-white"
                  >
                    Borrow Items
                  </a>
                </li>
                <li>
                  <a
                    href="/admin/item"
                    className="block py-2 px-4 rounded-md hover:bg-gray-700 hover:text-white"
                  >
                    Item Reservation Form
                  </a>
                </li>
              </ul>
            )}
          </li>
          <li>
            <a
              href="/admin/tambayayong"
              className="block py-2 px-4 rounded-md hover:bg-gray-700 hover:text-white"
            >
              Tambayayong
            </a>
          </li>
        </ul>
      </nav>

      <main className="flex-1 p-10 bg-white">
        <header className="flex justify-between mb-8">
          <h2 className="text-3xl font-semibold text-black">Sales Report</h2>
          <button
            onClick={generateCSV}
            className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600"
          >
            Download Sales Report
          </button>
        </header>

        <div className="mb-8">
          <h3 className="text-xl font-semibold">Summary</h3>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="p-4 bg-blue-100 rounded-lg shadow">
              <h4 className="text-lg font-medium">Total Income</h4>
              <p className="text-2xl font-bold">₱{totalIncome.toFixed(2)}</p>
            </div>
            <div className="p-4 bg-green-100 rounded-lg shadow">
              <h4 className="text-lg font-medium">Total Sales</h4>
              <p className="text-2xl font-bold">{totalSales}</p>
            </div>
          </div>
        </div>

        <div className="chart-container">
          {salesData.length > 0 ? (
            <Bar data={chartData} />
          ) : (
            <p>Loading sales data...</p>
          )}
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold">Sales and Income Details</h2>
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
                  <td className="px-4 py-2">₱{item.income.toFixed(2)}</td>
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
