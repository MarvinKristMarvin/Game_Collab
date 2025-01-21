module.exports = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom", // Or 'node' depending on your testing environment
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: "./tsconfig.jest.json", // Ensure this points to the correct tsconfig file
      },
    ],
  },
  moduleNameMapper: {
    "\\.webp$": "<rootDir>/webpMock.ts", // Mock WebP files
    "\\.css$": "<rootDir>/styleMock.ts", // Mock CSS files
  },
};
