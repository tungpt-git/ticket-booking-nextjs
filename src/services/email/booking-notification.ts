import { BookingInfoTpl } from "@/components";
import { Resend } from "resend";

type Data = {
  seats: string;
  name: string;
  phone: string;
  email: string;
  popcorn: string;
  drink: string;
  merch: string;
  total: number;
};

export const sendBookingNotification = async ({
  seats,
  name,
  email,
  phone,
  popcorn,
  drink,
  merch,
  total,
}: Data) => {
  try {
    const sender = process.env.RESEND_SENDER;
    const receivers = (process.env.NOTIFICATION_EMAILS ?? "")
      ?.split(",")
      .map((el) => el.trim());

    if (receivers.length === 0 || !sender) return;

    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: sender,
      to: receivers,
      subject: "New booking",
      react: BookingInfoTpl({
        seats,
        name,
        email,
        phone,
        popcorn,
        drink,
        merch,
        total,
      }) as React.ReactElement,
    });
    if (error) throw error;
  } catch (error) {
    console.log("Email send error: ", error);
  }
};
