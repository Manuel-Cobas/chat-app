import Background from "./Background";
import { signOut } from "next-auth/react";
import { useLogoutModalStore } from "@/store/store";
import clsx from "clsx";

function LogoutModal() {
  const { isOpen, closeModal } = useLogoutModalStore(state => state)

  return (
    <Background show={isOpen}>
      <div className={clsx(
        "flex flex-col items-center gap-6",
        "bg-white p-6 rounded-lg",
      )}>
        <h2
          className="text-xl"
        >
          Desea Cerrar Sesión?
        </h2>
        <div className=" flex items-center gap-4">
          <button
            onClick={(e) => {
              e.preventDefault();
              closeModal()
            }}
            className="py-2 w-20 rounded-md bg-red-500 text-white shadow-md"
          >
            Cancelar
          </button>

          <button
            onClick={(e) => {
              e.preventDefault();
              void signOut()
            }}
            className="py-2  w-20 rounded-md bg-gray-50 shadow-md"
          >
            Cerrar
          </button>
        </div>
      </div>
    </Background>
  )
}

export default LogoutModal