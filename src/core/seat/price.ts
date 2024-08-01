import { TSeat } from "./types";

export const PRICE = Object.freeze({
  normal: 210000,
  vip: 300000,
  multiple: 300000,
  placeholder: 0,
});

export const getSeatPrice = (seat: Pick<TSeat, "type">) => {
  return PRICE[seat.type];
};

export const formatPrice = (value: number) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "VND",
  });
  return formatter.format(value);
};
