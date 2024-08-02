import { TSeatService } from "../port";
import { booking } from "./booking";

export const seatSevices = Object.freeze({
  booking,
});

export function useSeatService(): TSeatService {
  return seatSevices;
}
