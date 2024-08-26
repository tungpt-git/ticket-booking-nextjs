import { unstable_cache } from "next/cache";
import { TSeatService } from "../port";
import { booking } from "./booking";
import { getAllBooking } from "./get-all-booking";

export const GET_ALL_BOOKINGS = "GET_ALL_BOOKINGS";

export const seatService = {
  booking,
  getAllBooking: unstable_cache(getAllBooking, [GET_ALL_BOOKINGS]),
};

export function useSeatService(): TSeatService {
  return seatService;
}
