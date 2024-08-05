import { Room } from "./_components/Room";
import { type ReactElement } from "react";
import { TSeat } from "@/core/seat/types";
import { seatSevices } from "@/services/seats";

const onPayment = async (seats: TSeat[]) => {
  "use server";
  seatSevices.booking(seats);
};

export default async function Home(): Promise<ReactElement> {
  const bookedSeats = await seatSevices.getAllBooking();
  return <Room onPayment={onPayment} bookedSeats={bookedSeats} />;
}
