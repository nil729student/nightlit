"use client";

import { useState } from "react";

export default function StandardProfileForm({ user }) {
  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "",
    image: user.image || "/default-profile.png",
  });

  const handleSave = async () => {
    // Aquí puedes integrar el guardado con Prisma mediante una API
    console.log("Guardando datos del usuario:", formData);
    alert("Datos actualizados correctamente.");
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Subir la imagen a un servicio como Cloudinary
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "your_upload_preset");

    const res = await fetch("https://api.cloudinary.com/v1_1/your_cloud_name/image/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setFormData((prev) => ({ ...prev, image: data.secure_url }));
    alert("Imatge actualitzada.");
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Dades personals</h2>
      <div className="flex items-center space-x-6 mb-6">
        <div className="relative">
          <img
            src={formData.image}
            alt="Foto de perfil"
            className="w-28 h-28 rounded-full object-cover border-4 border-blue-500"
          />
          <label
            htmlFor="image-upload"
            className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5z" />
            </svg>
          </label>
          <input id="image-upload" type="file" className="hidden" onChange={handleImageUpload} />
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Nom</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
          className="w-full text-black p-3 border rounded-lg"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Correu</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
          className="w-full text-black p-3 border rounded-lg"
        />
      </div>
      <button onClick={handleSave} className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
        Guardar canvis
      </button>
    </div>
  );
}
