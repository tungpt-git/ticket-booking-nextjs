import { googleServices } from "@/services/googleapis";

type Params = {
  name: string;
  email: string;
  phone: string;
  count: number;
  seatLabels: string;
  notes?: string;
};

export const bookingSeats = ({
  name,
  email,
  phone,
  count,
  seatLabels,
  notes,
}: Params) => {
  return googleServices.append({
    range: "A1:D1",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[name, phone, email, count, seatLabels, notes]],
    },
  });
};
