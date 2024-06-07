"use server"

import prisma from "../../prisma"

export default async function addPullUp(idClub) {
    try {
        const club = await prisma.club.update({
            where: { id: idClub },
            data: { 
                pullUp: { increment: 1 } 
            },
        });
        return club;
    } catch (error) {
        console.error('An error occurred:', error);
        throw error;
    }
}