import { ComponentProps } from "react";
import { Counter } from "@/components/Counter";
import { formatPrice } from "@/core/seat/price";
import classNames from "classnames";

type Props = ComponentProps<typeof Counter> & {
  price: number;
  label: string;
  className?: string;
  description?: string;
  size?: "md" | "sm";
  showPrice?: boolean;
};

export const CounterInput = ({
  label,
  value,
  setValue,
  price,
  className,
  description,
  size = "md",
  showPrice = true,
}: Props) => {
  return (
    <div className={classNames("flex justify-between items-center", className)}>
      <div>
        <div
          className={classNames("font-medium", {
            "text-sm": size === "sm",
          })}
        >
          {label}
        </div>
        {!!description && (
          <div
            className={classNames("italic", {
              "text-sm": size === "md",
              "text-xs": size === "sm",
            })}
          >
            ({description})
          </div>
        )}
        <div className="flex items-center gap-2">
          {showPrice && (
            <div className={classNames({ "text-xs": size === "sm" })}>
              {formatPrice(price)}
            </div>
          )}
          <Counter value={value} setValue={setValue} min={0} max={100} />
        </div>
      </div>
      <span className="mt-auto">{`${formatPrice(value * price)}`}</span>
    </div>
  );
};
