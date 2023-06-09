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
    const { chatId, content } = req.body;

    if (!chatId || !content) {
      return res.status(400).json({
        message: "chatId & content are required",
      });
    }

    const existingChat = await prisma.chat.findMany({
      where: {
        id: chatId.toString(),
        membersIds: {
          has: currentUser.id,
        },
      },
    });

    if (!existingChat || existingChat.length === 0) {
      return res.status(404).end();
    }

    const messageStored = await prisma.message.create({
      include: {
        sender: true,
        chat: true,
      },
      data: {
        chatId,
        content,
        senderId: currentUser.id,
      },
    });

    pusherServer.trigger(currentUser.id, "message:send", messageStored);

    return res.status(200).json(messageStored);
  } catch (error) {
    return res.status(400).json({
      error,
    });
  }
}
