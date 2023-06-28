import clsx from "clsx";
import Background from "./Background";

import { useQuestionModal } from "@/store/useQuestionModal";
import type { QuestionModalProps } from "../types";

function QuestionModal({ buttonTitle, title, description, method }: QuestionModalProps) {
  const { isOpen, closeModal } = useQuestionModal(state => state)

  return (
    <Background show={isOpen}>
      <div
        className={clsx(
          "flex flex-col items-center gap-6 transition-all duration-300",
          "bg-white p-6 rounded-lg",
          isOpen ? "scale-100" : "scale-0"
        )}
      >
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-lg lg:text-2xl">
            {title}
          </h2>
          <p className="text-sm lg:text-lg text-center text-gray-500">
            {description}
          </p>
        </div>

        <div className=" flex items-center gap-4">
          <button
            onClick={(e) => {
              e.preventDefault();
              closeModal()
            }}
            className="py-2 w-20 rounded-md bg-red-500 text-white shadow-md cursor-pointer"
          >
            Cancelar
          </button>

          <button
            onClick={(e) => {
              e.preventDefault();
              method()
            }}
            className="py-2 w-20 rounded-md bg-gray-50 shadow-md cursor-pointer"
          >
            {buttonTitle}
          </button>
        </div>
      </div>
    </Background>
  )
}

export default QuestionModal