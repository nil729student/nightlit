"use client";

import { useState } from "react";

export default function OwnerSettingsForm() {
  const [ownerData, setOwnerData] = useState({
    nif: "",
  });

  const handleSave = async () => {
    // Integrar con Prisma mediante una API
    console.log("Guardando datos del propietario:", ownerData);
    alert("Configuració de propietari actualitzada.");
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Configuració de propietari</h2>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">NIF</label>
        <input
          type="text"
          value={ownerData.nif}
          onChange={(e) => setOwnerData((prev) => ({ ...prev, nif: e.target.value }))}
          className="w-full p-3 border rounded-lg"
        />
      </div>
      <button onClick={handleSave} className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600">
        Guardar configuració
      </button>
    </div>
  );
}
