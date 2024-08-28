/* eslint-disable @next/next/no-img-element */

import React, { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  imageSrc?: string | React.ReactNode;
}>;

export const Card = ({ imageSrc, children }: Props) => {
  return (
    <div className="card lg:card-side bg-base-100 shadow-xl">
      {!!imageSrc && (
        <figure>
          {typeof imageSrc === "string" ? (
            <img src={imageSrc} alt="Album" />
          ) : (
            imageSrc
          )}
        </figure>
      )}
      <div className="card-body">{children}</div>
    </div>
  );
};
