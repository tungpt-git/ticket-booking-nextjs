export type Seat = {
  id: string;
  idx: string | string[];
  name: string;
  type: "normal" | "vip";
  isPlaceholder?: boolean;
};
