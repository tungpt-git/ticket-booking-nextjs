import { PropsWithChildren } from "react";

export const SeatLabel = ({ children }: PropsWithChildren) => (
  <div className="text-[8px] lg:text-xs text-center leading-4 lg:leading-9 font-medium">
    {children}
  </div>
);
