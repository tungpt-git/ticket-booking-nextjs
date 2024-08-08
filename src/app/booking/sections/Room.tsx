"use client";
import React, { Fragment } from "react";
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
import { allSeats, slotCount } from "@/core/seat";
import { TUser } from "@/core/user/type";
import { useSession } from "next-auth/react";
//

const rows = groupBy(allSeats, (x) => x.rowName);

type Props = {
  bookedSeats?: Array<TSeat & { user: TUser }>;
  previewType?: TSeat["type"] | null;
  selectedSeat: TSeat[];
  setSelectedSeat: React.Dispatch<React.SetStateAction<TSeat[]>>;
};

export function Room({
  bookedSeats = [],
  previewType,
  selectedSeat,
  setSelectedSeat,
}: Props) {
  const { data: session } = useSession();
  const currentUser = session?.user?.email ?? "";
  //
  const disabledSeat = bookedSeats
    .filter((seat) => seat.user.email !== currentUser)
    ?.map((seat) => seat.id);

  const ownedSeat = bookedSeats
    .filter((seat) => seat.user.email === currentUser)
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
      <div className="flex flex-col items-center gap-2 self-center p-6">
        {Object.keys(rows).map((row) => (
          <Fragment key={row}>
            <div className="flex items-center gap-2 justify-between">
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
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          {(["normal", "vip", "multiple"] as TSeat["type"][]).map((type) => (
            <SeatLengend key={type} type={type} showLabel />
          ))}
        </div>
        <SeatLengend type={"normal"} selected showLabel label="Ghế đang chọn" />
        <SeatLengend type={"normal"} disabled showLabel label="Ghế đã bán" />
        <SeatLengend type={"normal"} owned showLabel label="Ghế đã sở hữu" />
      </div>
    </div>
  );
}

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
