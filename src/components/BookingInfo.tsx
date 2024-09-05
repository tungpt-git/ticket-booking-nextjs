import { groupBy } from "lodash-es";
import { labelLookup, TSeat } from "@/core/seat/types";
import {
  calcDrinkTotal,
  calcPopcornTotal,
  countDrink,
  countPopcorn,
  formatPrice,
  sumPrice,
} from "@/core/seat/price";
import { TotalPrice } from "./TotalPrice";
import { PaymentInfo } from "./PaymentInfo";
import { PropsWithChildren } from "react";
import classNames from "classnames";
import {
  MERCHANDISE_LABELS,
  MERCHANDISE_PRICES,
  MerchData,
} from "@/core/merchandise";
import { DrinkData, PopcornData } from "@/core/foods";

type Props = PropsWithChildren & {
  selectedSeat: TSeat[];
  setPreviewType?(type: TSeat["type"] | null): void;

  showTotal?: boolean;
  className?: string;
  popcorn?: PopcornData;
  drink?: DrinkData;
  merch?: MerchData;
};

export const BookingInfo = ({
  selectedSeat,
  setPreviewType,
  popcorn,
  drink,
  showTotal = false,
  children,
  className,
  merch,
}: Props) => {
  const seatGroupedByType = groupBy(selectedSeat, "type");

  const foods = [
    {
      label: "Bỏng",
      price: calcPopcornTotal(popcorn),
      count: countPopcorn(popcorn),
    },
    {
      label: "Đồ uống",
      price: calcDrinkTotal(drink),
      count: countDrink(drink),
    },
  ];

  const merchs = merch
    ? [
        {
          label: MERCHANDISE_LABELS.lobster,
          price: merch.lobster * MERCHANDISE_PRICES.lobster,
          count: merch.lobster,
        },

        {
          label: MERCHANDISE_LABELS.cup,
          price: merch.cup * MERCHANDISE_PRICES.cup,
          count: merch.cup,
        },
      ]
    : [];

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
          .filter((el) => el.price > 0)
          .map((item) => (
            <PaymentInfo
              key={item.label}
              label={item.label}
              count={item.count}
              price={formatPrice(item.price)}
            />
          ))}
      </>
      <>
        {merchs
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
          merch={merch}
        />
      )}
    </div>
  );
};
