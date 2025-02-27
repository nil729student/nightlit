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

// get all emails
export async function getAllEmails() {
    try {
        const emails = await prisma.user.findMany({
            select: {
                email: true,
            },
        });

        return emails.map((user) => user.email);
    } catch (error) {
        console.error("Error obtenint emails:", error.message);
        return null;
    }
}

export async function deleteUserAccount(userId) {
    try {
      // Eliminar el usuario de la base de datos
      await prisma.user.delete({
        where: { id: userId },
      });
      
      return { success: true };
    } catch (error) {
      console.error("Error eliminando la cuenta del usuario:", error.message);
      return { success: false, error: error.message };
    }
  }