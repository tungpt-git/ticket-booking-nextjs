"use client";
import React, { Fragment, useState } from "react";
import { useSession } from "next-auth/react";
//
import groupBy from "lodash-es/groupBy";
import orderBy from "lodash-es/orderBy";
//
import { SeatLabel } from "../_components/SeatLabel";
import { SingleSeat } from "../_components/SingleSeat";
import { MultipleSeat } from "../_components/MultipleSeat";
import { PlaceHolderSeat } from "../_components/PlaceHolderSeat";
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
  const { data: session } = useSession();
  const currentUser = session?.user?.email ?? "";
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
      <div className="text-center text-2xl mb-4 animate-bounce">
        <span className="inline-block">🍿🍿</span>
        {" ĐÂY LÀ MÀN HÌNH "}
        <span className="inline-block">🍿🍿</span>
      </div>
      <div className="flex flex-col items-center gap-1 lg:gap-2 lg:p-6">
        {Object.keys(rows).map((row) => (
          <Fragment key={row}>
            <div className="flex items-center gap-1 lg:gap-2 justify-between">
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
      <Legends />
    </div>
  );
}

const Legends = () => {
  return (
    <div className="flex gap-6 mt-2">
      <div>
        <div className="flex gap-1">
          <SeatLengend type="normal">
            <span className="text-[10px]">A</span>
          </SeatLengend>
          <SeatLengend type="normal" showLabel label="Ghế 120k">
            <span className="text-[10px]">B</span>
          </SeatLengend>
        </div>
        <SeatLengend type="normal" showLabel label="Ghế thường" />
        <SeatLengend type="multiple" showLabel label="Ghế đôi" />
      </div>
      <div>
        <SeatLengend type="normal" selected showLabel label="Ghế được chọn" />
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
  if (seat.type === "placeholder") return <PlaceHolderSeat key={seat.id} />;

  if (Array.isArray(seat.idx) && seat.idx.length > 1) {
    return (
      <Fragment key={seat.id}>
        <MultipleSeat
          count={seat.idx.length}
          selected={selected}
          onSelect={onSelect}
          disabled={disabled}
          owned={owned}
        >
          <SeatLabel>{seat.name}</SeatLabel>
        </MultipleSeat>
      </Fragment>
    );
  }

  return (
    <Fragment key={seat.id}>
      <SingleSeat
        selected={selected}
        onSelect={onSelect}
        variant={seat.type}
        disabled={disabled}
        owned={owned}
      >
        <SeatLabel>{seat.name}</SeatLabel>
      </SingleSeat>
    </Fragment>
  );
};
