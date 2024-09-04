import { useInterval } from "@/utils/hooks/useInterval";
import { useState } from "react";

//
export const useTimer = (onTimeout: VoidFunction, expiryTimeInMs: number) => {
  const [now, setNow] = useState(new Date().valueOf());

  useInterval(() => {
    const now = new Date().valueOf();
    if (expiryTimeInMs <= new Date().valueOf()) {
      onTimeout();
    }
    setNow(now);
  }, 1000);
  const remainingSeconds = (expiryTimeInMs - now) / 1000;
  return remainingSeconds;
};
