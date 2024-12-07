"use client";

import { useState } from "react";

export default function ClubForm({ clubData, setClubData, handleSave }) {
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
          <label className="block text-gray-700 font-medium mb-2">Latitud</label>
          <input
            type="text"
            value={clubData.latitude}
            onChange={(e) => setClubData((prev) => ({ ...prev, latitude: e.target.value }))}
            className="w-full p-3 border rounded-lg"
            placeholder="Latitud"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Longitud</label>
          <input
            type="text"
            value={clubData.longitude}
            onChange={(e) => setClubData((prev) => ({ ...prev, longitude: e.target.value }))}
            className="w-full p-3 border rounded-lg"
            placeholder="Longitud"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Banner de la discoteca</label>
          <input
            type="file"
            onChange={(e) => setClubData((prev) => ({ ...prev, banner: e.target.files[0] }))}
            className="w-full p-3 border rounded-lg"
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
    </div>
  );
}
