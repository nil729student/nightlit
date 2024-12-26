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


export async function listClubsByCityPullOrder () {
    try {
        const clubs = await prisma.club.findMany({
            where: {
                addrCity: { not: null },
            },
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
        });
        console.log('Clubs', clubs);
        return clubs.map(club => ({
            ...club,
            votes: club._count.votes,
        }));
    } catch (error) {
        console.error("list clubs by city Error", error);
        throw error;
    }
}