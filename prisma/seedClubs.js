import prisma from "../app/lib/prisma.js";
import path from 'path';
import fs from 'fs';

async function seedClubs() {
  try {
    // 1. Leer archivo JSON
    //const filePath = path.join(__dirname, 'clubs.json');
    const rawData = fs.readFileSync('./clubs.json', 'utf-8');
    const clubs = JSON.parse(rawData);

    // 2. Insertar en lote
    const createdClubs = await prisma.$transaction(
      clubs.map(club => 
        prisma.club.create({
          data: {
            ...club,
            ownerId: 1 // Reemplazar con ID real
          }
        })
      )
    );

    console.log(`✅ Insertados ${createdClubs.length} clubs`);
    return createdClubs;
    
  } catch (error) {
    console.error('Error seeding clubs:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Ejecutar la función
seedClubs();