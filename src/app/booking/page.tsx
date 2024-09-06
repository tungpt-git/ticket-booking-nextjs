export const revalidate = 120;
import React, { type ReactElement } from "react";

import { seatService } from "@/services/seats";
import { getAll } from "@/services/apis/seat/get-all";
import { getAll as getAllReservation } from "@/services/apis/reservation/get-all";

import { Booking } from "./sections/Booking";
import { TSeat } from "@/core/seat/types";

export default async function BookingPage(): Promise<ReactElement> {
  const bookedSeats = await seatService.getAllBooking();
  const seats = await getAll();
  const reservation = await getAllReservation();

  const reservationSeats = reservation.reduce((acc, cur) => {
    return [...acc, ...cur.seatIds.map((id) => seats[id])];
  }, [] as TSeat[]);

  return (
    <main>
      <Booking
        bookedSeats={[...bookedSeats, ...reservationSeats]}
        seats={seats}
      />
    </main>
  );
}
