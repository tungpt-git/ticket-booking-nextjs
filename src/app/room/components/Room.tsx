"use client";
import { Fragment, useState } from "react";
import { SeatLabel } from "./SeatLabel";
import { SingleSeat } from "./SingleSeat";
import { MultipleSeat } from "./MultipleSeat";
import { PlaceHolderSeat } from "./PlaceHolderSeat";
import {
  fullCoupleSeatRow,
  fullSingleSeatRow,
} from "@/core/seat/helpers/generateSeats";
import { Seat } from "@/core/seat/types";

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
  const [selectedSeat, setSelectedSeat] = useState<Seat["id"][]>([]);
  const onSelect = (id: string) => {
    setSelectedSeat((prev) =>
      prev.includes(id) ? prev.filter((el) => el !== id) : [...prev, id]
    );
  };
  console.log(selectedSeat);

  return (
    <main>
      <section id="_screen">
        <div className="bg-cyan-500 shadow-lg shadow-cyan-500/50 text-white font-semibold h-3 text-center leading-2"></div>
      </section>
      <section
        id="_seats"
        className="flex min-h-screen flex-col items-center gap-2 p-24"
      >
        {rows.map((row) => (
          <div className="flex gap-10" key={row.name}>
            <div className="w-8 text-center leading-7">{row.name}</div>

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
                        selected={selectedSeat.includes(seat.id)}
                        onSelect={() => onSelect(seat.id)}
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
                      selected={selectedSeat.includes(seat.id)}
                      onSelect={() => onSelect(seat.id)}
                      variant={seat.isVip ? "vip" : undefined}
                      disabled={disabledSeat.includes(seat.id)}
                    >
                      <SeatLabel>{seat.id}</SeatLabel>
                    </SingleSeat>
                  </Fragment>
                );
              })}
            </div>
            <div className="w-8 text-center leading-7">{row.name}</div>
          </div>
        ))}
      </section>
    </main>
  );
}
