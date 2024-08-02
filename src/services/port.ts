import { TSeat } from "@/core/seat/types";

export type TSeatService = {
  booking(seats: TSeat[]): Promise<void>;
};
