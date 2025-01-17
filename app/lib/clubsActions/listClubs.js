"use server"

import prisma from '../prisma.js';

export  async function listClubs() {
    try {
        const clubs = await prisma.club.findMany();
        return clubs;
    } catch (error) {
        console.error('An error occurred:', error);
        throw error;
    }
}

export async function listClubsByCity() {
    try {
        const clubs = await prisma.club.findMany({
            where:{
                addrCity: {not: null}
            },
        })
        console.log('Clubs', clubs)
        return clubs;
    }catch(error){
        console.error("list clubs by city Error", error);
        throw error;
    }
}


export async function listClubsByCityPullOrder() {
    try {
        const clubs = await prisma.club.findMany({
            where: {
                addrCity: { not: null },
            },
            include: {
                votes: true,
            },
        });

        const clubsWithVoteCount = clubs.map(club => {
            // Es calcula el total de vots positius i negatius
            const positiveVotes = club.votes.filter(vote => vote.vote > 0).length; // 1
            const negativeVotes = club.votes.filter(vote => vote.vote < 0).length; // 0
            const totalVotes = positiveVotes - negativeVotes;

            return {
                ...club,// Itera els clubs i retorna un nou objecte amb els vots totals
                votes: totalVotes,
            };
        });
        // Es retorna la llista de clubs ordenada per vots
        clubsWithVoteCount.sort((a, b) => b.votes - a.votes);

        return clubsWithVoteCount;
    } catch (error) {
        console.error("list clubs by city Error", error);
        throw error;
    }
}