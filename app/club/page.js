"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import ClubForm from "../components/ClubForm";
import { getClubData, saveClubData } from "../lib/clubsActions/clubActions";

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

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadClubData() {
      if (!session || session.user.role !== "OWNER") return;

      try {
        const data = await getClubData(session.user.id);
        const aClub = data[0] // De moment el usuari owner pot tenir una discoteca.
        const sanitizedData = Object.fromEntries(
          Object.entries(aClub || {}).map(([key, value]) => [key, value ?? ""])
        );

        setClubData(sanitizedData);
      } catch (error) {
        console.error("Error carregant les dades del club:", error);
      } finally {
        setLoading(false);
      }
    }

    loadClubData();
  }, [session]);

  if (status === "loading" || loading) {
    return <p>Carregant dades...</p>;
  }

  if (!session || session.user.role !== "OWNER") {
    return <p>No tens permisos per accedir a aquesta pàgina.</p>;
  }

  const handleSave = async () => {
    try {
      console.log(clubData.id)// undefined
      await saveClubData(session.user.id, clubData.id, clubData);
      alert("Dades de la discoteca actualitzades correctament.");
    } catch (error) {
      console.error("Error actualitzant les dades de la discoteca:", error);
      alert("Hi ha hagut un error. Torna-ho a intentar.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 py-10">
      <div className="max-w-4xl text-black mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold mb-8">Gestió de la discoteca</h1>
        <ClubForm clubData={clubData} setClubData={setClubData} handleSave={handleSave} />
      </div>
    </div>
  );
}
