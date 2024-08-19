"use client";
import React, { useEffect, useState } from "react";
//
import { type TSeat } from "@/core/seat/types";
import { TUser } from "@/core/user/type";
//
import { Room } from "./Room";
import { Payment } from "./Payment";
import { PaymentComplete, type TUserForm } from "./PaymentComplete";
//
import { useServerAction } from "@/utils/hooks/useServerAction";
import { handlePayment } from "@/services/payment/payment";

type Props = {
  bookedSeats?: Array<TSeat & { user?: TUser }>;
} & Pick<React.ComponentProps<typeof Room>, "seats">;

export function Booking({ bookedSeats: _bookedSeats = [], seats }: Props) {
  const [bookedSeats, setBookedSeats] = useState(_bookedSeats);
  const [previewType, setPreviewType] = useState<TSeat["type"] | null>(null);
  const [selectedSeat, setSelectedSeat] = useState<TSeat[]>([]);
  const [disabledSelect, setDisabledSelect] = useState(false);
  const [openPaymentModal, setOpenPaymentModal] = useState(false);

  const [runAction, paymentLoading] = useServerAction(handlePayment);

  const onPayment = async (data: TUserForm) => {
    if (!selectedSeat.length) return;
    const formData = new FormData();
    formData.append("seats", JSON.stringify(selectedSeat));
    formData.append("bill", data.bill);
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phone", data.phone);

    await runAction?.(formData);
    setBookedSeats((prev) => [
      ...prev,
      ...selectedSeat.map((seat) => ({
        ...seat,
        user: data,
      })),
    ]);
    setSelectedSeat([]);
    setDisabledSelect(false);
  };

  useEffect(
    function sync() {
      console.log({ bookedSeats });
      setBookedSeats(bookedSeats);
    },
    [bookedSeats]
  );

  return (
    <main>
      <section id="_seats" className="flex flex-col items-center gap-12 p-24">
        <div className="flex gap-12">
          <Room
            seats={seats}
            bookedSeats={[
              ...bookedSeats,
              ...(disabledSelect ? Object.values(seats) : []),
            ].filter(
              (seat) =>
                !selectedSeat.some((selected) => selected.id === seat.id)
            )}
            selectedSeat={selectedSeat}
            setSelectedSeat={disabledSelect ? () => {} : setSelectedSeat}
            previewType={previewType}
          />

          <Payment
            loading={paymentLoading}
            selectedSeat={selectedSeat}
            setPreviewType={setPreviewType}
            onPayment={() => {
              if (!selectedSeat.length) return;
              setOpenPaymentModal(true);
            }}
          />

          <PaymentComplete
            open={openPaymentModal}
            onClose={() => setOpenPaymentModal(false)}
            onPayment={onPayment}
            selectedSeat={selectedSeat}
            setPreviewType={setPreviewType}
          />
        </div>
      </section>
    </main>
  );
}
