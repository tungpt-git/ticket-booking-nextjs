import groupBy from "lodash-es/groupBy";
import { bookingSeats } from "../apis/booking/booking-seats";
import { TSeatService } from "../port";
import { labelLookup, TSeat } from "@/core/seat/types";
import { calcBillTotal } from "@/core/seat/price";

export const booking: TSeatService["booking"] = async (
  seats,
  user,
  bill,
  { popcorn, drink, combo }
) => {
  if (!seats.length) return;

  const seatGroupedByType = groupBy(seats, "type");

  const seatPlainText = Object.keys(seatGroupedByType)
    .map(
      (type) =>
        `${labelLookup[type as TSeat["type"]]} x${
          seatGroupedByType[type].length
        }`
    )
    .join(", ");

  const notes = `${seatPlainText}`;
  const res = await bookingSeats({
    name: user.name,
    email: user.email,
    phone: user.phone,
    count: seats.length,
    seatLabels: seats.map((seat) => seat.id).join("\n"),
    notes,
    bill,
    total: calcBillTotal({ seats, popcorn, drink, combo }),
    popcorn,
    drink,
    combo,
  });
  console.log("res", res);
};
