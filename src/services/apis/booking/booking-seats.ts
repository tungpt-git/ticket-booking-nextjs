import { SheetsName } from "@/configs/google-sheets";
import { googleServices } from "@/services/googleapis";
import dayjs from "dayjs";

type Params = {
  name: string;
  email: string;
  phone: string;
  count: number;
  seatLabels: string;
  notes?: string;
  bill?: string;
  total?: number;
  popcorn: number;
  drink: number;
  combo: number;
};

export const bookingSeats = async ({
  name,
  email,
  phone,
  count,
  seatLabels,
  notes,
  bill,
  total,
  popcorn = 0,
  drink = 0,
  combo = 0,
}: Params) => {
  const createdDate = dayjs(new Date()).format("DD-MM-YYYY HH:mm:ss");
  return googleServices.append({
    range: `${SheetsName.booking}!A:H`,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [
        [
          createdDate,
          name,
          phone,
          email,
          seatLabels,
          count,
          popcorn,
          drink,
          combo,
          total,
          bill,
          notes,
        ],
      ],
    },
  });
};
