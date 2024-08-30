import { ComponentProps } from "react";
import { Counter } from "@/components/Counter";
import { formatPrice } from "@/core/seat/price";
import classNames from "classnames";

type Props = ComponentProps<typeof Counter> & {
  price: number;
  label: string;
  className?: string;
};

export const CounterInput = ({
  label,
  value,
  setValue,
  price,
  className,
}: Props) => {
  return (
    <div
      className={classNames("flex justify-between p-2 items-center", className)}
    >
      <div>
        <div>{label}</div>
        <div className="text-sm mb-1">{formatPrice(price)}</div>
        <Counter value={value} setValue={setValue} min={0} max={100} />
      </div>
      <span>{`${formatPrice(value * price)}`}</span>
    </div>
  );
};
