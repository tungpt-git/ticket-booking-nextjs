"use client";

import { JOIN_CHARACTER } from "@/core/reservation";
import { TSeat } from "@/core/seat/types";
import { reservation as reservation_action } from "@/services/apis/reservation/reservation";
import { useServerAction } from "@/utils/hooks/useServerAction";
import { useToaster } from "@/utils/hooks/useToaster";
import { useRouter } from "next/navigation";

export const useReservation = () => {
  const [runAction, loading] = useServerAction(reservation_action);
  const router = useRouter();
  const { alert } = useToaster();

  const reservation = async (seatIds: TSeat["id"][]) => {
    try {
      const formData = new FormData();
      formData.append("seatIds", seatIds.join(JOIN_CHARACTER));
      const res = await runAction?.(formData);
      console.log("res reservation", res);
      router.push("/payment");
    } catch (error) {
      const { message } = error as Error;
      alert(message, {
        style: {
          backgroundColor: "#EF4444",
          color: "#FFFFFF",
        },
      });
    }
  };

  return { reservation, loading };
};
