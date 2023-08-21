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
    "@/(.*)$": "<rootDir>/src/$1",
  },
  testPathIgnorePatterns: ["<rootDir>/node_modules", "<rootDir>/.next/"],
  collectCoverageFrom: ["**/*.[jt]s?(x)", "!**/*.stories.[jt]s?(x)"],
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "<rootDir>/.next",
    "<rootDir>/.swc",
    "<rootDir>/src/coverage",
    "<rootDir>/src/lcov-report",
  ],
  coverageDirectory: "<rootDir>/src",
  coverageThreshold: {
    global: {},
    "./src/**/*.[jt]s?(x)": {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
};

export default createJestConfig(customJestConfig);
