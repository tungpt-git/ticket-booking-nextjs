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

export const PRICES = {
  POPCORN: 65,
  DRINK: 30,
  COMBO: 90,
};

export const calcBillTotal = ({
  seats,
  popcorn = 0,
  drink = 0,
  combo = 0,
}: {
  seats: TSeat[];
  popcorn: number;
  drink: number;
  combo: number;
}) =>
  sumPrice(seats) +
  PRICES.POPCORN * popcorn +
  PRICES.DRINK * drink +
  PRICES.COMBO * combo;
