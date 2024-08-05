import { Room } from "./_components/Room";
import { type ReactElement } from "react";
import { TSeat } from "@/core/seat/types";
import { seatSevices } from "@/services/seats";
import { revalidateTag } from "next/cache";
import { GET_ALL_BOOKINGS } from "@/services/apis/seat/get-all-booking";

const onPayment = async (seats: TSeat[]) => {
  "use server";
  await seatSevices.booking(seats);
  revalidateTag(GET_ALL_BOOKINGS);
};

export default async function BooingPage(): Promise<ReactElement> {
  const bookedSeats = await seatSevices.getAllBooking();

  return <Room onPayment={onPayment} bookedSeats={bookedSeats} />;
}
