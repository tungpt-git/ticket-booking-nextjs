"use client";
import React, {
  ComponentProps,
  PropsWithChildren,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import classNames from "classnames";
//
import { type TSeat } from "@/core/seat/types";
import { PRICES } from "@/core/seat/price";
import { ALLOWED_IMAGES_MIME_TYPE, MAX_FILE_SIZE } from "@/core";
import { type TUserForm } from "@/core/checkout/types";
//
import { BookingInfo, Button, CounterInput, FileUpload } from "@/components";
//
import { UserInfoForm } from "../_components/UserInfoForm";
import { useBookingCheckout } from "@/adapters/client/useBookingCheckout";
import { Timer } from "../_components/Timer";

type Props = {
  selectedSeat: TSeat[];
  expiryTime: number;
};

export const Checkout = ({ selectedSeat, expiryTime }: Props) => {
  const params = useParams<{ reservationId?: string }>();
  const userFormRef = useRef<HTMLFormElement | null>(null);
  const [popcorn, setPopcorn] = useState<number>(0);
  const [drink, setDrink] = useState<number>(0);
  const [combo, setCombo] = useState<number>(0);

  const { checkout, loading } = useBookingCheckout();

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
  };

  const foods = [
    {
      label: "🍿Bỏng",
      price: PRICES.POPCORN,
      value: popcorn,
      setValue: setPopcorn,
      description: "1 bỏng tùy chọn caramel/thường",
    },
    {
      label: "🥤Nước",
      price: PRICES.DRINK,
      value: drink,
      setValue: setDrink,
      description: "1 nước tùy chọn 7up/Pepsi",
    },
    {
      label: "🍿🥤Combo bỏng & nước",
      price: PRICES.COMBO,
      value: combo,
      setValue: setCombo,
      description: "Combo 1 bỏng và 1 nước",
    },
  ];

  return (
    <form ref={userFormRef} action={onSubmit}>
      <section className="grid grid-cols-1	gap-5 px-3">
        <Block title="Thông tin cá nhân">
          <UserInfoForm />
        </Block>
        <Block title="Chọn đồ ăn">
          {foods.map((food) => (
            <CounterInput
              key={food.label}
              className="mb-4"
              label={food.label}
              price={food.price}
              value={food.value}
              setValue={food.setValue}
              description={food.description}
            />
          ))}
        </Block>
        <Block title="Thanh toán" forceOpen>
          <div className="lg:flex">
            <div>
              <BookingInfo
                selectedSeat={selectedSeat}
                popcorn={popcorn}
                drink={drink}
                combo={combo}
                showTotal
              />
              <p className="font-medium italic text-error">
                * Lưu ý: Vé đã mua không hoàn lại, xin cảm ơn.
              </p>
            </div>
            <div className="divider divider-horizontal" />
            <div className="mt-4 lg:mt-0">
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
                label="Vui lòng tải ảnh chụp màn hình chuyển khoản"
                name="bill"
                className="mt-4"
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
        </Block>
        <Timer expiryTime={expiryTime} />
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

const Block = ({
  title,
  children,
  forceOpen: _forceOpen,
  ...props
}: PropsWithChildren<ComponentProps<"div">> & {
  title?: string;
  forceOpen?: boolean;
}) => {
  const [open, setOpen] = useState(true);
  const forceOpen = _forceOpen || !title;
  return (
    <div
      {...props}
      className={classNames(
        "collapse bg-base-200 border rounded-lg border-solid",
        props.className,
        { "collapse-open": open || forceOpen }
      )}
    >
      <input
        className={classNames({ "cursor-pointer": !forceOpen })}
        type="checkbox"
        checked={open}
        onChange={(evt) => setOpen(evt.target.checked)}
      />
      {!!title && (
        <h4 className={classNames("collapse-title font-medium text-xl p-4")}>
          {title}
        </h4>
      )}
      <div className="collapse-content border-t border-dashed">
        <div className="h-4" />
        {children}
      </div>
    </div>
  );
};
