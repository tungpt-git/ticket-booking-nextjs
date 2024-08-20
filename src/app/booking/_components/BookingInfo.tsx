import { groupBy } from "lodash-es";
import { PaymentInfo } from "./PaymentInfo";
import { TSeat } from "@/core/seat/types";
import { TotalPrice } from "./TotalPrice";

type Props = {
  selectedSeat: TSeat[];
  setPreviewType(type: TSeat["type"] | null): void;
};

export const BookingInfo = ({ selectedSeat, setPreviewType }: Props) => {
  const seatGroupByType = groupBy(selectedSeat, (el) => el.type);

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
                type={type as TSeat["type"]}
                count={seatGroupByType[type].length}
                seats={seatGroupByType[type]}
                onMouseEnter={() => {
                  setPreviewType(type as TSeat["type"]);
                }}
                onMouseLeave={() => {
                  setPreviewType(null);
                }}
              />
            );
          })}
          {selectedSeat.length > 0 && <TotalPrice seats={selectedSeat} />}
        </>
      )}
    </div>
  );
};
