"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useInterval } from "@/utils/hooks/useInterval";

type Props = {
  expiryTime: number;
};
export const Timer = ({ expiryTime }: Props) => {
  const router = useRouter();

  const [now, setNow] = useState(new Date().valueOf());

  useInterval(() => {
    const now = new Date().valueOf();
    if (expiryTime <= new Date().valueOf()) {
      router.push("/booking");
    }
    setNow(now);
  }, 1000);

  const remainingSeconds = (expiryTime - now) / 1000;
  const min = Math.floor(remainingSeconds / 60);
  const sec = Math.round(remainingSeconds % 60);
  return (
    <div className="fixed top-[72px] right-2 z-20">
      <div className="bg-gray-500 text-white py-1 px-3 text-center">
        <span className="countdown font-mono text-2xl">
          <span style={{ "--value": min }}></span>:
          <span style={{ "--value": sec }}></span>
        </span>
      </div>
    </div>
  );
};
