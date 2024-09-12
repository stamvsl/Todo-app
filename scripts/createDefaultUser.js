const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");

async function main() {
  const hashedPassword = await bcrypt.hash("defaultpassword", 10);

  const defaultUser = await prisma.user.create({
    data: {
      email: "defaultuser@example.com",
      name: "Default User",
      password: hashedPassword,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
