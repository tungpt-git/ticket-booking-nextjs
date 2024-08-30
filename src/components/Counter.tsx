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
      <Button size="xs" variant="primary" onClick={decrease}>
        <svg
          viewBox="64 64 896 896"
          focusable="false"
          data-icon="minus"
          width="1em"
          height="1em"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M872 474H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h720c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z"></path>
        </svg>
      </Button>
      {value}
      <Button size="xs" variant="primary" onClick={increase}>
        <svg
          viewBox="64 64 896 896"
          focusable="false"
          data-icon="plus"
          width="1em"
          height="1em"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z"></path>
          <path d="M192 474h672q8 0 8 8v60q0 8-8 8H160q-8 0-8-8v-60q0-8 8-8z"></path>
        </svg>
      </Button>
    </div>
  );
};
