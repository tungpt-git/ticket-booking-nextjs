"use client";

import { JOIN_CHARACTER } from "@/core/reservation";
import { TSeat } from "@/core/seat/types";
import { reservation as reservation_action } from "@/services/apis/reservation/reservation";
import { useServerAction } from "@/utils/hooks/useServerAction";
import { useToaster } from "@/utils/hooks/useToaster";
import { useRouter } from "next/navigation";
import { v4 } from "uuid";

export const useReservation = () => {
  const [runAction, loading] = useServerAction(reservation_action);
  const router = useRouter();
  const { alert } = useToaster();

  const reservation = async (seatIds: TSeat["id"][]) => {
    try {
      const formData = new FormData();
      formData.append("seatIds", seatIds.join(JOIN_CHARACTER));
      const id = v4();
      formData.append("id", id);
      await runAction?.(formData);
      router.push(`/payment/${id}`);
    } catch (error) {
      alert(`Ghế ${seatIds.join(" ")} đã bị đặt`, {
        style: {
          backgroundColor: "#EF4444",
          color: "#FFFFFF",
        },
      });
    }
  };

  return { reservation, loading };
};
