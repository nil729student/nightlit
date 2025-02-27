"use client"
import ClubsList from "./components/ClubsList";
import { useEffect } from "react";
import "./animation/fonsStars/style.css";


export default function Home() {


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      <ClubsList />
    </main>
  );
}