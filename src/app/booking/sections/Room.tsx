"use client";
import React, { Fragment } from "react";
import classNames from "classnames";
//
import groupBy from "lodash-es/groupBy";
import orderBy from "lodash-es/orderBy";
//
import { SeatLabel } from "../_components/SeatLabel";
import { SingleSeat } from "../_components/SingleSeat";
import { MultipleSeat } from "../_components/MultipleSeat";
import { SeatLengend } from "../_components/SeatLengend";
//
import { type TSeat } from "@/core/seat/types";
import { slotCount } from "@/core/seat";
import { TUser } from "@/core/user/type";

type Props = {
  bookedSeats?: Array<TSeat & { user?: TUser }>;
  previewType?: TSeat["type"] | null;
  selectedSeat: TSeat[];
  setSelectedSeat: React.Dispatch<React.SetStateAction<TSeat[]>>;
  seats: Record<TSeat["id"], TSeat>;
};

export function Room({
  seats,
  bookedSeats = [],
  previewType,
  selectedSeat,
  setSelectedSeat,
}: Props) {
  const currentUser = "";
  //
  const rows = groupBy(seats, (x) => x.rowName);
  //
  const disabledSeat = bookedSeats
    .filter((seat) => !seat.user || seat.user?.email !== currentUser)
    ?.map((seat) => seat.id);

  const ownedSeat = bookedSeats
    .filter((seat) => seat.user && seat.user?.email === currentUser)
    .map((seat) => seat.id);

  const isSelectedSeat = (seat: TSeat) =>
    selectedSeat.some((el) => el.id === seat.id);

  const onSelect = (seat: TSeat) => {
    setSelectedSeat((prev) =>
      isSelectedSeat(seat)
        ? prev.filter((el) => el.id !== seat.id)
        : [...prev, seat]
    );
  };

  return (
    <div>
      <div className="text-center text-2xl pt-6">
        <span className="inline-block">🍿🍿</span>
        {" ĐÂY LÀ MÀN HÌNH "}
        <span className="inline-block">🍿🍿</span>
      </div>
      <div className="overflow-auto">
        <div className="flex flex-col gap-1 lg:gap-2 p-6 w-fit mx-auto">
          {Object.keys(rows).map((row) => (
            <Fragment key={row}>
              <div
                className={classNames("flex gap-1 lg:gap-2 justify-between", {
                  "mx-auto": rows[row].length < slotCount,
                })}
              >
                {Array.from({ length: slotCount }).map((_, idx) => {
                  const seat = orderBy(rows[row], (x) =>
                    Array.isArray(x.idx) ? x.idx[0] : x.idx
                  )[idx];
                  if (!seat) return null;
                  return (
                    <Seat
                      key={seat.id}
                      seat={seat}
                      selected={isSelectedSeat(seat)}
                      onSelect={() => onSelect(seat)}
                      disabled={disabledSeat.includes(seat.id)}
                      owned={
                        Boolean(
                          previewType &&
                            previewType !== seat.type &&
                            isSelectedSeat(seat)
                        ) || ownedSeat.includes(seat.id)
                      }
                    />
                  );
                })}
              </div>
            </Fragment>
          ))}
        </div>
      </div>
      <Legends />
    </div>
  );
}

const Legends = () => {
  return (
    <div className="flex gap-6 mt-2 px-3">
      <div>
        <SeatLengend type="vip" showLabel />
        <SeatLengend type="normal" showLabel />
        <SeatLengend type="multiple" showLabel />
      </div>
      <div>
        <SeatLengend type="normal" selected showLabel label="Ghế đang chọn" />
        <SeatLengend type="normal" disabled showLabel label="Ghế đã bán" />
      </div>
    </div>
  );
};

const Seat = ({
  seat,
  disabled,
  selected,
  owned,
  onSelect,
}: {
  seat: TSeat;
  disabled?: boolean;
  selected?: boolean;
  owned?: boolean;
  onSelect?: VoidFunction;
}) => {
  if (Array.isArray(seat.idx) && seat.idx.length > 1) {
    return (
      <MultipleSeat
        count={seat.idx.length}
        selected={selected}
        onSelect={onSelect}
        disabled={disabled}
        owned={owned}
      >
        <SeatLabel>{seat.name}</SeatLabel>
      </MultipleSeat>
    );
  }

  return (
    <SingleSeat
      selected={selected}
      onSelect={onSelect}
      variant={seat.type}
      disabled={disabled}
      owned={owned}
    >
      <SeatLabel>{seat.name}</SeatLabel>
    </SingleSeat>
  );
};
