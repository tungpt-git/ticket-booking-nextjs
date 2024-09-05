"use client";
import classNames from "classnames";
import { PropsWithChildren, ReactNode, useState } from "react";

export const Collapse = ({
  title,
  children,
}: PropsWithChildren & { title: ReactNode }) => {
  const [open, setOpen] = useState(true);
  return (
    <div className={classNames("collapse", { "collapse-open": open })}>
      <input
        type="checkbox"
        className="cursor-pointer min-h-0 pe-0 px-0"
        checked={open}
        onChange={(evt) => setOpen(evt.target.checked)}
      />
      <div className="collapse-title font-medium min-h-0 pe-0 px-0 flex gap-2">
        {open ? "-" : "+"}
        {title}
      </div>
      <div className="collapse-content">{children}</div>
    </div>
  );
};
