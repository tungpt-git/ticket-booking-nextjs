import { PropsWithChildren } from "react";
import classNames from "classnames";

type Props = PropsWithChildren<{
  open?: boolean;
  title?: React.ReactNode;
}>;

export const Modal = ({ open, title, children }: Props) => {
  return (
    <div
      className={classNames("modal", {
        "modal-open": open,
      })}
      role="dialog"
    >
      <div className="modal-box">
        {typeof title === "string" ? <Title>{title}</Title> : title}
        {children}
      </div>
    </div>
  );
};

const Title = ({ children }: PropsWithChildren) => (
  <h3 className="text-lg font-bold">{children}</h3>
);

const Body = ({ children }: PropsWithChildren) => (
  <div className="modal-body">{children}</div>
);

const Action = ({ children }: PropsWithChildren) => (
  <div className="modal-action">{children}</div>
);

Modal.Title = Title;
Modal.Body = Body;
Modal.Action = Action;
