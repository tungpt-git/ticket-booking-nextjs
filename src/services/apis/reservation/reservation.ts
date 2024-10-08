"use server";
import { SheetsName } from "@/configs/google-sheets";
import { googleServices } from "@/services/googleapis";
import dayjs from "dayjs";
import { ERROR_CODES } from "@/core/errors/code";
import { JOIN_CHARACTER, RESERVATION_TIME } from "@/core/reservation";
import { v4 as uuidv4 } from "uuid";
import { checkExist } from "./check-exist";

export const reservation = async (formData: FormData) => {
  const id = formData.get("id");
  if (!id) return;
  const seatIds = ((formData.get("seatIds") as string) ?? "").split(
    JOIN_CHARACTER
  );
  if (!seatIds.length) {
    throw new Error(ERROR_CODES.SEAT_IDS_IS_NOT_PROVIDED);
  }
  const isReservationExist = await checkExist(seatIds);

  if (isReservationExist.length > 0) {
    return {
      success: false,
      error: ERROR_CODES.RESERVATION_ALREADY_EXISTS,
      data: isReservationExist.map((el) => el.seatIds).join(" "),
    };
  }

  const now = dayjs(new Date());
  const expiryTime = now
    .add(RESERVATION_TIME.value, RESERVATION_TIME.unit)
    .toISOString();

  await googleServices.append({
    range: `${SheetsName.reservation}!A:C`,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[id ?? uuidv4(), seatIds.join(JOIN_CHARACTER), expiryTime]],
    },
  });
  return {
    success: true,
  };
};
