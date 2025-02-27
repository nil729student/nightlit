import { useState, useEffect } from "react";
import { getUserData, updateUserData, deleteUserAccount } from "../../lib/userActions/userDataActions"
import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function StandardProfileForm({ user }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [message, setMessage] = useState("")
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
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

  console.log(formData)

  const handleSave = async () => {

    try {
      const result = await updateUserData(user.id, formData);
      // Actualiza la informació del usuari en la sesió
      session.user = { ...session.user, ...formData };

      if (result.success) {
        toast.success("Dades actualitzades correctament.");
      } else {
        toast.error(result.error || "Actualització fallida.");
      }

    } catch (error) {

      console.error("Error al enviar l'informació:", error);
      toast.error("Algo ha anat malament. Torna a intentar-ho.");

    }

    console.log("Guardant dades del usuari:", formData);
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('path', '/usersProfileImages');
    console.log(formData)

    try {
      const response = await fetch('/api/uploadImage', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Error al pujar la imatge');
      }

      const data = await response.json();
      console.log(data)
      setFormData((prev) => ({ ...prev, image: data.imageUrl }));
      toast.success('Imatge pujada correctament');
    } catch (error) {
      console.error('Error pujant la imatge:', error);
      toast.error('Error al pujar la imatge');
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const result = await deleteUserAccount(user.id);

      if (result.success) {
        toast.success("Compte eliminat correctament");
        // Cerrar la sesión
        await signOut({ redirect: false });
        // Redirigir a la página principal después de un breve delay
        setTimeout(() => {
          router.push("/");
        }, 2000);
      } else {
        toast.error(result.error || "No s'ha pogut eliminar el compte");
      }
    } catch (error) {
      console.error("Error al eliminar el compte:", error);
      toast.error("No s'ha pogut eliminar el compte");
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
      <div className="flex justify-between mt-6">
        <button
          onClick={handleSave}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Guardar canvis
        </button>

        <button
          onClick={() => setShowDeleteConfirmation(true)}
          className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Eliminar Compte
        </button>
      </div>

      {/* Modal de confirmación */}
      {showDeleteConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-black">
            <h3 className="text-xl font-bold mb-4">Confirmar eliminació</h3>
            <p className="mb-6">Estàs segur que vols eliminar el teu compte? Aquesta acció no es pot desfer.</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteConfirmation(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              >
                Cancel·lar
              </button>
              <button
                onClick={handleDeleteAccount}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
