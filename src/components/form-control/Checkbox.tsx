import classNames from "classnames";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren & {
  className?: string;
};

export const Checkbox = ({ children, className }: Props) => {
  return (
    <div className="form-control">
      <label className="label cursor-pointer">
        <input
          type="checkbox"
          defaultChecked
          className={classNames("checkbox", className)}
        />
        <span className="label-text ml-1">{children}</span>
      </label>
    </div>
  );
};
