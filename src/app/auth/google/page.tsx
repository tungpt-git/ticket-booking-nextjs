"use client";
import { BROADCAST_CHANNEL, GOOGLE_LOGIN_SUCCESS } from "@/core/auth/client";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Page() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (!(status === "loading") && !session) void signIn("google");
    if (session) {
      const bc = new BroadcastChannel(BROADCAST_CHANNEL);
      bc.postMessage(GOOGLE_LOGIN_SUCCESS);

      window.close();
    }
  }, [session, status]);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "absolute",
        left: 0,
        top: 0,
        background: "white",
      }}
    ></div>
  );
}
