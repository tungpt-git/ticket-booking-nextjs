"use server";
import { SheetsName } from "@/configs/google-sheets";
import { googleServices } from "@/services/googleapis";
import dayjs from "dayjs";
import { ERROR_CODES } from "@/core/errors/code";
import { JOIN_CHARACTER } from "@/core/reservation";
import { v4 as uuidv4 } from "uuid";
import { checkExist } from "./check-exist";

export const reservation = async (formData: FormData) => {
  const seatIds = ((formData.get("seatIds") as string) ?? "").split(
    JOIN_CHARACTER
  );
  if (!seatIds.length) {
    throw new Error(ERROR_CODES.SEAT_IDS_IS_NOT_PROVIDED);
  }
  const isReservationExist = await checkExist(seatIds);

  if (isReservationExist) {
    throw new Error(ERROR_CODES.RESERVATION_ALREADY_EXISTS);
  }

  const now = dayjs(new Date());
  const expiryTime = now.add(15, "minutes").valueOf();

  await googleServices.append({
    range: `${SheetsName.reservation}!A:C`,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[uuidv4(), seatIds.join(JOIN_CHARACTER), expiryTime]],
    },
  });
};
