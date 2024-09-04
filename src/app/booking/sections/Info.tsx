import { Dispatch, SetStateAction } from "react";
//
import { type TSeat } from "@/core/seat/types";
//
import { BookingInfo, Button, Card, TotalPrice } from "@/components";

type Props = {
  onPayment?(): void;
  selectedSeat: TSeat[];
  setPreviewType: Dispatch<SetStateAction<TSeat["type"] | null>>;
  loading?: boolean;
};

export function Info({
  onPayment,
  selectedSeat,
  setPreviewType,
  loading,
}: Props) {
  return (
    <>
      <div className="footer fixed bottom-0 lg:hidden">
        <div className="w-full flex justify-between items-center p-2 bg-blue-600 text-white">
          <span>
            <span className="inline-block">
              <TotalPrice seats={selectedSeat} hideLabel />{" "}
            </span>
            <span>({selectedSeat.length} ghế)</span>
          </span>
          <Button
            variant="primary-invert"
            size="sm"
            rounded
            loading={loading}
            onClick={onPayment}
          >
            Tiếp tục
          </Button>
        </div>
      </div>

      <Card className="hidden lg:block">
        <h3 className="text-xl font-medium uppercase">Thông tin vé</h3>
        <BookingInfo
          selectedSeat={selectedSeat}
          setPreviewType={setPreviewType}
          showTotal
          className="h-[448px]"
        />
        <Button rounded variant="primary" loading={loading} onClick={onPayment}>
          Thanh toán
        </Button>
      </Card>
    </>
  );
}
