import { User } from "@prisma/client"
import { IoMdPersonAdd } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { ContactPayload } from "./ChatsPage/List";
import Image from "next/image";
import { useCallback } from "react";
import axios from "axios"
import { useSearchStore } from "@/store/store";
import { useRouter } from "next/router";

interface UserBoxProps {
  user: User | null
  image: string | null
}

function UserBox({ user, image }: UserBoxProps) {
  const { closeSearch, setSearch } = useSearchStore(state => state)
  const router = useRouter()

  const addContact = useCallback(
    () => {
      if (user !== null) {
        axios.post("/api/chats/new", {
          receiverId: user.id
        })
          .then((res) => console.log(res.data))
          .finally(() => {
            setSearch("")
            closeSearch()
          })
      }
    },
    [user, , setSearch, closeSearch],
  )


  return (
    <div className="flex items-center justify-evenly">
      {image ? (
        <Image
          onClick={() => {
            console.log("Redireccion chat")
          }}
          src={`${image.toString()}`}
          alt="Usuario Chat App"
          height={40}
          width={40}
          className="rounded-full shadow"
        />) : (
        <div className="relative flex items-center justify-center">
          <div className="pt-5 rounded-full bg-gray-400"></div>
          <FaUserCircle
            className="text-2xl text-white"
          />
        </div>
      )}

      <div
        onClick={() => {
          console.log("Redireccion chat")
        }}
        className="flex flex-col justify-center h-16 w-full max-w-[65%]"
      >
        <h2 className="text-lg text-gray-800">
          {user !== null && user.name}
        </h2>
      </div>

      <IoMdPersonAdd
        onClick={addContact}
        className="text-3xl text-red-500 cursor-pointer"
      />
    </div>
  )
}

export default UserBox