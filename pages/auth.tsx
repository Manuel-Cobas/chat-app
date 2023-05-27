import AuthButton from "@/components/AuthPage/AuthButton"
import Logo from "@/components/AuthPage/Logo"
import { NextPageContext } from "next"
import { getSession } from "next-auth/react"

function AuthPage() {
  return (
    <main
      className="flex items-center justify-center h-screen w-screen bg-gray-100"
    >
      <div
        className="flex flex-col items-center justify-center w-[95%] h-[95%] gap-8 px-4 bg-white rounded-md"
      >
        <Logo />

        <div className="relative flex items-center w-full justify-center">
          <div className="border-b border-gray-200 w-full"></div>
          <p className="absolute bg-white py-1 px-2 text-gray-800">
            Como Desea Iniciar Sesión?
          </p>
        </div>

        <div className="flex items-center justify-center w-full gap-6">
          <AuthButton variant="GOOGLE" />
          <AuthButton variant="GITHUB" />
        </div>
      </div>
    </main>
  )
}

export async function getServerSideProps(ctx: NextPageContext) {
  const session = await getSession(ctx)

  if (session) {
    return {
      redirect: {
        destination: '/chats',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}

export default AuthPage