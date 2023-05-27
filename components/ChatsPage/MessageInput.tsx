import useMessage from "@/hooks/useMessage"
import { SyntheticEvent } from "react"
import { AiOutlineSend } from "react-icons/ai";

function MessageInput() {
  const { content, cleanInput, onChange } = useMessage()

  return (
    <form onSubmit={(e: SyntheticEvent) => {
      e.preventDefault()
    }}
      className="fixed bottom-0 left-0 right-0 flex items-center w-screen p-4 bg-white"
    >

      <input
        type="text"
        onChange={(e) => void onChange(e)}
        value={content}
        placeholder="Mensaje"
      />

      <button
        type="submit"
        className="relative flex items-center justify-center"
      >
        <div className="absolute bg-red-500 p-4"></div>
        <AiOutlineSend
          className="text-white text-2xl"
        />
      </button>
    </form>
  )
}

export default MessageInput