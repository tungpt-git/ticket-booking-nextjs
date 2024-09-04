"use client";
import { useTimer } from "@/adapters/client/useTimer";

type Props = {
  expiryTime: number;
  onTimeout?: VoidFunction;
};
export const Timer = ({ expiryTime, onTimeout = () => {} }: Props) => {
  const remainingSeconds = useTimer(onTimeout, expiryTime);

  const min = Math.floor(remainingSeconds / 60);
  const sec = Math.round(remainingSeconds % 60);

  return (
    <div className="bg-error text-white py-1 px-3 text-center">
      Còn lại{" "}
      <span className="countdown">
        <span style={{ "--value": min }}></span>:
        <span style={{ "--value": sec }}></span>
      </span>
    </div>
  );
};
