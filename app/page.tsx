"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  let roomIdInput = "";

  const createRoom = async () => {
    const res = await fetch("/api/rooms/create");
    const roomId: string = await res.text();
    router.push(`/room/${roomId}`);
  };

  const joinRoom = (roomId: string) => {
    router.push(`/room/${roomId}`);
  };

  return (
    <main className="h-screen p-4">
      <div className="flex flex-col gap-10">
        <div>
          <Button
            className="bg-blue-800 text-white p-7 text-xl hover:bg-slate-800 rounded-full"
            onClick={createRoom}
          >
            Create a Room
          </Button>
        </div>
        <div className="flex w-96 gap-4 items-center justify-center">
          <Input
            type="text"
            placeholder="Enter Room Id"
            onChange={(e) => (roomIdInput = e.target.value)}
          />
          <Button
            className="bg-slate-300 hover:bg-slate-800 hover:text-white p-6"
            onClick={() => joinRoom(roomIdInput)}
          >
            Join Room
          </Button>
        </div>
      </div>
    </main>
  );
}
