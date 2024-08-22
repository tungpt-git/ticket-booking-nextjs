import classNames from "classnames";
import { ComponentProps } from "react";

type Props = {
  className?: string;
  required?: boolean;
} & ComponentProps<"input">;
export const FileUpload = ({ className, ...props }: Props) => {
  return (
    <input
      {...props}
      type="file"
      className={classNames("file-input w-full file-input-bordered", className)}
    />
  );
};
