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

enum EPaymentStep {
  CONFIRM = "confirm",
  GIVE_MONEY = "givemoney",
}

const StepLabel = {
  [EPaymentStep.CONFIRM]: "Thông tin vé",
  [EPaymentStep.GIVE_MONEY]: "Thanh toán",
};

const StepButtonLabel = {
  [EPaymentStep.CONFIRM]: "Xác nhận",
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
};

export function Payment({ onPayment, selectedSeat, setPreviewType }: Props) {
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [step, setStep] = useState<EPaymentStep>(EPaymentStep.CONFIRM);
  const formRef = useRef<HTMLFormElement | null>(null);

  const seatGroupByType = groupBy(selectedSeat, (el) => el.type);

  const handlePayment = async () => {
    console.log("handlePayment", selectedSeat, step);
    if (!selectedSeat.length) return;

    if (step === EPaymentStep.CONFIRM) {
      setStep(EPaymentStep.GIVE_MONEY);
      return;
    }

    formRef.current?.requestSubmit();
    return;
  };

  return (
    <div className="flex flex-col justify-between bg-gray-50 rounded-xl p-6 shadow-inherit min-w-[400px] shrink-0 shadow-2xl">
      <div>
        <h3 className="text-xl font-medium uppercase mb-2">
          {StepLabel[step]}
        </h3>
        {step === EPaymentStep.CONFIRM && (
          <>
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
          </>
        )}
        {step === EPaymentStep.GIVE_MONEY && (
          <div className="">
            <form
              action={async (formData) => {
                const data = Object.fromEntries(formData) as TUserForm;
                console.log("data", data);

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
              <Image
                className="my-4 m-auto"
                alt="bank_account_qr"
                src={process.env.NEXT_PUBLIC_QR_URL!}
                width={300}
                height={250}
                unoptimized
                loader={({ src }) => src}
              />
              <FileUpload className="mb-4" required name="bill" />
            </form>
          </div>
        )}
      </div>

      <Button
        rounded
        className="w-full mt-auto"
        onClick={handlePayment}
        loading={paymentLoading}
        variant="primary"
      >
        {StepButtonLabel[step]}
      </Button>
    </div>
  );
}

const UserInfoForm = () => {
  return (
    <>
      <Input name="name" placeholder="Họ và tên" required />
      <Input name="phone" placeholder="Số điện thoại" required />
      <Input name="email" placeholder="Email" required />
    </>
  );
};
