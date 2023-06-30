import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/libs/serverAuth";
import prisma from "@/libs/prismadb";
import { pusherServer } from "@/libs/pusher";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    const { currentUser } = await serverAuth(req, res);
    const { receiverId } = req.body;

    if (!receiverId) {
      return res.status(400).json({
        message: "receiverId is required",
      });
    }

    const existingReceiver = await prisma.user.findUnique({
      where: {
        id: receiverId,
      },
    });

    if (!existingReceiver) {
      return res.status(404).end();
    }

    const chatStored = await prisma.chat.create({
      data: {
        membersIds: [currentUser.id, receiverId],
      },
    });

    // pusherServer.trigger(currentUser.id, "chat:new", chatStored);

    return res.status(201).json(chatStored);
  } catch (error) {
    return res.status(400).json({
      error,
    });
  }
}
