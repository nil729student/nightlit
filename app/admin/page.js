"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAllClubs, deleteClub } from "../lib/clubsActions/clubActions";
import { listClubs } from "../lib/clubsActions/listClubs";

export default function AdminPage() {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchClubs() {
      try {
        const fetchedClubs = await listClubs();
        setClubs(fetchedClubs);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching clubs:", error);
        setLoading(false);
      }
    }
    fetchClubs();
  }, []);

  const handleDelete = async (clubId) => {
    try {
      await deleteClub(clubId);
      setClubs(clubs.filter(club => club.id !== clubId));
    } catch (error) {
      console.error("Error deleting club:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-purple-500 to-blue-500 text-white">
        <h1 className="text-4xl font-bold mb-8">Carregant discoteques...</h1>
      </div>
    );
  }

  return (
    <>
    <div className="flex flex-col items-center justify-center bg-gradient-to-r from-purple-500 to-blue-500 text-white">
      <h1 className="text-4xl font-bold m-8">Pagina d'administrador</h1>
      <div className="w-full max-w-4xl">
        {clubs.map(club => (
          <div key={club.id} className="flex justify-between items-center bg-white text-black p-4 mb-4 rounded-lg shadow-md">
            <div>
              <h2 className="text-2xl font-bold">{club.name}</h2>
              <p>{club.addrCity}, {club.addrStreet}, {club.addrHouseNumber}, {club.addrpostcode}</p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => router.push(`/club/${club.id}`)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Visitar
              </button>
              <button
                onClick={() => handleDelete(club.id)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}