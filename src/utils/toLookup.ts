type Key = string | number | symbol;
export function toLookup<T>(data: T[], getKey: (item: T) => Key) {
  return data.reduce((acc, cur) => {
    return {
      ...acc,
      [getKey(cur)]: cur,
    };
  }, {} as Record<Key, T>);
}
