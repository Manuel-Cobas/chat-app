import clsx from "clsx"
import { ModalLayoutProps } from "../types"

function ModalLayout({ children, show }: ModalLayoutProps) {
  return (
    <div
      className={clsx(
        "fixed top-0 left-0 right-0 bottom-0",
        "bg-black bg-opacity-50",
        "justify-center items-center",
        show === true ? "flex" : "hidden"
      )}
    >
      {children}
    </div>
  )
}

export default ModalLayout