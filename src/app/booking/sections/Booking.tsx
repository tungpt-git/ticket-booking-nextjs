"use client";
import React, { useState } from "react";
//
import delay from "lodash-es/delay";
//
import { type TSeat } from "@/core/seat/types";
import { TUser } from "@/core/user/type";
//
import { Room } from "./Room";
import { Payment } from "./Payment";

type Props = {
  onPayment?(selectedSeat: TSeat[]): Promise<void>;
  bookedSeats?: Array<TSeat & { user: TUser }>;
  signInComponent: React.ReactNode;
};

export function Booking({ onPayment, bookedSeats = [] }: Props) {
  const [previewType, setPreviewType] = useState<TSeat["type"] | null>(null);
  const [selectedSeat, setSelectedSeat] = useState<TSeat[]>([]);

  const handlePayment = async () => {
    await onPayment?.(selectedSeat);
    delay(() => {}, 300);

    setSelectedSeat([]);
  };

  return (
    <main>
      <section id="_seats" className="flex flex-col items-center gap-12 p-24">
        <div className="flex gap-12">
          <Room
            bookedSeats={bookedSeats}
            selectedSeat={selectedSeat}
            setSelectedSeat={setSelectedSeat}
            previewType={previewType}
          />

          <Payment
            selectedSeat={selectedSeat}
            setSelectedSeat={setSelectedSeat}
            setPreviewType={setPreviewType}
            onPayment={handlePayment}
          />
        </div>
      </section>
    </main>
  );
}
