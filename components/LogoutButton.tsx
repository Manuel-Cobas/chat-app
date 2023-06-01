import { signOut } from "next-auth/react";
import { BiLogOut } from "react-icons/bi";
import { useState } from "react";

function LogOutButton() {
  const [isOpen, setIsOpen] = useState(false)
  console.log("open logut", isOpen)
  return (
    <div className="relative">
      <BiLogOut
        onClick={(e) => {
          e.preventDefault();
          // void signOut()
          setIsOpen(!isOpen)
        }}
        className="text-4xl text-white cursor-pointer p-1"
      />
    </div>
  )
}

export default LogOutButton