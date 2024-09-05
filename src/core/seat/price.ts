import { DrinkData, PopcornData } from "../foods";
import { calcMerchTotal, MerchData } from "../merchandise";
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

export const countPopcorn = (data?: PopcornData) =>
  !data ? 0 : Object.values(data).reduce((total, count) => total + count, 0);

export const countDrink = (data?: DrinkData) =>
  !data ? 0 : Object.values(data).reduce((total, count) => total + count, 0);

export const calcPopcornTotal = (data?: PopcornData) =>
  !data
    ? 0
    : Object.values(data).reduce(
        (total, count) => total + count * PRICES.POPCORN,
        0
      );

export const calcDrinkTotal = (data?: DrinkData) =>
  !data
    ? 0
    : Object.values(data).reduce(
        (total, count) => total + count * PRICES.DRINK,
        0
      );

export const calcBillTotal = ({
  seats,
  popcornData,
  drinkData,
  merchData,
}: {
  seats: TSeat[];
  popcornData?: PopcornData;
  drinkData?: DrinkData;
  merchData?: MerchData;
}) =>
  sumPrice(seats) +
  calcPopcornTotal(popcornData) +
  calcDrinkTotal(drinkData) +
  calcMerchTotal(merchData);
