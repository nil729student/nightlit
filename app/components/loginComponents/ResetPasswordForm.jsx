"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { validatePassword } from '../../utils/validaPassword';

export default function ResetPasswordForm({ token }) {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [passwordverify, setPasswordverify] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!validatePassword(password)) {
      setMessage("Passwordn 8 characters and one capital letter.");
      return;
    }

    if (password !== passwordverify) {
      setMessage('Passwords do not match.');
      return;
    }

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('Password reset successful.');
        router.push('/login');
      } else {
        setMessage(data.message || 'Something went wrong.');
      }
    } catch (err) {
      console.log(err);
      setMessage('Error processing request.');
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);

    if (passwordverify && e.target.value !== passwordverify) {
      setMessage('Passwords do not match.');
    } else {
      setMessage('');
    }
  };

  const handlePasswordVerifyChange = (e) => {
    setPasswordverify(e.target.value);

    if (password && e.target.value !== password) {
      setMessage('Passwords do not match.');
    } else {
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <p className={`text-sm mb-4 ${message.includes("successful") ? "text-green-500" : "text-red-500"}`}>
        {message}
      </p>
      <label className="block">
        New Password
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          className="w-full mt-1 border rounded"
        />
      </label>
      <label className="block">
        Confirm Password
        <input
          type="password"
          value={passwordverify}
          onChange={handlePasswordVerifyChange}
          className="w-full mt-1 border rounded"
        />
      </label>
      <button type="submit" className="w-full py-2 mt-4 text-white bg-blue-500 rounded">
        Reset Password
      </button>
      {message && <p className="mt-2 text-center">{message}</p>}
    </form>
  );
}
