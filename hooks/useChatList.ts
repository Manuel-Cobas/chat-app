import useSWR from "swr";
import fetcher from "@/libs/fetcher";
import { useEffect, useState } from "react";
import { ChatPayload } from "@/components/types";
import { pusherClient } from "@/libs/pusher";

function useChatList(currentUserId: string) {
  const [chatsList, setChatsList] = useState<ChatPayload[]>([]);
  const {
    data: chats,
    isLoading,
    mutate,
    error,
  } = useSWR("/api/chats/all", fetcher);

  useEffect(() => {
    if (!isLoading && !error) {
      setChatsList(chats);
    }
  }, [isLoading, error, chats]);

  useEffect(() => {
    if (currentUserId) {
      pusherClient.subscribe(currentUserId);
      pusherClient.bind("chat:new", (data: ChatPayload) => {
        setChatsList([...chatsList, data]);
      });
    }

    return () => {
      if (currentUserId) {
        pusherClient.unsubscribe(currentUserId);
        pusherClient.unbind("chat:new");
      }
    };
  }, [currentUserId, chats, setChatsList, chatsList]);

  return {
    data: chatsList,
    isLoading,
    mutate,
    error,
  };
}

export default useChatList;
