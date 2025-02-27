"use server";
import prisma from "../prisma";

export async function saveSong(clubId, userId, songData) {
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

export async function getSongs(clubId) {
  try {
    const songs = await prisma.song.findMany({
      where: {
        playlists: {
          some: {
            clubId: clubId,
          },
        },
      },
    });
    return songs;
  } catch (error) {
    console.error("Error fetching songs:", error);
    throw new Error("Error fetching songs");
  }
}

export async function deleteSong(songId) {
  try {
    await prisma.song.delete({
      where: {
        id: songId,
      },
    });
  } catch (error) {
    console.error("Error deleting song:", error);
    throw new Error("Error deleting song");
  }
}

export async function updateSong(songId, songData) {
  try {
    const updatedSong = await prisma.song.update({
      where: {
        id: songId,
      },
      data: {
        title: songData.title,
        artist: songData.artist,
        url: songData.url,
      },
    });
    return updatedSong;
  } catch (error) {
    console.error("Error updating song:", error);
    throw new Error("Error updating song");
  }
}