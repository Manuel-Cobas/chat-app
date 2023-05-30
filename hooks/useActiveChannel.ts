import { useEffect, useState } from "react";
import { useActiveListStore } from "@/store/store";
import { Channel, Members } from "pusher-js";
import { pusherClient } from "@/libs/pusher";

function useActiveChannel() {
  const { set, add, remove } = useActiveListStore((state) => state);
  const [activeChannel, setActiveChannel] = useState<Channel | null>(null);

  useEffect(() => {
    let channel = activeChannel;

    if (!channel) {
      channel = pusherClient.subscribe("presence-chat");
      setActiveChannel(channel);
    }

    channel.bind("pusher:subscription_succeeded", (members: Members) => {
      const initialMembers: string[] = [];

      members.each((member: Record<string, any>) =>
        initialMembers.push(member.id)
      );

      set(initialMembers);
    });

    channel.bind("pusher:member_added", (member: Record<string, any>) => {
      add(member.id);
    });

    channel.bind("pusher:removed", (member: Record<string, any>) => {
      remove(member.id);
    });

    return () => {
      if (activeChannel) {
        pusherClient.unsubscribe("presence-chat");
        setActiveChannel(null);
      }
    };
  }, [activeChannel, set, add, remove]);
}

export default useActiveChannel;
