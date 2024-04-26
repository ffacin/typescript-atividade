import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      name: 'Exemplo',
      email: 'exemplo@example.com',
      login: 'exemplo',
      password: '$2b$10$KZRUPcM5h.f0jwzDVsOG3u.ADXPd6JlGQc3tGzqAQh/9r8s8SEBc6', // senha: exemplo
    },
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
