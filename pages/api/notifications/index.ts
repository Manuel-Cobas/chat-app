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

    const notifications = await prisma.notification.findMany({
      include: {
        chat: true,
        sender: true,
      },

      where: {
        chat: {
          membersIds: {
            has: currentUser.id,
          },
        },

        NOT: {
          senderId: currentUser.id,
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
