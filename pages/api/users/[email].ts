import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  const { email } = req.query;
  console.log("EMAIL", email);
  if (!email) {
    return res.status(400).json({
      message: "email is required",
    });
  }

  const existingUser = await prisma.user.findMany({
    where: {
      email: email.toString(),
    },
  });
  console.log(existingUser);

  return res.status(200).json(existingUser[0]);
  try {
  } catch (error) {
    return res.status(400).json({
      error,
    });
  }
}
