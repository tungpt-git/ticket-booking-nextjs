import { Collapse, CounterInput } from "@/components";
import { formatPrice } from "@/core/seat/price";
import { ComponentProps } from "react";

export const FoodCateen = ({
  title,
  foods,
}: {
  title: string;
  foods: Array<ComponentProps<typeof CounterInput>>;
}) => {
  const total = foods.reduce((acc, cur) => acc + cur.price * cur.value, 0);
  return (
    <Collapse
      title={
        <div className="flex justify-between font-medium min-h-0 pe-0 px-0 w-full">
          <span>{title}</span>
          <span>{formatPrice(total)}</span>
        </div>
      }
    >
      {foods.map((food) => (
        <CounterInput
          key={food.label}
          className="mb-2 last:mb-0"
          label={food.label}
          price={food.price}
          value={food.value}
          setValue={food.setValue}
        />
      ))}
    </Collapse>
  );
};
