"use client";

import { TSeat } from "@/core/seat/types";
import { TUser } from "@/core/user/type";
import { handlePayment } from "@/services/payment/payment";
import { useServerAction } from "@/utils/hooks/useServerAction";

type Params = {
  user: TUser;
  bill?: File;
  popcorn: number;
  drink: number;
  combo: number;
  seats: TSeat[];
  reservationId?: string;
};

export const useBookingCheckout = () => {
  const [runAction, loading] = useServerAction(handlePayment);

  const checkout = async ({
    seats,
    user,
    bill,
    popcorn,
    drink,
    combo,
    reservationId,
  }: Params) => {
    if (!seats.length) return;

    const formData = new FormData();
    formData.append("seats", JSON.stringify(seats));
    bill && formData.append("bill", bill);
    formData.append("name", user.name);
    formData.append("email", user.email);
    formData.append("phone", user.phone);
    formData.append("popcorn", popcorn.toString());
    formData.append("drink", drink.toString());
    formData.append("combo", combo.toString());
    if (reservationId) {
      formData.append("reservationId", reservationId);
    }

    await runAction?.(formData);
  };

  return { checkout, loading };
};
