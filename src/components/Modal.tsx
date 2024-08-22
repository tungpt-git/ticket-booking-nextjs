import React, { PropsWithChildren, useId } from "react";
import classNames from "classnames";

type Props = PropsWithChildren<{
  open?: boolean;
  title?: React.ReactNode;
  onClose?: VoidFunction;
  closeOnClickOutside?: boolean;
}> &
  Pick<React.ComponentProps<"dialog">, "className">;

export const Modal = ({
  open,
  title,
  children,
  className,
  onClose,
  closeOnClickOutside = false,
}: Props) => {
  const id = useId();
  return (
    <dialog
      id={id}
      className={classNames("modal", {
        "modal-open": open,
      })}
      role="dialog"
    >
      <div className={classNames("modal-box py-0", className)}>
        {typeof title === "string" ? <Title>{title}</Title> : title}
        {children}
      </div>
      {closeOnClickOutside && (
        <label className="modal-backdrop" htmlFor={id} onClick={onClose}>
          Close
        </label>
      )}
    </dialog>
  );
};

const Title = ({ children }: PropsWithChildren) => (
  <h3 className="font-medium text-2xl mb-2 pt-6 sticky top-0 bg-inherit z-20">
    {children}
  </h3>
);

const Body = ({ children }: PropsWithChildren) => (
  <div className="modal-body">{children}</div>
);

const Action = ({ children }: PropsWithChildren) => (
  <div className="modal-action pb-6 sticky bottom-0 bg-inherit z-20">
    {children}
  </div>
);

Modal.Title = Title;
Modal.Body = Body;
Modal.Action = Action;
