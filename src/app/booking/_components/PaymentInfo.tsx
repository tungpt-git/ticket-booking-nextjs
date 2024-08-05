"use client";
import React from "react";
import { labelLookup, TSeat } from "@/core/seat/types";
import { formatPrice, getSeatPrice } from "@/core/seat/price";

export const PaymentInfo = ({
  count,
  type,
  seats,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: {
  count: number;
  type: TSeat["type"];
  seats: TSeat[];
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
}) => {
  const typeLabel = labelLookup[type];
  const seatLabel = seats.map((el) => el.name).join(", ");

  return (
    <div
      className="flex justify-between items-center border-b p-2 -mx-2 rounded cursor-pointer hover:bg-gray-300/30 hover:border-b-transparent"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div>
        <div>
          {count}x {typeLabel}
        </div>
        <div
          className="text-ellipsis overflow-hidden whitespace-nowrap max-w-[230px] text-sm text-neutral-500"
          title={seatLabel}
        >
          {seatLabel}
        </div>
      </div>
      <div className="flex justify-between ">
        {formatPrice(count * getSeatPrice({ type }))}
      </div>
    </div>
  );
};
