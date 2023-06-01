import Image from "next/image";
import { ChatPayload } from "../types";
import Background from "./Background";

interface EditChatModalProps {
  chat: ChatPayload
}

function EditChatModal({ chat }: EditChatModalProps) {
  return (
    <Background show={true}>
      <div className="flex flex-col items-center bg-white rounded-lg p-4">
        {/* <Image 

        /> */}
      </div>
    </Background>
  )
}

export default EditChatModal