import useMessage from "@/hooks/useMessage"
import { SyntheticEvent, useCallback } from "react"
import { MdSend } from "react-icons/md";
import axios from "axios";
import { MessageInputProps } from "../types";

function MessageInput({ chatId }: MessageInputProps) {
  const { content, cleanInput, onChange } = useMessage()

  const SendMessage = useCallback(() => {
    if (chatId && content !== "") {
      axios.post("/api/messages", {
        chatId,
        content
      })
    }
  }, [chatId, content])

  return (
    <form onSubmit={(e: SyntheticEvent) => {
      e.preventDefault()
      SendMessage()
      cleanInput()
    }}
      className="fixed bottom-0 left-0 right-0 flex items-center w-screen p-4 gap-3 bg-white"
    >

      <input
        type="text"
        onChange={(e) => void onChange(e)}
        value={content}
        placeholder="Mensaje"
        className="bg-gray-100 w-full px-4 py-2 rounded-full outline-none"
        autoFocus={true}
      />

      <button
        type="submit"
        className="relative flex items-center justify-center"
      >
        <div className="bg-red-500 p-5 rounded-full"></div>
        <MdSend
          className="text-white absolute text-[1.2em] cursor-pointer"
        />
      </button>
    </form>
  )
}

export default MessageInput