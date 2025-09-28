export const buildURLParams = (overrides: Record<string, string | number>) => {
  const params = new URLSearchParams("");
  Object.entries(overrides).forEach(([key, value]) => {
    params.set(key, value as string);
  });
  return params.toString();
};
