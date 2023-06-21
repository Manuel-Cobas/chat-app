import clsx from "clsx"
import { ModalLayoutProps } from "../types"

function ModalLayout({ children, show }: ModalLayoutProps) {
  return (
    <div
      className={clsx(
        "fixed top-0 left-0 right-0 bottom-0",
        "bg-black bg-opacity-50",
        "flex justify-center items-center transition-all duration-300",
        show ? "translate-x-0" : "translate-x-full"
      )}
    >
      {children}
    </div>
  )
}

export default ModalLayout