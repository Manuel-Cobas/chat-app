import axios from "axios"
import Image from "next/image";
import { useCallback } from "react";

import { useSearch } from "@/store/useSearch";
import { useAddContactModal } from '@/zustand/useAddContactModal';

import { IoMdPersonAdd } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";

import type { UserBoxProps } from "../types";

function UserBox({ user, image }: UserBoxProps) {
  const { closeSearch, setSearch } = useSearch(state => state)
  const { openModal } = useAddContactModal(state => state)

  const newChat = useCallback(
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
        onClick={openModal}
        className="text-3xl text-red-500 cursor-pointer"
      />
    </div>
  )
}

export default UserBox