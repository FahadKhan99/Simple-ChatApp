import prisma from "@/lib/prismaClient";
import { pusherServer } from "@/lib/pusher";

export async function POST(req: Request) {
  const { roomId, text } = await req.json();

  console.log("inside the message route");
  pusherServer.trigger(roomId, "incoming-message", text);

  await prisma.message.create({
    data: {
      text,
      chatRoomId: roomId,
    },
  });

  return new Response(JSON.stringify({ success: true }));
}
