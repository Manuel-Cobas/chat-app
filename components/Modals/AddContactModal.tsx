import Image from 'next/image'
import Background from "@/components/Modals/Background";
import { AiOutlinePlus } from "react-icons/ai";

import clsx from "clsx";
import axios from "axios";
import { User } from '@prisma/client'

import { useAddContact } from "@/hooks/useAddContact";
import { useSearchModal } from "@/zustand/useSearchModal";
import { useAddContactModal } from '@/zustand/useAddContactModal';

// import { addContact } from "@/libs/addContact";

function AddContactModal({ user }: { user: User }) {
  const { firstName, lastName, onChange } = useAddContact(user?.name)
  const { isOpen, closeModal } = useAddContactModal(state => state)
  const { closeSearch, setSearch } = useSearchModal(state => state)

  return (
    <Background show={isOpen}>
      <div
        className={clsx(
          "flex flex-col items-center bg-white w-10/12 p-6 rounded-lg",
          "transition-all  duration-300",
          isOpen ? "scale-100" : "scale-0"
        )}
      >
        <form
          className="flex flex-col gap-6 w-full"
          onSubmit={(e) => {
            e.preventDefault()
            return axios
              .post("/api/contacts/add", {
                firstName,
                lastName: lastName ? lastName : "",
                contactId: user.id,
              })
              .catch((err) => console.error(err))
              .then((res) => console.log(res))
              .finally(() => {
                closeModal()
                setSearch("")
                closeSearch()
              });
          }}
        >
          <h2 className="text-2xl font-semibold">
            Agregar Contacto
          </h2>

          <div className="flex flex-col items-center gap-4 mt-2 my-6">
            <div className="mb-2">
              {user && user !== null && (
                <Image
                  src={user.image!.toString()}
                  className="rounded-full"
                  alt="foto de perfil chat app"
                  width={100}
                  height={100}
                  quality={80}
                />
              )}
            </div>

            <input
              name="firstName"
              type="text"
              className="bg-gray-50 shadow rounded-lg px-4 py-2 outline-none text-gray-700"
              placeholder="Nombre"
              value={firstName}
              onChange={onChange}
            />

            <input
              name="lastName"
              type="text"
              className="bg-gray-50 shadow rounded-lg px-4 py-2 outline-none text-gray-700"
              placeholder="Apellido"
              value={lastName}
              onChange={onChange}
            />
          </div>

          <div className="flex items-center gap-4 justify-end">
            <button
              type="button"
              className="py-2 w-20 rounded-md bg-red-500 text-white shadow-md cursor-pointer"
              onClick={(e) => {
                e.preventDefault()
                closeModal()
              }}
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="flex gap-2 px-2 py-[8px] rounded-md bg-gray-50 shadow-md cursor-pointer"
            >
              Guardar
              <span>
                <AiOutlinePlus
                  className="text-2xl text-rose-500"
                />
              </span>
            </button>
          </div>
        </form>
      </div>
    </Background>
  )
}

export default AddContactModal