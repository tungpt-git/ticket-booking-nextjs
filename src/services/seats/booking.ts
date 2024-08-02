import groupBy from "lodash-es/groupBy";
import { bookingSeats } from "../apis/seat/bookingSeats";
import { TSeatService } from "../port";
import { labelLookup, TSeat } from "@/core/seat/types";

export const booking: TSeatService["booking"] = async (seats) => {
  if (!seats.length) return;

  const seatGroupedByType = groupBy(seats, "type");

  const notes = Object.keys(seatGroupedByType)
    .map(
      (type) =>
        `${labelLookup[type as TSeat["type"]]} x${
          seatGroupedByType[type].length
        }`
    )
    .join(", ");

  await bookingSeats({
    name: "John Doe",
    email: "john.doe@gmail.com",
    phone: "0986984353",
    count: seats.length,
    seatLabels: seats.map((seat) => seat.name).join(", "),
    notes,
  });
};
