import Image from "next/image"

function Logo() {
  return (
    <div className="flex flex-col items-center gap-2">
      <Image src="/logo.png" alt="logo" width="128" height="128" />
      <div className="flex flex-col items-center">
        <h1 className="text-gray-950 font-bold text-2xl">Bienvenido a Chat App</h1>
        <p className="text-gray-400 text-center">
          Esta aplicación esta hecha con fines academicos.
        </p>
      </div>
    </div>
  )
}

export default Logo