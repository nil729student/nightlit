// File: /app/register/standard/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";

export default function StandardRegisterPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Falta implementr la loguica de reguistre
        console.log("Registre de usuari estandard: ", formData);
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            <h1 className="text-4xl font-bold mb-8">Join us 🍻</h1>
            <form className="f p-6 rounded-lg shadow-xl w-full max-w-md" onSubmit={handleSubmit}>
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
                
                <Link href="/register/owner">
                    <button className=" hover:border-b ">
                        I'm a ouwner club or event!
                    </button>
                </Link>
            </form>
        </div>
    );
}
