import commaStringToArray from "../../src/utils/commaStringToArray"; // Import the function to be tested

describe("commaStringToArray function", () => {
  // Describe groups together related tests for the 'commaStringToArray' function
  it("should return an array of strings when a comma-separated string is passed", () => {
    // A test case expects a result
    const input = "apple, banana, orange"; // The input string we want to test
    const expectedOutput = ["apple", "banana", "orange"]; // The expected output after splitting the string by commas

    // The next line tests the function by calling it with the 'input' and expecting the result to match the 'expectedOutput'
    expect(commaStringToArray(input)).toEqual(expectedOutput);
  });

  it("should handle extra spaces around items", () => {
    // Testing how the function handles extra spaces around the comma-separated items
    const input = "apple ,  banana ,  orange ";
    const expectedOutput = ["apple", "banana", "orange"]; // After trimming, the result should not have spaces

    // The function should split and trim correctly
    expect(commaStringToArray(input)).toEqual(expectedOutput);
  });

  it("should return an array with one item when only one item is provided", () => {
    // Test for a case with only one item in the string
    const input = "apple";
    const expectedOutput = ["apple"]; // The output should be an array with one element

    // The function should return the same element inside an array
    expect(commaStringToArray(input)).toEqual(expectedOutput);
  });
});
