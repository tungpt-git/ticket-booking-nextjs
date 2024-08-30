import { Dispatch, SetStateAction } from "react";
//
import { type TSeat } from "@/core/seat/types";
//
import { BookingInfo, Button, Card } from "@/components";

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
    <Card>
      <h3 className="text-xl font-medium uppercase">Thông tin vé</h3>
      <BookingInfo
        selectedSeat={selectedSeat}
        setPreviewType={setPreviewType}
        showTotal
      />
      <Button
        rounded
        variant="primary"
        type="submit"
        loading={loading}
        onClick={onPayment}
      >
        Thanh toán
      </Button>
    </Card>
  );
}
