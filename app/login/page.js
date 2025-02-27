"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Netegem els errors pevis

        const result = await signIn("credentials", {
            redirect: false,
            email: formData.email,
            password: formData.password,
        });

        if (result.error) {
            setError("Invalid email or password.");
        } else {
            router.push("/"); // Rediriguim a la paguina prinsipal
        }
    };

    const handleGoogleSignIn = async () => {
        await signIn("google", { callbackUrl: "/" });
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-purple-500 to-blue-500 text-white">
            <h1 className="text-4xl font-bold mb-3">Welcome Back!</h1>
            <a href="/register" className="border-b-2 mb-1">Registrate</a>
            <form
                className="bg-white text-black p-6 rounded-lg shadow-md w-full max-w-md"
                onSubmit={handleSubmit}
            >
                {error && (
                    <p className="text-red-500 text-sm mb-4">{error}</p>
                )}
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-bold mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-bold mb-2">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg"
                    />
                </div>
                <span className="underline">
                    <Link
                        href="/forgot-password"
                    >
                        Forgot password?
                    </Link>
                </span>
                <button
                    type="submit"
                    className="w-full bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600"
                >
                    Login
                </button>
                <button
                    onClick={handleGoogleSignIn}
                    className="w-full bg-white text-purple-500 font-semibold py-2 px-4 rounded-lg hover:bg-gray-200 mt-2"
                >
                    Register with Google
                </button>

            </form>
        </div>
    );
}
