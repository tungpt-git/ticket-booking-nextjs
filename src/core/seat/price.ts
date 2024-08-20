import { TSeat } from "./types";

export const formatPrice = (value: number, multipler = 1000) => {
  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  return formatter.format(value * multipler);
};

export const sumPrice = (seats: TSeat[]): number =>
  seats.reduce((total, seat) => total + (seat.price ?? 0), 0);
