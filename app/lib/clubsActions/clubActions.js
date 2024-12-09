"use server"

import prisma from "../prisma";

export async function getClubData(ownerId) {
    if (!ownerId) throw new Error("Falta l'ID del propietari.");

    try {
        console.log(ownerId)
        const club = await prisma.club.findMany({
            where: { ownerId: ownerId },
        });
        return club;
    } catch (error) {
        console.error("Error carregant dades del club:", error);
        throw new Error("No s'han pogut carregar les dades del club.");
    }
}


export async function saveClubData(ownerId, clubid , data) {
    if (!ownerId) throw new Error("Falta l'ID del propietari.");

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
