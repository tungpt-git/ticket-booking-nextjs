import { DrinkData, PopcornData } from "@/core/foods";
import { MerchData } from "@/core/merchandise";
import { calcBillTotal, formatPrice } from "@/core/seat/price";
import { TSeat } from "@/core/seat/types";
import classNames from "classnames";

type Props = {
  popcorn?: PopcornData;
  drink?: DrinkData;
  merch?: MerchData;
  seats: TSeat[];
  hideLabel?: boolean;
  className?: string;
};

export const TotalPrice = ({
  seats,
  popcorn: popcornData,
  drink: drinkData,
  merch: merchData,
  hideLabel = false,
  className,
}: Props) => {
  const totalPrice = calcBillTotal({
    seats,
    popcornData,
    drinkData,
    merchData,
  });
  return (
    <div className={classNames("flex justify-between font-medium", className)}>
      {!hideLabel && <span>Tổng cộng:</span>}
      <span>{formatPrice(totalPrice)}</span>
    </div>
  );
};
