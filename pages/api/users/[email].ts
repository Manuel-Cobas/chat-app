import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    const { email } = req.query;
    const { currentUser } = await serverAuth(req, res);

    if (!email) {
      return res.status(400).json({
        message: "email is required",
      });
    }

    const existingUser = await prisma.user.findMany({
      where: {
        email: email.toString(),
        NOT: {
          email: currentUser.email,
        },
      },
    });

    if (!existingUser || existingUser.length === 0) {
      return res.status(404).end();
    }

    const existingChatWithReceiver = await prisma.chat.findMany({
      where: {
        OR: [
          {
            membersIds: {
              equals: [currentUser.id, existingUser[0].id],
            },
          },
          {
            membersIds: {
              equals: [existingUser[0].id, currentUser.id],
            },
          },
        ],
      },
    });

    if (existingChatWithReceiver && existingChatWithReceiver.length > 0) {
      return res.status(400).end();
    }

    return res.status(200).json(existingUser[0]);
  } catch (error) {
    return res.status(400).json({
      error,
    });
  }
}
