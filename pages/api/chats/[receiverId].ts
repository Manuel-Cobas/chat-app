import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/libs/serverAuth";
import prisma from "@/libs/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    const { currentUser } = await serverAuth(req, res);
    const { receiverId } = req.query;

    if (!receiverId) {
      return res.status(400).json({
        message: "receiverId is required",
      });
    }

    const existingChat = await prisma.chat.findMany({
      include: {
        members: true,
        messages: true,
      },
      where: {
        OR: [
          {
            membersIds: {
              equals: [currentUser.id, receiverId.toString()],
            },
          },
          {
            membersIds: {
              equals: [receiverId.toString(), currentUser.id],
            },
          },
        ],
      },
    });

    if (!existingChat || existingChat.length === 0) {
      const chatStored = await prisma.chat.create({
        include: {
          messages: true,
          members: true,
        },
        data: {
          membersIds: [currentUser.id, receiverId.toString()],
        },
      });

      !chatStored && res.status(500).end();
      return res.status(201).json(chatStored);
    }

    return res.status(200).json(existingChat[0]);
  } catch (error) {
    return res.status(400).json({
      error,
    });
  }
}
