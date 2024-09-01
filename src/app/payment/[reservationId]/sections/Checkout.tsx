"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
//
import { type TSeat } from "@/core/seat/types";
import { PRICES } from "@/core/seat/price";
import { ALLOWED_IMAGES_MIME_TYPE, MAX_FILE_SIZE } from "@/core";
import { type TUserForm } from "@/core/checkout/types";
import { useParams, useRouter } from "next/navigation";
//
import { BookingInfo, Button, CounterInput, FileUpload } from "@/components";
//
import { UserInfoForm } from "../_components/UserInfoForm";
import { useBookingCheckout } from "@/adapters/client/useBookingCheckout";

type Props = {
  selectedSeat: TSeat[];
};

export const Checkout = ({ selectedSeat }: Props) => {
  const params = useParams<{ reservationId?: string }>();
  const userFormRef = useRef<HTMLFormElement | null>(null);
  const [popcorn, setPopcorn] = useState<number>(0);
  const [drink, setDrink] = useState<number>(0);
  const [combo, setCombo] = useState<number>(0);

  const { checkout, loading } = useBookingCheckout();

  const router = useRouter();

  const onSubmit = async (formData: FormData) => {
    const data = Object.fromEntries(formData) as TUserForm & { bill: File };
    if (!data || !data.bill) {
      return;
    }

    await checkout?.({
      user: {
        email: data.email,
        name: data.name,
        phone: data.phone,
      },
      bill: data.bill,
      popcorn,
      drink,
      combo,
      seats: selectedSeat,
      reservationId: params.reservationId,
    });

    router.replace("/");
  };

  const foods = [
    {
      label: "Bỏng?🍿",
      price: PRICES.POPCORN,
      value: popcorn,
      setValue: setPopcorn,
      description: "1 bỏng tùy chọn caramel/thường",
    },
    {
      label: "Nước?🥤",
      price: PRICES.DRINK,
      value: drink,
      setValue: setDrink,
      description: "1 nước tùy chọn 7up/Pepsi",
    },
    {
      label: "Combo bỏng & nước 🍿🥤",
      price: PRICES.COMBO,
      value: combo,
      setValue: setCombo,
      description: "Combo 1 bỏng và 1 nước",
    },
  ];

  return (
    <form ref={userFormRef} action={onSubmit}>
      <section className="flex flex-col gap-5 py-2">
        <div>
          <h4 className="font-medium text-xl">Thông tin cá nhân</h4>
          <UserInfoForm />
        </div>
        {foods.map((food) => (
          <CounterInput
            key={food.label}
            label={food.label}
            price={food.price}
            value={food.value}
            setValue={food.setValue}
            className="p-2 border border-solid rounded"
            description={food.description}
          />
        ))}

        <div>
          <h4 className="font-medium text-xl">Thanh toán</h4>
          <div className="lg:flex">
            <div>
              <BookingInfo
                selectedSeat={selectedSeat}
                popcorn={popcorn}
                drink={drink}
                combo={combo}
                showTotal
              />
            </div>
            <div className="divider divider-horizontal" />
            <div>
              <Image
                className="m-auto"
                alt="bank_account_qr"
                src="/images/ticket-booking-qr.jpg"
                width={300}
                height={250}
                unoptimized
                loader={({ src }) => src}
              />

              <FileUpload
                name="bill"
                className="mt-4 m-auto"
                required
                accept={ALLOWED_IMAGES_MIME_TYPE.join(",")}
                onChange={(evt) => {
                  const file = evt.target.files?.[0];

                  const invalid =
                    !file ||
                    file.size > MAX_FILE_SIZE ||
                    !ALLOWED_IMAGES_MIME_TYPE.includes(file.type);

                  if (invalid) {
                    evt.target.value = "";
                    evt.target.innerHTML = "";
                    evt.preventDefault();
                    evt.stopPropagation();
                    return false;
                  }
                  return true;
                }}
              />
            </div>
          </div>
        </div>
        <Button
          variant="primary"
          loading={loading}
          className="flex-1"
          type="submit"
        >
          Hoàn thành
        </Button>
      </section>
    </form>
  );
};
