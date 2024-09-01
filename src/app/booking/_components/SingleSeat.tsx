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
        "border-2 border-solid border-seat-normal rounded transition-all",
        "min-w-10 min-h-10",
        {
          "hover:opacity-50": !(owned || selected) && !disabled,
          //
          "bg-seat-normal-selected !border-seat-normal-selected":
            (owned || selected) && variant === "normal" && !disabled,
          "bg-seat-normal text-white hover:bg-seat-normal-selected hover:border-seat-normal-selected":
            !(owned || selected) && variant === "normal" && !disabled,
          //
          "border-seat-vip text-seat-vip": variant === "vip" && !disabled,
          "border-seat-vip-selected bg-seat-vip-selected":
            (owned || selected) && variant === "vip",
          "hover:bg-seat-vip":
            !(owned || selected) && variant === "vip" && !disabled,
          //
          "!text-white": owned || selected,
          //
          "cursor-pointer": !owned && !disabled,
          "border-seat-normal bg-seat-normal text-seat-normal": disabled,
          "cursor-not-allowed opacity-30": owned || disabled,
        },
        className
      )}
      onClick={owned || disabled ? undefined : onSelect}
    >
      {children}
    </div>
  );
};
