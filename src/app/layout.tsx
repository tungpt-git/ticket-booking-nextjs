import "./globals.css";

import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "FRIENDS OFFLINE 2024 TICKET BOOKING",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <nav className="navbar flex gap-2 w-full justify-end lg:px-12 shadow-sm">
          <a
            href="https://www.facebook.com/profile.php?id=61562681930401"
            className="text-2xl"
            target="_blank"
          >
            <svg
              viewBox="64 64 896 896"
              focusable="false"
              data-icon="facebook"
              width="1em"
              height="1em"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-92.4 233.5h-63.9c-50.1 0-59.8 23.8-59.8 58.8v77.1h119.6l-15.6 120.7h-104V912H539.2V602.2H434.9V481.4h104.3v-89c0-103.3 63.1-159.6 155.3-159.6 44.2 0 82.1 3.3 93.2 4.8v107.9z"></path>
            </svg>
          </a>
        </nav>
        {children}
        <Toaster
          position="bottom-left"
          toastOptions={{
            style: { borderRadius: 4 },
          }}
        />
      </body>
    </html>
  );
}
