"use client"
import ClubsList from "./components/ClubsList";
import { init } from "./animation/fonsStars/script";
import { useEffect } from "react";
import "./animation/fonsStars/style.css";

export default function Home() {
  useEffect(() => {
    init()
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      <div className="stars-container"></div>
      
      <ClubsList />

    </main>
  );
}
