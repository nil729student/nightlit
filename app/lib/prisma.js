
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Close the database connections when the process is terminated
process.on('SIGINT', async () => {
  await prisma.$disconnect();
});

process.on('SIGTERM', async () => {
  await prisma.$disconnect();
});

export default prisma;