import { googleServices } from "@/services/googleapis";

type Params = {
  name: string;
  email: string;
  phone: string;
  count: number;
  seatLabels: string;
  notes?: string;
  bill?: string;
};

export const bookingSeats = async ({
  name,
  email,
  phone,
  count,
  seatLabels,
  notes,
  bill,
}: Params) => {
  return googleServices.append({
    range: "A1:D1",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[name, phone, email, seatLabels, count, notes, bill]],
    },
  });
};
