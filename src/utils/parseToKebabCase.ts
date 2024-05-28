export const parseToKebabCase = (str: string) => {
  const strToLower = str.toLowerCase();
  return strToLower
    .split(" ")
    .filter((word) => word !== "")
    .join("-");
};
