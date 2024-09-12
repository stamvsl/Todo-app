import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    const session = await getServerSession(req, res, authOptions);

    console.log("Session (Server-side):", session);

    if (!session) {
      console.log("Session not found on the server");
      return res.status(401).json({ error: "Unauthorized" });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    if (req.method === "GET") {
      const todos = await prisma.todo.findMany({
        where: { userId: user.id },
      });
      return res.status(200).json(todos);
    }

    if (req.method === "POST") {
      const { text } = req.body;
      const newTodo = await prisma.todo.create({
        data: {
          text,
          completed: false,
          userId: user.id,
        },
      });
      return res.status(201).json(newTodo);
    }

    res.status(405).end(); // Method Not Allowed
  } catch (error) {
    console.error("Error in API route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
