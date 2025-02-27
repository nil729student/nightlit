"use server"
import prisma from '../../prisma.js';

export async function deleteWeeklyVotes() {
    try {
        const result = await prisma.vote.deleteMany({
            // Elimina tote les votacions que hi haguin
   
        });
        console.log(`Deleted ${result.count} votes`);
        return result;
    } catch (error) {
        console.error('An error occurred while deleting votes:', error);
        throw error;
    }
}