"use client";
import classNames from "classnames";
import { PropsWithChildren } from "react";

export const MultipleSeat = ({
  count,
  selected,
  onSelect,
  children,
  disabled = false,
}: PropsWithChildren<{
  count: number;
  selected?: boolean;
  onSelect?: VoidFunction;
  disabled?: boolean;
}>) => {
  return (
    <div
      style={{
        width: (9 + 9 + 10 * (count - 2)) * 4,
      }}
      className={classNames(
        "border-2 border-solid h-8 cursor-pointer rounded transition-all",
        {
          "hover:bg-fuchsia-500 border-fuchsia-500": !disabled,
          "hover:bg-opacity-30 text-fuchsia-500": !selected && !disabled,
          "bg-fuchsia-500 text-white": selected && !disabled,
          "border-stone-300 bg-stone-300 text-stone-300 cursor-not-allowed":
            disabled,
        }
      )}
      onClick={disabled ? undefined : onSelect}
    >
      {children}
    </div>
  );
};
