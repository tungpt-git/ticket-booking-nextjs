import { TSeatService } from "../port";
import { booking } from "./booking";
import { getAllBooking } from "./get-all-booking";

export const GET_ALL_BOOKINGS = "GET_ALL_BOOKINGS";

export const seatService = {
  booking,
  getAllBooking,
};

export function useSeatService(): TSeatService {
  return seatService;
}
