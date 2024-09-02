import groupBy from "lodash-es/groupBy";
import { bookingSeats } from "../apis/booking/booking-seats";
import { TSeatService } from "../port";
import { labelLookup, TSeat } from "@/core/seat/types";
import { calcBillTotal } from "@/core/seat/price";
import { sendBookingNotification } from "../email/booking-notification";

export const booking: TSeatService["booking"] = async (
  seats,
  user,
  bill,
  { popcorn, drink, combo }
) => {
  console.log("=== booking ===");
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
  const total = calcBillTotal({ seats, popcorn, drink, combo });
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

  sendBookingNotification({
    name: user.name,
    email: user.email,
    phone: user.phone,
    seats: seats.map((seat) => seat.id).join(" "),
    total,
    popcorn,
    drink,
    combo,
  });
  console.log("booking result: ", res);
};
