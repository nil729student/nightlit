"use server"

import prisma from '../prisma.js';

export default async function listClubs() {
    try {
        const clubs = await prisma.Club.findMany();
        return clubs;
    } catch (error) {
        console.error('An error occurred:', error);
        throw error;
    }
}