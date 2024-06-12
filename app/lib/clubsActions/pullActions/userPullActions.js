"use server"
import prisma from "../../prisma"

export async function addPullUp(idClub) {
    try {

        const vote = await prisma.vote.create({
            data: {
                userId: 1,
                clubId: idClub,
                vote: 1,
                week: new Date() // datateime
            }
        })
        return vote;
    } catch (error) {
        console.error('An error occurred:', error);
        throw error;
    }
}

export async function addPullDown(idClub) {
    try {

        const vote = await prisma.vote.create({
            data: {
                userId: 1,
                clubId: idClub,
                vote: -1,
                week: new Date() // datateime
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