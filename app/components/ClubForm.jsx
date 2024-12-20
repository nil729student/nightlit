"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { getOwnerClubData, saveClubData } from "../lib/clubsActions/clubActions";
import SongForm from "./SongForm";

export default function ClubForm() {

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
        const data = await getOwnerClubData(session.user.id);
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

  const handleBannerUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('path', '/clubBaner');

    try {
      const response = await fetch("/api/uploadImage", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error pujant la imatge");
      }

      const data = await response.json();
      console.log(data)
      setClubData((prev) => ({ ...prev, banner: data.imageUrl })); // Retorna l'URL de la imatge pujada
      alert('Baner pujat correctment')
    } catch (error) {
      console.log(error)
      alert('Error al pujar la imatge');
    }

  }

  const handleSave = async () => {
    try {
      await saveClubData(session.user.id, clubData.id, clubData,);
      alert("Dades de la discoteca actualitzades correctament.");
    } catch (error) {
      console.error("Error actualitzant les dades de la discoteca:", error);
      alert("Hi ha hagut un error. Torna-ho a intentar.");
    }
  };

  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Nom de la discoteca</label>
          <input
            type="text"
            value={clubData.name}
            onChange={(e) => setClubData((prev) => ({ ...prev, name: e.target.value }))}
            className="w-full p-3 border rounded-lg"
            placeholder="Nom de la discoteca"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Ciutat</label>
          <input
            type="text"
            value={clubData.addrCity}
            onChange={(e) => setClubData((prev) => ({ ...prev, addrCity: e.target.value }))}
            className="w-full p-3 border rounded-lg"
            placeholder="Ciutat"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Carrer</label>
          <input
            type="text"
            value={clubData.addrStreet}
            onChange={(e) => setClubData((prev) => ({ ...prev, addrStreet: e.target.value }))}
            className="w-full p-3 border rounded-lg"
            placeholder="Carrer"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Número</label>
          <input
            type="text"
            value={clubData.addrHouseNumber}
            onChange={(e) => setClubData((prev) => ({ ...prev, addrHouseNumber: e.target.value }))}
            className="w-full p-3 border rounded-lg"
            placeholder="Número de casa"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Codi postal</label>
          <input
            type="text"
            value={clubData.addrpostcode}
            onChange={(e) => setClubData((prev) => ({ ...prev, addrpostcode: e.target.value }))}
            className="w-full p-3 border rounded-lg"
            placeholder="Codi postal"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Banner de la discoteca</label>
          <input
            type="file"
            onChange={handleBannerUpload}
            className="w-full p-3 border rounded-lg"

          />
          <img
            src={clubData.banner}
            alt="banner"
            className="w-28 h-28 rownded-mid object-cover border-4 border-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Pàgina web</label>
          <input
            type="text"
            value={clubData.website}
            onChange={(e) => setClubData((prev) => ({ ...prev, website: e.target.value }))}
            className="w-full p-3 border rounded-lg"
            placeholder="URL de la pàgina web"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Instagram</label>
          <input
            type="text"
            value={clubData.instagram}
            onChange={(e) => setClubData((prev) => ({ ...prev, instagram: e.target.value }))}
            className="w-full p-3 border rounded-lg"
            placeholder="Perfil d'Instagram"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Facebook</label>
          <input
            type="text"
            value={clubData.facebook}
            onChange={(e) => setClubData((prev) => ({ ...prev, facebook: e.target.value }))}
            className="w-full p-3 border rounded-lg"
            placeholder="Perfil de Facebook"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Telèfon</label>
          <input
            type="text"
            value={clubData.phone}
            onChange={(e) => setClubData((prev) => ({ ...prev, phone: e.target.value }))}
            className="w-full p-3 border rounded-lg"
            placeholder="Número de telèfon"
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-gray-700 font-medium mb-2">Informació</label>
        <textarea
          value={clubData.information}
          onChange={(e) => setClubData((prev) => ({ ...prev, information: e.target.value }))}
          className="w-full p-3 border rounded-lg"
          placeholder="Informació sobre la discoteca"
        />
      </div>

      <button
        onClick={handleSave}
        className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Guardar canvis
      </button>
      <SongForm clubId={clubData.id} />
    </div>
  );
}
