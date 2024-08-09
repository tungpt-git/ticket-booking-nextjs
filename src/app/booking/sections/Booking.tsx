"use client";
import React, { useEffect, useState } from "react";
//
import { type TSeat } from "@/core/seat/types";
import { TUser } from "@/core/user/type";
//
import { Room } from "./Room";
import { type TUserForm, Payment } from "./Payment";

type Props = {
  onPayment?(
    selectedSeat: TSeat[],
    name: TUser["name"],
    email: TUser["email"],
    phone: TUser["phone"],
    bill: FormData
  ): Promise<void>;
  bookedSeats?: Array<TSeat & { user: TUser }>;
  signInComponent: React.ReactNode;
};

export function Booking({ onPayment, bookedSeats: _bookedSeats = [] }: Props) {
  const [bookedSeats, setBookedSeats] = useState(_bookedSeats);
  const [previewType, setPreviewType] = useState<TSeat["type"] | null>(null);
  const [selectedSeat, setSelectedSeat] = useState<TSeat[]>([]);

  const handlePayment = async (data: TUserForm) => {
    if (!selectedSeat.length) return;
    const billData = new FormData();
    billData.append("file", data.bill);
    await onPayment?.(
      selectedSeat,
      data.name,
      data.email,
      data.phone,
      billData
    );
    setBookedSeats((prev) => [
      ...prev,
      ...selectedSeat.map((seat) => ({
        ...seat,
        user: data,
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
            bookedSeats={bookedSeats}
            selectedSeat={selectedSeat}
            setSelectedSeat={setSelectedSeat}
            previewType={previewType}
          />

          <Payment
            selectedSeat={selectedSeat}
            setPreviewType={setPreviewType}
            onPayment={handlePayment}
          />
        </div>
      </section>
    </main>
  );
}
