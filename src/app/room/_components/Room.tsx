"use client";
import React, { Fragment, useState } from "react";
import groupBy from "lodash-es/groupBy";
import orderBy from "lodash-es/orderBy";
import { Card } from "flowbite-react";
//
import { SeatLabel } from "./SeatLabel";
import { SingleSeat } from "./SingleSeat";
import { MultipleSeat } from "./MultipleSeat";
import { PlaceHolderSeat } from "./PlaceHolderSeat";
import { TotalPrice } from "./TotalPrice";
import { PaymentInfo } from "./PaymentInfo";
//
import { type TSeat } from "@/core/seat/types";
import { allSeats, slotCount } from "@/core/seat";
import { TUser } from "@/core/user/type";
//
import Button from "@/app/_components/Button";

const currentUser = "john.doe@gmail.com";

type Props = {
  onPayment?(selectedSeat: TSeat[]): void;
  bookedSeats?: Array<TSeat & { user: TUser }>;
};

export function Room({ onPayment, bookedSeats = [] }: Props) {
  const rows = groupBy(allSeats, (x) => x.rowName);

  const [previewType, setPreviewType] = useState<TSeat["type"] | null>(null);
  const [selectedSeat, setSelectedSeat] = useState<TSeat[]>([]);

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
  const seatGroupByType = groupBy(selectedSeat, (el) => el.type);

  const handlePayment = () => {
    onPayment?.(selectedSeat);
  };

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
              {selectedSeat.length > 0 && <TotalPrice seats={selectedSeat} />}
            </div>
            <Button rounded className="w-full mt-auto" onClick={handlePayment}>
              <span>Thanh toán</span>
            </Button>
          </Card>
        </div>
      </section>
    </main>
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
