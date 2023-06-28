import { ChangeEvent, useCallback, useState } from "react";
import axios from "axios";

export function useSendMessage(chatId: string) {
  const [content, setContent] = useState("");

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setContent(e.target.value);
  }, []);

  const cleanInput = () => setContent("");

  const SendMessage = useCallback(() => {
    if (chatId && content !== "") {
      axios.post("/api/chats/messages", {
        chatId,
        content,
      });
    }
  }, [chatId, content]);

  return {
    content,
    cleanInput,
    onChange,
    SendMessage,
  };
}
