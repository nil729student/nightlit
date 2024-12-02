
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Tanqueu les connexions a la base de dades quan finalitzi el procés
process.on('SIGINT', async () => {
  await prisma.$disconnect();
});

process.on('SIGTERM', async () => {
  await prisma.$disconnect();
});

export default prisma;