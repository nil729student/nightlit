"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { registerUser } from "../../lib/registerUser";
import { useRouter } from "next/navigation";
import { validatePassword } from '../../utils/validaPassword'

export default function StandardRegisterPage() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "STANDARD"
    });

    const [message, setMessage] = useState("");
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [showTerms, setShowTerms] = useState(false);

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
                setMessage(result.error || "Registration failed.");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            setMessage("Something went wrong. Please try again.");
        }
    };

    const handleGoogleSignIn = async () => {
        if (!acceptTerms) {
            setMessage("You must accept the terms and conditions to register.");
            return;
        }
        await signIn("google", { callbackUrl: "/" });
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
                            className="text-blue-300 underline"
                            onClick={() => setShowTerms(true)}
                        >
                            Terms and Conditions
                        </button>
                    </label>
                </div>

                <button
                    type="submit"
                    className="w-full bg-white text-pink-500 font-semibold py-2 px-4 rounded-lg hover:bg-gray-200"
                >
                    Register
                </button>
                {/* google button for register */}
                <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    className="w-full bg-white text-pink-500 font-semibold py-2 px-4 rounded-lg hover:bg-gray-200 mt-2"
                >
                    Register with Google
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
                            <h3 className="text-lg font-semibold">4. Club Owner Responsibilities</h3>
                            <p>If you register as a club owner, you are responsible for the accuracy of the information provided about your establishment.</p>
                        </div>
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold">5. Prohibited Activities</h3>
                            <p>Users must not engage in any activity that violates local laws or regulations, or that could harm other users or the platform.</p>
                        </div>
                        <button
                            className="mt-4 bg-pink-500 text-white py-2 px-4 rounded"
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
