import { labelLookup, TSeat } from "@/core/seat/types";
import classNames from "classnames";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  type: TSeat["type"];
  selected?: boolean;
  showLabel?: boolean;
  disabled?: boolean;
  label?: string;
  owned?: boolean;
}>;
export function SeatLengend({
  type,
  selected,
  showLabel = false,
  disabled,
  label = "",
  owned = false,
  children,
}: Props) {
  return (
    <div className="flex gap-1 items-center">
      <div
        className={classNames(
          "h-4 w-4 rounded border-2 flex items-center justify-center",
          {
            ...(disabled
              ? {
                  "border-seat-disabled bg-seat-disabled": true,
                }
              : {
                  "bg-seat-normal border-seat-normal": type === "normal",
                  "bg-seat-vip border-seat-vip": type === "vip",
                  "bg-seat-multiple border-seat-multiple": type === "multiple",
                }),
            ...(selected && {
              "border-seat-normal-selected bg-seat-normal-selected":
                type === "normal",
              "bg-seat-vip-selected": type === "vip",
              "bg-seat-multiple-selected": type === "multiple",
            }),
            "opacity-30 border-seat-normal-selected bg-seat-normal-selected":
              owned,
          }
        )}
      >
        {children}
      </div>
      {showLabel && (
        <span className="text-sm">{label || labelLookup[type]}</span>
      )}
    </div>
  );
}
