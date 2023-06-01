import { Inter } from 'next/font/google'
import { NextPageContext } from 'next'
// import { getSession } from 'next-auth/react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">

      </div>
    </main>
  )
}
export async function getServerSideProps(ctx: NextPageContext) {
  // const session = await getSession(ctx)

  // if (session) {
    return {
      redirect: {
        destination: '/chats',
        permanent: false,
      }
    }
  // }

  // return {
  //   props: {}
  // }
}