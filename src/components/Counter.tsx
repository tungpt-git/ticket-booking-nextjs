import isNumber from "lodash-es/isNumber";
import { Dispatch, SetStateAction } from "react";

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
      <button onClick={decrease} type="button">
        <svg
          viewBox="64 64 896 896"
          focusable="false"
          data-icon="minus-circle"
          width="1em"
          height="1em"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M696 480H328c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h368c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8z"></path>
          <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
        </svg>
      </button>
      {value}
      <button onClick={increase} type="button">
        <svg
          viewBox="64 64 896 896"
          focusable="false"
          data-icon="plus-circle"
          width="1em"
          height="1em"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M696 480H544V328c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v152H328c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h152v152c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V544h152c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8z"></path>
          <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
        </svg>
      </button>
    </div>
  );
};
