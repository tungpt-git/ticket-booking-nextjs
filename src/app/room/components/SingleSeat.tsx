"use client";
import classNames from "classnames";
import { PropsWithChildren } from "react";

export const SingleSeat = ({
  selected,
  onSelect,
  variant = "normal",
  children,
  className,
  disabled = false,
}: PropsWithChildren<{
  selected?: boolean;
  onSelect?: VoidFunction;
  variant?: "normal" | "vip";
  className?: string;
  disabled?: boolean;
}>) => {
  return (
    <div
      className={classNames(
        "border-2 border-solid border-neutral rounded w-8 h-8 cursor-pointer transition-all",
        {
          "hover:bg-opacity-30": !selected && !disabled,
          //
          "bg-primary !border-primary": selected && variant === "normal",
          "hover:bg-primary hover:border-primary text-neutral hover:text-primary":
            !selected && variant === "normal" && !disabled,
          //
          "!border-warning text-warning": variant === "vip",
          "bg-warning": selected && variant === "vip",
          "hover:bg-warning": !selected && variant === "vip" && !disabled,
          //
          "!text-white": selected,
          //
          "border-neutral bg-neutral text-neutral cursor-not-allowed": disabled,
        },
        className
      )}
      onClick={disabled ? undefined : onSelect}
    >
      {children}
    </div>
  );
};
