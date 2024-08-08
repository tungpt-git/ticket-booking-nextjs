import { Room } from "./sections/Room";
import { type ReactElement } from "react";
import { TSeat } from "@/core/seat/types";
import { seatSevices } from "@/services/seats";
import { revalidateTag } from "next/cache";
import { GET_ALL_BOOKINGS } from "@/services/apis/seat/get-all-booking";
import { Button, GoogleSignInButton } from "@/components";
import { auth, signOut } from "@/core/auth";
import { Booking } from "./sections/Booking";
import { Session } from "next-auth";

const IconLogout = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 17 13"
    fill="none"
  >
    <path
      d="M5.3125 5.2084C5.3125 4.91621 5.55156 4.67715 5.84375 4.67715H10.625V1.55937C10.625 1.32363 10.9105 1.2041 11.0766 1.37012L15.7781 6.12148C15.9873 6.33066 15.9873 6.66602 15.7781 6.8752L11.0766 11.6266C10.9105 11.7926 10.625 11.6764 10.625 11.4373V8.31953H5.84375C5.55156 8.31953 5.3125 8.08047 5.3125 7.78828V5.2084ZM4.25 5.2084V7.78828C4.25 8.66816 4.96387 9.38203 5.84375 9.38203H9.5625V11.4373C9.5625 12.616 10.9902 13.2137 11.827 12.377L16.5318 7.62891C17.1561 7.00469 17.1561 5.99531 16.5318 5.37109L11.827 0.619727C10.9936 -0.213672 9.5625 0.377344 9.5625 1.55937V3.61465H5.84375C4.96387 3.61465 4.25 4.33184 4.25 5.2084ZM0 1.71875V11.2812C0 12.1611 0.713867 12.875 1.59375 12.875H5.97656C6.1957 12.875 6.375 12.6957 6.375 12.4766V12.2109C6.375 11.9918 6.1957 11.8125 5.97656 11.8125H1.59375C1.30156 11.8125 1.0625 11.5734 1.0625 11.2812V1.71875C1.0625 1.42656 1.30156 1.1875 1.59375 1.1875H5.97656C6.1957 1.1875 6.375 1.0082 6.375 0.789062V0.523438C6.375 0.304297 6.1957 0.125 5.97656 0.125H1.59375C0.713867 0.125 0 0.838867 0 1.71875Z"
      fill="currentColor"
    />
  </svg>
);

export default async function BooingPage(): Promise<ReactElement> {
  const bookedSeats = await seatSevices.getAllBooking();
  const session = await auth();

  const onPayment = async (seats: TSeat[]) => {
    "use server";
    console.log(session);
    await seatSevices.booking(seats, {
      name: session?.user?.name ?? "",
      email: session?.user?.email ?? "",
      phone: "",
    });
    revalidateTag(GET_ALL_BOOKINGS);
  };

  return (
    <div>
      <div className="navbar flex gap-2 w-full justify-end px-24">
        {!session?.user ? (
          <GoogleSignInButton />
        ) : (
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <Button
              type="submit"
              className="flex items-center"
              variant="red"
              rounded
            >
              <span className="text-base">
                <IconLogout />
              </span>
              Sign out
            </Button>
          </form>
        )}
      </div>
      <Booking
        onPayment={onPayment}
        bookedSeats={bookedSeats}
        signInComponent={<GoogleSignInButton />}
      />
    </div>
  );
}
