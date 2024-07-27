import { TSeat } from "@/core/seat/types";

export const makeId = (row: string, idx: number | number[]) =>
  [row, Array.isArray(idx) ? idx.join(",") : idx].join("");

export const fullSingleSeatRow = ({
  rowName,
  seatIndex,
  placeholderIndexes,
  vipIndex,
}: {
  rowName: string;
  vipIndex?: number[];
  placeholderIndexes?: number[];
  seatIndex: number[];
}) => {
  const placeholders = placeholderIndexes?.reduce(
    (acc: Record<string, TSeat>, index) => {
      const idx = index;
      const id = makeId(rowName, index);
      const seatInfo = {
        rowName,
        id,
        idx: idx,
        name: "",
        type: "placeholder" as const,
      };

      acc[id] = seatInfo;

      return acc;
    },
    {}
  );

  const seats = seatIndex.reduce((acc: Record<string, TSeat>, idx) => {
    const id = makeId(rowName, idx + 1);
    const seatInfo = {
      rowName,
      id,
      idx,
      name: [rowName, idx + 1].join(""),
      type: vipIndex?.includes(idx) ? ("vip" as const) : ("normal" as const),
    };
    acc[id] = seatInfo;

    return acc;
  }, {});

  return { ...placeholders, ...seats };
};

export const fullCoupleSeatRow = ({
  rowName,
  seatIndex,
  placeholderIndexes,
}: {
  rowName: string;
  placeholderIndexes?: number[];
  seatIndex: number[];
}) => {
  const placeholders = placeholderIndexes?.reduce(
    (acc: Record<string, TSeat>, idx) => {
      const id = makeId(rowName, idx + 1);
      const seatInfo = {
        rowName,
        id,
        idx: idx,
        name: "",
        type: "placeholder" as const,
      };

      acc[id] = seatInfo;

      return acc;
    },
    {}
  );
  const seats = seatIndex.reduce((acc: Record<string, TSeat>, index) => {
    const idxs = [index, index + 1];
    const id = makeId(rowName, idxs);

    const seatInfo = {
      rowName,
      id,
      idx: idxs,
      name: idxs.map((idx) => [rowName, idx].join("")).join(", "),
      type: "multiple" as const,
    };

    acc[id] = seatInfo;

    return acc;
  }, {});

  return { ...placeholders, ...seats };
};
