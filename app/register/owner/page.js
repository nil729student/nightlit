"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from '../../lib/registerUser'
import { validatePassword } from '../../utils/validaPassword'

export default function OwnerRegisterPage() {
    const router = useRouter()
    const [message, setMessage] = useState("");
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [showTerms, setShowTerms] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "OWNER",
        clubName: "",
        region: "",
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
            setMessage("Password must have at least 8 characters and one capital letter.");
            return;
        }

        if (!acceptTerms) {
            setMessage("You must accept the terms and conditions to register.");
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
            setMessage("Something went wrong. Please try again.");
        }
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
                    <label htmlFor="addrCity" className="block text-sm font-bold mb-2">Comarca</label>
                    <input
                        type="text"
                        id="region"
                        name="region"
                        value={formData.region}
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

                {/* Terms and conditions checkbox */}
                <div className="mb-4 flex items-center">
                    <input
                        type="checkbox"
                        id="terms"
                        checked={acceptTerms}
                        onChange={() => setAcceptTerms(!acceptTerms)}
                        className="mr-2"
                    />
                    <label htmlFor="terms" className="text-sm">
                        I accept the{" "}
                        <button
                            type="button"
                            className="text-blue-600 underline"
                            onClick={() => setShowTerms(true)}
                        >
                            Terms and Conditions
                        </button>
                    </label>
                </div>

                <button
                    type="submit"
                    className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                >
                    Register
                </button>

                <Link href="/register">
                    <button type="button" className="hover:border-b-4 mt-2">
                        I&apos;m user!
                    </button>
                </Link>
            </form>

            {/* Terms and conditions modal */}
            {showTerms && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                    <div className="bg-white text-black p-6 rounded-lg max-w-2xl max-h-[80vh] overflow-y-auto">
                        <h2 className="text-2xl font-bold mb-4">Terms and Conditions</h2>
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold">1. Acceptance of Terms</h3>
                            <p>By accessing and using the Nightlit service, you agree to be bound by these Terms and Conditions.</p>
                        </div>
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold">2. Privacy Policy</h3>
                            <p>Your use of Nightlit is also governed by our Privacy Policy, which explains how we collect and use your information.</p>
                        </div>
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold">3. User Accounts</h3>
                            <p>You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.</p>
                        </div>
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold">4. Club Owner Specific Terms</h3>
                            <p>As a club owner, you agree to:</p>
                            <ul className="list-disc ml-5">
                                <li>Provide accurate information about your establishment</li>
                                <li>Maintain and update your club's information</li>
                                <li>Respect user privacy and comply with all applicable laws</li>
                                <li>Not engage in false advertising or misrepresentation</li>
                            </ul>
                        </div>
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold">5. Content Guidelines</h3>
                            <p>All content associated with your club must comply with our content guidelines, which prohibit offensive, harmful, or illegal material.</p>
                        </div>
                        <button
                            className="mt-4 bg-red-500 text-white py-2 px-4 rounded"
                            onClick={() => setShowTerms(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
