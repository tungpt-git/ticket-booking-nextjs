import { googleServices } from "@/services/googleapis";

export const getAllBooking = async () => {
  return await googleServices
    .get({
      range: "Sheet1!A2:X1000",
    })
    .then((res) => res.data);
};
