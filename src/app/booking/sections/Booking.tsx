"use client";
import React, { ComponentProps, useEffect, useState } from "react";
//
import { type TSeat } from "@/core/seat/types";
import { TUser } from "@/core/user/type";
//
import { Room } from "./Room";
import { Payment } from "./Payment";
import { PaymentComplete } from "./PaymentComplete";
import { useBookingCheckout } from "@/adapters/client/useBookingCheckout";

type Props = {
  bookedSeats?: Array<TSeat & { user?: TUser }>;
} & Pick<React.ComponentProps<typeof Room>, "seats">;

export function Booking({ bookedSeats: _bookedSeats = [], seats }: Props) {
  const [bookedSeats, setBookedSeats] = useState(_bookedSeats);
  const [previewType, setPreviewType] = useState<TSeat["type"] | null>(null);
  const [selectedSeat, setSelectedSeat] = useState<TSeat[]>([]);
  const [openPaymentModal, setOpenPaymentModal] = useState(false);

  const { checkout, loading: paymentLoading } = useBookingCheckout();

  const onPayment: ComponentProps<typeof PaymentComplete>["onPayment"] = async (
    data
  ) => {
    if (!selectedSeat.length) return;

    await checkout?.({ ...data, seats: selectedSeat });
    setOpenPaymentModal(false);
    setBookedSeats((prev) => [
      ...prev,
      ...selectedSeat.map((seat) => ({
        ...seat,
        user: data.user,
      })),
    ]);
    setSelectedSeat([]);
  };

  useEffect(
    function sync() {
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
            bookedSeats={bookedSeats.filter(
              (seat) =>
                !selectedSeat.some((selected) => selected.id === seat.id)
            )}
            selectedSeat={selectedSeat}
            setSelectedSeat={setSelectedSeat}
            previewType={previewType}
          />

          <Payment
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
            paymentLoading={paymentLoading}
            selectedSeat={selectedSeat}
          />
        </div>
      </section>
    </main>
  );
}
