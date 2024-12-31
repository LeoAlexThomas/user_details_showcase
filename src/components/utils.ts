export const convertFirstLetterUpperCase = (str: string): string => {
  return str[0].toUpperCase() + str.substring(1, str.length);
};
