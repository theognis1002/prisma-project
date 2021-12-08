import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function createRandomUser() {
  const user = await prisma.user.create({
    data: {
      email: "elsa@prisma.io",
      name: "Elsa Prisma",
    },
  });
  console.log(user);
}

async function bulkCreateUsers() {
  // @ts-ignore
  const createMany = await prisma.user.createMany({
    data: [
      { name: "Mike", email: "mike@prisma.io" },
      { name: "Bobo", email: "bob@prisma.io" }, // Duplicate unique key!
      { name: "Yewande", email: "yewande@prisma.io" },
      { name: "Angelique", email: "angelique@prisma.io" },
      { name: "Tim", email: "Tim@prisma.io" },
    ],
    skipDuplicates: true, // Skip 'Bobo'
  });
}
// A `main` function so that you can use async/await
async function main() {
  await bulkCreateUsers();
  const allUsers = await prisma.user.findMany({
    include: { posts: true },
  });
  // use `console.dir` to print nested objects
  console.dir(allUsers, { depth: null });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
