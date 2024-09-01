"use server";
import { SheetsName } from "@/configs/google-sheets";
import { googleServices } from "../googleapis";
import { upload } from "../googleapis/upload";
import { seatService } from "../seats";
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
  reservationId?: string;
};
export const handlePayment = async (formData: FormData) => {
  const {
    seats,
    name,
    email,
    phone,
    bill,
    popcorn,
    drink,
    combo,
    reservationId,
  } = Object.fromEntries(formData) as unknown as Data;

  let fileId: string = "";
  try {
    if (bill) {
      fileId = (await upload(bill)) ?? "";
    }

    await seatService.booking(
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

    if (reservationId) {
      await googleServices.searchAndDeleteRow({
        range: `${SheetsName.reservation}!A:A`,
        searchValue: reservationId,
      });
    }

    revalidatePath("/booking");
  } catch (error) {
    // do nothing
    console.log(error);
  }
};
