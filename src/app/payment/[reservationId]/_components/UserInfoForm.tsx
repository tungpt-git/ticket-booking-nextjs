import { Input } from "@/components";
import { TUserForm } from "@/core/checkout/types";

export const UserInfoForm = ({
  defaultValue,
}: {
  defaultValue?: TUserForm;
}) => {
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
