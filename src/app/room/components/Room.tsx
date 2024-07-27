"use client";
import React, { Fragment, useState } from "react";
import { SeatLabel } from "./SeatLabel";
import { SingleSeat } from "./SingleSeat";
import { MultipleSeat } from "./MultipleSeat";
import { PlaceHolderSeat } from "./PlaceHolderSeat";
import {
  fullCoupleSeatRow,
  fullSingleSeatRow,
} from "@/core/helpers/generateSeats";
import { TSeat } from "@/core/seat/types";
import groupBy from "lodash-es/groupBy";
import Button from "@/app/components/Button";
import { Card } from "flowbite-react";
import { orderBy } from "lodash-es";

const slotCount = 17;

const allSeats = {
  ...fullSingleSeatRow({
    rowName: "A",
    seatIndex: Array.from({ length: slotCount }).map((_, idx) => idx),
  }),
  ...fullSingleSeatRow({
    rowName: "B",
    seatIndex: Array.from({ length: slotCount }).map((_, idx) => idx),
  }),
  ...fullSingleSeatRow({
    rowName: "C",
    seatIndex: Array.from({ length: slotCount }).map((_, idx) => idx),
  }),
  ...fullSingleSeatRow({
    rowName: "D",
    seatIndex: Array.from({ length: slotCount }).map((_, idx) => idx),
  }),
  ...fullSingleSeatRow({
    rowName: "E",
    seatIndex: Array.from({ length: slotCount }).map((_, idx) => idx),
    vipIndex: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),
  ...fullSingleSeatRow({
    rowName: "F",
    seatIndex: Array.from({ length: slotCount }).map((_, idx) => idx),
    vipIndex: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),
  ...fullSingleSeatRow({
    rowName: "G",
    seatIndex: Array.from({ length: slotCount }).map((_, idx) => idx),
    vipIndex: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),
  ...fullSingleSeatRow({
    rowName: "H",
    seatIndex: Array.from({ length: slotCount }).map((_, idx) => idx),
    vipIndex: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),
  ...fullCoupleSeatRow({
    rowName: "I",
    seatIndex: [1, 3, 5, 7, 9, 11, 13],
    placeholderIndexes: [0, 15, 16],
  }),
};

export function Room() {
  const rows = groupBy(allSeats, (x) => x.rowName);
  console.log(rows);

  const [previewType, setPreviewType] = useState<TSeat["type"] | null>(null);
  const disabledSeat: TSeat["id"][] = ["A1", "I1,2"];
  const [selectedSeat, setSelectedSeat] = useState<TSeat[]>([]);
  const ownedSeat = ["A17"];

  const isSelectedSeat = (seat: TSeat) =>
    selectedSeat.some((el) => el.id === seat.id);

  const onSelect = (seat: TSeat) => {
    setSelectedSeat((prev) =>
      isSelectedSeat(seat)
        ? prev.filter((el) => el.id !== seat.id)
        : [...prev, seat]
    );
  };
  const seatGroupByType = groupBy(selectedSeat, (el) => el.type);

  return (
    <main>
      <section
        id="_seats"
        className="flex min-h-screen flex-col items-center gap-2 p-24"
      >
        <div className="flex gap-12">
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
                        selected={
                          (!previewType || previewType === seat.type) &&
                          isSelectedSeat(seat)
                        }
                        onSelect={() => onSelect(seat)}
                        disabled={disabledSeat.includes(seat.id)}
                        owned={ownedSeat.includes(seat.id)}
                      />
                    );
                  })}
                </div>
              </Fragment>
            ))}
          </div>
          <Card className="w-[400px] bg-gray-50">
            <div className="h-full">
              <h3 className="text-xl font-medium uppercase mb-2">
                Thông tin vé
              </h3>
              {Object.keys(seatGroupByType).map((type) => {
                return (
                  <PaymentInfo
                    key={type}
                    type={type as TSeat["type"]}
                    count={seatGroupByType[type].length}
                    seats={seatGroupByType[type]}
                    onMouseEnter={() => {
                      setPreviewType(type as TSeat["type"]);
                    }}
                    onMouseLeave={() => {
                      setPreviewType(null);
                    }}
                  />
                );
              })}
            </div>
            <Button rounded className="w-full mt-auto">
              Thanh toán
            </Button>
          </Card>
        </div>
      </section>
    </main>
  );
}

const PaymentInfo = ({
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
  const labelLookup: Partial<Record<TSeat["type"], string>> = {
    normal: "Ghế thường",
    vip: "Ghế Vip",
    multiple: "Ghế đôi",
  };

  const typeLabel = labelLookup[type];
  const seatLabel = seats.map((el) => el.name).join(", ");

  return (
    <div
      className="flex justify-between items-center border-b p-2 -mx-2 rounded cursor-pointer hover:bg-gray-300/30 hover:border-b-0"
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
      <div className="flex justify-between ">210.000 VNĐ</div>
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
