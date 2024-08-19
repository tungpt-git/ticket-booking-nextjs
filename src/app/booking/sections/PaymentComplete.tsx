import React, { useRef } from "react";
import Image from "next/image";
//
import { type TSeat } from "@/core/seat/types";
//
import { Button, FileUpload, Input } from "@/components";
import { Modal } from "@/components/Modal";

import { BookingInfo } from "../_components/BookingInfo";
import { useServerAction } from "@/utils/hooks/useServerAction";
import { handlePayment } from "@/services/payment/payment";

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

const Content = ({
  onClose,
  selectedSeat,
  setPreviewType,
  onPayment,
}: Pick<React.ComponentProps<typeof Modal>, "open" | "onClose"> & Props) => {
  const formRef = useRef<HTMLFormElement | null>(null);

  const [runAction, paymentLoading] = useServerAction(handlePayment);

  const onSubmit = async (formData: FormData) => {
    const data = Object.fromEntries(formData) as TUserForm;
    onPayment?.(data);
    await runAction(selectedSeat, formData);
    onClose?.();
  };

  return (
    <>
      <Modal.Body>
        <div className="flex justify-between">
          <BookingInfo
            {...{
              selectedSeat,
              setPreviewType,
            }}
          />
          <div className="divider divider-horizontal"></div>
          <form ref={formRef} className="w-[480px]" action={onSubmit}>
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
        <Button
          variant="primary"
          loading={paymentLoading}
          className="flex-1"
          onClick={() => {
            if (!selectedSeat.length) return;
            formRef.current?.requestSubmit();
          }}
        >
          Hoàn thành
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
