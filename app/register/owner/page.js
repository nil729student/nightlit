// File: /app/register/owner/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";

export default function OwnerRegisterPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        clubName: "",
        amenity: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Falta implementar la logica de reguistre
        console.log("Reguistre de usuari owner: ", formData);
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-yellow-500 to-red-500 text-white">
            <h1 className="text-4xl font-bold mb-8">Register Your Club</h1>
            <form className="bg-white text-black p-6 rounded-lg shadow-md w-full max-w-md" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-bold mb-2">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg"
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
                        className="w-full px-3 py-2 border rounded-lg"
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
                        className="w-full px-3 py-2 border rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="clubName" className="block text-sm font-bold mb-2">Club Name</label>
                    <input
                        type="text"
                        id="clubName"
                        name="clubName"
                        value={formData.clubName}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="amenity" className="block text-sm font-bold mb-2">Main Amenity</label>
                    <input
                        type="text"
                        id="amenity"
                        name="amenity"
                        value={formData.amenity}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                >
                    Register
                </button>

                <Link href="/register">
                    <button className=" hover:border-b-4 ">
                        I a standard user!
                    </button>
                </Link>
            </form>
        </div>
    );
}
