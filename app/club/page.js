"use client";

import ClubForm from "../components/ClubForm";
export default function ClubPage() {


  return (
    <div className="min-h-screen bg-gray-200 py-10">
      <div className="max-w-4xl text-black mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold mb-8">Gestió de la discoteca</h1>
        <ClubForm />
      </div>
    </div>
  );
}
