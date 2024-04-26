// src/controllers/userController.ts
import prisma from './database';

async function getUsers() {
  const users = await prisma.user.findMany();
  return users;
}

export { getUsers };
