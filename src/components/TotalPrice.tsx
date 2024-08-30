import { formatPrice, PRICES, sumPrice } from "@/core/seat/price";
import { TSeat } from "@/core/seat/types";

type Props = {
  popcorn?: number;
  combo?: number;
  drink?: number;
  seats: TSeat[];
};

export const TotalPrice = ({
  seats,
  popcorn = 0,
  combo = 0,
  drink = 0,
}: Props) => {
  const foods = [
    {
      label: "Bỏng",
      price: popcorn * PRICES.POPCORN,
      count: popcorn,
    },
    {
      label: "Nước",
      price: drink * PRICES.DRINK,
      count: drink,
    },
    {
      label: "Combo bỏng & nước",
      price: combo * PRICES.COMBO,
      count: combo,
    },
  ];

  const totalPrice = formatPrice(
    sumPrice(seats) + foods.reduce((acc, el) => acc + el.price, 0)
  );

  return (
    <div className="flex justify-between py-2">
      <span className="font-medium">Tổng cộng:</span>
      <span className="font-medium">{totalPrice}</span>
    </div>
  );
};
