"use client";

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ResetPasswordForm from '../components/loginComponents/ResetPasswordForm';

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  if (!token) {
    return (
      <div className="text-center">
        <p className="text-red-500">Invalid or missing reset token</p>
        <a href="/forgot-password" className="mt-4 text-blue-500 hover:underline">
          Request a new reset link
        </a>
      </div>
    );
  }

  return <ResetPasswordForm token={token} />;
}

export default function ResetPasswordPage() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white text-black rounded shadow">
        <h1 className="mb-4 text-2xl font-bold text-center">Reset Password</h1>
        <Suspense fallback={<div className="text-center">Loading...</div>}>
          <ResetPasswordContent />
        </Suspense>
      </div>
    </div>
  );
}