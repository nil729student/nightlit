"use client"

import { useSearchParams } from 'next/navigation';
import ResetPasswordForm from '../components/loginComponents/ResetPasswordForm';

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  console.log(token);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 text-black">
      <div className="w-full max-w-md p-6 bg-white rounded shadow">
        <h1 className="mb-4 text-2xl font-bold text-center">Estableix una nova contrasenya</h1>
        <ResetPasswordForm token={token} />
      </div>
    </div>
  );
}