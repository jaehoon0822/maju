import type { JestConfigWithTsJest } from "ts-jest";

const jestConfig: JestConfigWithTsJest = {
  preset: "ts-jest",
  testEnvironment: "node",
  clearMocks: true,
  collectCoverage: true,
  setupFilesAfterEnv: ["<rootDir>/src/__tests__/setupTests.ts"],
  testMatch: ["**/?(*.)+(test).[jt]s?(x)"],
  coverageThreshold: {
    global: {
      statements: 100,
      branches: 95,
      functions: 100,
      lines: 100,
    },
  },
  moduleNameMapper: {
    "@/(.*)$": "<rootDir>/src/$1",
  },
  // testTimeout: 100,
  verbose: true,
};

export default jestConfig;
