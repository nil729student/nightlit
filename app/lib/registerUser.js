"use server"
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

export async function registerUser({ name, email, password, role = "STANDARD" }) {
    try {
        if (!name || !email || !password) {
            throw new Error("All fields are required.");
        }

        const existingUser = await prisma.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            throw new Error("User already exists.");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role,
            },
        });

        return { success: true, user: newUser };
    } catch (error) {
        console.error("Error registering user:", error.message);
        return { success: false, error: error.message };
    }
}
