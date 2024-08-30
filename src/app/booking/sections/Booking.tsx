"use client";
import React, { useEffect, useState } from "react";
//
import { type TSeat } from "@/core/seat/types";
import { TUser } from "@/core/user/type";
//
import { Room } from "./Room";
import { Payment } from "./Payment";
//
import { useReservation } from "@/adapters/client/useReservation";

type Props = Pick<React.ComponentProps<typeof Room>, "seats"> & {
  bookedSeats?: Array<TSeat & { user?: TUser }>;
};

export function Booking({ bookedSeats: _bookedSeats = [], seats }: Props) {
  //
  const [bookedSeats, setBookedSeats] = useState(_bookedSeats);
  const [previewType, setPreviewType] = useState<TSeat["type"] | null>(null);
  const [selectedSeat, setSelectedSeat] = useState<TSeat[]>([]);

  const { reservation, loading: reservationLoading } = useReservation();

  useEffect(
    function sync() {
      setBookedSeats(bookedSeats);
    },
    [bookedSeats]
  );

  return (
    <section
      id="_seats"
      className="flex flex-col items-center gap-12 p-6 lg:pt-48"
    >
      <div className="lg:flex lg:gap-12 lg:items-start">
        <Room
          seats={seats}
          bookedSeats={bookedSeats.filter(
            (seat) => !selectedSeat.some((selected) => selected.id === seat.id)
          )}
          selectedSeat={selectedSeat}
          setSelectedSeat={setSelectedSeat}
          previewType={previewType}
        />

        <Payment
          loading={reservationLoading}
          selectedSeat={selectedSeat}
          setPreviewType={setPreviewType}
          onPayment={() => {
            if (!selectedSeat.length) return;
            reservation(selectedSeat.map((seat) => seat.id));
          }}
        />
      </div>
    </section>
  );
}
