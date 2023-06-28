import { Message } from "@prisma/client";
import { pusherClient } from "@/libs/pusher";

import { useEffect, useState } from "react";
import { useCurrentUser } from "./useCurrentUser";

export function useMessages(messages: Message[]) {
  const { currentUser } = useCurrentUser();
  const [messagesState, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (messages && messages.length > 0) {
      setMessages(messages);
    }
  }, [messages]);

  useEffect(() => {
    if (currentUser) {
      pusherClient.subscribe(currentUser.id);
      pusherClient.bind("message:send", (data: Message) => {
        setMessages([...messagesState, data]);
      });
    }

    () => {
      if (currentUser) {
        pusherClient.unsubscribe(currentUser.id);
        pusherClient.unbind("message:send");
      }
    };
  }, [messagesState, currentUser]);

  return {
    messages: messagesState,
  };
}
