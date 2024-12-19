"use server"
import prisma from "../../prisma"

export async function addPullUp(idClub, userId) {
    try {

        const vote = await prisma.vote.create({
            data: {
                userId: userId,
                clubId: idClub,
                vote: 1,
                week: new Date()
            }
        })
        return vote;
    } catch (error) {
        console.error('An error occurred:', error);
        throw error;
    }
}

export async function addPullDown(idClub, userId) {
    try {

        const vote = await prisma.vote.create({
            data: {
                userId: userId,
                clubId: idClub,
                vote: -1,
                week: new Date()
            }
        })
        return vote;
    } catch (error) {
        console.error('An error occurred:', error);
        throw error;
    }
}


export async function getClubVote() {

    try{
        const votes = await prisma.vote.findMany();
        return votes;
    } catch (error) {
        console.error('An error occurred:', error);
        throw error;
    }
}

export async function getUserVotes() {
    try {
        const votes = await prisma.vote.findMany();
        return votes;
    } catch (error) {
        console.error('An error occurred:', error);
        throw error;
    }
}