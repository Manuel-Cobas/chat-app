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

    const contacts = await prisma.contact.findMany({
      include: {
        contact: true,
      },

      where: {
        userId: currentUser.id,
      },
    });

    return res.status(200).json(contacts);
  } catch (error) {
    return res.status(400).json({
      error,
    });
  }
}
