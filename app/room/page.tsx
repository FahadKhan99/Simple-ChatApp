"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

const page = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-4 justify-center items-center h-screen">
      <p className="text-2xl font-bold text-red-700">
        Please enter a correct Room ID{" "}
      </p>
      <Button className="bg-red-500 rounded-full text-xl font-bold text-white hover:bg-slate-600 p-6" onClick={() => router.back()}>Go Back</Button>
    </div>
  );
};

export default page;
