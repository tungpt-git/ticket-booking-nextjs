"use server";
import { TSeat } from "@/core/seat/types";
import { toLookup } from "@/utils/toLookup";
import dayjs from "dayjs";
import { getAll } from "./get-all";

export const checkExist = async (seatIds: TSeat["id"][]) => {
  const now = dayjs(new Date());
  const seatIdsLookup = toLookup(seatIds, (el) => el);

  const allReservations = await getAll();
  const isReservationExist = allReservations.filter(
    (reservation) =>
      reservation.seatIds.some((id) => !!seatIdsLookup[id]) &&
      reservation.expiryTime > now.valueOf()
  );

  return isReservationExist;
};
