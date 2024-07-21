"use client";
import { Fragment, PropsWithChildren, useState } from "react";
import { SeatLabel } from "./SeatLabel";
import { SingleSeat } from "./SingleSeat";
import { MultipleSeat } from "./MultipleSeat";
import { PlaceHolderSeat } from "./PlaceHolderSeat";
import {
  fullCoupleSeatRow,
  fullSingleSeatRow,
} from "@/core/seat/helpers/generateSeats";
import { Seat } from "@/core/seat/types";
import classNames from "classnames";
import groupBy from "lodash-es/groupBy";

const slotCount = 17;

export function Room() {
  const rows = [
    {
      name: "A",
      seats: fullSingleSeatRow({
        rowName: "A",
        seatIndex: Array.from({ length: slotCount }).map((_, idx) => idx),
      }),
    },
    {
      name: "B",
      seats: fullSingleSeatRow({
        rowName: "B",
        seatIndex: Array.from({ length: slotCount }).map((_, idx) => idx),
      }),
    },
    {
      name: "C",
      seats: fullSingleSeatRow({
        rowName: "C",
        seatIndex: Array.from({ length: slotCount }).map((_, idx) => idx),
      }),
    },
    {
      name: "D",
      seats: fullSingleSeatRow({
        rowName: "D",
        seatIndex: Array.from({ length: slotCount }).map((_, idx) => idx),
      }),
    },
    {
      name: "E",
      seats: fullSingleSeatRow({
        rowName: "E",
        seatIndex: Array.from({ length: slotCount }).map((_, idx) => idx),
        vipIndex: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
      }),
    },
    {
      name: "F",
      seats: fullSingleSeatRow({
        rowName: "F",
        seatIndex: Array.from({ length: slotCount }).map((_, idx) => idx),
        vipIndex: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
      }),
    },
    {
      name: "G",
      seats: fullSingleSeatRow({
        rowName: "G",
        seatIndex: Array.from({ length: slotCount }).map((_, idx) => idx),
        vipIndex: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
      }),
    },
    {
      name: "H",
      seats: fullSingleSeatRow({
        rowName: "H",
        seatIndex: Array.from({ length: slotCount }).map((_, idx) => idx),
        vipIndex: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
      }),
    },
    {
      name: "I",
      seats: fullCoupleSeatRow({
        rowName: "I",
        seatIndex: [1, 3, 5, 7, 9, 11, 13],
        placeholderIndexes: [0, 15, 16],
      }),
    },
  ];

  const [disabledSeat] = useState<Seat["id"][]>(["A1", "I1,2"]);
  const [selectedSeat, setSelectedSeat] = useState<Seat[]>([]);

  const isSelectedSeat = (seat: Seat) =>
    selectedSeat.some((el) => el.id === seat.id);

  const onSelect = (seat: Seat) => {
    setSelectedSeat((prev) =>
      isSelectedSeat(seat)
        ? prev.filter((el) => el.id !== seat.id)
        : [...prev, seat]
    );
  };
  console.log(selectedSeat);
  const seatGroupByType = groupBy(selectedSeat, (el) => el.type);

  return (
    <main>
      <section
        id="_seats"
        className="flex min-h-screen flex-col items-center gap-2 p-24"
      >
        <Card className="flex gap-10 px-12">
          <div className="flex flex-col items-center gap-2 py-12">
            {rows.map((row) => (
              <Fragment key={row.name}>
                <div className="flex items-center gap-2 justify-between">
                  {Array.from({ length: slotCount }).map((_, idx) => {
                    const seat = row.seats[idx];
                    if (!seat) return null;
                    if (seat.isPlaceholder)
                      return <PlaceHolderSeat key={seat.id} />;

                    if (Array.isArray(seat.idx) && seat.idx.length > 1) {
                      return (
                        <Fragment key={seat.id}>
                          <MultipleSeat
                            count={seat.idx.length}
                            selected={isSelectedSeat(seat)}
                            onSelect={() => onSelect(seat)}
                            disabled={disabledSeat.includes(seat.id)}
                          >
                            <SeatLabel>{seat.id}</SeatLabel>
                          </MultipleSeat>
                        </Fragment>
                      );
                    }

                    return (
                      <Fragment key={seat.id}>
                        <SingleSeat
                          selected={isSelectedSeat(seat)}
                          onSelect={() => onSelect(seat)}
                          variant={seat.type}
                          disabled={disabledSeat.includes(seat.id)}
                        >
                          <SeatLabel>{seat.id}</SeatLabel>
                        </SingleSeat>
                      </Fragment>
                    );
                  })}
                </div>
              </Fragment>
            ))}
          </div>
          <div className="h-auto border-dashed flex flex-col gap-6 overflow-hidden">
            {Array.from({ length: 10 }).map((_, idx) => (
              <div key={idx} className="h-6 border-l-2 border-neutral" />
            ))}
          </div>
          <div className="py-10 w-[300px]">
            <h3 className="text-xl font-medium uppercase mb-2">Thông tin vé</h3>
            {selectedSeat.map((seat) => (
              <TicketSeat key={seat.id} seat={seat} />
            ))}
          </div>
        </Card>
      </section>
    </main>
  );
}

const TicketSeat = ({ seat }: { seat: Seat }) => {
  const seatLabel = {
    normal: "Ghế thường",
    vip: "Ghế Vip",
  }[seat.type];

  return (
    <div className="flex justify-between items-center" key={seat.id}>
      <div>
        <div>2x {seatLabel}</div>
        <div>F12, F13</div>
      </div>
      <div className="flex justify-between">210.000 VND</div>
    </div>
  );
};

const Card = ({
  children,
  className,
}: PropsWithChildren & { className?: string }) => (
  <div
    className={classNames(
      "shadow-xl shadow-black/5 ring-1 ring-slate-700/10 rounded-lg",
      className
    )}
  >
    {children}
  </div>
);
