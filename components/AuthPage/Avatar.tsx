import { useActiveListStore } from "@/store/store"
import Image from "next/image"
import { useRouter } from "next/router"
import { FaUserCircle } from "react-icons/fa"
import { AvatarProps } from "../types"
import clsx from "clsx"

function Avatar({ ImageUrl, chatId, user }: AvatarProps) {
  const router = useRouter()
  const { members } = useActiveListStore(state => state)
  const isActive = user && members.indexOf(user.email) !== -1

  if (!ImageUrl || ImageUrl === null) return (
    <div className="relative">
      <div className="relative flex items-center justify-center">
        <div className="pt-5 rounded-full bg-gray-400"></div>
        <FaUserCircle
          className="text-2xl text-white"
        />
      </div>

      <div
        className={clsx(
          "absolute top-0 right-0 border border-white bg-green-500 p-[6px] rounded-full",
          isActive === true ? "block" : "hidden"
        )}
      >
      </div>
    </div>
  )

  return (
    <div className="relative p-1">
      <Image
        onClick={() => {
          router.push(`/chats/${chatId}`)
        }}
        src={ImageUrl}
        alt="Usuario Chat App"
        height={40}
        width={40}
        className="rounded-full shadow cursor-pointer"
      />
      <div
        className={clsx(
          "absolute top-0 right-0 border border-white bg-green-500 p-[6px] rounded-full",
          isActive === true ? "block" : "hidden"
        )}
      >
      </div>
    </div>
  )
}

export default Avatar