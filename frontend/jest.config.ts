import { Config } from "jest";
import nextjest from "next/jest";

const createJestConfig = nextjest({
  dir: "./src",
});

const customJestConfig: Config = {
  preset: "ts-jest",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleDirectories: ["node_modules", "<rootDir>"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "^.\\.module\\.(css|sass|scss)$": "identity-obj-proxy",
    "^.+\\.(css|sass|scss)$": "<rootDir>/src/__mocks__/styleMock.ts",
    "^.+\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/src/__mocks__/fileMock.js",
  },
  testPathIgnorePatterns: ["<rootDir>/node_modules", "<rootDir>/.next/"],
};

export default createJestConfig(customJestConfig);
