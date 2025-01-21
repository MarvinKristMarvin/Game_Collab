export default {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js"],
  testMatch: ["**/tests/**/*.test.(ts|tsx)"],
  moduleDirectories: ["node_modules"],
  transformIgnorePatterns: ["/node_modules/"],
};
