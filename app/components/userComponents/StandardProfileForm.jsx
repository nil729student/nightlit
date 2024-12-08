import { useState, useEffect } from "react";
import { getUserData, updateUserData } from "../../lib/userActions/userDataActions"

export default function StandardProfileForm({ user }) {
  const [message, setMessage] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    image: "/default-profile.png",
  });

  async function fetchUserData() {
    const userData = await getUserData(user.id);
    setFormData({
      name: userData.name || "",
      email: userData.email || "",
      image: userData.image || "/default-profile.png",
    });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleSave = async () => {
    
    try {
      const result = await updateUserData(user.id, formData);

      if (result.success) {
        setMessage("Updated profle successful! You can now log in.");
      } else {
        setMessage(result.error || "Update profile failed.");
      }

    } catch (error) {

      console.error("Error submitting form:", error);
      setMessage("Something went wrong. Please try again.");

    }


    console.log("Guardando datos del usuario:", formData);
    alert("Datos actualizados correctamente.");
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
  
    const formData = new FormData();
    formData.append('file', file);
  
    try {
      const response = await fetch('/api/uploadImage', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('Error al pujar la imatge');
      }
  
      const data = await response.json();
      setFormData((prev) => ({ ...prev, image: data.imageUrl }));
      alert('Imatge pujada correctament');
    } catch (error) {
      console.error('Error pujant la imatge:', error);
      alert('Error al pujar la imatge');
    }
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
