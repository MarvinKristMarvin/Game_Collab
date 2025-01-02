// Takes a string separated by commas and return and array of strings, removing commas
const stringToArray = (str: string): string[] => {
  return str.split(",").map((item) => item.trim());
};

export default stringToArray;
