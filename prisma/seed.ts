import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user1 = await prisma.user.upsert({
    where: { email: 'jean@gmail.com' },
    update: {},
    create: {
      email: 'jean@gmail.com',
      password: 'test123',
      tasks: {
        create: [
          {
            content: 'Première tâche de Jean',
            createdAt: new Date(),
          },
          {
            content: 'Deuxième tâche de Jean',
            createdAt: new Date(),
          },
        ],
      },
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'john@gmail.com' },
    update: {},
    create: {
      email: 'john@gmail.com',
      password: 'xxx',
      tasks: {
        create: [
          {
            content: 'Première tâche de John',
            createdAt: new Date(),
          },
        ],
      },
    },
  });

  console.log({ user1, user2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
