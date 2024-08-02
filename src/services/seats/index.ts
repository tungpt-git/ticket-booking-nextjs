import { TSeatService } from "../port";
import { booking } from "./booking";
import { getAllBooking } from "./get-all-booking";

export const seatSevices = Object.freeze({
  booking,
  getAllBooking,
});

export function useSeatService(): TSeatService {
  return seatSevices;
}
