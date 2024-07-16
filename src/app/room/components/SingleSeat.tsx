"use client";
import classNames from "classnames";
import { PropsWithChildren } from "react";

export const SingleSeat = ({
  selected,
  onSelect,
  variant = "default",
  children,
  className,
  disabled = false,
}: PropsWithChildren<{
  selected?: boolean;
  onSelect?: VoidFunction;
  variant?: "default" | "vip";
  className?: string;
  disabled?: boolean;
}>) => {
  return (
    <div
      className={classNames(
        "border-2 border-solid border-stone-300 rounded w-8 h-8 cursor-pointer transition-all",
        {
          "hover:bg-opacity-30": !selected && !disabled,
          //
          "bg-cyan-500 !border-cyan-500": selected && variant === "default",
          "hover:bg-cyan-500 hover:border-cyan-500 text-stone-300 hover:text-cyan-500":
            !selected && variant === "default" && !disabled,
          //
          "!border-yellow-500 text-yellow-500": variant === "vip",
          "bg-yellow-500": selected && variant === "vip",
          "hover:bg-yellow-500": !selected && variant === "vip" && !disabled,
          //
          "!text-white": selected,
          //
          "border-stone-300 bg-stone-300 text-stone-300 cursor-not-allowed":
            disabled,
        },
        className
      )}
      onClick={disabled ? undefined : onSelect}
    >
      {children}
    </div>
  );
};
