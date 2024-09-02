"use client";
import { TSeat } from "@/core/seat/types";
import classNames from "classnames";
import { PropsWithChildren } from "react";

export const SingleSeat = ({
  selected,
  onSelect,
  variant = "normal",
  children,
  className,
  disabled = false,
  owned,
}: PropsWithChildren<{
  selected?: boolean;
  onSelect?: VoidFunction;
  variant?: TSeat["type"];
  className?: string;
  disabled?: boolean;
  owned?: boolean;
}>) => {
  return (
    <div
      className={classNames(
        "border-2 border-solid border-seat-normal rounded transition-all text-slate-100",
        "min-w-10 min-h-10",
        {
          "hover:opacity-50": !(owned || selected) && !disabled,
          //
          "bg-seat-normal-selected !border-seat-normal-selected":
            (owned || selected) && variant === "normal" && !disabled,
          "bg-seat-normal hover:bg-seat-normal-selected hover:border-seat-normal-selected":
            !(owned || selected) && variant === "normal" && !disabled,
          //
          "bg-seat-vip border-seat-vip": variant === "vip" && !disabled,
          "bg-seat-vip border-seat-vip-selected bg-seat-vip-selected":
            (owned || selected) && variant === "vip" && !disabled,
          "hover:bg-seat-vip":
            !(owned || selected) && variant === "vip" && !disabled,
          //
          "cursor-pointer": !owned && !disabled,
          "!border-seat-disabled bg-seat-disabled !text-seat-disabled":
            disabled,
          "cursor-not-allowed": owned || disabled,
        },
        className
      )}
      onClick={owned || disabled ? undefined : onSelect}
    >
      {children}
    </div>
  );
};
