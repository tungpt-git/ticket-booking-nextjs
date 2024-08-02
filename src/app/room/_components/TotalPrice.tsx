import { formatPrice, getSeatPrice } from "@/core/seat/price";
import { TSeat } from "@/core/seat/types";

export const TotalPrice = ({ seats }: { seats: TSeat[] }) => {
  const totalPrice = seats.reduce((acc, seat) => acc + getSeatPrice(seat), 0);

  return (
    <div className="flex justify-between py-2">
      <span className="font-medium">Tổng cộng:</span>
      <span className="font-medium">{formatPrice(totalPrice)}</span>
    </div>
  );
};
