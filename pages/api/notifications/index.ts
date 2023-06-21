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

    const notifications = await prisma.chat.findMany({
      include: {
        members: true,
        notifications: {
          where: {
            NOT: {
              senderId: currentUser.id,
            },
          },

          select: {
            id: true,
            chatId: true,
            message: true,
            createdAt: true,
          },
        },
      },

      where: {
        membersIds: {
          has: currentUser.id,
        },
      },
    });

    return res.status(200).json(notifications);
  } catch (error) {
    return res.status(400).json({
      error,
    });
  }
}
