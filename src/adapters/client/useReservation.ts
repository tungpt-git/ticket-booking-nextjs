"use client";

import { JOIN_CHARACTER } from "@/core/reservation";
import { TSeat } from "@/core/seat/types";
import { reservation as reservation_action } from "@/services/apis/reservation/reservation";
import { useServerAction } from "@/utils/hooks/useServerAction";

export const useReservation = () => {
  const [runAction, loading] = useServerAction(reservation_action);

  const reservation = async (seatIds: TSeat["id"][]) => {
    const formData = new FormData();
    formData.append("seatIds", seatIds.join(JOIN_CHARACTER));
    await runAction?.(formData);
  };

  return { reservation, loading };
};
