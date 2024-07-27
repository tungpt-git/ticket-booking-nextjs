export type TSeat = {
  id: string;
  idx: number | number[];
  name: string;
  type: "normal" | "vip" | "placeholder" | "multiple";
  rowName: string;
};
