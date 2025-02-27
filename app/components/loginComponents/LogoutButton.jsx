"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  const handleLogout = () => {
    signOut({ callbackUrl: "/login" }); // Redirigeix l'usuari a la pàgina de login després del logout
  };

  return (
    <button
      onClick={handleLogout}
      className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
    >
      Logout
    </button>
  );
}
