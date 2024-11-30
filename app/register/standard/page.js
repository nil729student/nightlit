"use client";

import { useState } from "react";
import Link from "next/link";
import { registerUser } from "@/lib/registerUser";

export default function StandardRegisterPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        try {
            // Llamada directa a la función del servidor
            const result = await registerUser(formData);

            if (result.success) {
                setMessage("Registration successful! You can now log in.");
            } else {
                setMessage(result.error || "Registration failed.");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            setMessage("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            <h1 className="text-4xl font-bold mb-8">Join us 🍻</h1>
            <form className="p-6 rounded-lg shadow-xl w-full max-w-md" onSubmit={handleSubmit}>
                {message && (
                    <p className={`text-sm mb-4 ${message.includes("successful") ? "text-green-500" : "text-red-500"}`}>
                        {message}
                    </p>
                )}
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-bold mb-2">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-3 py-1 bg-transparent border-b-2"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-bold mb-2">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-1 bg-transparent border-b-2"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-bold mb-2">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-3 py-1 bg-transparent border-b-2"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-white text-pink-500 font-semibold py-2 px-4 rounded-lg hover:bg-gray-200"
                >
                    Register
                </button>
                <div className="mt-4 flex justify-between">
                    <Link href="/register/owner" className="text-sm hover:underline">
                        I'm a club owner!
                    </Link>
                    <Link href="/login" className="text-sm hover:underline">
                        Back to login
                    </Link>
                </div>
            </form>
        </div>
    );
}
