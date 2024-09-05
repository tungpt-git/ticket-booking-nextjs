import { TSeat } from "@/core/seat/types";
import { TUser } from "@/core/user/type";

export type TSeatService = {
  booking(
    seats: TSeat[],
    user: TUser,
    bill: string,
    foods: { popcorn: string; drink: string }
  ): Promise<void>;
  getAllBooking(): Promise<Array<TSeat & { user: TUser }>>;
};

export type TReservationService = {
  reservation(seatIds: TSeat["id"][]): Promise<any>;
};
