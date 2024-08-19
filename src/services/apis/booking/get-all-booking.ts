import { SheetsName } from "@/configs/google-sheets";
import { googleServices } from "@/services/googleapis";

export const getAllBooking = async () => {
  return await googleServices
    .get({
      range: `${SheetsName.booking}!B2:E1000`,
    })
    .then((res) => res.data);
};
