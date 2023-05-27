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

    const existingUser = await prisma.user.findUnique({
      where: {
        id: currentUser.id,
      },
    });

    if (!existingUser) {
      return res.status(404).end();
    }

    return res.status(200).json(existingUser);
  } catch (error) {
    return res.status(400).json({
      error,
    });
  }
}
