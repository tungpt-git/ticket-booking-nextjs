import { formatPrice, sumPrice } from "@/core/seat/price";
import { TSeat } from "@/core/seat/types";

export const TotalPrice = ({ seats }: { seats: TSeat[] }) => {
  return (
    <div className="flex justify-between py-2">
      <span className="font-medium">Tổng cộng:</span>
      <span className="font-medium">{formatPrice(sumPrice(seats))}</span>
    </div>
  );
};
