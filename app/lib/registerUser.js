"use server"
import bcrypt from "bcryptjs";
import prisma from "../lib/prisma";

export async function registerUser({ 
    name, 
    email, 
    password, 
    role, 
    clubName,
    addrCity,
    addrStreet,
    addrHouseNumber
}) {
    try {
        // Informació compoartida per els dos rols.
        if (!name || !email || !password) {
            throw new Error("All fields are required.");
        }

        const existingUser = await prisma.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            throw new Error("User already exists.");
        }
        // Encriptació de la contrasenya
        const hashedPassword = await bcrypt.hash(password, 10);

        if (role === "STANDARD") {
            const newUser = await prisma.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,
                    role,
                    image: '/uploads/usersProfileImages/default.png'

                },
            });

            return { success: true, user: newUser };
        }

        if (role === "OWNER") {
            if (!name || !addrCity || !addrStreet || !addrHouseNumber ) {
                throw new Error("Club data is required for owners.");
            }

            const newOwner = await prisma.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,
                    role,
                    image: '/uploads/usersProfileImages/default.png',
                    clubsOwned: {
                        create: {
                            name: clubName,
                            amenity: "nightclub",
                            addrCity: addrCity,
                            addrStreet: addrStreet,
                            addrHouseNumber: addrHouseNumber,
                            latitude: 0.0000000,
                            longitude: 40.00000000,
                            nodeId: 'node/000000000'
                        },
                    },
                },
            });

            return { success: true, user: newOwner };
        }


    } catch (error) {
        console.error("Error registering user:", error.message);
        return { success: false, error: error.message };
    }
}