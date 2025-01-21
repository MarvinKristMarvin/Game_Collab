import decodeSanitized from "../../src/utils/decodeSanitized"; // Import the function to be tested

describe("decodeSanitized function", () => {
  // Grouping related tests for the decodeSanitized function

  it("should decode sanitized HTML entities back to the original characters", () => {
    // Test case: Decoding special HTML entities

    const input = "&lt;div&gt;Hello &amp; welcome&lt;/div&gt;";
    // The input string contains HTML entities like &lt;, &gt;, &amp;
    const expectedOutput = "<div>Hello & welcome</div>";
    // The expected output is the decoded version of the string

    // Call the function with input and compare the result to the expected output
    expect(decodeSanitized(input)).toEqual(expectedOutput);
  });

  it("should return the same string if no HTML entities are present", () => {
    // Test case: If there are no HTML entities in the input, it should return the string as is.

    const input = "Hello world!";
    const expectedOutput = "Hello world!";
    // The output should be the same as the input since no decoding is needed.

    // The function should return the same string as output
    expect(decodeSanitized(input)).toEqual(expectedOutput);
  });

  it("should handle an empty string correctly", () => {
    // Test case: Handling empty string input

    const input = "";
    const expectedOutput = "";
    // An empty string should remain empty.

    // The function should return the empty string
    expect(decodeSanitized(input)).toEqual(expectedOutput);
  });

  it("should decode multiple HTML entities correctly", () => {
    // Test case: Decoding a string with multiple HTML entities

    const input = "&lt;p&gt;This is a &quot;test&quot; &amp; a test&lt;/p&gt;";
    const expectedOutput = '<p>This is a "test" & a test</p>';
    // Here, the entities like &lt;, &quot;, &amp; should be decoded back to their respective characters

    // The function should return the decoded version of the string
    expect(decodeSanitized(input)).toEqual(expectedOutput);
  });
});
