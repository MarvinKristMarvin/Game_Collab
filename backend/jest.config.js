"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
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
//# sourceMappingURL=jest.config.js.map