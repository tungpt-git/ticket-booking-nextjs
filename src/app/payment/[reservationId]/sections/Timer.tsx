"use client";
import { useInterval } from "@/utils/hooks/useInterval";
import { secondsToMinutes } from "@/utils/secondsToMinutes";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  expiryTime: number;
};
export const Timer = ({ expiryTime }: Props) => {
  const router = useRouter();

  const [now, setNow] = useState(new Date().valueOf());

  useInterval(() => {
    const now = new Date().valueOf();
    if (expiryTime <= new Date().valueOf()) {
      router.push("/");
    }
    setNow(now);
  }, 1000);

  const remainingSeconds = (expiryTime - now) / 1000;
  const value = Math.floor((remainingSeconds / (15 * 60)) * 100);

  return (
    <div className="fixed top-2 right-2 z-20">
      <div
        className="radial-progress"
        style={{ "--value": value, "--size": "4rem" }}
        role="progressbar"
      >
        {secondsToMinutes(remainingSeconds)}
      </div>
    </div>
  );
};
