const to2Digits = (numb: number) => (numb < 10 ? `0${numb}` : `${numb}`);

export const secondsToMinutes = (seconds: number) => {
  const min = Math.floor(seconds / 60);
  const sec = Math.round(seconds % 60);
  return `${to2Digits(min)}:${to2Digits(sec)}`;
};
