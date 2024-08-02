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
        "border-2 border-solid border-neutral-500 rounded w-10 h-10 transition-all",
        {
          "hover:bg-opacity-30": !(owned || selected) && !disabled,
          //
          "bg-primary !border-primary":
            (owned || selected) && variant === "normal" && !disabled,
          "hover:bg-primary hover:border-primary text-neutral-500 hover:text-primary":
            !(owned || selected) && variant === "normal" && !disabled,
          //
          "!border-warning text-warning": variant === "vip" && !disabled,
          "bg-warning": (owned || selected) && variant === "vip",
          "hover:bg-warning":
            !(owned || selected) && variant === "vip" && !disabled,
          //
          "!text-white": owned || selected,
          //
          "cursor-pointer": !owned && !disabled,
          "border-neutral-500 bg-neutral-500 text-neutral-500": disabled,
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
