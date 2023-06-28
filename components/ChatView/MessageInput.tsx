import { useSendMessage } from "@/hooks/useSendMessage"
import { SyntheticEvent } from "react"
import { MdSend } from "react-icons/md";
import { MessageInputProps } from "../types";
import { useChatMenu } from "@/store/useChatMenu";

function MessageInput({ chatId }: MessageInputProps) {
  const { content, cleanInput, onChange, SendMessage } = useSendMessage(chatId.toString())
  const { closeModal } = useChatMenu()

  return (
    <form
      onClick={closeModal}
      onSubmit={(e: SyntheticEvent) => {
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
        className="bg-gray-100 w-full shadow px-4 py-2 rounded-full outline-none"
        autoFocus={true}
      />

      <button
        type="submit"
        className="relative flex items-center justify-center"
      >
        <div className="bg-red-500 p-5 rounded-full shadow"></div>
        <MdSend
          className="text-white absolute text-[1.2em] cursor-pointer"
        />
      </button>
    </form>
  )
}

export default MessageInput