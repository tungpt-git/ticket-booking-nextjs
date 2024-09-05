import groupBy from "lodash-es/groupBy";
import { bookingSeats } from "../apis/booking/booking-seats";
import { TSeatService } from "../port";
import { labelLookup, TSeat } from "@/core/seat/types";
import { calcBillTotal } from "@/core/seat/price";
import { sendBookingNotification } from "../email/booking-notification";
import { MerchData } from "@/core/merchandise";
import { DrinkData, PopcornData } from "@/core/foods";

export const booking: TSeatService["booking"] = async (
  seats,
  user,
  { bill, popcorn, drink, merch }
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

  const merchData = JSON.parse(merch) as MerchData;
  const popcornData = JSON.parse(popcorn) as PopcornData;
  const drinkData = JSON.parse(drink) as DrinkData;

  const notes = `${seatPlainText}`;
  const total = calcBillTotal({ seats, merchData, popcornData, drinkData });
  const res = await bookingSeats({
    name: user.name,
    email: user.email,
    phone: user.phone,
    count: seats.length,
    seatLabels: seats.map((seat) => seat.id).join("\n"),
    notes,
    bill,
    total,
    popcorn,
    drink,
    merch,
  });

  sendBookingNotification({
    name: user.name,
    email: user.email,
    phone: user.phone,
    seats: seats.map((seat) => seat.id).join(" "),
    total,
    popcorn,
    drink,
    merch,
  });
  console.log("booking result: ", res);
};
