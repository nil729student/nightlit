"use client"

import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { NavBar } from "./components/NavBar";
import "./animation/fonsStars/style.css";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({ children }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={inter.className}>
        <SessionProvider>
          <NavBar/>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}