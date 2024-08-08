"use client";
import React, { useEffect } from "react";
import { Button } from ".";
import { BROADCAST_CHANNEL, GOOGLE_LOGIN_SUCCESS } from "@/core/auth/client";

const GoogleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Google"
    viewBox="0 0 512 512"
    width="1.5em"
    height="1.5em"
  >
    <path
      fill="#4285f4"
      d="M386 400c45-42 65-112 53-179H260v74h102c-4 24-18 44-38 57z"
    />
    <path
      fill="#34a853"
      d="M90 341a192 192 0 0 0 296 59l-62-48c-53 35-141 22-171-60z"
    />
    <path
      fill="#fbbc02"
      d="M153 292c-8-25-8-48 0-73l-63-49c-23 46-30 111 0 171z"
    />
    <path
      fill="#ea4335"
      d="M153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55z"
    />
  </svg>
);

export const GoogleSignInButton = (
  props: React.ComponentProps<typeof Button>
) => {
  const popupCenter = (url: string, title: string) => {
    const dualScreenLeft = window.screenLeft ?? window.screenX;
    const dualScreenTop = window.screenTop ?? window.screenY;

    const width =
      window.innerWidth ?? document.documentElement.clientWidth ?? screen.width;

    const height =
      window.innerHeight ??
      document.documentElement.clientHeight ??
      screen.height;

    const systemZoom = width / window.screen.availWidth;

    const left = (width - 500) / 2 / systemZoom + dualScreenLeft;
    const top = (height - 550) / 2 / systemZoom + dualScreenTop;

    const newWindow = window.open(
      url,
      title,
      `width=${500 / systemZoom},height=${
        550 / systemZoom
      },top=${top},left=${left}`
    );
  };

  useEffect(() => {
    const bc = new BroadcastChannel(BROADCAST_CHANNEL);
    bc.onmessage = (evt) => {
      console.log(evt);
      if (evt.data === GOOGLE_LOGIN_SUCCESS) {
        window.location.reload();
      }
    };
  }, []);

  return (
    <Button
      rounded
      className="flex"
      {...props}
      onClick={() => {
        popupCenter("/auth/google", "Sign in with Google");
      }}
    >
      <GoogleIcon />
      Sign in with Google
    </Button>
  );
};
