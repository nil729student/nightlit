"use server";
import prisma from "../prisma";

export async function saveSong(clubId, userId, songData) {
    console.log("Saving song:", songData);
    console.log("Club ID:", clubId);
    try {
        
        const newSong = await prisma.song.create({
            data: {
                title: songData.title,
                artist: songData.artist,
                url: songData.url,
            },
        });

        await prisma.playlist.create({
            data: {
                clubId: clubId,
                songId: newSong.id,
            },
        });

        return newSong;
    } catch (error) {
        console.error("Error saving song:", error);
        throw new Error("Error saving song");
    }
}