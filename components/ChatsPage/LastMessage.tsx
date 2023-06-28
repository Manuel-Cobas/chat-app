import { useMemo } from "react";
import { LastMessage } from "../types";

function LastMessage({ messages, currentUserId }: LastMessage) {
  const lastMessage = useMemo(() => {
    if (messages && messages.length > 0) {
      return messages[messages.length - 1]
    }
    return null
  }, [messages])

  if (!lastMessage || !currentUserId) return null

  return (
    <p className="text-sm text-gray-500">
      {lastMessage.senderId === currentUserId && (
        <span className="font-semibold mr-2 text-gray-600">
          Tú:
        </span>
      )}

      {lastMessage.content}
    </p>
  )
}

export default LastMessage