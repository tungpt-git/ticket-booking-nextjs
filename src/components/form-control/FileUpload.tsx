import classNames from "classnames";

type Props = {
  className?: string;
  required?: boolean;
  name: string;
};
export const FileUpload = ({ className, required, name }: Props) => {
  return (
    <input
      type="file"
      name={name}
      className={classNames("file-input w-full", className)}
      required={required}
    />
  );
};
