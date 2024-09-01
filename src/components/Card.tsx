/* eslint-disable @next/next/no-img-element */

import classNames from "classnames";
import React, { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  imageSrc?: string | React.ReactNode;
  className?: string;
}>;

export const Card = ({ imageSrc, children, className }: Props) => {
  return (
    <div
      className={classNames(
        "card lg:card-side bg-base-100 shadow-lg rounded-lg",
        className
      )}
    >
      {!!imageSrc && (
        <figure>
          {typeof imageSrc === "string" ? (
            <img src={imageSrc} alt="Album" />
          ) : (
            imageSrc
          )}
        </figure>
      )}
      <div className="card-body px-3 lg:px-8">{children}</div>
    </div>
  );
};
