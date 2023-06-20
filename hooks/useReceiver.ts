import { useState, useEffect } from "react";
import useCurrentUser from "./useCurrentUser";
import { User } from "@prisma/client";

function useReceiver(members: User[]) {
  const { currentUser } = useCurrentUser();
  const [receiver, setReceiver] = useState<User | null>(null);

  useEffect(() => {
    if (members && currentUser) {
      const receiver = members.find((m: User) => m.id !== currentUser.id);
      setReceiver(receiver ? receiver : null);
    }
  }, [members, currentUser]);

  return { receiver, currentUser };
}

export default useReceiver;
