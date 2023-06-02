import clsx from "clsx";
import { MdModeEdit } from "react-icons/md"
import { ChatNameProps } from "../types";

function ChatName({ show, chatName, setChatName, setShowInput }: ChatNameProps) {
  if (!show) return (
    <div
      className={clsx(
        "flex items-center gap-2 cursor-pointer",
        show ? "hidden" : "show"

      )}
      onClick={() => setShowInput(true)}
    >
      <p
        className={clsx(
          "text-[16px] text-center",
        )}>
        {chatName}
      </p>
      <MdModeEdit
        className="h-6 text-xl text-white"
      />
    </div>
  )

  return (
    <form
      className={clsx(
        "flex items-center w-[12em]  rounded-md justify-around bg-white",
      )}

      onSubmit={(e) => {
        e.preventDefault()
        setShowInput(false)
      }}
    >
      <input
        type="text"
        className={clsx(
          "outline-none h-6 w-full rounded-l-md text-gray-700 text-[15px] pl-2"
        )}
        value={chatName}
        onChange={(e) => {
          e.preventDefault()
          setChatName(e.target.value)
        }}
      />

      <button
        type="submit"
        className="px-2 rounded-r-md"
      >
        <MdModeEdit
          className="h-8 text-xl text-red-500"
        />
      </button>
    </form>
  )
}

export default ChatName