import prisma from "../app/lib/prisma.js";

async function main() {
  // Usuari
  const user = await prisma.user.create({
    data: {
      name: 'Juna Perez',
      email: 'juanperez@example.com',
      password: 'securepassword123',
      nif: '123456789A',
      image: '',
      authProvider: 'google',
      provider_id: 'google-provider-id',
      role: 'STANDARD',
    },
  });

  console.log('Usuari creat:', user);

  // Club
  const club = await prisma.club.create({
    data: {
      name: 'Club de Música',
      amenity: 'Sala de conciertos',
      addrCity: 'New York',
      latitude: 40.7128,
      longitude: -74.0060,
      nodeId: 'club-node-id',
      rating: 4.5,
      ownerId: user.id, // assiguem el usuari com a propietari del club
    },
  });

  console.log('Cub creat:', club);

  // Cançó
  const song = await prisma.song.create({
    data: {
      title: 'Canço de prova',
      artist: 'Artista Desconocido',
      url: 'https://example.com/song.mp3',
    },
  });

  console.log('Sha creat la canço:', song);

  // Playlist
  const playlist = await prisma.playlist.create({
    data: {
      clubId: club.id,
      songId: song.id,
    },
  });

  console.log('Playlist creada:', playlist);

  // Votació
  const vote = await prisma.vote.create({
    data: {
      userId: user.id,
      clubId: club.id,
      vote: 1,
      week: new Date(),
    },
  });

  console.log('Vot creat:', vote);

}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
