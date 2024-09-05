"use client";

import { DrinkData, PopcornData } from "@/core/foods";
import { TSeat } from "@/core/seat/types";
import { TUser } from "@/core/user/type";
import { handlePayment } from "@/services/payment/payment";
import { useServerAction } from "@/utils/hooks/useServerAction";
import { useRouter } from "next/navigation";

type Params = {
  user: TUser;
  bill?: File;
  popcorn: PopcornData;
  drink: DrinkData;
  seats: TSeat[];
  reservationId?: string;
};

export const useBookingCheckout = () => {
  const [runAction, loading] = useServerAction(handlePayment);
  const router = useRouter();

  const checkout = async ({
    seats,
    user,
    bill,
    popcorn,
    drink,
    reservationId,
  }: Params) => {
    if (!seats.length) return;

    const formData = new FormData();
    formData.append("seats", JSON.stringify(seats));
    bill && formData.append("bill", bill);
    formData.append("name", user.name);
    formData.append("email", user.email);
    formData.append("phone", user.phone);
    formData.append("popcorn", JSON.stringify(popcorn));
    formData.append("drink", JSON.stringify(drink));
    if (reservationId) {
      formData.append("reservationId", reservationId);
    }

    await runAction?.(formData);
    router.push("/success");
  };

  return { checkout, loading };
};
