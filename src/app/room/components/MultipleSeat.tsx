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
          "hover:bg-secondary border-secondary": !disabled,
          "hover:bg-opacity-30 text-secondary":
            !(owned || selected) && !disabled,
          "bg-secondary text-white owned": owned || selected,
          "cursor-pointer": !owned && !disabled,
          "border-neutral bg-neutral text-neutral": disabled,
          "cursor-not-allowed opacity-30": owned || disabled,
        }
      )}
      onClick={owned || disabled ? undefined : onSelect}
    >
      {children}
    </div>
  );
};
