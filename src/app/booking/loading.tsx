import React from "react";

export default function Loading({ children }: React.PropsWithChildren) {
  return (
    <div className="absolute inset-0 opacity-30 bg-neutral-100">{children}</div>
  );
}
