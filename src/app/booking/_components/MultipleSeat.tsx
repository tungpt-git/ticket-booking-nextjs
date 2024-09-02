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
        "border-2 border-solid rounded transition-all text-slate-100",
        `min-h-10 min-w-[88px]`,
        {
          "bg-seat-multiple border-seat-multiple hover:opacity-50":
            !(owned || selected) && !disabled,
          "border-seat-normal-selected hover:bg-seat-normal-selected bg-seat-normal-selected owned":
            owned || selected,
          "cursor-pointer": !owned && !disabled,
          "border-seat-disabled bg-seat-disabled text-seat-disabled": disabled,
          "cursor-not-allowed": owned || disabled,
        }
      )}
      onClick={owned || disabled ? undefined : onSelect}
    >
      {children}
    </div>
  );
};
