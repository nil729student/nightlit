"use server"
import prisma from '../prisma.js';

export async function getUserData(userId) {
    try {
        const userdata = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!userdata) throw new Error("Usuari no trobat");

        return userdata;
    } catch (error) {
        console.error("Error obtenint dades de l'usuari:", error.message);
        return null;
    }
}


export async function updateUserData(userId, data) {
    try {
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                name: data.name,
                email: data.email,
                image: data.image,
            },
        });

        if (!updatedUser) throw new Error("Usuari no trobat");
        
        return { success: true, data};

    } catch (error) {

        console.error("Error obtenint dades de l'usuari:", error.message);
        return null;
    }
}