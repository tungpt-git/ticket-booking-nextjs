import { getAll } from "@/services/apis/reservation/get-all";
import { Checkout } from "./sections/Checkout";
import { redirect, RedirectType } from "next/navigation";
import { getAll as getAllSeats } from "@/services/apis/seat/get-all";
import { Timer } from "./sections/Timer";

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
    <main className="min-w-screen min-h-screen flex items-center justify-center">
      <Timer expiryTime={reservation.expiryTime} />
      <Checkout selectedSeat={reservation.seatIds.map((id) => seats[id])} />
    </main>
  );
}
