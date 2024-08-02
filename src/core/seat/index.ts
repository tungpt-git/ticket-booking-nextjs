import {
  fullCoupleSeatRow,
  fullSingleSeatRow,
} from "../helpers/generate-seats";

export const slotCount = 17;

export const allSeats = {
  ...fullSingleSeatRow({
    rowName: "A",
    seatIndex: Array.from({ length: slotCount }).map((_, idx) => idx),
  }),
  ...fullSingleSeatRow({
    rowName: "B",
    seatIndex: Array.from({ length: slotCount }).map((_, idx) => idx),
  }),
  ...fullSingleSeatRow({
    rowName: "C",
    seatIndex: Array.from({ length: slotCount }).map((_, idx) => idx),
  }),
  ...fullSingleSeatRow({
    rowName: "D",
    seatIndex: Array.from({ length: slotCount }).map((_, idx) => idx),
  }),
  ...fullSingleSeatRow({
    rowName: "E",
    seatIndex: Array.from({ length: slotCount }).map((_, idx) => idx),
    vipIndex: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),
  ...fullSingleSeatRow({
    rowName: "F",
    seatIndex: Array.from({ length: slotCount }).map((_, idx) => idx),
    vipIndex: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),
  ...fullSingleSeatRow({
    rowName: "G",
    seatIndex: Array.from({ length: slotCount }).map((_, idx) => idx),
    vipIndex: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),
  ...fullSingleSeatRow({
    rowName: "H",
    seatIndex: Array.from({ length: slotCount }).map((_, idx) => idx),
    vipIndex: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),
  ...fullCoupleSeatRow({
    rowName: "I",
    seatIndex: [1, 3, 5, 7, 9, 11, 13],
    placeholderIndexes: [0, 15, 16],
  }),
};
