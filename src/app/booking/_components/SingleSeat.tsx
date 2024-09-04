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
        "rounded transition-all text-slate-100 flex items-center justify-center",
        "lg:min-w-10 lg:min-h-10",
        "min-w-8 min-h-8",
        {
          "lg:hover:opacity-50": !(owned || selected) && !disabled,
          //
          "bg-seat-normal":
            variant === "normal" && !(owned || selected) && !disabled,
          "bg-seat-normal-selected":
            variant === "normal" && (owned || selected) && !disabled,
          //
          "bg-seat-vip": variant === "vip" && !(owned || selected) && !disabled,
          "bg-seat-vip-selected":
            variant === "vip" && (owned || selected) && !disabled,
          //
          "cursor-pointer": !owned && !disabled,
          "bg-seat-disabled !text-seat-disabled": disabled,
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
