"use server"

import prisma from "../prisma.js";

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
        // Valida i sintatiza les dades
        const validFields = [
            "name", "banner", "amenity", "addrCity", "addrStreet",
            "addrHouseNumber", "addrpostcode", "latitude", "longitude",
            "website", "instagram", "facebook", "twitter", "phone", "email",
            "nodeId", "information" // falta el rating pro com que no s'utilizara i es un numero 0.0 ho complica tot
        ];

        // Filtrar y sanitizar 
        const sanitizedData = Object.fromEntries(
            Object.entries(data)
                .filter(([key]) => validFields.includes(key)) // Incueix les dades valides
                .map(([key, value]) => [key, value ?? null]) // Convertir undefined a null
        );
        console.log(clubid)
        // Upsert de dades
        const updatedClub = await prisma.club.update({
            where: { id: clubid },
            data: sanitizedData,
        });

        return updatedClub;
    } catch (error) {
        console.error("Error actualitzant les dades del club:", error);

        // Capturar errors esecifics de Prisma
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
            // Cambiar el rol del usuari a estándar
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

            // Elimina totes les playlists del club
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

            // Verificar y eliminar cançons que no estiguin asociadas a cap playlist
            await tx.song.deleteMany({
                where: {
                    playlists: {
                        none: {}, // Cançons sense cap playlis asociada
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


export async function getTop5Clubs() {
    try {
        const clubs = await prisma.club.findMany({
            include: {
                _count: {
                    select: { votes: true },
                },
            },
            orderBy: {
                votes: {
                    _count: 'desc',
                },
            },
            take: 5,
        });
        return clubs.map(club => ({
            ...club,
            votes: club._count.votes,
        }));
    } catch (error) {
        console.error('An error occurred while fetching top 5 clubs:', error);
        throw error;
    }
}