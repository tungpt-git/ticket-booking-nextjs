import { SheetsName } from "@/configs/google-sheets";
import { googleServices } from "@/services/googleapis";

type Params = {
  name: string;
  email: string;
  phone: string;
  count: number;
  seatLabels: string;
  notes?: string;
  bill?: string;
  total?: number;
  popcorn: string;
  drink: string;
  merch: string;
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
  popcorn = "0",
  drink = "0",
  merch,
}: Params) => {
  const createdDate = new Date().toISOString();
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
          merch,
          total,
          bill,
          notes,
        ],
      ],
    },
  });
};
