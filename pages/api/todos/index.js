import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    const todos = await prisma.todo.findMany();
    res.status(200).json(todos);
  } else if (req.method === "POST") {
    const { text } = req.body;
    const newTodo = await prisma.todo.create({
      data: {
        text,
        completed: false,
      },
    });
    res.status(201).json(newTodo);
  } else {
    res.status(405).end();
  }
}
