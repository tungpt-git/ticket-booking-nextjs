export type TSeat = {
  id: string;
  idx: number | number[];
  name: string;
  type: "normal" | "vip" | "placeholder" | "multiple";
  rowName: string;
  price?: number;
  booked?: boolean;
};

export const labelLookup: Partial<Record<TSeat["type"], string>> = {
  normal: "Ghế thường",
  vip: "Ghế VIP",
  multiple: "Ghế đôi",
};
