import "./globals.css";

import type { Metadata } from "next";
import { SessionWrapper } from "@/components";

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
        <SessionWrapper>{children}</SessionWrapper>
      </body>
    </html>
  );
}
