"use client";
import classNames from "classnames";
import { PropsWithChildren } from "react";

export const MultipleSeat = ({
  count,
  selected,
  onSelect,
  children,
  disabled = false,
  owned,
}: PropsWithChildren<{
  count: number;
  selected?: boolean;
  onSelect?: VoidFunction;
  disabled?: boolean;
  owned?: boolean;
}>) => {
  return (
    <div
      className={classNames(
        "rounded transition-all text-slate-100 flex items-center justify-center",
        `lg:min-h-10 lg:min-w-[88px]`,
        `min-h-8 min-w-[70px]`,
        {
          "bg-seat-multiple lg:hover:opacity-50":
            !(owned || selected) && !disabled,
          "lg:hover:bg-seat-normal-selected bg-seat-normal-selected owned":
            owned || selected,
          "cursor-pointer": !owned && !disabled,
          "bg-seat-disabled !text-seat-disabled": disabled,
          "cursor-not-allowed": owned || disabled,
        }
      )}
      onClick={owned || disabled ? undefined : onSelect}
    >
      {children}
    </div>
  );
};
