"use client";
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

export function Payment({ onPayment, selectedSeat, setPreviewType }: Props) {
  return (
    <div className="flex flex-col justify-between bg-gray-50 rounded-xl p-6 shadow-inheritshrink-0 shadow-2xl">
      <h3 className="text-xl font-medium uppercase">Thông tin vé</h3>
      <BookingInfo
        selectedSeat={selectedSeat}
        setPreviewType={setPreviewType}
      />
      <Button
        rounded
        className="w-full mt-auto"
        onClick={onPayment}
        variant="primary"
      >
        Thanh toán
      </Button>
    </div>
  );
}
