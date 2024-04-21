"use server"

import prisma from '../prisma.js';

export default async function listClubs() {
    try {
        const clubs = await prisma.club.findMany();
        return clubs;
    } catch (error) {
        console.error('An error occurred:', error);
        throw error;
    }
}