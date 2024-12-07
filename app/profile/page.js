"use client";

import { useSession } from "next-auth/react";
import UserProfileForm from "../components/userComponents/StandardProfileForm";

export default function ProfilePage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Carregant dades...</p>;
  }

  if (!session) {
    return <p>Has d'iniciar sessió per veure aquesta pàgina.</p>;
  }

  const isOwner = session.user.role === "OWNER";

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Perfil d'usuari</h1>

        {/* Formulario de datos personales (común para todos) */}
        <UserProfileForm user={session.user} />
      </div>
    </div>
  );
}
