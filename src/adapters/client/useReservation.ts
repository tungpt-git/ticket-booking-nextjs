"use client";

import { ERROR_CODES } from "@/core/errors/code";
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
      const res: any = await runAction?.(formData).then((res: any) => res.data);
      console.log(res);
      if (res.error) {
        if (res.error === ERROR_CODES.RESERVATION_ALREADY_EXISTS) {
          throw new Error(`Ghế ${res.data} đã được đặt`);
        }
        throw new Error("Đã có lỗi xảy ra");
      }
      router.push(`/payment/${id}`);
    } catch (error) {
      alert((error as any).message, {
        style: {
          backgroundColor: "#EF4444",
          color: "#FFFFFF",
        },
      });
    }
  };

  return { reservation, loading };
};
