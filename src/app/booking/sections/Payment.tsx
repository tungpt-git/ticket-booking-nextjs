import { Dispatch, SetStateAction } from "react";
//
import { type TSeat } from "@/core/seat/types";
//
import { Button } from "@/components";
import { BookingInfo } from "../_components/BookingInfo";

type Props = {
  onPayment?(): void;
  selectedSeat: TSeat[];
  setPreviewType: Dispatch<SetStateAction<TSeat["type"] | null>>;
  loading?: boolean;
};

export function Payment({
  onPayment,
  selectedSeat,
  setPreviewType,
  loading,
}: Props) {
  return (
    <div className="flex flex-col bg-gray-50 rounded-xl p-6 shadow-inheritshrink-0 shadow-2xl">
      <h3 className="text-xl font-medium uppercase">Thông tin vé</h3>
      <BookingInfo
        selectedSeat={selectedSeat}
        setPreviewType={setPreviewType}
      />
      <form action={onPayment} className="mt-auto">
        <Button
          rounded
          className="w-full mt-auto"
          variant="primary"
          type="submit"
          loading={loading}
        >
          Thanh toán
        </Button>
      </form>
    </div>
  );
}
