"use client";

import { Label } from "@/components/ui/label";
import { pusherClient } from "@/lib/pusher";
import React, { useState, useEffect } from "react";

interface Props {
  initialMessages: {
    text: string;
    id: string;
  }[];
  roomId: string;
}

const Messages = ({ roomId, initialMessages }: Props) => {
  const [incomingMessages, setIncomingMessages] = useState<string[]>([]);

  useEffect(() => {
    pusherClient.subscribe(roomId);

    const messageHandler = (text: string) => {
      setIncomingMessages((prevMessage) => [...prevMessage, text]);
    };

    pusherClient.bind("incoming-message", messageHandler);

    return () => {
      pusherClient.unbind("incoming-message", messageHandler);
      pusherClient.unsubscribe(roomId);
    };
  }, [roomId]);

  return (
    <div className="flex flex-col gap-4">
      {initialMessages.map((message) => (
        <div className="border-2 p-2 rounded-2xl bg-slate-200">
          <Label className="text-xl" key={message.id}>
            {message.text}
          </Label>
        </div>
      ))}

      {incomingMessages.map((message, i) => (
        <div className="border-2 p-2 rounded-2xl bg-slate-200">
          <Label className="text-xl" key={i}>
            {message}
          </Label>
        </div>
      ))}
    </div>
  );
};

export default Messages;
