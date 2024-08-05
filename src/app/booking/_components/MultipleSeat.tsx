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
      style={{
        width: (22 + 10 * (count - 2)) * 4,
      }}
      className={classNames(
        "border-2 border-solid h-10 rounded transition-all",
        {
          "hover:bg-seat-multiple border-seat-multiple": !disabled,
          "hover:bg-opacity-30 text-seat-multiple":
            !(owned || selected) && !disabled,
          "border-seat-multiple-selected hover:bg-seat-multiple-selected bg-seat-multiple-selected text-white owned":
            owned || selected,
          "cursor-pointer": !owned && !disabled,
          "border-neutral-500 bg-neutral-500 text-neutral-500": disabled,
          "cursor-not-allowed opacity-30": owned || disabled,
        }
      )}
      onClick={owned || disabled ? undefined : onSelect}
    >
      {children}
    </div>
  );
};
