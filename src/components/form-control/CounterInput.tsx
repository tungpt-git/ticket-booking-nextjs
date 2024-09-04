import { ComponentProps } from "react";
import { Counter } from "@/components/Counter";
import { formatPrice } from "@/core/seat/price";
import classNames from "classnames";

type Props = ComponentProps<typeof Counter> & {
  price: number;
  label: string;
  className?: string;
  description?: string;
};

export const CounterInput = ({
  label,
  value,
  setValue,
  price,
  className,
  description,
}: Props) => {
  return (
    <div className={classNames("flex justify-between items-center", className)}>
      <div>
        <div className="font-medium">{label}</div>
        {!!description && <div className="text-sm italic">({description})</div>}
        <div className="flex items-center gap-2">
          <div className="text-sm">{formatPrice(price)}</div>
          <Counter value={value} setValue={setValue} min={0} max={100} />
        </div>
      </div>
      <span>{`${formatPrice(value * price)}`}</span>
    </div>
  );
};
