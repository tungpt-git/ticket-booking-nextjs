import { TSeat } from "@/core/seat/types";
import { bookingSeats } from "../apis/seat/bookingSeats";
import { groupBy } from "lodash-es";

export type TSeatService = {
  booking(seats: TSeat[]): Promise<void>;
};

export const booking: TSeatService["booking"] = async (seats) => {
  if (!seats.length) return;

  const seatGroupedByType = groupBy(seats, "type");

  const notes = JSON.stringify(
    Object.keys(seatGroupedByType).map((type) => ({
      [type]: seatGroupedByType[type].length,
    }))
  );

  await bookingSeats({
    name: "John Doe",
    email: "john.doe@gmail.com",
    phone: "0986984353",
    count: seats.length,
    seatLabels: seats.map((seat) => seat.name).join(" | "),
    notes,
  });
};

export function useSeatService(): TSeatService {
  return {
    booking,
  };
}
