import { groupBy } from "lodash-es";
import { labelLookup, TSeat } from "@/core/seat/types";
import { formatPrice, PRICES, sumPrice } from "@/core/seat/price";
import { TotalPrice } from "./TotalPrice";
import { PaymentInfo } from "./PaymentInfo";
import { PropsWithChildren } from "react";
import classNames from "classnames";

type Props = PropsWithChildren & {
  selectedSeat: TSeat[];
  setPreviewType?(type: TSeat["type"] | null): void;
  popcorn?: number;
  drink?: number;
  showTotal?: boolean;
  className?: string;
};

export const BookingInfo = ({
  selectedSeat,
  setPreviewType,
  popcorn = 0,
  drink = 0,
  showTotal = false,
  children,
  className,
}: Props) => {
  const seatGroupedByType = groupBy(selectedSeat, "type");

  const foods = [
    {
      label: "Bỏng",
      price: popcorn * PRICES.POPCORN,
      count: popcorn,
    },
    {
      label: "Đồ uống",
      price: drink * PRICES.DRINK,
      count: drink,
    },
  ];

  return (
    <div
      className={classNames(
        "lg:min-w-[360px] flex flex-col overflow-y-auto overflow-x-hidden",
        className
      )}
    >
      {!selectedSeat.length ? (
        <div className="rounded border-2 border-dashed border-light min-h-[448px] w-full flex items-center justify-center text-gray-300 font-medium">
          Ghế bạn chọn sẽ hiển thị ở đây
        </div>
      ) : (
        <>
          {Object.keys(seatGroupedByType).map((type) => {
            return (
              <PaymentInfo
                key={type}
                label={labelLookup[type as keyof typeof labelLookup] ?? ""}
                description={seatGroupedByType[type]
                  .map((el) => el.name)
                  .join(", ")}
                count={seatGroupedByType[type].length}
                price={formatPrice(sumPrice(seatGroupedByType[type]))}
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
      {children}
      {showTotal && selectedSeat.length > 0 && (
        <TotalPrice
          className="py-2"
          seats={selectedSeat}
          popcorn={popcorn}
          drink={drink}
        />
      )}
    </div>
  );
};
