import groupBy from "lodash-es/groupBy";
import { bookingSeats } from "../apis/seat/booking-seats";
import { TSeatService } from "../port";
import { labelLookup, TSeat } from "@/core/seat/types";

export const booking: TSeatService["booking"] = async (seats, user, bill) => {
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
    name: user.name,
    email: user.email,
    phone: user.phone,
    count: seats.length,
    seatLabels: seats.map((seat) => seat.id).join(" - "),
    notes,
    bill,
  });
};
