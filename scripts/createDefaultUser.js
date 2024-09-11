const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");

async function main() {
  const hashedPassword = await bcrypt.hash("defaultpassword", 10);

  const defaultUser = await prisma.user.create({
    data: {
      email: "defaultuser@example.com", // Use a unique default email
      name: "Default User",
      password: hashedPassword,
    },
  });

  console.log("Created default user:", defaultUser);
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
