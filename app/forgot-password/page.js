"use client"
import ForgotPasswordForm from "../components/loginComponents/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white text-black rounded shadow">
        <h1 className="mb-4 text-2xl font-bold text-center">Restableix contrasenya</h1>
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
