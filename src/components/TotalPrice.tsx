import { formatPrice, PRICES, sumPrice } from "@/core/seat/price";
import { TSeat } from "@/core/seat/types";
import classNames from "classnames";

type Props = {
  popcorn?: number;
  drink?: number;
  seats: TSeat[];
  hideLabel?: boolean;
  className?: string;
};

export const TotalPrice = ({
  seats,
  popcorn = 0,
  drink = 0,
  hideLabel = false,
  className,
}: Props) => {
  const foods = [
    {
      label: "Bỏng",
      price: popcorn * PRICES.POPCORN,
      count: popcorn,
    },
    {
      label: "Đồ uống",
      price: drink * PRICES.DRINK,
      count: drink,
    },
  ];

  const totalPrice = formatPrice(
    sumPrice(seats) + foods.reduce((acc, el) => acc + el.price, 0)
  );

  return (
    <div className={classNames("flex justify-between font-medium", className)}>
      {!hideLabel && <span>Tổng cộng:</span>}
      <span>{totalPrice}</span>
    </div>
  );
};
