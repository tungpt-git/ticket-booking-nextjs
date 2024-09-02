import classNames from "classnames";
import { ComponentProps } from "react";
import { Label } from "./Label";

type Props = {
  className?: string;
  required?: boolean;
  label?: string;
  inputClassName?: string;
} & ComponentProps<"input">;
export const FileUpload = ({
  className,
  label,
  inputClassName,
  ...props
}: Props) => {
  return (
    <label className={classNames("form-control w-full max-w-xs", className)}>
      {!!label && <Label {...props}>{label}</Label>}

      <input
        {...props}
        type="file"
        className={classNames(
          "file-input w-full file-input-bordered",
          inputClassName
        )}
      />
    </label>
  );
};
