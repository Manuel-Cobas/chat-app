import { BiArrowBack } from "react-icons/bi"
import { useRouter } from "next/router";
import { Contact } from "@prisma/client";

interface ChatNavProps {
  contact?: Contact
}

function ChatNav({ contact }: ChatNavProps) {
  const router = useRouter()

  return (
    <header className="fixed top-0 right-0 left-0 h-14">
      <nav>
        <ul className="flex items-center justify-between bg-red-500 w-screen h-14 px-4">
          <ul className="flex items-center gap-4">
            <li className="">
              <BiArrowBack
                onClick={() => {
                  router.push("/chats")
                }}
                className="text-2xl text-white cursor-pointer"
              />
            </li>
            <li className="text-lg text-white">
              Nombre Apellidos
            </li>
          </ul>
          <li className="text-lg text-white font-semibold">
            M
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default ChatNav