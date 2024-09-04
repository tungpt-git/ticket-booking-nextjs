import { PropsWithChildren } from "react";

export const SeatLabel = ({ children }: PropsWithChildren) => (
  <div className="text-xs text-center font-medium">{children}</div>
);
