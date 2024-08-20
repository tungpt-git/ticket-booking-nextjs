import isNumber from "lodash-es/isNumber";
import { Dispatch, SetStateAction } from "react";
import { Button } from "./Button";

export const Counter = ({
  value,
  setValue,
  min,
  max,
}: {
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
  min?: number;
  max?: number;
}) => {
  const decrease = () => {
    setValue(isNumber(min) && value > min ? value - 1 : value);
  };
  const increase = () => {
    setValue(isNumber(max) && value < max ? value + 1 : value);
  };
  return (
    <div className="flex items-center gap-1">
      <Button size="xs" onClick={decrease}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M6 12L18 12"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Button>
      {value}
      <Button size="xs" onClick={increase}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
        >
          <path
            fillRule="evenodd"
            d="M 11 2 L 11 11 L 2 11 L 2 13 L 11 13 L 11 22 L 13 22 L 13 13 L 22 13 L 22 11 L 13 11 L 13 2 Z"
          ></path>
        </svg>
      </Button>
    </div>
  );
};
