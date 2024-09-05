export const MERCHANDISE_PRICES = {
  cup: 95,
  lobster: 95,
};

export type MerchData = {
  cup: number;
  lobster: number;
};

export const MERCHANDISE_LABELS = {
  cup: "Ly nước F.R.I.E.N.D.S",
  lobster: "Túi + móc khoá tôm hùm",
};

export const calcMerchTotal = (data?: MerchData) => {
  return !data
    ? 0
    : Object.keys(data).reduce(
        (total, key: string) =>
          total +
          data[key as keyof typeof data] *
            MERCHANDISE_PRICES[key as keyof typeof MERCHANDISE_PRICES],
        0
      );
};
