export const random = (min = -1, max = 1) => {
  return min + Math.random() * (max - min);
};

export const median = (array: number[]): number => {
  if (array.length === 0) {
    return 0;
  }
  let acc = 0;
  for (let i = 0; i < array.length; ++i) {
    acc += array[i];
  }
  return acc / array.length;
};
