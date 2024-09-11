const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const defaultUser = await prisma.user.findFirst(); // Or specify a specific user
  if (defaultUser) {
    await prisma.todo.updateMany({
      data: {
        userId: defaultUser.id,
      },
      where: {
        userId: null, // Only update where userId is null
      },
    });
    console.log("Updated all existing todos to have a userId");
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
