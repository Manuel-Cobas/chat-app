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
    const { id: chatId } = req.query;

    if (!chatId) {
      return res.status(400).json({
        message: "chatId is required",
      });
    }

    const existingChat = await prisma.chat.findMany({
      include: {
        members: true,
        messages: true,
      },
      where: {
        id: chatId.toString(),
        membersIds: {
          has: currentUser.id,
        },
      },
    });


    return res.status(200).json(existingChat[0]);
  } catch (error) {
    return res.status(400).json({
      error,
    });
  }
}
