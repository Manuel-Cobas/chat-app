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
    // verificando que exista el email (proximamente se recibira desde req.body)
    if (!email) {
      return res.status(400).json({
        message: "email is required",
      });
    }
    //verificando que exista el usuario
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
    // verificando si lo he agregado previamente y si es así retornar Bad Request.
    const existingContact = await prisma.contact.findMany({
      select: { id: true },
      where: {
        userId: currentUser.id,
      },
    });

    if (existingContact && existingContact.length > 0) {
      return res.status(400).end();
    }
    // return status code 200
    return res.status(200).json(existingUser[0]);
  } catch (error) {
    return res.status(400).json({
      error,
    });
  }
}
