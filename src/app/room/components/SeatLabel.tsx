import { PropsWithChildren } from "react";

export const SeatLabel = ({ children }: PropsWithChildren) => (
  <div className="text-xs text-center leading-7 font-medium">{children}</div>
);
