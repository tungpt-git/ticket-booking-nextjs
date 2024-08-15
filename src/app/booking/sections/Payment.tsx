"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";

//
import groupBy from "lodash-es/groupBy";
//
import { TotalPrice } from "../_components/TotalPrice";
import { PaymentInfo } from "../_components/PaymentInfo";
//
import { type TSeat } from "@/core/seat/types";
//
import { Button, FileUpload, Input } from "@/components";
import { Modal } from "@/components/Modal";

const IconBack = () => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    viewBox="0 0 24 24"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path>
  </svg>
);

enum EPaymentStep {
  CONFIRM = "confirm",
  GIVE_MONEY = "givemoney",
}

const StepLabel = {
  [EPaymentStep.CONFIRM]: (
    <span>
      <span className="text-2xl">🎫</span> Thông tin vé
    </span>
  ),
  [EPaymentStep.GIVE_MONEY]: "Thanh toán",
};

const StepButtonLabel = {
  [EPaymentStep.CONFIRM]: "Thanh toán",
  [EPaymentStep.GIVE_MONEY]: "Thanh toán",
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
  toggleDisabledAll(value: boolean): void;
};

export function Payment({
  onPayment,
  selectedSeat,
  setPreviewType,
  toggleDisabledAll,
}: Props) {
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [step, setStep] = useState<EPaymentStep>(EPaymentStep.CONFIRM);
  const formRef = useRef<HTMLFormElement | null>(null);

  const handlePayment = async () => {
    if (!selectedSeat.length) return;

    if (step === EPaymentStep.CONFIRM) {
      toggleDisabledAll(true);
      setStep(EPaymentStep.GIVE_MONEY);
      return;
    }

    formRef.current?.requestSubmit();
    return;
  };

  const goBack = () => {
    setStep(EPaymentStep.CONFIRM);
    toggleDisabledAll(false);
  };

  return (
    <div className="flex flex-col justify-between bg-gray-50 rounded-xl p-6 shadow-inheritshrink-0 shadow-2xl">
      <h3 className="text-xl font-medium uppercase">Thông tin vé</h3>
      <BookingInfo
        {...{ onPayment, selectedSeat, setPreviewType, toggleDisabledAll }}
      />
      <Button
        rounded
        className="w-full mt-auto"
        onClick={handlePayment}
        loading={paymentLoading}
        variant="primary"
      >
        {StepButtonLabel[step]}
      </Button>
      <Modal
        open={step === EPaymentStep.GIVE_MONEY}
        onClose={goBack}
        className="min-w-[760px]"
      >
        <Modal.Title>Thank toán</Modal.Title>
        <Modal.Body>
          <div className="flex justify-between">
            <BookingInfo
              {...{
                onPayment,
                selectedSeat,
                setPreviewType,
                toggleDisabledAll,
              }}
            />
            <div className="divider divider-horizontal"></div>
            <form
              className="w-[360px]"
              action={async (formData) => {
                const data = Object.fromEntries(formData) as TUserForm;

                try {
                  setPaymentLoading(true);
                  await onPayment?.(data);
                  setStep(EPaymentStep.CONFIRM);
                } finally {
                  setPaymentLoading(false);
                }
              }}
              ref={formRef}
            >
              <UserInfoForm />
              <div className="mt-4 m-auto">
                <p className="font-medium"> Sau đó upload ảnh chuyển khoản</p>
                <FileUpload className="mt-2 mb-4 m-auto" required name="bill" />

                <Image
                  className="m-auto"
                  alt="bank_account_qr"
                  src={process.env.NEXT_PUBLIC_QR_URL!}
                  width={300}
                  height={250}
                  unoptimized
                  loader={({ src }) => src}
                />
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Action>
          <Button variant="primary" rounded>
            Hoàn thành
          </Button>
        </Modal.Action>
      </Modal>
    </div>
  );
}

const UserInfoForm = () => {
  return (
    <div className="flex flex-col gap-2">
      <p className="font-medium">Vui lòng cung cấp những thông tin dưới đây</p>
      <Input name="name" placeholder="Họ và tên" required />
      <Input name="phone" placeholder="Số điện thoại" required />
      <Input name="email" placeholder="Email" required />
    </div>
  );
};

const BookingInfo = ({ selectedSeat, setPreviewType }: Props) => {
  const seatGroupByType = groupBy(selectedSeat, (el) => el.type);

  return (
    <div className="w-[360px]">
      {Object.keys(seatGroupByType).map((type) => {
        return (
          <PaymentInfo
            key={type}
            type={type as TSeat["type"]}
            count={seatGroupByType[type].length}
            seats={seatGroupByType[type]}
            onMouseEnter={() => {
              setPreviewType(type as TSeat["type"]);
            }}
            onMouseLeave={() => {
              setPreviewType(null);
            }}
          />
        );
      })}
      {selectedSeat.length > 0 && <TotalPrice seats={selectedSeat} />}
    </div>
  );
};
