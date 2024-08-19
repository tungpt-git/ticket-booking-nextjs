"use server";
import { upload } from "../googleapis/upload";
import { GET_ALL_BOOKINGS, seatSevices } from "../seats";
import { revalidateTag } from "next/cache";

type Data = {
  seats: string;
  name: string;
  phone: string;
  email: string;
  bill: File;
};
export const handlePayment = async (formData: FormData) => {
  const { seats, name, email, phone, bill } = Object.fromEntries(
    formData
  ) as unknown as Data;

  let fileId: string = "";
  try {
    if (bill) {
      fileId = (await upload(bill)) ?? "";
    }

    await seatSevices.booking(
      JSON.parse(seats),
      {
        name,
        email,
        phone,
      },
      fileId
        ? `=IMAGE("https://drive.google.com/thumbnail?id=${fileId}&sz=w1000")`
        : ""
    );
    revalidateTag(GET_ALL_BOOKINGS);
  } catch {
    // do nothing
  }
};
