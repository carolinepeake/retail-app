export const capitalizeFirstLetter = (string) => {
  const formattedString = string.charAt(0).toUpperCase() + string.slice(1);
  return formattedString;
};