"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";

interface Props {
  roomId: string;
}

const MessageField = ({ roomId }: Props) => {
  const router = useRouter();

  const [input, setInput] = useState<string>("");

  const sendMessage = async (text: string) => {
    setInput("");
    try {
      await axios.post("/api/message", { text, roomId });
    } catch (error) {
      console.log("error is as follow " + error);
    }
  };

  return (
    <div className="w-full flex gap-4 items-center">
      <Input
        type="text"
        placeholder="Type Message"
        className="border-2 border-slate-700 text-xl  h-11"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <Button
        className="bg-blue-800 text-white hover:bg-slate-700 rounded-xl p-6 text-xl font-bold shadow-lg"
        onClick={() => sendMessage(input || "")}
      >
        Send
      </Button>

      <Button
        className="bg-red-500 text-white shadow-slate-900 hover:text-gray-950 rounded-md p-6 w-1/2 text-[18px]"
        onClick={() => router.push("/")}
      >
        Create New Room
      </Button>
    </div>
  );
};

export default MessageField;
