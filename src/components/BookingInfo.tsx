import { groupBy } from "lodash-es";
import { labelLookup, TSeat } from "@/core/seat/types";
import { formatPrice, PRICES, sumPrice } from "@/core/seat/price";
import { TotalPrice } from "./TotalPrice";
import { PaymentInfo } from "./PaymentInfo";

type Props = {
  selectedSeat: TSeat[];
  setPreviewType?(type: TSeat["type"] | null): void;
  popcorn?: number;
  combo?: number;
  drink?: number;
  showTotal?: boolean;
};

export const BookingInfo = ({
  selectedSeat,
  setPreviewType,
  popcorn = 0,
  combo = 0,
  drink = 0,
  showTotal = false,
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

  return (
    <div className="w-[360px] flex flex-col">
      {!selectedSeat.length ? (
        <div className="rounded border-2 border-dashed border-gray-300 h-[400px] w-full flex items-center justify-center text-gray-300 font-medium">
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
      {showTotal && selectedSeat.length > 0 && (
        <TotalPrice
          seats={selectedSeat}
          popcorn={popcorn}
          drink={drink}
          combo={combo}
        />
      )}
    </div>
  );
};
