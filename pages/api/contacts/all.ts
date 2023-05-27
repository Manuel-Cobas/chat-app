import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/libs/serverAuth";
import prisma from "@/libs/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("CONTACTRS");
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    const { currentUser } = await serverAuth(req, res);

    const contacts = await prisma.contact.findMany({
      include: {
        user: true,
        contact: true,
      },
      where: {
        userId: currentUser.id,
      },
    });
    console.log("CONTACTRS", contacts);
    if (!contacts || contacts.length === 0) {
      return res.status(404).end();
    }

    return res.status(200).json(contacts);
  } catch (error) {
    return res.status(400).json({
      error,
    });
  }
}
