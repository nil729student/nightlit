"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import ClubForm from "../components/ClubForm";

export default function ClubPage() {
  const { data: session, status } = useSession();
  const [clubData, setClubData] = useState({
    name: "",
    banner: "",
    addrCity: "",
    addrStreet: "",
    addrHouseNumber: "",
    addrpostcode: "",
    latitude: "",
    longitude: "",
    website: "",
    instagram: "",
    facebook: "",
    phone: "",
    information: "",
  });

  if (status === "loading") {
    return <p>Carregant dades...</p>;
  }

  if (!session || session.user.role !== "OWNER") {
    return <p>No tens permisos per accedir a aquesta pàgina.</p>;
  }

  const handleSave = async () => {
    console.log("Guardant dades de la discoteca:", clubData);
    alert("Dades de la discoteca actualitzades correctament.");
  };

  return (
    <div className="min-h-screen bg-gray-200 py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl text-black font-bold mb-8">Gestió de la discoteca</h1>
        <ClubForm clubData={clubData} setClubData={setClubData} handleSave={handleSave} />
      </div>
    </div>
  );
}
