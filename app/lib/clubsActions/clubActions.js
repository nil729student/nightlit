"use server"

import prisma from "../prisma";

export async function getClubData(clubId) {
    if (!clubId) throw new Error("Falta l'ID del propietari.");
    try {
        const club = await prisma.club.findUnique({
            where: { id: clubId },
        });
        console.log(club)
        return club;
    } catch (error) {
        console.error("Error carregant dades del club:", error);
        throw new Error("No s'han pogut carregar les dades del club.");
    }
}

export async function getOwnerClubData(ownerId) {
    if (!ownerId) throw new Error("Falta l'ID del propietari.");

    try {
        const club = await prisma.club.findMany({
            where: { ownerId: ownerId },
        });
        console.log(club)
        return club;
    } catch (error) {
        console.error("Error carregant dades del club:", error);
        throw new Error("No s'han pogut carregar les dades del club.");
    }
}


export async function saveClubData(ownerId, clubid, data) {
    if (!ownerId) throw new Error("Falta l'ID del propietari.");
    console.log(data)
    try {
        // Validar y sanitizar los datos
        const validFields = [
            "name", "banner", "amenity", "addrCity", "addrStreet",
            "addrHouseNumber", "addrpostcode", "latitude", "longitude",
            "website", "instagram", "facebook", "phone", "email",
            "nodeId", "information" // falta el rating pro com que no s'utilizara i es un numero 0.0 ho complica tot
        ];

        // Filtrar y sanitizar los datos
        const sanitizedData = Object.fromEntries(
            Object.entries(data)
                .filter(([key]) => validFields.includes(key)) // Incluir solo claves válidas
                .map(([key, value]) => [key, value ?? null]) // Convertir undefined a null
        );
        console.log(clubid)
        // Upsert de datos
        const updatedClub = await prisma.club.update({
            where: { id: clubid },
            data: sanitizedData,
        });

        return updatedClub;
    } catch (error) {
        console.error("Error actualitzant les dades del club:", error);

        // Capturar errores específicos de Prisma
        if (error.code === "P2025") {
            throw new Error("No s'ha trobat cap club amb aquest propietari.");
        }

        throw new Error("No s'han pogut guardar les dades del club.");
    }
}

export async function deleteClub(clubId) {
    if (!clubId) {
        throw new Error("El ID del club no puede ser null o undefined.");
    }

    try {
        console.log("Deleting club with ID:", clubId);

        await prisma.$transaction(async (tx) => {
            // Cambiar el rol del usuario a estándar
            const club = await tx.club.findUnique({
                where: { id: clubId },
                select: { ownerId: true },
            });

            if (club && club.ownerId) {
                await tx.user.update({
                    where: {
                        id: club.ownerId,
                    },
                    data: {
                        role: "STANDARD",
                    },
                });
            }

            // Eliminar todas las playlists asociadas al club
            await tx.playlist.deleteMany({
                where: {
                    clubId: clubId,
                },
            });

            // Eliminar el club
            await tx.club.delete({
                where: {
                    id: clubId,
                },
            });

            // Verificar y eliminar canciones que no estén asociadas a ninguna playlist
            await tx.song.deleteMany({
                where: {
                    playlists: {
                        none: {}, // Canciones sin ninguna playlist asociada
                    },
                },
            });
        });

        console.log("Club deleted successfully!");
    } catch (error) {
        console.error("Error deleting club:", error);
        throw new Error("Error deleting club");
    }
}