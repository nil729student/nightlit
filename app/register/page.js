"use client";

import Link from "next/link";

export default function RegisterPage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-green-500 text-white">
            <h1 className="text-4xl font-bold mb-8">Join the Party!</h1>
            <p className="mb-6 text-lg">What kind of account would you like to create?</p>
            <div className="flex space-x-6">
                <Link href="/register/owner">
                    <button className="px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg shadow-md hover:bg-gray-200">
                        Register as Owner
                    </button>
                </Link>
                <Link href="/register/standard">
                    <button className="px-6 py-3 bg-white text-pink-600 font-semibold rounded-lg shadow-md hover:bg-gray-200">
                        Register as Guest
                    </button>
                </Link>
            </div>
        </div>
    );
}
