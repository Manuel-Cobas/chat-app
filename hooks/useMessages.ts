import { Message } from "@prisma/client";
import { useEffect, useState } from "react";
import { pusherClient } from "@/libs/pusher";

function useMessages(messages: Message[], currentUserId: string) {
  const [messagesState, setMessages] = useState<Message[]>([]);
  console.log(messages);
  useEffect(() => {
    if (messages && messages.length > 0) {
      setMessages(messages);
    }
  }, [messages]);

  useEffect(() => {
    if (currentUserId) {
      console.log("STATE", messagesState);
      pusherClient.subscribe(currentUserId);
      pusherClient.bind("message:send", (data: Message) => {
        setMessages([...messagesState, data]);
      });
    }
    
    () => {
      if (currentUserId) {
        pusherClient.unsubscribe(currentUserId);
        pusherClient.unbind("message:send");
      }
    };
  }, [messagesState, currentUserId]);
  
  console.log("STATE", messagesState);
  return { messagesState };
}

export default useMessages;
