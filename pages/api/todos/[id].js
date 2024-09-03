import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "PUT") {
    const { text, completed } = req.body;
    const updatedTodo = await prisma.todo.update({
      where: { id: parseInt(id) },
      data: { text, completed },
    });
    res.status(200).json(updatedTodo);
  } else if (req.method === "DELETE") {
    await prisma.todo.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).end();
  }
}
