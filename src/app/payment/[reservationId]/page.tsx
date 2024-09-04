import { redirect, RedirectType } from "next/navigation";

import { Checkout } from "./sections/Checkout";

import { getAll as getAllSeats } from "@/services/apis/seat/get-all";
import { getAll } from "@/services/apis/reservation/get-all";

import { Timer } from "./_components/Timer";

type Params = {
  reservationId: string;
};

export default async function Payment({ params }: { params: Params }) {
  const seats = await getAllSeats();
  const data = await getAll();
  const reservation = data.find((el) => el.id === params.reservationId);
  if (!reservation) {
    redirect("/not-found", RedirectType.replace);
  }
  return (
    <main className="min-h-screen flex items-center justify-center py-12">
      <div className="fixed top-2 right-2 z-10">
        <Timer
          expiryTime={reservation.expiryTime}
          onTimeout={async () => {
            "use server";
            redirect("/booking");
          }}
        />
      </div>
      <Checkout
        selectedSeat={reservation.seatIds.map((id) => seats[id])}
        expiryTime={reservation.expiryTime}
      />
    </main>
  );
}
