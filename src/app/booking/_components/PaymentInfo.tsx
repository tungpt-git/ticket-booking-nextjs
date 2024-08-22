"use client";
import React from "react";

export const PaymentInfo = ({
  count,
  onClick,
  onMouseEnter,
  onMouseLeave,
  label,
  description,
  price,
}: {
  count: number;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
  label: string;
  description?: string;
  price: string;
}) => {
  return (
    <div
      className="flex justify-between items-center border-b p-2 -mx-2 rounded cursor-pointer hover:bg-gray-300/30 hover:border-transparent"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div>
        <div>
          {count}x {label}
        </div>
        {!!description && (
          <div
            className="text-ellipsis overflow-hidden whitespace-nowrap max-w-[230px] text-sm text-neutral-500"
            title={description}
          >
            {description}
          </div>
        )}
      </div>
      <div className="flex justify-between ">{price}</div>
    </div>
  );
};
