import { signIn } from "next-auth/react";
import { useCallback } from "react";
import { FcGoogle } from "react-icons/fc";
import { BsGithub } from "react-icons/bs";
import { FaDiscord } from "react-icons/fa";
import { useRouter } from "next/router";
import clsx from "clsx";
import { AuthButtonProps } from "../types";

export const Variants = [
  "GOOGLE",
  "GITHUB",
  "DISCORD",
]

function AuthButton({ variant, width, padding, title }: AuthButtonProps) {
  const router = useRouter()

  const SignIn = useCallback(
    (): void => {
      const getVariant = Variants.find((v) => v === variant);

      void signIn(
        getVariant?.toLowerCase(), {
        callbackUrl: "/chats",
      })

      void router.push("/chats")
    },
    [variant, router],
  )

  return (
    <button
      className={clsx(
        "rounded-md shadow cursor-pointer",
        variant === "GITHUB" && "bg-gray-900",
        variant === "GOOGLE" && "bg-white",
        variant === "DISCORD" && "bg-indigo-600",
        width ? width : "w-auto",
        padding ? padding : "p-2",
      )}
      onClick={SignIn}
    >
      <p className="flex gap-2 items-center text-md text-semibold">
        {title}
        <span className="text-3xl">
          {variant === "GOOGLE" && <FcGoogle />}
          {variant === "GITHUB" && <BsGithub className="text-white" />}
          {variant === "DISCORD" && <FaDiscord className="text-white" />}
        </span>
      </p>
    </button>
  )
}

export default AuthButton