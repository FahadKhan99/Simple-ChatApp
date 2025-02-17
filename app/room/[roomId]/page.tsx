import React from "react";
import prisma from "@/lib/prismaClient";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import Messages from "../Messages";
import MessageField from "../MessageField";
import { Button } from "@/components/ui/button";

interface Props {
  params: {
    roomId: string;
  };
}

const page = async ({ params }: Props) => {
  const { roomId } = params;

  const existingMessage = await prisma.message.findMany({
    where: {
      chatRoomId: roomId,
    },
  });

  const serializedMessages = existingMessage.map((message) => {
    return {
      text: message.text,
      id: message.id,
    };
  });

  return (
    <div className="h-screen">
      <div className="p-10 flex flex-col gap-4">
        <div className="flex justify-between">
          <Label className="text-2xl font-bold">Messages Box</Label>
          <Label className="text-2xl font-bold">Room Id: {roomId}</Label>
        </div>
        <div className="m-50 border-cyan-900 border-4 w-full h-[1000px] p-5">
          <ScrollArea className="h-full rounded-md border p-4 flex flex-col gap-2">
            <Messages roomId={roomId} initialMessages={serializedMessages} />
          </ScrollArea>
        </div>

        <MessageField roomId={roomId} />
      </div>
    </div>
  );
};

export default page;
