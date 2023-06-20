import useSWR from "swr";
import fetcher from "@/libs/fetcher";
import { useEffect, useState } from "react";
import { ChatPayload } from "@/components/types";
import { pusherClient } from "@/libs/pusher";
import useCurrentUser from "./useCurrentUser";

function useChatList() {
  const { currentUser } = useCurrentUser();
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
    if (currentUser) {
      pusherClient.subscribe(currentUser.id);
      pusherClient.bind("chat:new", (data: ChatPayload) => {
        setChatsList([...chatsList, data]);
      });
    }

    return () => {
      if (currentUser) {
        pusherClient.unsubscribe(currentUser.id);
        pusherClient.unbind("chat:new");
      }
    };
  }, [currentUser, chats, setChatsList, chatsList]);

  return {
    chats: chatsList,
    loadingChats: isLoading,
    mutate,
    error,
  };
}

export default useChatList;
