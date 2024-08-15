import { allSeats } from "@/core/seat";
import { getAllBooking as getAllBookingAPI } from "../apis/booking/get-all-booking";
import { TSeat } from "@/core/seat/types";
import { TUser } from "@/core/user/type";
import { TSeatService } from "../port";

export const getAllBooking: TSeatService["getAllBooking"] = async () => {
  const data = await getAllBookingAPI();

  const seatIds = (data.values ?? []).reduce((acc, row) => {
    const [name, phone, email, idStr, _] = row as [
      string,
      string,
      string,
      string,
      string,
      string
    ];

    const seats = idStr.split(" - ").map((id) => ({
      ...allSeats[id],
      user: {
        email,
        name,
        phone,
      },
    }));

    if (!seats.length) return acc;
    return [...acc, ...seats];
  }, [] as Array<TSeat & { user: TUser }>);

  return seatIds;
};
