import { ComponentProps } from "react";
import { Counter } from "@/components/Counter";
import { formatPrice } from "@/core/seat/price";

export const CounterInput = ({
  label,
  value,
  setValue,
  price,
}: ComponentProps<typeof Counter> & { price: number; label: string }) => {
  return (
    <div className="flex justify-between">
      <div className="flex gap-2 items-start">
        <div>
          <div>{label}</div>
          <div className="text-sm">{formatPrice(price)}</div>
        </div>
        <Counter value={value} setValue={setValue} min={0} max={100} />
      </div>
      {value > 0 && (
        <span className="font-medium">{`${formatPrice(value * price)}`}</span>
      )}
    </div>
  );
};
