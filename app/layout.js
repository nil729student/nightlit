"use client"

import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { NavBar } from "./components/NavBar";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <NavBar></NavBar>
          {children}
        </SessionProvider>
        
      </body>
    </html>
  );
}