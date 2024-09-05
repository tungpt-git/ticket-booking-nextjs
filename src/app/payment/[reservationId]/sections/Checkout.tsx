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
import { DrinkData, PopcornData } from "@/core/foods";
//
import { BookingInfo, Button, CounterInput, FileUpload } from "@/components";
//
import { useBookingCheckout } from "@/adapters/client/useBookingCheckout";
//
import { UserInfoForm } from "../_components/UserInfoForm";
import { Timer } from "../_components/Timer";
import { FoodCateen } from "../_components/FoodCateen";
import { MERCHANDISE_PRICES, MerchData } from "@/core/merchandise";

type Props = {
  selectedSeat: TSeat[];
  expiryTime: number;
};

export const Checkout = ({ selectedSeat, expiryTime }: Props) => {
  const params = useParams<{ reservationId?: string }>();
  const userFormRef = useRef<HTMLFormElement | null>(null);
  const [popcorn, setPopcorn] = useState<PopcornData>({
    classic: 0,
    cheese: 0,
    caramel: 0,
  });
  const [drink, setDrink] = useState<DrinkData>({
    pepsi: 0,
    _7up: 0,
    miranda: 0,
    lipton: 0,
  });
  const [merch, setMerch] = useState<MerchData>({
    cup: 0,
    lobster: 0,
  });

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
      seats: selectedSeat,
      reservationId: params.reservationId,
      merch,
    });
  };

  const popcornTypes = [
    {
      label: "Vị Thường",
      price: PRICES.POPCORN,
      value: popcorn.classic,
      setValue: (classic: number) =>
        setPopcorn((prev) => ({ ...prev, classic })),
    },
    {
      label: "Vị Phô mai",
      price: PRICES.POPCORN,
      value: popcorn.cheese,
      setValue: (cheese: number) => setPopcorn((prev) => ({ ...prev, cheese })),
    },
    {
      label: "Vị Caramel",
      price: PRICES.POPCORN,
      value: popcorn.caramel,
      setValue: (caramel: number) =>
        setPopcorn((prev) => ({ ...prev, caramel })),
    },
  ];

  const drinkTypes = [
    {
      label: "Pepsi",
      price: PRICES.DRINK,
      value: drink.pepsi,
      setValue: (pepsi: number) => setDrink((prev) => ({ ...prev, pepsi })),
    },
    {
      label: "7up",
      price: PRICES.DRINK,
      value: drink._7up,
      setValue: (_7up: number) => setDrink((prev) => ({ ...prev, _7up })),
    },
    {
      label: "Miranda",
      price: PRICES.DRINK,
      value: drink.miranda,
      setValue: (miranda: number) => setDrink((prev) => ({ ...prev, miranda })),
    },
    {
      label: "Liption chanh",
      price: PRICES.DRINK,
      value: drink.lipton,
      setValue: (lipton: number) => setDrink((prev) => ({ ...prev, lipton })),
    },
  ];

  const merchandiseItems = [
    {
      label: "Túi + móc khoá tôm hùm",
      price: MERCHANDISE_PRICES.lobster,
      value: merch.lobster,
      setValue: (lobster: number) => setMerch((prev) => ({ ...prev, lobster })),
      imgSrc: "/images/lobster3.jpg",
    },
    {
      label: "Ly nước F.R.I.E.N.D.S",
      price: MERCHANDISE_PRICES.cup,
      description: "Tặng kèm bịt chống tràn + túi đựng",
      value: merch.cup,
      setValue: (cup: number) => setMerch((prev) => ({ ...prev, cup })),
      imgSrc: "/images/cup4.jpg",
    },
  ];

  return (
    <form ref={userFormRef} action={onSubmit}>
      <section className="grid grid-cols-1 gap-5 px-3">
        <Block title="Thông tin cá nhân">
          <UserInfoForm />
        </Block>
        <Block title="Chọn đồ ăn" topGap={false}>
          <FoodCateen title="Chọn bỏng 🍿" foods={popcornTypes} />
          <FoodCateen title="Chọn đồ uống 🥤" foods={drinkTypes} />
        </Block>
        <Block title="Merchandise">
          {merchandiseItems.map((item) => (
            <div key={item.label} className="flex w-full mb-2 gap-2">
              <Image src={item.imgSrc} alt="merch" width={100} height={200} />
              <CounterInput
                className="mb-4 last:mb-0 flex-1 flex-col !items-start"
                label={item.label}
                description={item.description}
                price={item.price}
                value={item.value}
                setValue={item.setValue}
                showPrice={false}
              />
            </div>
          ))}
        </Block>
        <Block title="Thanh toán" forceOpen topGap={false}>
          <div className="lg:flex">
            <div>
              <BookingInfo
                selectedSeat={selectedSeat}
                popcorn={popcorn}
                drink={drink}
                merch={merch}
                showTotal
              />
              <p className="font-medium italic text-error">
                * Lưu ý: Vé đã mua không hoàn lại, xin cảm ơn.
              </p>
            </div>
            <div className="divider divider-horizontal" />
            <div className="mt-4 lg:mt-0">
              <p className="font-medium italic text-error lg:w-[300px]">
                * Nội dung chuyển khoản: SĐT + số ghế. Ví dụ: 0987654321 G9 G10
              </p>
              <Image
                className="m-auto my-4"
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
  topGap = true,
  ...props
}: PropsWithChildren<ComponentProps<"div">> & {
  title?: string;
  forceOpen?: boolean;
  topGap?: boolean;
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
        {topGap && <div className="h-4" />}
        {children}
      </div>
    </div>
  );
};
