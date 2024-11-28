const stringToArray = (str: string): string[] => {
  return str.split(",").map((item) => item.trim());
};

export default stringToArray;
