"use server";
import { SheetsName } from "@/configs/google-sheets";
import { JOIN_CHARACER } from "@/core/reservation";
import { TReservation } from "@/core/reservation/types";
import { googleServices } from "@/services/googleapis";

export const getAll = () => {
  return googleServices
    .get({
      range: `${SheetsName.reservation}!A2:C10000`,
    })
    .then((res) => {
      return (res.data.values ?? []).reduce((acc, row) => {
        const [id, seatIds, expiryTime] = row as [string, string, string];

        return [
          ...acc,
          {
            id,
            seatIds: seatIds.split(JOIN_CHARACER),
            expiryTime: Number(expiryTime),
          },
        ];
      }, [] as TReservation[]);
    });
};
