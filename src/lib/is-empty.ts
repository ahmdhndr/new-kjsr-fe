export const isEmpty = (value: string | number | undefined): boolean => {
  return value === "" || value === null || typeof value === "undefined";
};
