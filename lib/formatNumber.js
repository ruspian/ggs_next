export const formatSingkatNomer = (number) => {
  if (number === null || number === undefined) return "0";

  return new Intl.NumberFormat("id-ID", {
    notation: "compact",
    compactDisplay: "short",
    maximumFractionDigits: 1,
  }).format(number);
};
