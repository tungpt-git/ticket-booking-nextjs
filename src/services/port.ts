import { TSeat } from "@/core/seat/types";
import { TUser } from "@/core/user/type";

export type TSeatService = {
  booking(seats: TSeat[]): Promise<void>;
  getAllBooking(): Promise<Array<TSeat & { user: TUser }>>;
};
