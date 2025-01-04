// File: /app/register/owner/page.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from '../../lib/registerUser'
import { validatePassword } from '../../utils/validaPassword'

export default function OwnerRegisterPage() {
    const router = useRouter()
    const [message, setMessage] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "OWNER",
        clubName: "",
        //region: "", comarca
        addrCity: "",
        addrStreet: "",
        addrHouseNumber: "",

    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        if (!validatePassword(formData.password)) {
            setMessage("Passwordn 8 characters and one capital letter.");
            return;
        }

        try {
            const result = await registerUser(formData);
            if (result.success) {
                setMessage("Registration successful! You can now log in.");
                router.push("/login");
            } else {
                setMessage(result.error || "Registration failed.")
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            setMessage("Something went worng. Please try again.");

        }

        console.log("Reguistre de usuari owner: ", formData);
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen pt-3 pb-3 bg-gradient-to-r from-yellow-500 to-red-500 text-white">
            <h1 className="text-4xl font-bold mb-8">Register Your Club</h1>
            <Link href="/register">
                Back to login
            </Link>
            <form className="bg-white text-black p-6 rounded-lg shadow-md w-full max-w-md overflow-auto" onSubmit={handleSubmit}>
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
                    <label htmlFor="addrCity" className="block text-sm font-bold mb-2">Name city or town</label>
                    <input
                        type="text"
                        id="addrCity"
                        name="addrCity"
                        value={formData.addrCity}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="addrStreet" className="block text-sm font-bold mb-2">Carrer</label>
                    <input
                        type="text"
                        id="addrStreet"
                        name="addrStreet"
                        value={formData.addrStreet}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="addrHouseNumber" className="block text-sm font-bold mb-2">Numero</label>
                    <input
                        type="text"
                        id="addrHouseNumber"
                        name="addrHouseNumber"
                        value={formData.addrHouseNumber}
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
                        I'm user!
                    </button>
                </Link>
            </form>
        </div>
    );
}
