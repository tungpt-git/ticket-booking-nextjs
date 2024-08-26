"use client";

import { TSeat } from "@/core/seat/types";
import { reservation as reservation_action } from "@/services/apis/reservation/reservation";
import { useServerAction } from "@/utils/hooks/useServerAction";

export const useReservation = () => {
  const [runAction, loading] = useServerAction(reservation_action);

  const reservation = async (seatIds: TSeat["id"][]) => {
    const formData = new FormData();
    formData.append("seatIds", seatIds.toString());
    await runAction?.(formData);
  };

  return { reservation, loading };
};
