import { Room } from "./components/Room";
import { type ReactElement } from "react";
import { TSeat } from "@/core/seat/types";
import { booking } from "@/services/seats";

const onPayment = async (seats: TSeat[]) => {
  "use server";
  booking(seats);
};

export default async function Home(): Promise<ReactElement> {
  return <Room onPayment={onPayment} />;
}
