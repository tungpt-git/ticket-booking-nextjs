import { groupBy } from "lodash-es";
import { PaymentInfo } from "./PaymentInfo";
import { labelLookup, TSeat } from "@/core/seat/types";
import { TotalPrice } from "./TotalPrice";
import { formatPrice, PRICES, sumPrice } from "@/core/seat/price";

type Props = {
  selectedSeat: TSeat[];
  setPreviewType?(type: TSeat["type"] | null): void;
  popcorn?: number;
  combo?: number;
  drink?: number;
};

export const BookingInfo = ({
  selectedSeat,
  setPreviewType,
  popcorn = 0,
  combo = 0,
  drink = 0,
}: Props) => {
  const seatGroupByType = groupBy(selectedSeat, (el) => el.type);

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
    sumPrice(selectedSeat) + foods.reduce((acc, el) => acc + el.price, 0)
  );

  return (
    <div className="w-[360px]">
      {!selectedSeat.length ? (
        <div className="rounded border-2 border-dashed border-gray-300 w-full h-[444px] m-auto flex items-center justify-center mt-4 text-gray-300 font-medium">
          Ghế bạn chọn sẽ hiển thị ở đây
        </div>
      ) : (
        <>
          {Object.keys(seatGroupByType).map((type) => {
            return (
              <PaymentInfo
                key={type}
                label={labelLookup[type as keyof typeof labelLookup] ?? ""}
                description={seatGroupByType[type]
                  .map((el) => el.name)
                  .join(", ")}
                count={seatGroupByType[type].length}
                price={formatPrice(sumPrice(seatGroupByType[type]))}
                onMouseEnter={() => {
                  setPreviewType?.(type as TSeat["type"]);
                }}
                onMouseLeave={() => {
                  setPreviewType?.(null);
                }}
              />
            );
          })}
        </>
      )}
      <>
        {foods
          .filter((el) => el.count > 0)
          .map((item) => (
            <PaymentInfo
              key={item.label}
              label={item.label}
              count={item.count}
              price={formatPrice(item.price)}
            />
          ))}
      </>
      {selectedSeat.length > 0 && <TotalPrice value={totalPrice} />}
    </div>
  );
};
