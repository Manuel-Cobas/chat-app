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

    console.log(existingUser);

    return res.status(200).json(existingUser[0]);
  } catch (error) {
    return res.status(400).json({
      error,
    });
  }
}
