"use server";
import { SheetsName } from "@/configs/google-sheets";
import { JOIN_CHARACTER } from "@/core/reservation";
import { TReservation } from "@/core/reservation/types";
import { googleServices } from "@/services/googleapis";

export const getAll = async () => {
  const res = await googleServices.get({
    range: `${SheetsName.reservation}!A2:C10000`,
  });

  const data: TReservation[] = (res.data.values ?? []).reduce((acc, row) => {
    const [id, seatIds, expiryTime] = row as [string, string, string];

    return [
      ...acc,
      {
        id,
        seatIds: seatIds.split(JOIN_CHARACTER),
        expiryTime: Number(expiryTime),
      },
    ];
  }, [] as TReservation[]);

  return data.filter((el) => el.expiryTime > new Date().valueOf());
};
