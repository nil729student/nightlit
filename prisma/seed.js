import prisma from "../app/lib/prisma.js";

async function main() {

  // Usuari
  const adminUser = await prisma.user.create({
    data: {
      name: 'Maria Lopez',
      email: 'marialopez@example.com',
      password: 'securepassword123',
      nif: '987654321B',
      image: '',
      authProvider: 'google',
      provider_id: 'google-provider-id',
      role: 'ADMIN',
    },
  });

  console.log('Usuari ADMIN creat:', adminUser);

  const ownerUser = await prisma.user.create({
    data: {
      name: 'Juan Perez',
      email: 'juanperez@example.com',
      password: 'securepassword123',
      nif: '123456789A',
      image: '',
      authProvider: 'google',
      provider_id: 'google-provider-id',
      role: 'OWNER',
    },
  });

  const standardUser = await prisma.user.create({
    data: {
      name: 'Luis Gómez',
      email: 'luisgomez@example.com',
      password: 'securepassword123',
      image: '',
      authProvider: 'google',
      provider_id: 'google-provider-id',
      role: 'STANDARD',
    },
  });

  const ownerUser2 = await prisma.user.create({
    data: {
      name: 'Ana Martinez',
      email: 'anamartinez@example.com',
      password: 'securepassword123',
      nif: '1122334455C',
      image: '',
      authProvider: 'google',
      provider_id: 'google-provider-id',
      role: 'STANDARD',
    },
  });

  console.log('Usuari creat:', ownerUser2);

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
      ownerId: ownerUser.id, // assiguem el usuari com a propietari del club
    },
  });

  console.log('Cub creat:', club);

  // More Clubs
  const club2 = await prisma.club.create({
    data: {
      name: 'Club de Jazz',
      amenity: 'Jazz Lounge',
      addrCity: 'Chicago',
      latitude: 41.8781,
      longitude: -87.6298,
      nodeId: 'jazz-club-node-id',
      rating: 4.8,
      ownerId: ownerUser.id,
    },
  });

  console.log('Cub creat:', club2);

  // Cançó
  const song = await prisma.song.create({
    data: {
      title: 'Canço de prova',
      artist: 'Artista Desconocido',
      url: 'https://example.com/song.mp3',
    },
  });

  console.log('Sha creat la canço:', song);

  // More Songs
  const song2 = await prisma.song.create({
    data: {
      title: 'Jazz Song',
      artist: 'Famous Jazz Artist',
      url: 'https://example.com/jazzsong.mp3',
    },
  });

  console.log('Sha creat la canço:', song2);

  // Playlist
  const playlist = await prisma.playlist.create({
    data: {
      clubId: club.id,
      songId: song.id,
    },
  });

  console.log('Playlist creada:', playlist);

  const playlist2 = await prisma.playlist.create({
    data: {
      clubId: club2.id,
      songId: song2.id,
    },
  });

  console.log('Playlist creada:', playlist2);

  // Votació
  const vote = await prisma.vote.create({
    data: {
      userId: standardUser.id,
      clubId: club.id,
      vote: 1,
      week: new Date(),
    },
  });

  console.log('Vot creat:', vote);

  const vote2 = await prisma.vote.create({
    data: {
      userId: ownerUser2.id,
      clubId: club2.id,
      vote: 1,
      week: new Date(),
    },
  });

  console.log('Vot creat:', vote2);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

