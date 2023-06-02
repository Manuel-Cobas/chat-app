import { useChatMenu } from "@/store/useChatMenu";
import { useQuestionModal } from "@/store/useQuestionModal";
import clsx from "clsx";
import { FiMoreVertical } from "react-icons/fi"

function ChatMenu() {
  const { isOpen, openModal } = useChatMenu(state => state)
  const { openModal: openQuestionModal } = useQuestionModal()

  return (
    <div className="flex justify-center items-center">
      <button
        onClick={(e) => {
          e.preventDefault();
          openModal()
        }}
      >
        <FiMoreVertical
          className="relative text-white text-2xl lg:mr-4 cursor-pointer"
        />
      </button>

      <ul
        className={clsx(
          "absolute w-32 mt-[3.55em] mr-[7em]",
          "bg-white rounded-sm shadow-md",
          isOpen ? "block" : "hidden"
        )}
      >
        <li className="w-full p-2 hover:bg-gray-50 cursor-pointer">
          Ver contacto
        </li>

        <li
          onClick={openQuestionModal}
          className="w-full p-2 hover:bg-gray-50 cursor-pointer"
        >
          Borrar Contacto
        </li>
      </ul>
    </div>
  )
}

export default ChatMenu