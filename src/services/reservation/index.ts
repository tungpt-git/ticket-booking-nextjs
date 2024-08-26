import { TSeat } from "@/core/seat/types";
import { reservation as reservation_action } from "../apis/reservation/reservation";

export async function reservation(seatIds: TSeat["id"][]) {
  const formData = new FormData();
  formData.append("seatIds", seatIds.toString());
  return reservation_action(formData);
}
