"use server";
import { upload } from "../googleapis/upload";
import { seatSevices } from "../seats";
import { revalidatePath } from "next/cache";

type Data = {
  seats: string;
  name: string;
  phone: string;
  email: string;
  bill: File;
  popcorn: string;
  drink: string;
  combo: string;
};
export const handlePayment = async (formData: FormData) => {
  const { seats, name, email, phone, bill, popcorn, drink, combo } =
    Object.fromEntries(formData) as unknown as Data;

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
        : "",
      {
        popcorn: +popcorn,
        drink: +drink,
        combo: +combo,
      }
    );
    revalidatePath("/booking");
  } catch {
    // do nothing
  }
};
