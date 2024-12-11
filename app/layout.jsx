"use client";
import { usePathname } from "next/navigation";
import Navbar from "./(frontend)/(components)/_components/Navbar";
import Footer from "./(frontend)/(components)/_components/Footer";
import Provider from "./_components/Provider";

import "./globals.css";

export default function RootLayout({ children }) {
  const pathname = usePathname(); // Use the hook to get current route

  const isAdminRoute = pathname.startsWith("/admin");
  const isSuperAdminRoute = pathname.startsWith("/superadmin");

  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Provider>
          {!isAdminRoute && !isSuperAdminRoute && <Navbar />}
          <main className="flex-grow">{children}</main>
          {!isAdminRoute && !isSuperAdminRoute && <Footer />}
        </Provider>
      </body>
    </html>
  );
}
