"use client";

import { TSeat } from "@/core/seat/types";
import { TUser } from "@/core/user/type";
import { handlePayment } from "@/services/payment/payment";
import { useServerAction } from "@/utils/hooks/useServerAction";

type Params = {
  user: TUser;
  bill: File;
  popcorn: number;
  drink: number;
  combo: number;
  seats: TSeat[];
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
  }: Params) => {
    if (!seats.length) return;

    const formData = new FormData();
    formData.append("seats", JSON.stringify(seats));
    formData.append("bill", bill);
    formData.append("name", user.name);
    formData.append("email", user.email);
    formData.append("phone", user.phone);
    formData.append("popcorn", popcorn.toString());
    formData.append("drink", drink.toString());
    formData.append("combo", combo.toString());

    await runAction?.(formData);
  };

  return { checkout, loading };
};
