import { Seat } from "@/core/seat/types";

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
    (acc: Record<string, Seat>, index) => {
      const idx = index.toString();
      const seatInfo = {
        id: [rowName, index].join(""),
        idx: idx,
        name: idx,
        isVip: false,
        isPlaceholder: true,
      };

      acc[idx] = seatInfo;

      return acc;
    },
    {}
  );

  const seats = seatIndex.reduce((acc: Record<string, Seat>, _idx) => {
    const idx = _idx.toString();
    const name = (_idx + 1).toString();

    const seatInfo = {
      id: [rowName, name].join(""),
      idx,
      name,
      isVip: vipIndex?.includes(_idx) ?? false,
    };
    acc[idx] = seatInfo;

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
    (acc: Record<string, Seat>, index) => {
      const idx = index.toString();
      const seatInfo = {
        id: [rowName, index].join(""),
        idx: idx,
        name: idx,
        isVip: false,
        isPlaceholder: true,
      };

      acc[idx] = seatInfo;

      return acc;
    },
    {}
  );
  const seats = seatIndex.reduce((acc: Record<string, Seat>, index) => {
    const idxs = [index, index + 1].map(String);

    const seatInfo = {
      id: [rowName, idxs.join(",")].join(""),
      idx: idxs,
      name: idxs.join(","),
      isVip: false,
    };

    acc[index.toString()] = seatInfo;

    return acc;
  }, {});

  return { ...placeholders, ...seats };
};
