import { NextApiResponse, NextApiRequest } from "next";
import { getServerSession } from "next-auth";

import { pusherServer } from "@/libs/pusher";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session?.user?.email) {
    return res.status(401).end();
  }

  const socketId = req.body.socket_id;
  const channel = req.body.channel_name;
  const data = {
    user_id: session.user.email,
  };

  const authResponse = pusherServer.authorizeChannel(socketId, channel, data);

  return res.status(200).send(authResponse);
}
