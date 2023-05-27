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
    const { contactId } = req.query;

    if (!contactId) {
      return res.status(400).json({
        message: "contactId is required",
      });
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        id: contactId.toString(),
      },
    });

    if (!existingUser) {
      return res.status(404).end();
    }

    const contactStored = await prisma.contact.create({
      include: {
        user: true,
        contact: true,
      },
      data: {
        userId: currentUser.id,
        contactId: contactId.toString(),
      },
    });

    await pusherServer.trigger(currentUser.id, 'contact:add', contactStored)

    return res.status(200).json(contactStored);
  } catch (error) {
    return res.status(400).json({
      error,
    });
  }
}
