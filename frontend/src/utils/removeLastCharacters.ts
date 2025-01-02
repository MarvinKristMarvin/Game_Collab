// Removes the n last characters from a string
function removeLastCharacters(str: string, amount: number) {
  if (str.length <= amount) {
    return "";
  }
  return str.slice(0, -amount);
}

export default removeLastCharacters;
