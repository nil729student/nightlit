"use client"
import { useState } from "react";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({email}),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Revisa el teu correu per continuar.");
      } else {
        setMessage(data.error || "algo ha sortit malament .");
      }
    } catch (err) {
      console.log(err)
      setMessage("Error al porcesar la solicitud.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block ">
        Correu electronic:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="block w-full mt-2 border rounded"
        />
      </label>
      <button
        type="submit"
        className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
      >
        Restableix contrasenya
      </button>
      {message && <p className="mt-4">{message}</p>}
    </form>
  );
}
