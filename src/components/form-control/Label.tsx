import classNames from "classnames";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  error?: boolean;
  required?: boolean;
}>;
export const Label = ({ children, error, required }: Props) => {
  return (
    <div className="label">
      <span
        className={classNames("label-text font-medium", {
          "text-error": !!error,
        })}
      >
        {children}
        {required && <span className="text-error"> *</span>}
      </span>
    </div>
  );
};
