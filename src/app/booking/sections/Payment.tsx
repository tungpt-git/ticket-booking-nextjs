"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
//
import groupBy from "lodash-es/groupBy";
import delay from "lodash-es/delay";
//
import { TotalPrice } from "../_components/TotalPrice";
import { PaymentInfo } from "../_components/PaymentInfo";
//
import { type TSeat } from "@/core/seat/types";
//
import { Button } from "@/components";

type Props = {
  onPayment?(): Promise<void>;
  selectedSeat: TSeat[];
  setSelectedSeat: React.Dispatch<React.SetStateAction<TSeat[]>>;
  setPreviewType: React.Dispatch<React.SetStateAction<TSeat["type"] | null>>;
};

export function Payment({
  onPayment,
  selectedSeat,
  setSelectedSeat,
  setPreviewType,
}: Props) {
  const { data: session } = useSession();
  const [paymentLoading, setPaymentLoading] = useState(false);

  const seatGroupByType = groupBy(selectedSeat, (el) => el.type);

  const handlePayment = async () => {
    try {
      setPaymentLoading(true);
      await onPayment?.();
      delay(() => {}, 300);

      setSelectedSeat([]);
    } finally {
      setPaymentLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-between bg-gray-50 rounded-xl p-6 shadow-inherit min-w-[400px] shrink-0 shadow-2xl">
      <div>
        <h3 className="text-xl font-medium uppercase mb-2">Thông tin vé</h3>
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
      </div>

      {!!session && (
        <Button
          rounded
          className="w-full mt-auto"
          onClick={handlePayment}
          loading={paymentLoading}
          variant="primary"
        >
          Thanh toán
        </Button>
      )}
    </div>
  );
}
