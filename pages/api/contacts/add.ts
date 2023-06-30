import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";
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
    const { firstName, lastName, contactId } = req.body;
    // Verificando que llegue el contactId (osea el id del usuario que al cual quiero agregar)
    if (!contactId) {
      return res.status(400).json({
        message: "contactId is required",
      });
    }
    // verificando que el usuario exista
    const existingUser = await prisma.user.findUnique({
      where: {
        id: contactId,
      },
    });

    if (!existingUser) {
      return res.status(404).end();
    }
    // // si ya tengo agregado al usuario retornar Bad Request.
    const existingContact = await prisma.contact.findMany({
      where: {
        contactId: contactId,
        userId: currentUser.id,
      },
    });

    if (existingContact && existingContact.length > 0) {
      return res.status(400).end();
    }
    // si el usuario existe y aún no lo he agregado, procedo agregarlo
    const chatStored = await prisma.chat.create({
      data: {
        membersIds: [currentUser.id, contactId],
      },
    });

    const contactStored = await prisma.contact.create({
      data: {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        chatId: chatStored.id,
        userId: currentUser.id,
        contactId: contactId,
      },
    });
    // envio en tiempo real el valor (proximamente se retirara esto)
    await pusherServer.trigger(currentUser.id, "contact:add", contactStored);
    // send status code 201
    return res.status(201).json(contactStored);
  } catch (error) {
    return res.status(400).json({
      error,
    });
  }
}
