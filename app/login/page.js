"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Clear previous errors
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-purple-500 to-blue-500 text-white">
            <h1 className="text-4xl font-bold mb-8">Welcome Back!</h1>
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
                <button
                    type="submit"
                    className="w-full bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600"
                >
                    Login
                </button>
                <Link href="/register">
                    <button className=" hover:border-b ">
                        you don't have an account?
                    </button>
                </Link>
            </form>
        </div>
    );
}
