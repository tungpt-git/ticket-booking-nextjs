import React, {
  ComponentProps,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";
//
import { type TSeat } from "@/core/seat/types";
//
import { Button, FileUpload, Input } from "@/components";
import { Modal } from "@/components/Modal";

import { BookingInfo } from "../_components/BookingInfo";
import { useServerAction } from "@/utils/hooks/useServerAction";
import { handlePayment } from "@/services/payment/payment";
import classNames from "classnames";
import { formatPrice } from "@/core/seat/price";
import { Counter } from "@/components/Counter";

const PRICES = {
  POPCORN: 65,
  DRINK: 30,
  COMBO: 90,
};

enum EStep {
  USER_INFO,
  CHECKOUT,
}

const SubmitLabel = {
  [EStep.USER_INFO]: "Tiếp tục",
  [EStep.CHECKOUT]: "Hoàn thành",
};

export type TUserForm = {
  name: string;
  phone: string;
  email: string;
  bill: File;
};

type Props = {
  onPayment?(data: TUserForm): Promise<void>;
  selectedSeat: TSeat[];
  setPreviewType: React.Dispatch<React.SetStateAction<TSeat["type"] | null>>;
};

const UserInfoForm = ({ defaultValue }: { defaultValue?: TUserForm }) => {
  useEffect(() => {});
  return (
    <div className="flex flex-col gap-2">
      <Input
        name="name"
        placeholder="Họ và tên"
        label="Họ và tên"
        required
        defaultValue={defaultValue?.name}
      />
      <Input
        name="phone"
        placeholder="Số điện thoại"
        label="Số điện thoại"
        required
        defaultValue={defaultValue?.phone}
      />
      <Input
        name="email"
        placeholder="Email"
        label="Email"
        required
        defaultValue={defaultValue?.email}
      />
    </div>
  );
};

const Content = ({
  onClose,
  selectedSeat,
  setPreviewType,
  onPayment,
}: Pick<React.ComponentProps<typeof Modal>, "open" | "onClose"> & Props) => {
  const userFormRef = useRef<HTMLFormElement | null>(null);
  const [userData, setUserData] = useState<TUserForm>();
  const checkoutFormRef = useRef<HTMLFormElement | null>(null);
  const [step, setStep] = useState<EStep>(EStep.USER_INFO);
  const [popcorn, setPopcorn] = useState<number>(0);
  const [drink, setDrink] = useState<number>(0);
  const [combo, setCombo] = useState<number>(0);

  const [runAction, paymentLoading] = useServerAction(handlePayment);

  const onCheckoutFormSubmit = async (formData: FormData) => {
    if (!userData) return;
    const data = Object.fromEntries(formData) as TUserForm;
    onPayment?.({ ...userData, ...data });
    await runAction(selectedSeat, formData);
    onClose?.();
  };

  const onUserFormSubmit = async (formData: FormData) => {
    setUserData(Object.fromEntries(formData) as TUserForm);
    setStep(EStep.CHECKOUT);
  };

  return (
    <>
      <Modal.Body>
        <Steps activeStep={step} />
        {step === EStep.USER_INFO && (
          <div>
            <div className="mt-4 border-2 border-dashed rounded p-4">
              <h4 className="font-medium text-xl">Thông tin cá nhân</h4>
              <form ref={userFormRef} action={onUserFormSubmit}>
                <UserInfoForm defaultValue={userData} />
              </form>
            </div>
            <div className="mt-4 flex flex-col gap-2 border-2 border-dashed rounded p-4">
              <CounterInput
                label="Bỏng?🍿"
                price={PRICES.POPCORN}
                value={popcorn}
                setValue={setPopcorn}
              />
              <CounterInput
                label="Nước?🥤"
                price={PRICES.DRINK}
                value={drink}
                setValue={setDrink}
              />
              <CounterInput
                label="Combo Bỏng + Nước"
                price={PRICES.COMBO}
                value={combo}
                setValue={setCombo}
              />
            </div>
          </div>
        )}
        {step === EStep.CHECKOUT && (
          <div className="flex mt-8">
            <BookingInfo
              selectedSeat={selectedSeat}
              setPreviewType={setPreviewType}
            />
            <div className="divider divider-horizontal" />
            <form ref={checkoutFormRef} action={onCheckoutFormSubmit}>
              <Image
                className="m-auto"
                alt="bank_account_qr"
                src="/images/qr-ha.jpg"
                width={300}
                height={250}
                unoptimized
                loader={({ src }) => src}
              />
              <FileUpload className="mt-2 mb-4 m-auto" required name="bill" />
            </form>
          </div>
        )}
      </Modal.Body>
      <Modal.Action>
        {step !== EStep.USER_INFO && (
          <Button
            onClick={() => {
              setStep(EStep.USER_INFO);
            }}
            disabled={paymentLoading}
          >
            Quay lại
          </Button>
        )}
        <Button
          variant="primary"
          loading={paymentLoading}
          className="flex-1"
          onClick={() => {
            if (!selectedSeat.length || paymentLoading) return;
            const action = {
              [EStep.USER_INFO]: () => userFormRef.current?.requestSubmit(),
              [EStep.CHECKOUT]: () => checkoutFormRef.current?.requestSubmit(),
            }[step];

            action?.();
          }}
        >
          {SubmitLabel[step]}
        </Button>
        <Button onClick={onClose} disabled={paymentLoading}>
          Đóng
        </Button>
      </Modal.Action>
    </>
  );
};

export const PaymentComplete = (
  props: Pick<React.ComponentProps<typeof Modal>, "open" | "onClose"> & Props
) => {
  return (
    <Modal open={props.open} onClose={props.onClose} className="min-w-[800px]">
      <Modal.Title>Thanh toán</Modal.Title>
      {props.open && <Content {...props} />}
    </Modal>
  );
};

const Steps = ({ activeStep = EStep.USER_INFO }: { activeStep: EStep }) => {
  const steps = [
    {
      id: EStep.USER_INFO,
      label: "Thông tin cá nhân",
    },
    {
      id: EStep.CHECKOUT,
      label: "Chuyển khoản",
    },
  ];
  return (
    <ul className="steps w-full">
      {steps.map((step, idx) => (
        <li
          key={step.id}
          data-content={idx + 1}
          className={classNames("step", {
            "step-primary": activeStep >= step.id,
          })}
        >
          {step.label}
        </li>
      ))}
    </ul>
  );
};

const CounterInput = ({
  label,
  value,
  setValue,
  price,
}: ComponentProps<typeof Counter> & { price: number; label: string }) => {
  return (
    <div className="flex justify-between">
      <div className="flex gap-2 items-start">
        <div>
          <div>{label}</div>
          <div className="text-sm">{formatPrice(price)}</div>
        </div>
        <Counter value={value} setValue={setValue} min={0} max={100} />
      </div>
      {value > 0 && (
        <span className="font-medium">{`${formatPrice(value * price)}`}</span>
      )}
    </div>
  );
};
