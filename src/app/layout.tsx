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
