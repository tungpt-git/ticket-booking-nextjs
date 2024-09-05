import { TSeat } from "@/core/seat/types";
import { TUser } from "@/core/user/type";

export type TSeatService = {
  booking(
    seats: TSeat[],
    user: TUser,
    others: { bill: string; popcorn: string; drink: string; merch: string }
  ): Promise<void>;
  getAllBooking(): Promise<Array<TSeat & { user: TUser }>>;
};

export type TReservationService = {
  reservation(seatIds: TSeat["id"][]): Promise<any>;
};
