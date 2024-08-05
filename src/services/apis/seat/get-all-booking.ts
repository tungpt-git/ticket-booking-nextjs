import { googleServices } from "@/services/googleapis";
import { unstable_cache } from "next/cache";

export const GET_ALL_BOOKINGS = "GET_ALL_BOOKINGS";

export const getAllBooking = unstable_cache(async () => {
  return await googleServices
    .get({
      range: "Sheet1!A2:X1000",
    })
    .then((res) => res.data);
}, [GET_ALL_BOOKINGS]);
