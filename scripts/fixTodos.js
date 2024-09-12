const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const defaultUser = await prisma.user.findFirst();
  if (defaultUser) {
    await prisma.todo.updateMany({
      data: {
        userId: defaultUser.id,
      },
      where: {
        userId: null,
      },
    });
  } else {
    console.log("No default user found");
  }
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
